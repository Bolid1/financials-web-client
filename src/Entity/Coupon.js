import { types } from 'mobx-state-tree'
import DateType from '../Type/DateType'
import Bond from './Bond'

// noinspection JSValidateTypes
/**
 * @class Coupon
 * @extends ObservableMap
 */
export default types
  .model(
    {
      /**
       * @description Идентификатор купона в БД
       * @member {number}
       * @memberOf Coupon#
       */
      id: types.identifierNumber,

      /**
       * @description Облигация, к которой принадлежит купон
       * @member {Bond}
       * @memberOf Coupon#
       */
      bond: types.reference(Bond),

      /**
       * @description Дата выплаты купона
       * @member {Date}
       * @memberOf Coupon#
       */
      date: types.maybe(DateType),

      /**
       * @description сколько будет выплачено по купону
       * @member {number}
       * @memberOf Coupon#
       */
      value: types.number,
    },
  )
