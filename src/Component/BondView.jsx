import PropTypes from 'prop-types'
import React from 'react'
import { FormattedRelative } from 'react-intl'
import Bar from '../Element/Bar'
import Bond from '../Entity/Bond'

export default class BondView extends React.Component {
  static propTypes = {
    bond: PropTypes.instanceOf(Bond).isRequired,
  }

  /**
   * @returns {Bond}
   */
  get bond () {
    return this.props.bond
  }

  render () {
    return <div>
      {this.bond.issuer.name}<br/>
      {this.bond.ISIN}<br/>
      <Bar
        current={this.bond.price}
        completeColor="rgba(255, 0, 0, 0.2)"
        unCompleteColor="rgba(0, 255, 0, 0.2)"
        total={this.bond.faceValue}
      >
        {`${this.bond.price}${this.bond.currency.sign}`} из {`${this.bond.faceValue}${this.bond.currency.sign}`}
      </Bar><br/>
      <FormattedRelative value={this.bond.closestCoupon.date}/>
    </div>
  }
}
