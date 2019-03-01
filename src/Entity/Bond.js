import { getParent, types } from 'mobx-state-tree'
import ObservableMapHelper from '../Helper/ObservableMapHelper'
import DateType from '../Type/DateType'
import Currency from './Currency'
import Issuer from './Issuer'

// noinspection JSValidateTypes, JSCheckFunctionSignatures
/**
 * @class Bond
 * @extends ObservableMap
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
       * @description Срок погашения - это дата, в которую эмитент выкупит облигацию по цене номинала {@see Bond#faceValue}
       * @member {Date}
       * @memberOf Bond#
       */
      maturity: types.maybe(DateType),

      /**
       * @description Дата, в которую завершается приём заявок на досрочный выкуп облигаций по номинальной стоимости {@see Bond#faceValue}
       * @member {Date}
       * @memberOf Bond#
       */
      offerEnd: types.maybe(DateType),

      /**
       * @description Номинал - это сумма, которую получит держатель облигации в день
       *   выкупа облигации эмитентом {@see Bond#issuer}.
       * @member {number}
       * @memberOf Bond#
       */
      faceValue: types.number,

      /**
       * @description Количество облигаций в обращении
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
    /**
     * @param {Bond} self
     */
    self => ({
      /**
       * @description Представление для формы
       * @memberOf Bond#
       */
      toForm () {
        const initialValue = {
          coupons: self.coupons.map(coupon => coupon.toJSON()),
          amortizations: self.amortizations.map(amortization => amortization.toJSON()),
        }

        return ObservableMapHelper.toForm(self, initialValue)
      },

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
        return getParent(getParent(self)).coupons
          .filter(coupon => coupon.bond === self)
      },

      /**
       * @description Погашения, которые будут происходить в течении срока жизни облигации
       * @member {Amortization[]}
       * @memberOf Bond#
       */
      get amortizations () {
        return getParent(getParent(self)).amortizations
          .filter(amortization => amortization.bond === self)
      },
    }),
  )
