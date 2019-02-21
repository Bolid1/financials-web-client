import AbstractEntity from './AbstractEntity'

/**
 * @implements {AbstractEntity}
 */
export default class Issuer extends AbstractEntity {
  get identifier () {
    return this.id
  }

  /**
   * @description Идентификатор эмитента в БД
   * @member {number}
   */
  id

  /**
   * @description Название эмитента
   * @member {string}
   */
  name = ''

  /**
   * @description Тип эмитента: частная компания, муниципальное образование, государство
   * @member {Issuer.types}
   */
  type = Issuer.types.corporate

  applyData (data) {
    if (typeof data.id === 'number') {
      this.id = data.id
    }

    if (typeof data.name === 'string') {
      this.name = data.name
    }

    if (typeof data.type === 'string') {
      this.type = data.type
    }

    return this
  }
}

/**
 * Enum для типов эмитентов
 * @readonly
 * @enum {string}
 */
Issuer.types = {
  /**
   * @description Частная компания
   * @member {string}
   */
  corporate: 'corporate',
  /**
   * @description Муниципальное образование
   * @member {string}
   */
  municipal: 'municipal',
  /**
   * @description Государство
   * @member {string}
   */
  state: 'state',
}
