import Currency from '../Entity/Currency'
import AbstractEntityStore from './AbstractEntityStore'

export default class CurrenciesStore extends AbstractEntityStore {
  _model = Currency
}
