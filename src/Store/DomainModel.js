import { destroy, getEnv, getIdentifier, types } from 'mobx-state-tree'
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
      coupons: types.map(Coupon),
      /**
       * @member {observableArray} amortizations
       * @memberOf DomainModel#
       */
      amortizations: types.map(Amortization),
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
            .forEach(type => self.updateEntities(type, _embedded[type]))
        }
      },

      /**
       * @param {string} type
       * @param {object[]} data
       * @memberOf DomainModel#
       */
      updateEntities (type, data) {
        return data.map(item => self.setEntity(type, item))
      },

      /**
       * @param {string} type
       * @param {object} data
       * @memberOf DomainModel#
       */
      setEntity (type, data) {
        return self[type].put(self.markSaved(data))
      },

      /**
       * @property {object} entity
       * @memberOf DomainModel#
       */
      markSaved (entity) {
        return Object.assign({}, entity, {_entityState: 'saved'})
      },

      /**
       * @property {ObservableMap} entity
       * @memberOf DomainModel#
       */
      remove (entity) {
        destroy(entity)
      },

      /**
       * @param {string} type
       * @param {object} data
       * @param {string|number} [id]
       * @memberOf DomainModel#
       */
      save (type, data, id) {
        const prev = id ? self.find(type, id) : undefined

        return Promise.resolve(data)
          .then(response => self.setEntity(type, response))
          .then(entity => {
            const promises = []

            if (prev?.coupons) {
              prev.coupons
                .filter(coupon => !data.coupons.find(({id}) => id === coupon.id))
                .forEach(coupon => self.remove(coupon))

              promises.push(...data.coupons.map(coupon => self.save(
                'coupons',
                Object.assign({id: self._getFakeId()}, coupon),
              )))
            }

            if (prev?.amortizations) {
              prev.amortizations
                .filter(amortization => !data.amortizations.find(({id}) => id === amortization.id))
                .forEach(amortization => self.remove(amortization))

              promises.push(...data.amortizations.map(amortization => self.save(
                'amortizations',
                Object.assign({id: self._getFakeId()}, amortization),
              )))
            }

            return promises.length
              ? Promise.all(promises).then(() => entity)
              : entity
          })
          .then(entity => {
            if (prev) {
              if (prev !== entity) {
                self.remove(prev)
              }
            }

            return getIdentifier(entity)
          })
          .catch(console.error)
      },

      /**
       * @return {number}
       * @memberOf DomainModel#
       */
      _getFakeId () {
        return ++self.fakeId
      },

      /**
       * @return {number}
       * @memberOf DomainModel#
       */
      _getNewId () {
        return ++self.newId
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
        return self.issuers.put(Object.assign({
            _entityState: 'new',
          id: -(self._getNewId()),
            name: '',
            type: 'corporate',
          }, props),
        )
      },

      /**
       * @params {object} props
       * @memberOf DomainModel#
       */
      makeBond (props = {}) {
        return self.bonds.put(Object.assign({
            _entityState: 'new',
          ISIN: `new${self._getNewId()}`,
            issuer: ObservableMapHelper.first(self.issuers),
            name: '',
            currency: ObservableMapHelper.first(self.currencies),
            quantity: 0,
            price: 0,
            faceValue: 1000,
          }, props),
        )
      },
    }))
  .views(
    self => ({
      /**
       * @param {string} type
       * @param {string|number} id
       * @memberOf DomainModel#
       */
      find (type, id) {
        return self[type].get(id)
      },

      /**
       * @return {API}
       * @memberOf DomainModel#
       */
      get api () {
        return getEnv(self).api
      },
    }),
  )
