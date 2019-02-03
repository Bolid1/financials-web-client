import { observable } from 'mobx'

export default class Currency {
  /**
   * @description Идентификатор валюты в БД
   * @member {String}
   */
  id

  /**
   * @description Значок валюты
   * @member {String}
   */
  @observable sign = ''

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
