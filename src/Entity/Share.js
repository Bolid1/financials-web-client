import { types } from 'mobx-state-tree'
import Issuer from './Issuer'

// noinspection JSValidateTypes
/**
 * @class Share
 */
export default types
  .model(
    {
      /**
       * @description Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти,
       *   который от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные
       *   средства.
       * @member {Issuer}
       * @memberOf Share#
       */
      issuer: types.reference(Issuer),

      /**
       * @description Международный идентификационный код ценной бумаги
       * @member {string}
       * @memberOf Share#
       */
      ticker: types.identifier,
    },
  )