import { getParent, types } from 'mobx-state-tree'
import Currency from './Currency'
import DateType from '../Type/DateType'
import Issuer from './Issuer'
import DateTimeHelper from '../Helper/DateTimeHelper'

// noinspection JSValidateTypes
/**
 * @class Bond
 */
export default types
  .model(
    {
      /**
       * @description Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти,
       *   который от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные
       *   средства.
       * @member {Issuer}
       * @memberOf Bond#
       */
      issuer: types.reference(Issuer),

      /**
       * @description Международный идентификационный код ценной бумаги
       * @member {string}
       * @memberOf Bond#
       */
      ISIN: types.identifier,

      /**
       * @description Название облигации
       * @member {string}
       * @memberOf Bond#
       */
      name: types.string,

      /**
       * @description Валюта, в которой происходят торги по данным облигациям
       * @member {Currency}
       * @memberOf Bond#
       */
      currency: types.reference(Currency),

      /**
       * @description Срок размещения - это дата, в которую эмитент выпустил бумаги на рынок
       * @member {Date}
       * @memberOf Bond#
       */
      placementDate: types.maybe(DateType),

      /**
       * @description Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала {@see Bond#faceValue}
       * @member {Date}
       * @memberOf Bond#
       */
      maturity: types.maybe(DateType),

      /**
       * @description Дата, с которой принимаются заявки на выкуп облигаций по номинальной стоимости {@see Bond#faceValue}
       * @member {Date}
       * @memberOf Bond#
       */
      offerStart: types.maybe(DateType),

      /**
       * @description Дата, в которую завершается приём заявок на выкуп облигаций по номинальной стоимости {@see Bond#faceValue}
       * @member {Date}
       * @memberOf Bond#
       */
      offerEnd: types.maybe(DateType),

      /**
       * @description В дату оферты инвестор может по желанию предъявить облигацию к погашению по заранее оговорённой
       *   стоимости {@see Bond#faceValue} или оставить её до следующей оферты. Соответственно, эмитент обязан выкупить все
       *   предъявленные инвесторами облигации.
       * @member {Date}
       * @memberOf Bond#
       */
      redemptionDate: types.maybe(DateType),

      /**
       * @description Номинал - это сумма, которую получит держатель облигации в день
       *   выкупа облигации эмитентом {@see Bond#issuer}.
       * @member {number}
       * @memberOf Bond#
       */
      faceValue: types.number,

      /**
       * @description Количество выпущенных облигаций
       * @member {number}
       * @memberOf Bond#
       */
      quantity: types.number,

      /**
       * @description Текущая стоимость облигации
       * @member {number}
       * @memberOf Bond#
       */
      price: types.number,
    },
  )
  .views(
    self => ({
      /**
       * @description Доступна ли возможность досрочного погашения
       * @member {boolean}
       * @memberOf Bond#
       */
      get earlyRepaymentAvailable () {
        return Boolean(self.offerEnd && self.offerEnd !== self.maturity)
      },

      /**
       * @description Купоны, которые будут выплачены по облигации
       * @member {Coupon[]}
       * @memberOf Bond#
       */
      get coupons () {
        return Array.from(getParent(getParent(self)).coupons.values())
          .filter(coupon => coupon.bond === self)
      },
    }),
  )
  .actions(
    self => ({

      /**
       * @param {Issuer} value
       * @memberOf {Bond#}
       */
      setIssuer (value) {
        self.issuer = value
      },

      /**
       * @param {string} value
       * @memberOf {Bond#}
       */
      setISIN (value) {
        self.ISIN = value
      },

      /**
       * @param {string} value
       * @memberOf {Bond#}
       */
      setName (value) {
        self.name = value
      },

      /**
       * @param {Currency} value
       * @memberOf {Bond#}
       */
      setCurrency (value) {
        self.currency = value
      },

      /**
       * @param {Date|string} value
       * @memberOf {Bond#}
       */
      setPlacementDate (value) {
        if (value instanceof Date) {
          value = DateTimeHelper.toSQL(value)
        }

        self.placementDate = value
      },

      /**
       * @param {Date|string} value
       * @memberOf {Bond#}
       */
      setMaturity (value) {
        if (value instanceof Date) {
          value = DateTimeHelper.toSQL(value)
        }

        self.maturity = value
      },

      /**
       * @param {Date|string} value
       * @memberOf {Bond#}
       */
      setOfferStart (value) {
        if (value instanceof Date) {
          value = DateTimeHelper.toSQL(value)
        }

        self.offerStart = value
      },

      /**
       * @param {Date|string} value
       * @memberOf {Bond#}
       */
      setOfferEnd (value) {
        if (value instanceof Date) {
          value = DateTimeHelper.toSQL(value)
        }

        self.offerEnd = value
      },

      /**
       * @param {Date|string} value
       * @memberOf {Bond#}
       */
      setRedemptionDate (value) {
        if (value instanceof Date) {
          value = DateTimeHelper.toSQL(value)
        }

        self.redemptionDate = value
      },

      /**
       * @param {number} value
       * @memberOf {Bond#}
       */
      setFaceValue (value) {
        self.faceValue = Number(value)
      },

      /**
       * @param {number} value
       * @memberOf {Bond#}
       */
      setQuantity (value) {
        self.quantity = Number(value)
      },

      /**
       * @param {number} value
       * @memberOf {Bond#}
       */
      setPrice (value) {
        self.price = Number(value)
      },
    })
  )
