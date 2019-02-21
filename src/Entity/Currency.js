import AbstractEntity from './AbstractEntity'

/**
 * @implements {AbstractEntity}
 */
export default class Currency extends AbstractEntity {
  get identifier () {
    return this.id
  }

  /**
   * @description Идентификатор валюты в БД
   * @member {String}
   */
  id

  /**
   * @description Значок валюты
   * @member {String}
   */
  sign = ''

  applyData (data) {
    if (typeof data.id === 'string') {
      this.id = data.id
    }

    if (typeof data.sign === 'string') {
      this.sign = data.sign
    }

    return this
  }
}
