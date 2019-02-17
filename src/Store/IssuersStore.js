import { action, observable } from 'mobx'
import Issuer from '../Entity/Issuer'
import issuers from '../samples/issuers'

export default class IssuersStore {
  /**
   * @type {Issuer[]}
   */
  @observable entities = []

  @action.bound loadIssuers () {
    this.entities = issuers._embedded.issuers.map(
      (issuer) => (new Issuer()).applyData(issuer),
    )
  }

  @action.bound push (...entities) {
    this.entities.push(
      ...entities
        .filter(entity => !this.entities.find(issuer => entity.id === issuer.id))
        .map(entity => (new Issuer()).applyData(entity)),
    )
  }
}
