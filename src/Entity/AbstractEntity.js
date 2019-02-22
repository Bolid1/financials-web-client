import { action } from 'mobx'

/**
 * @interface
 */
export default class AbstractEntity {
  /**
   * @abstract
   */
  get identifier () {
    throw new Error('Must be implemented by subclass')
  }

  toJSON () {
    return Object.assign({}, this)
  }

  /**
   * @param {Object} data
   * @returns {AbstractEntity}
   */
  @action.bound
  static fromJSON (data) {
    const entity = new this()

    entity.applyData(data)

    return entity
  }

  /**
   * @abstract
   * @param {Object} data
   */
  applyData (data) {
    throw new Error('Must be implemented by subclass')
  }
}
