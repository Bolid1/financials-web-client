import { getParent, types } from 'mobx-state-tree'

// noinspection JSValidateTypes
/**
 * @class Issuer
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
    self => ({
      /**
       * @description Облигации эмитента
       * @member {Bond[]}
       * @memberOf Issuer#
       */
      get bonds () {
        return Array.from(getParent(getParent(self)).bonds.values())
          .filter(bond => bond.issuer === self)
      },
      /**
       * @description Акции эмитента
       * @member {Share[]}
       * @memberOf Issuer#
       */
      get shares () {
        return Array.from(getParent(getParent(self)).shares.values())
          .filter(share => share.issuer === self)
      },
    }),
  )
