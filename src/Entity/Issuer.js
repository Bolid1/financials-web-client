import { observable } from 'mobx'

export default class Issuer {
  /**
   * @description Идентификатор эмитента в БД
   * @member {Number}
   */
  id

  /**
   * @description Название эмитента
   * @member {String}
   */
  @observable name = ''

  applyData (data) {
    if (typeof data.id === 'number') {
      this.id = data.id
    }

    if (typeof data.name === 'string') {
      this.name = data.name
    }

    return this
  }
}
