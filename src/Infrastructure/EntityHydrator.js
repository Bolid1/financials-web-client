import em from './EntityManager'

/**
 * Гидратор сущностей.
 */
export default class EntityHydrator {
  hydrate (entityName, data) {
    const meta = em.getMeta(entityName)
    const normalized = this.normalizeData(meta.fields, data)
    const Model = em.getModel(entityName)
    const currentEntity = em.findLocal(Model, data[em.getIdentifier(entityName)])
    const instance = currentEntity || new Model()

    instance.applyData(normalized)

    if (!currentEntity) {
      em.entities.push(instance)
    }

    return instance
  }

  /**
   * @param {Object.<String, FieldMeta>} fields
   * @param {Object.<String, *>} data
   * @returns {Object.<String, *>}
   */
  normalizeData (fields, data) {
    const result = {}

    Object
      .keys(data)
      .map(
        key => {
          const fieldMeta = fields[key]

          if (typeof fieldMeta === 'undefined') {
            throw new Error(`Undefined meta-data for field ${key}`)
          }

          const fieldValue = data[key]

          if (fieldMeta.instanceOf !== undefined) {
            if (fieldMeta.instanceOf === Date) {
              return result[key] = new Date(fieldValue)
            }

            if (!em.isSupported(fieldMeta.instanceOf)) {
              throw new Error(`Unsupported instanceOf ${fieldMeta.instanceOf}`)
            }

            return result[key] = em.find(fieldMeta.instanceOf, fieldValue)
          } else if (typeof fieldValue !== fieldMeta.type) {
            throw new Error(`Type mismatch for field "${key}" with value "${fieldValue}"`)
          }

          return result[key] = fieldValue
        },
      )

    return result
  }
}
