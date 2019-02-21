import Bond from '../Entity/Bond'
import AbstractEntityStore from './AbstractEntityStore'

export default class BondsStore extends AbstractEntityStore {
  _model = Bond
}
