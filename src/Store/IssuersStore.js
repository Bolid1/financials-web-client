import Issuer from '../Entity/Issuer'
import AbstractEntityStore from './AbstractEntityStore'

export default class IssuersStore extends AbstractEntityStore {
  _model = Issuer
}
