import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Gear from '../Icon/Gear'

/**
 * @param {Issuer} issuer
 * @return {*}
 * @constructor
 */
export default function IssuerView ({issuer}) {
  return <span>
    <Link to={`/issuers/${issuer.id}`}><Gear/></Link>
    {issuer.name}
    </span>
}

IssuerView.propTypes = {
  issuer: PropTypes.object.isRequired,
}
