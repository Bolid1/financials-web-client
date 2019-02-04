import DateTimeHelper from '../Helper/DateTimeHelper'
import em from './EntityManager'

class EntityReference {
  /**
   * @member {FieldMeta}
   */
  meta

  /**
   * @member {String}
   */
  value

  constructor (meta, value) {
    this.meta = meta
    this.value = value
  }

  get instance () {
    return em.find(this.meta.instanceOf, this.value)
  }
}

class EntityCollectionReference {
  /**
   * @member {*}
   */
  identifier

  /**
   * @member {function}
   */
  collectionOf

  /**
   * @member {FieldMeta}
   */
  id

  constructor (identifier, collectionOf, id) {
    this.identifier = identifier
    this.collectionOf = collectionOf
    this.id = id
  }

  get instance () {
    return em.findBy(this.collectionOf, {[this.identifier]: this.id})
  }
}

/**
 * Гидратор сущностей.
 */
export default class EntityHydrator {
  /**
   * @type {Object.<String, {instance: object, normalized: object}[]>}
   */
  hidrated = {}

  hydrate (entityName, data) {
    const meta = em.getMeta(entityName)
    const identifier = em.getIdentifier(entityName)
    const Model = em.getModel(entityName)
    const currentEntity = em.findLocal(Model, data[identifier])
    const instance = (currentEntity || new Model())
    const normalized = this.normalizeData(entityName, instance, meta.fields, data)

    instance.applyData(normalized)

    this._onHydrated(entityName, {instance, normalized})

    if (!currentEntity) {
      em.entities.push(instance)
    }

    return instance
  }

  compile () {
    return new Promise(
      resolve => {
        const entityNames = Object.keys(this.hidrated)
        if (entityNames.length === 0) {
          return resolve()
        }

        return Promise.all(
          entityNames.map(
            entityName => Promise
              .all(
                this.hidrated[entityName]
                  .map(
                    ({instance, normalized}) => Promise
                      .all(
                        Object
                          .keys(normalized)
                          .map(
                            key => {
                              const entityData = normalized[key]

                              if (
                                entityData instanceof EntityReference
                                || entityData instanceof EntityCollectionReference
                              ) {
                                return entityData.instance
                                                 .then(
                                                   (instance) => normalized[key] = instance,
                                                 )
                              }

                              return Promise.resolve()
                            },
                          ),
                      )
                      .then(() => instance.applyData(normalized)),
                  ),
              ),
          ),
        )
                      .then(resolve)
      },
    )
  }

  getEntitiesOf (entityName) {
    return (this.hidrated[entityName] || []).map(({instance}) => instance)
  }

  clear () {
    this.hidrated = {}
  }

  _onHydrated (entityName, instance) {
    if (!this.hidrated[entityName]) {
      this.hidrated[entityName] = []
    }

    this.hidrated[entityName].push(instance)
  }

  /**
   * @param {*} entityName
   * @param {Object} instance
   * @param {Object.<String, FieldMeta>} fields
   * @param {Object.<String, *>} data
   * @returns {Object.<String, *>}
   */
  normalizeData (entityName, instance, fields, data) {
    const result = {}

    Object
      .keys(fields)
      .map(
        key => {
          const fieldMeta = fields[key]

          if (typeof fieldMeta === 'undefined') {
            throw new Error(`Undefined meta-data for field ${key}`)
          }

          const fieldValue = data[key]

          if (fieldMeta.instanceOf !== undefined) {
            if (fieldMeta.instanceOf === Date) {
              if (!DateTimeHelper.isISODate(fieldValue)) {
                throw new Error(
                  `Field "${key}" has value "${fieldValue}" expected to be ISO date, but got something else`,
                )
              }
              return result[key] = new Date(fieldValue)
            }

            if (!em.isSupported(fieldMeta.instanceOf)) {
              throw new Error(`Unsupported instanceOf ${fieldMeta.instanceOf}`)
            }

            return result[key] = new EntityReference(fieldMeta, fieldValue)
          } else if (fieldMeta.collectionOf !== undefined) {
            if (!em.isSupported(fieldMeta.collectionOf)) {
              throw new Error(`Unsupported collectionOf ${fieldMeta.instanceOf}`)
            }

            return result[key] = new EntityCollectionReference(
              entityName,
              fieldMeta.collectionOf,
              instance,
            )
          } else if (typeof fieldValue !== fieldMeta.type) {
            throw new Error(`Type mismatch for field "${key}" with value "${fieldValue}"`)
          }

          return result[key] = fieldValue
        },
      )

    return result
  }
}
