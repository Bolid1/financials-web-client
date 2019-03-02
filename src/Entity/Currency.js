import { types } from 'mobx-state-tree'
import EntityStateType from '../Type/EntityStateType'

// noinspection JSValidateTypes
/**
 * @class Currency
 * @extends ObservableMap
 */
export default types
  .model(
    {
      /**
       * @member {string}
       * @memberOf Currency#
       */
      _entityState: EntityStateType,

      /**
       * @description Идентификатор валюты в БД
       * @member {string}
       * @memberOf Currency#
       */
      id: types.identifier,

      /**
       * @description Значок валюты
       * @member {string}
       * @memberOf Currency#
       */
      sign: types.string,
    },
  )
