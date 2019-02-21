import { action, observable } from 'mobx'
import API from '../Infrastructure/API'
import BondsStore from './BondsStore'
import CurrenciesStore from './CurrenciesStore'
import IssuersStore from './IssuersStore'

export default class RootStore {
  bondsStore = new BondsStore(this)
  currenciesStore = new CurrenciesStore(this)
  issuersStore = new IssuersStore(this)

  @observable loadInProgress = false

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
              issuer => issuer.id === bond.issuer,
            )
            bond.currency = this.currenciesStore.entities.find(
              currency => currency.id === bond.currency,
            )

            return bond
          }),
      )
    }
  }

  @action find (entity, id) {
    const store = this.getStoreByEntity(entity)

    this.loadInProgress = true
    this
      .clear()
      .then(() => API.find(entity, id))
      .then(
        /**
         * @param {Object} data
         */
        (data) => {
          this.applyEmbedded(data._embedded)

          store.fromJSON(data)

          this.loadInProgress = false

          return store.entities[0]
        },
      )
      .catch(console.error)
  }

  @action findBy (entity) {
    const store = this.getStoreByEntity(entity)

    this.loadInProgress = true
    this
      .clear()
      .then(() => API.findBy(entity))
      .then(
        /**
         * @param {Object} _embedded
         */
        ({_embedded}) => {
          this.applyEmbedded(_embedded)

          this.loadInProgress = false

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
