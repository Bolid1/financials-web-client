import * as PropTypes from 'prop-types'
import React from 'react'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import IssuerView from './IssuerView'

/**
 * @param {IIssuerEntity[]} issuers
 * @return {*}
 * @constructor
 */
export default function IssuersList ({issuers}) {
  return <TilesStyled>
    {issuers.map((issuer, key) => <TileStyled key={key}><IssuerView issuer={issuer}/></TileStyled>)}
  </TilesStyled>
}

IssuersList.propTypes = {
  issuers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
