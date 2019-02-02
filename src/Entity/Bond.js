import { observable } from 'mobx'
import Issuer from './Issuer'

export default class Bond {
  /**
   * @description Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти, который
   *   от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные средства.
   * @member {Issuer}
   */
  @observable issuer

  /**
   * @description Международный идентификационный код ценной бумаги
   * @member {String}
   */
  @observable ISIN

  /**
   * @description Валюта, в которой происходят торги по данным облигациям
   * @member {String}
   */
  @observable currency = 'RUB'

  /**
   * @description Номинал - это сумма, которую получит держатель облигации в день
   *   выкупа облигации эмитентом {@see issuer}.
   * @member {Number}
   */
  @observable faceValue

  /**
   * @description Количество выпущенных облигаций
   * @member {Number}
   */
  @observable quantity

  /**
   * @description Срок размещения - это дата, в которую эмитент выпустил бумаги на рынок
   * @member {Date}
   */
  @observable placementDate

  /**
   * @description Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала {@see faceValue}
   * @member {Date}
   */
  @observable maturity

  /**
   * @description Доступна ли возможность досрочного погашения
   * @member {Boolean}
   */
  @observable earlyRepaymentAvailable

  /**
   * @description Дата, с которой принимаются заявки на выкуп облигаций по номинальной стоимости {@see faceValue}
   * @member {Date}
   */
  @observable offerStart

  /**
   * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой
   *   стоимости {@see faceValue} или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все
   *   предъявленные инвесторами облигации.
   * @member {Date}
   */
  @observable offerEnd

  /**
   * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой
   *   стоимости {@see faceValue} или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все
   *   предъявленные инвесторами облигации.
   * @member {Date}
   */
  @observable redemptionDate

  /**
   * @description Текущая стоимость облигации
   * @member {Number}
   */
  @observable price

  applyData (data) {
    if (data.issuer instanceof Issuer) {
      this.issuer = data.issuer
    }

    if (typeof data.ISIN === 'string') {
      this.ISIN = data.ISIN
    }

    if (typeof data.currency === 'string') {
      this.currency = data.currency
    }

    if (typeof data.faceValue === 'number') {
      this.faceValue = data.faceValue
    }

    if (typeof data.quantity === 'number') {
      this.quantity = data.quantity
    }

    if (data.placementDate instanceof Date) {
      this.placementDate = data.placementDate
    }

    if (data.maturity instanceof Date) {
      this.maturity = data.maturity
    }

    if (typeof data.earlyRepaymentAvailable === 'boolean') {
      this.earlyRepaymentAvailable = data.earlyRepaymentAvailable
    }

    if (data.offerStart instanceof Date) {
      this.offerStart = data.offerStart
    }

    if (data.offerEnd instanceof Date) {
      this.offerEnd = data.offerEnd
    }

    if (data.redemptionDate instanceof Date) {
      this.redemptionDate = data.redemptionDate
    }

    if (typeof data.price === 'number') {
      this.price = data.price
    }

    return this
  }
}
