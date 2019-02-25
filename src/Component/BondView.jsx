import PropTypes from 'prop-types'
import React from 'react'
import { FormattedRelative } from 'react-intl'
import { Link } from 'react-router-dom'
import Bar from '../Element/Bar'
import Gear from '../Icon/Gear'

export default function BondView (props) {
  const bond = props.bond

  return <div>
    <Link to={`/bonds/${bond.ISIN}`}><Gear/></Link>
    {bond.issuer.name}<br/>
    {bond.ISIN}<br/>
    {bond.name}<br/>
    <Bar
      current={bond.price}
      completeColor="rgba(255, 0, 0, 0.2)"
      unCompleteColor="rgba(0, 255, 0, 0.2)"
      total={bond.faceValue}
    >
      {`${bond.price}${bond.currency.sign}`} из {`${bond.faceValue}${bond.currency.sign}`}
    </Bar><br/>
    {bond.closestCoupon && <FormattedRelative value={bond.closestCoupon.date}/>}
  </div>
}

BondView.propTypes = {
  bond: PropTypes.object.isRequired,
}
