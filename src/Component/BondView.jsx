import * as PropTypes from 'prop-types'
import React from 'react'

/**
 * @param {IBondEntity} bond
 * @return {*}
 * @constructor
 */
export default function BondView ({bond}) {
  return <div>
    {bond.issuer?.name}<br/>
    {bond.ISIN}<br/>
    {bond.name}
  </div>
}

BondView.propTypes = {
  bond: PropTypes.object.isRequired,
}
