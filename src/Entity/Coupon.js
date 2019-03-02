import { types } from 'mobx-state-tree'
import DateType from '../Type/DateType'
import EntityStateType from '../Type/EntityStateType'
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
       * @member {string}
       * @memberOf Coupon#
       */
      _entityState: EntityStateType,

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
