import { types } from 'mobx-state-tree'

// noinspection JSValidateTypes
/**
 * @class Currency
 * @extends ObservableMap
 */
export default types
  .model(
    {

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
