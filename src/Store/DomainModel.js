import { getEnv, types } from 'mobx-state-tree'
import Amortization from '../Entity/Amortization'
import Bond from '../Entity/Bond'
import Coupon from '../Entity/Coupon'
import Currency from '../Entity/Currency'
import Issuer from '../Entity/Issuer'
import Share from '../Entity/Share'
import ObservableMapHelper from '../Helper/ObservableMapHelper'

// noinspection JSValidateTypes
/**
 * @class DomainModel
 */
export default types
  .model(
    'DomainModel',
    {
      /**
       * @member {Number} newId
       * @memberOf DomainModel#
       */
      newId: types.number,
      /**
       * @member {Boolean} loaded
       * @memberOf DomainModel#
       */
      loaded: types.boolean,
      /**
       * @member {observable.Map} currencies
       * @memberOf DomainModel#
       */
      currencies: types.map(Currency),
      /**
       * @member {observable.Map} issuers
       * @memberOf DomainModel#
       */
      issuers: types.map(Issuer),
      /**
       * @member {observable.Map} bonds
       * @memberOf DomainModel#
       */
      bonds: types.map(Bond),
      /**
       * @member {observableArray} coupons
       * @memberOf DomainModel#
       */
      coupons: types.array(Coupon),
      /**
       * @member {observableArray} amortizations
       * @memberOf DomainModel#
       */
      amortizations: types.array(Amortization),
      /**
       * @member {observable.Map} shares
       * @memberOf DomainModel#
       */
      shares: types.map(Share),
    },
  )
  .actions(
    /**
     * @param {DomainModel} self
     * @return {function()}
     */
    self => ({
      /**
       * @memberOf DomainModel#
       */
      load () {
        Promise
          .all(
            [
              self.api.findBy('currencies'),
              self.api.findBy('issuers'),
              self.api.findBy('bonds'),
            ],
          )
          .then(data => data.map(self.receiveList))
          .then(() => self.setLoaded(true))
          .catch(console.error)
      },

      /**
       * @param {Boolean} value
       * @memberOf DomainModel#
       */
      setLoaded (value) {
        self.loaded = Boolean(value)
      },

      /**
       * @param _embedded
       * @memberOf DomainModel#
       */
      receiveList ({_embedded}) {
        if (typeof _embedded === 'object') {
          Object
            .keys(_embedded)
            .forEach(entity => self.updateEntities(entity, _embedded[entity]))
        }
      },

      /**
       * @param entity
       * @param entities
       * @memberOf DomainModel#
       */
      updateEntities (entity, entities) {
        const store = self[entity]
        const action = store.put || store.push

        entities.forEach(entity => action.call(store, entity))
      },

      /**
       * @memberOf DomainModel#
       */
      afterCreate () {
        self.load()
      },

      makeIssuer (props = {}) {
        const issuer = Object.assign({
          id: -(++self.newId),
          name: '',
          type: 'corporate',
        }, props)

        return self.issuers.put(issuer)
      },

      makeBond (props = {}) {
        const bond = Object.assign({
          ISIN: `new${++self.newId}`,
          issuer: ObservableMapHelper.first(self.issuers),
          name: '',
          currency: ObservableMapHelper.first(self.currencies),
          quantity: 0,
          price: 0,
          faceValue: 1000,
        }, props)

        return self.bonds.put(bond)
      }
    }))
  .views(
    self => ({
      /**
       * @return {API}
       * @memberOf DomainModel#
       */
      get api () {
        return getEnv(self).api
      },
    }),
  )
