import { computed, observable } from 'mobx'
import AbstractEntity from './AbstractEntity'
import Currency from './Currency'
import Issuer from './Issuer'

/**
 * @typedef {Object} BondJSON
 */

/**
 * Описание облигации
 */
export default class Bond extends AbstractEntity {
  /**
   * @description Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти, который
   *   от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные средства.
   * @member {Issuer}
   */
  @observable issuer
  /**
   * @description Международный идентификационный код ценной бумаги
   * @member {string}
   */
  @observable ISIN
  /**
   * @description Название облигации
   * @member {string}
   */
  @observable name
  /**
   * @description Валюта, в которой происходят торги по данным облигациям
   * @member {Currency}
   */
  @observable currency

  get identifier () {
    return this.ISIN
  }

  /**
   * @description Номинал - это сумма, которую получит держатель облигации в день
   *   выкупа облигации эмитентом {@see issuer}.
   * @member {number}
   */
  faceValue

  /**
   * @description Количество выпущенных облигаций
   * @member {number}
   */
  quantity

  /**
   * @description Срок размещения - это дата, в которую эмитент выпустил бумаги на рынок
   * @member {Date}
   */
  placementDate

  /**
   * @description Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала {@see faceValue}
   * @member {Date}
   */
  maturity

  /**
   * @description Доступна ли возможность досрочного погашения
   * @member {boolean}
   */
  earlyRepaymentAvailable

  /**
   * @description Дата, с которой принимаются заявки на выкуп облигаций по номинальной стоимости {@see faceValue}
   * @member {Date}
   */
  offerStart

  /**
   * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой
   *   стоимости {@see faceValue} или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все
   *   предъявленные инвесторами облигации.
   * @member {Date}
   */
  offerEnd

  /**
   * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой
   *   стоимости {@see faceValue} или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все
   *   предъявленные инвесторами облигации.
   * @member {Date}
   */
  redemptionDate

  /**
   * @description Текущая стоимость облигации
   * @member {number}
   */
  price

  /**
   * @description Купоны, которые будут выплачены по облигации
   * @member {Coupon[]}
   */
  coupons

  /**
   * @returns {Coupon|undefined}
   */
  @computed get closestCoupon () {
    return (this.coupons || [])
      .slice()
      .sort((c1, c2) => c1.date.getTime() - c2.date.getTime())
      .find(({date}) => date > new Date())
  }

  applyData (data) {
    if (data.issuer instanceof Issuer) {
      this.issuer = data.issuer
    }

    if (typeof data.ISIN === 'string') {
      this.ISIN = data.ISIN
    }

    if (typeof data.name === 'string') {
      this.name = data.name
    }

    if (data.currency instanceof Currency) {
      this.currency = data.currency
    }

    if (typeof data.faceValue === 'number') {
      this.faceValue = data.faceValue
    }

    if (typeof data.quantity === 'number') {
      this.quantity = data.quantity
    }

    if (data.placementDate) {
      this.placementDate = new Date(data.placementDate)
    }

    if (data.maturity) {
      this.maturity = new Date(data.maturity)
    }

    if (typeof data.earlyRepaymentAvailable === 'boolean') {
      this.earlyRepaymentAvailable = data.earlyRepaymentAvailable
    }

    if (data.offerStart) {
      this.offerStart = new Date(data.offerStart)
    }

    if (data.offerEnd) {
      this.offerEnd = new Date(data.offerEnd)
    }

    if (data.redemptionDate) {
      this.redemptionDate = new Date(data.redemptionDate)
    }

    if (typeof data.price === 'number') {
      this.price = data.price
    }

    if (Array.isArray(data.coupons)) {
      this.coupons = data.coupons
    }

    return this
  }
}
