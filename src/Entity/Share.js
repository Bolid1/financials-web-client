import AbstractEntity from './AbstractEntity'
import Issuer from './Issuer'

export default class Share extends AbstractEntity {
  /**
   * @description Эмитент – это юридическое лицо или орган государственной исполнительной или местной власти, который
   *   от своего имени и в рамках своей деятельности выпускает в обращение ценные бумаги или иные платежные средства.
   * @member {Issuer}
   */
  issuer

  applyData (data) {
    if (data.issuer instanceof Issuer) {
      this.issuer = data.issuer
    }

    return this
  }
}
