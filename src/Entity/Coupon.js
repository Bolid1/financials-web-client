import Bond from './Bond'

/**
 * @implements {AbstractEntity}
 */
export default class Coupon {
  /**
   * @description Идентификатор купона в БД
   * @member {Number}
   */
  id

  /**
   * @description Облигация, к которой принадлежит купон
   * @member {Bond}
   */
  bond

  /**
   * @description Дата выплаты купона
   * @member {Date}
   */
  date

  /**
   * @description сколько будет выплачено по купону
   * @member {Number}
   */
  value

  applyData (data) {
    if (typeof data.id === 'number') {
      this.id = data.id
    }

    if (data.bond instanceof Bond) {
      this.bond = data.bond
    }

    if (data.date instanceof Date) {
      this.date = data.date
    }

    if (typeof data.value === 'number') {
      this.value = data.value
    }

    return this
  }
}
