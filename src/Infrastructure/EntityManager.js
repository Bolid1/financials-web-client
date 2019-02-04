import entities from '../config/entities'
import Entities from './Entities'
import RepositoryManager from './RepositoryManager'

class EntityManager {
  /**
   * @member {Object.<String, {}>}
   */
  entitiesConfig

  /**
   * @member {Entities}
   */
  entities

  /**
   * @member {RepositoryManager}
   */
  rm

  constructor (entitiesConfig) {
    this.entitiesConfig = entitiesConfig
    this.entities = new Entities()
    this.rm = new RepositoryManager()

    Object.keys(entitiesConfig)
          .forEach(name => {
            // noinspection JSPotentiallyInvalidConstructorUsage
            this.rm.push(
              {
                name,
                entityClass: entities[name].entity,
                repositoryClass: entities[name].repository,
                repository: new entities[name].repository(this),
              },
            )
          })
  }

  getMeta (entity) {
    return this.entitiesConfig[this._normalizeEntity(entity)]
  }

  getName (entityClass) {
    return Object.keys(this.entitiesConfig)
                 .find(name => this.getModel(name) === entityClass)
  }

  getModel (entity) {
    return this.entitiesConfig[this._normalizeEntity(entity)]?.entity
  }

  getIdentifier (entity) {
    return this.entitiesConfig[this._normalizeEntity(entity)]?.identifier
  }

  isSupported (entityClass) {
    return this.getName(entityClass) !== null
  }

  find (entityClass, id) {
    const local = this.findLocal(entityClass, id)

    return local
           ? Promise.resolve(local)
           : this.rm
                 .byEntityClass(entityClass)
                 .find(id)
  }

  findLocal (entityClass, id) {
    const identifier = this.getIdentifier(this.getName(entityClass))

    return this.entities.findEntity(entityClass, identifier, id)
  }

  findBy (entityClass, criteria) {
    const local = this.findByLocal(entityClass, criteria)

    return (local && local.length)
           ? Promise.resolve(local)
           : this.rm
                 .byEntityClass(entityClass)
                 .findBy(criteria)
  }

  findByLocal (entityClass, criteria) {
    return this.entities.findEntities(entityClass, criteria)
  }

  /**
   * @param {String|Object} entity
   * @returns {String}
   * @private
   */
  _normalizeEntity (entity) {
    if (typeof entity === 'string') {
      return entity
    } else if (typeof entity === 'function') {
      return this.getName(entity)
    } else {
      throw new Error(`Unexpected entity ${entity}`)
    }
  }
}

const em = new EntityManager(entities)
export default em
