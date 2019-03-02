import { getParent, types } from 'mobx-state-tree'
import ObservableMapHelper from '../Helper/ObservableMapHelper'

// noinspection JSValidateTypes
/**
 * @class Issuer
 * @extends ObservableMap
 */
export default types
  .model(
    {
      /**
       * @description Идентификатор эмитента в БД
       * @member {number}
       * @memberOf Issuer#
       */
      id: types.identifierNumber,

      /**
       * @description Название эмитента
       * @member {string}
       * @memberOf Issuer#
       */
      name: types.string,

      /**
       * @description Тип эмитента: частная компания, муниципальное образование, государство
       * @member {string}
       * @memberOf Issuer#
       */
      type: types.enumeration('Type', ['corporate', 'municipal', 'state']),
    },
  )
  .views(
    /**
     * @param {Issuer} self
     */
    self => ({
      toForm () {
        return ObservableMapHelper.toForm(self)
      },

      /**
       * @description Облигации эмитента
       * @member {Bond[]}
       * @memberOf Issuer#
       */
      get bonds () {
        return ObservableMapHelper.toArray(getParent(getParent(self)).bonds)
          .filter(bond => bond.issuer === self)
      },
      /**
       * @description Акции эмитента
       * @member {Share[]}
       * @memberOf Issuer#
       */
      get shares () {
        return ObservableMapHelper.toArray(getParent(getParent(self)).shares)
          .filter(share => share.issuer === self)
      },
    }),
  )
