import { action } from 'mobx'
import API from '../Infrastructure/API'
import BondsStore from './BondsStore'
import CurrenciesStore from './CurrenciesStore'
import IssuersStore from './IssuersStore'

export default class RootStore {
  bondsStore = new BondsStore(this)
  currenciesStore = new CurrenciesStore(this)
  issuersStore = new IssuersStore(this)

  /**
   * @param {string} entity
   * @returns {AbstractEntityStore}
   */
  getStoreByEntity (entity) {
    switch (entity) {
      case 'currency':
      case 'currencies':
        return this.currenciesStore
      case 'issuer':
      case 'issuers':
        return this.issuersStore
      case 'bond':
      case 'bonds':
        return this.bondsStore
      default:
        throw new Error(`Unknown entity ${entity}`)
    }
  }

  /**
   * @param {string} entity
   * @returns {string}
   */
  getEmebeddedKey (entity) {
    switch (entity) {
      case 'currency':
      case 'currencies':
        return 'currencies'
      case 'issuer':
      case 'issuers':
        return 'issuers'
      case 'bond':
      case 'bonds':
        return 'bonds'
      default:
        throw new Error(`Unknown entity ${entity}`)
    }
  }

  applyEmbedded (_embedded) {
    if (_embedded.hasOwnProperty('currencies')) {
      this.currenciesStore.fromJSON(..._embedded.currencies)
    }

    if (_embedded.hasOwnProperty('issuers')) {
      this.issuersStore.fromJSON(..._embedded.issuers)
    }

    if (_embedded.hasOwnProperty('bonds')) {
      this.bondsStore.fromJSON(
        ..._embedded
          .bonds
          .map(bond => {
            bond.issuer = this.issuersStore.entities.find(
              issuer => issuer.identifier === bond.issuer,
            )
            bond.currency = this.currenciesStore.entities.find(
              currency => currency.identifier === bond.currency,
            )

            return bond
          }),
      )
    }
  }

  @action find (entity, id) {
    const store = this.getStoreByEntity(entity)
    const key = this.getEmebeddedKey(entity)

    return API.find(entity, id)
      .then(
        /**
         * @param {Object} data
         */
        (data) => {
          if (!data._embedded.hasOwnProperty(key)) {
            data._embedded[key] = []
          }

          data._embedded[key].push(data)

          this.applyEmbedded(data._embedded)

          return store.entities[0]
        },
      )
      .catch(console.error)
  }

  @action findBy (entity) {
    const store = this.getStoreByEntity(entity)

    return API.findBy(entity)
              .then(
        /**
         * @param {Object} _embedded
         */
        ({_embedded}) => {
          this.applyEmbedded(_embedded)

          return store.entities
        },
      )
  }

  clear () {
    return Promise.all(
      [
        this.bondsStore.clear(),
        this.currenciesStore.clear(),
        this.issuersStore.clear(),
      ],
    )
  }
}
