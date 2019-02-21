import { action, computed, observable } from 'mobx'

/**
 * Interface for stores, that works with entities
 *
 * @interface
 */
export default class AbstractEntityStore {
  /**
   * @member {typeof AbstractEntity}
   */
  _model

  /**
   * @member {RootStore}
   * @private
   */
  _rootStore

  /**
   * @member {AbstractEntity[]}
   */
  @observable entities = []

  constructor (rootStore) {
    this._rootStore = rootStore
  }

  /**
   * @returns {Bond|null}
   */
  @computed get first () {
    return this.entities.length ? this.entities[0] : null
  }

  @action clear () {
    this.entities = []

    return Promise.resolve()
  }

  /**
   * Convert data to Entity
   * @param {Object[]} data
   * @return {AbstractEntity[]}
   */
  fromJSON (...data) {
    const entities = data
      .map(this._model.fromJSON)
      .filter(entity => {
        const identifier = entity.identifier
        const existing = this.entities.find(e => e.identifier === identifier)

        if (existing) {
          existing.applyData(entity)
        }

        return !existing
      })

    return this.entities = this.entities.concat(entities)
  }
}
