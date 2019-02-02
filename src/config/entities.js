import Bond from '../Entity/Bond'
import Issuer from '../Entity/Issuer'
import BondRepository from '../Repository/BondRepository'
import IssuerRepository from '../Repository/IssuerRepository'

/**
 * @typedef {Object} FieldMeta
 * @property {string} type
 * @property {Object} instanceOf
 */

/**
 *
 */
export default {
  bond: {
    entity: Bond,
    repository: BondRepository,
    identifier: 'ISIN',
    fields: {
      issuer: {
        instanceOf: Issuer,
        type: 'object',
      },
      ISIN: {
        type: 'string',
      },
      currency: {
        type: 'string',
      },
      faceValue: {
        type: 'number',
      },
      quantity: {
        type: 'number',
      },
      placementDate: {
        instanceOf: Date,
        type: 'object',
      },
      maturity: {
        instanceOf: Date,
        type: 'object',
      },
      earlyRepaymentAvailable: {
        type: 'boolean',
      },
      offerStart: {
        instanceOf: Date,
        type: 'object',
      },
      offerEnd: {
        instanceOf: Date,
        type: 'object',
      },
      redemptionDate: {
        instanceOf: Date,
        type: 'object',
      },
      price: {
        type: 'number',
      },
    },
  },
  issuer: {
    entity: Issuer,
    repository: IssuerRepository,
    identifier: 'id',
    fields: {
      id: {
        type: 'number',
      },
      name: {
        type: 'string',
      },
    },
  },
}
