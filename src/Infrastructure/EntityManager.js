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

  getMeta (entityName) {
    return this.entitiesConfig[entityName]
  }

  getName (entityClass) {
    return Object.keys(this.entitiesConfig)
                 .find(name => this.getModel(name) === entityClass)
  }

  getModel (entityName) {
    return this.entitiesConfig[entityName]?.entity
  }

  getIdentifier (entityName) {
    return this.entitiesConfig[entityName]?.identifier
  }

  isSupported (entityClass) {
    return this.getName(entityClass) !== null
  }

  find (entityClass, id) {
    return this.findLocal(entityClass, id)
           || this.rm.byEntityClass(entityClass)
                  .find(id)
  }

  findLocal (entityClass, id) {
    const identifier = this.getIdentifier(this.getName(entityClass))

    return this.entities.findEntity(entityClass, identifier, id)
  }
}

const em = new EntityManager(entities)
export default em
