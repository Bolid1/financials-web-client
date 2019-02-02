import EntityHydrator from '../Infrastructure/EntityHydrator'
import bonds from '../samples/api/v1/bonds'

/**
 * @typedef {Object} ApiV1Bond
 * @property {Number} "issuer": 2,
 * @property {String} "ISIN": "RU000A0ZYX69",
 * @property {String} "currency": "RUB",
 * @property {Number} "faceValue": 1000,
 * @property {Number} "quantity":  10000000,
 * @property {String} "placementDate": "2018-03-07",
 * @property {String} "maturity":  "2028-02-23",
 * @property {Boolean} "earlyRepaymentAvailable": true,
 * @property {String} "offerStart": "2024-08-22",
 * @property {String} "offerEnd": "2024-08-28",
 * @property {String} "redemptionDate": "2024-09-02",
 * @property {Number} "price": 925
 */

/**
 * Репозиторий облигаций
 */
export default class BondRepository {
  find (id) {
    throw new Error('Need to be implemented')
  }

  findBy (criteria) {
    return new Promise((resolve) => {
      return resolve(bonds)
    })
    /* @TODO: Check 204*/
      .then(
        /**
         * @param {Object} response
         * @param {Object} response.links
         * @param {Object} response._embedded
         * @param {ApiV1Bond[]} response._embedded.bonds
         * @param {ApiV1Issuer[]} response._embedded.issuers
         * @param {Number} response.total
         * @param {Number} response.limit
         * @param {Number} response.offset
         */
        response => {
          if (!response._embedded.bonds.length) {
            return []
          }

          const hydrator = new EntityHydrator()

          response._embedded.issuers.map(issuer => hydrator.hydrate('issuer', issuer))

          return response._embedded.bonds.map(bond => hydrator.hydrate('bond', bond))
        },
      )
  }
}
