import { action, observable } from 'mobx'
import Currency from '../Entity/Currency'

export default class CurrenciesStore {
  /**
   * @type {Currency[]}
   */
  @observable entities = []

  @action.bound push (...entities) {
    this.entities.push(
      ...entities
        .filter(entity => !this.entities.find(currency => entity.id === currency.id))
        .map(entity => (new Currency()).applyData(entity)),
    )
  }
}
