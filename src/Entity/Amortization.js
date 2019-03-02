import { types } from 'mobx-state-tree'
import DateType from '../Type/DateType'
import EntityStateType from '../Type/EntityStateType'
import Bond from './Bond'

// noinspection JSValidateTypes
/**
 * @class Amortization
 * @extends ObservableMap
 */
export default types
  .model(
    {
      /**
       * @member {string}
       * @memberOf Amortization#
       */
      _entityState: EntityStateType,

          /**
           * @member {number}
           * @memberOf Amortization#
           */
          id: types.identifierNumber,

      /**
       * @description Облигация, по которой происходит погашение
       * @member {Bond}
       * @memberOf Amortization#
       */
      bond: types.reference(Bond),

      /**
       * @description Дата погашения
       * @member {Date}
       * @memberOf Amortization#
       */
      date: types.maybe(DateType),

      /**
       * @description сколько будет погашено
       * @member {number}
       * @memberOf Amortization#
       */
      value: types.number,
    },
  )
