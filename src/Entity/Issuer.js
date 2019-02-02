import { observable } from 'mobx'

export default class Issuer {
  /**
   * @description Название эмитента
   * @member {String}
   */
  @observable name = ''
}
