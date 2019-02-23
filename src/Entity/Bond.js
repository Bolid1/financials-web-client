import { computed, observable } from 'mobx'
import DateTimeHelper from '../Helper/DateTimeHelper'
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
   * @description Срок размещения - это дата, в которую эмитент выпустил бумаги на рынок
   * @member {Date}
   */
  @observable placementDate
  /**
   * @description Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала {@see _faceValue}
   * @member {Date}
   */
  @observable maturity
  /**
   * @description Дата, с которой принимаются заявки на выкуп облигаций по номинальной стоимости {@see _faceValue}
   * @member {Date}
   */
  @observable offerStart
  /**
   * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой
   *   стоимости {@see _faceValue} или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все
   *   предъявленные инвесторами облигации.
   * @member {Date}
   */
  @observable offerEnd
  /**
   * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой
   *   стоимости {@see _faceValue} или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все
   *   предъявленные инвесторами облигации.
   * @member {Date}
   */
  @observable redemptionDate

  /**
   * @description Номинал - это сумма, которую получит держатель облигации в день
   *   выкупа облигации эмитентом {@see issuer}.
   * @member {number}
   */
  @observable _faceValue

  get faceValue () {
    return this._faceValue
  }

  set faceValue (value) {
    this._faceValue = Number(value)
  }

  /**
   * @description Количество выпущенных облигаций
   * @member {number}
   */
  @observable _quantity

  /**
   * @description Купоны, которые будут выплачены по облигации
   * @member {Coupon[]}
   */
  coupons = []

  /**
   * @returns {Coupon|undefined}
   */
  @computed get closestCoupon () {
    return (this.coupons || [])
      .slice()
      .sort((c1, c2) => c1.date.getTime() - c2.date.getTime())
      .find(({date}) => date > new Date())
  }

  get quantity () {
    return this._quantity
  }

  set quantity (value) {
    this._quantity = Number(value)
  }

  /**
   * @description Доступна ли возможность досрочного погашения
   * @member {boolean}
   */
  @observable _earlyRepaymentAvailable

  get earlyRepaymentAvailable () {
    return this._earlyRepaymentAvailable || false
  }

  set earlyRepaymentAvailable (value) {
    this._earlyRepaymentAvailable = Boolean(value)
  }

  /**
   * @description Текущая стоимость облигации
   * @member {number}
   */
  @observable _price

  get price () {
    return this._price
  }

  set price (value) {
    this._price = Number(value)
  }

  toJSON () {
    const data = Object.assign({}, this)
    data.issuer = this.issuer.identifier
    data.currency = this.currency.identifier
    data.placementDate = DateTimeHelper.toSQL(this.placementDate)
    data.maturity = DateTimeHelper.toSQL(this.maturity)
    data.offerStart = DateTimeHelper.toSQL(this.offerStart)
    data.offerEnd = DateTimeHelper.toSQL(this.offerEnd)
    data.redemptionDate = DateTimeHelper.toSQL(this.redemptionDate)

    return data
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
      this._faceValue = data.faceValue
    }

    if (typeof data._quantity === 'number') {
      this._quantity = data._quantity
    }

    if (data.placementDate) {
      this.placementDate = DateTimeHelper.fromSQL(data.placementDate)
    }

    if (data.maturity) {
      this.maturity = DateTimeHelper.fromSQL(data.maturity)
    }

    if (typeof data._earlyRepaymentAvailable === 'boolean') {
      this._earlyRepaymentAvailable = data._earlyRepaymentAvailable
    }

    if (data.offerStart) {
      this.offerStart = DateTimeHelper.fromSQL(data.offerStart)
    }

    if (data.offerEnd) {
      this.offerEnd = DateTimeHelper.fromSQL(data.offerEnd)
    }

    if (data.redemptionDate) {
      this.redemptionDate = DateTimeHelper.fromSQL(data.redemptionDate)
    }

    if (typeof data.price === 'number') {
      this._price = data.price
    }

    if (Array.isArray(data.coupons)) {
      this.coupons = data.coupons
    }

    return this
  }
}
