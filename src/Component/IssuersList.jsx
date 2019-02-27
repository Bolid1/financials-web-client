import PropTypes from 'prop-types'
import React from 'react'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import IssuerView from './IssuerView'

export default function IssuersList (props) {
  return <TilesStyled>
    {
      props.issuers
        .map(
          (issuer, key) => <TileStyled key={key}>
            <IssuerView issuer={issuer}/>
          </TileStyled>,
        )
    }
  </TilesStyled>
}

IssuersList.propTypes = {
  issuers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
