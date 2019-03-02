import { getEnv, getIdentifier, types } from 'mobx-state-tree'
/** @type IModelType */
import Amortization from '../Entity/Amortization'
/** @type IModelType */
import Bond from '../Entity/Bond'
/** @type IModelType */
import Coupon from '../Entity/Coupon'
/** @type IModelType */
import Currency from '../Entity/Currency'
/** @type IModelType */
import Issuer from '../Entity/Issuer'
/** @type IModelType */
import Share from '../Entity/Share'
import ObservableMapHelper from '../Helper/ObservableMapHelper'
import StateTypeHelper from '../Helper/StateTypeHelper'

// noinspection JSValidateTypes
/**
 * @class DomainModel
 */
export default types
  .model(
    'DomainModel',
    {
      /**
       * @member {Number} fakeId
       * @memberOf DomainModel#
       */
      fakeId: types.number,
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
       * @param {object} _embedded
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
       * @param {string} entity
       * @param {object[]} entities
       * @memberOf DomainModel#
       */
      updateEntities (entity, entities) {
        const store = self[entity]
        const action = store.put || store.push

        entities.forEach(entity => action.call(store, self.markSaved(entity)))
      },

      /**
       * @property {object} entity
       * @memberOf DomainModel#
       */
      markSaved (entity) {
        return Object.assign({}, entity, {_entityState: 'saved'})
      },

      /**
       * @memberOf DomainModel#
       */
      afterCreate () {
        self.load()
      },

      /**
       * @params {object} props
       * @memberOf DomainModel#
       */
      makeIssuer (props = {}) {
        const issuer = Object.assign({
          _entityState: 'new',
          id: -(++self.newId),
          name: '',
          type: 'corporate',
        }, props)

        return self.issuers.put(issuer)
      },

      /**
       * @param {Issuer} issuer
       * @memberOf DomainModel#
       */
      deleteIssuer (issuer) {
        self.issuers.delete(getIdentifier(issuer))
      },

      /**
       * @memberOf DomainModel#
       */
      saveIssuer (data) {
        /**
         * @type {Issuer}
         */
        const issuer = self.issuers.get(data.id)
        if (!issuer) {
          throw new Error(`Issuer with id ${data.id} not found`)
        }

        const changes = Object
          .keys(Issuer.properties)
          .filter(key => !StateTypeHelper.isIdentifier(Issuer.properties[key]))
          .reduce((prev, key) => {
            if (
              typeof data[key] !== 'undefined'
              && data[key] !== issuer[key]
            ) {
              prev[key] = data[key]
            }

            return prev
          }, {})

        Object.assign(issuer, changes)

        return Promise.resolve(Object.assign({}, issuer.toJSON(), {id: ++self.fakeId}))
          .then(data => {
            if (issuer.new) {
              self.deleteIssuer(issuer)
            }

            self.updateEntities('issuers', [data])

            return Promise.resolve(data.id)
          })
      },

      /**
       * @params {object} props
       * @memberOf DomainModel#
       */
      makeBond (props = {}) {
        const bond = Object.assign({
          _entityState: 'new',
          ISIN: `new${++self.newId}`,
          issuer: ObservableMapHelper.first(self.issuers),
          name: '',
          currency: ObservableMapHelper.first(self.currencies),
          quantity: 0,
          price: 0,
          faceValue: 1000,
        }, props)

        return self.bonds.put(bond)
      },
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
