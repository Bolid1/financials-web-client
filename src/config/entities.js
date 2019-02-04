import Bond from '../Entity/Bond'
import Coupon from '../Entity/Coupon'
import Currency from '../Entity/Currency'
import Issuer from '../Entity/Issuer'
import BondRepository from '../Repository/BondRepository'
import CouponRepository from '../Repository/CouponRepository'
import CurrencyRepository from '../Repository/CurrencyRepository'
import IssuerRepository from '../Repository/IssuerRepository'

/**
 * @typedef {Object} FieldMeta
 * @property {string} type
 * @property {Object} [instanceOf]
 * @property {Object} [collectionOf]
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
        instanceOf: Currency,
        type: 'object',
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
      coupons: {
        collectionOf: Coupon,
        type: 'object',
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
  currency: {
    entity: Currency,
    repository: CurrencyRepository,
    identifier: 'id',
    fields: {
      id: {
        type: 'string',
      },
      sign: {
        type: 'string',
      },
    },
  },
  coupon: {
    entity: Coupon,
    repository: CouponRepository,
    identifier: 'id',
    fields: {
      id: {
        type: 'number',
      },
      bond: {
        instanceOf: Bond,
        type: 'object',
      },
      date: {
        instanceOf: Date,
        type: 'object',
      },
      value: {
        type: 'number',
      },
    },
  },
}
