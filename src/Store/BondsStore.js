import { action, observable } from 'mobx'
import Bond from '../Entity/Bond'
import bonds from '../samples/bonds.js'

export default class BondsStore {
  /**
   * @type {IssuersStore}
   * @private
   */
  _issuersStore

  /**
   * @type {CurrenciesStore}
   * @private
   */
  _currenciesStore

  /**
   * @type {Bond[]}
   */
  @observable entities = []

  constructor (issuersStore, currenciesStore) {
    this._issuersStore = issuersStore
    this._currenciesStore = currenciesStore
  }

  @action.bound loadBonds () {
    this._currenciesStore.push(...bonds._embedded.currencies)
    this._issuersStore.push(...bonds._embedded.issuers)

    this.entities = bonds._embedded.bonds.map(
      (bond) => (new Bond()).applyData(this.findRelations(bond)),
    )
  }

  @action.bound push (...entities) {
    this.entities.push(
      ...entities
        .filter(entity => !this.entities.find(bond => entity.ISIN === bond.ISIN))
        .map(entity => (new Bond()).applyData(this.findRelations(entity))),
    )
  }

  findRelations (bond) {
    if (!bond.issuer?.id) {
      bond.issuer = this._issuersStore.entities.find(issuer => issuer.id === bond.issuer)
    }

    if (!bond.currency?.id) {
      bond.currency = this._currenciesStore.entities.find(currency => currency.id === bond.currency)
    }

    return bond
  }
}
