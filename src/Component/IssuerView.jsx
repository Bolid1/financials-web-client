import * as PropTypes from 'prop-types'
import React from 'react'

/**
 * @param {IIssuerEntity} issuer
 * @return {*}
 * @constructor
 */
export default function IssuerView ({issuer}) {
  return <span>
    {issuer.name}
  </span>
}

IssuerView.propTypes = {
  issuer: PropTypes.object.isRequired,
}
