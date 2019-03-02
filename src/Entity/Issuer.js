import { getParent, types } from 'mobx-state-tree'
import ObservableMapHelper from '../Helper/ObservableMapHelper'
import EntityStateType from '../Type/EntityStateType'

// noinspection JSValidateTypes
/**
 * @class Issuer
 * @extends ObservableMap
 */
export default types
  .model(
    {
      /**
       * @member {string}
       * @memberOf Issuer#
       */
      _entityState: EntityStateType,

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
      /**
       * @memberOf Issuer#
       */
      toForm () {
        return ObservableMapHelper.toForm(self)
      },

      /**
       * @member {boolean}
       * @memberOf Issuer#
       */
      get new () {
        return self._entityState === 'new'
      },

      /**
       * @member {boolean}
       * @memberOf Issuer#
       */
      get saved () {
        return self._entityState === 'saved'
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
