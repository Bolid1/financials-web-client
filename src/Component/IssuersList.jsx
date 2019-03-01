import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import Link from '../Element/Link'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import IssuerView from './IssuerView'

const messages = defineMessages(
  {
    // Добавить нового эмитента
    addNew: 'Добавить',
  },
)

export default function IssuersList (props) {
  return <TilesStyled>
    {props.issuers.map((issuer, key) => <TileStyled key={key}><IssuerView issuer={issuer}/></TileStyled>)}
    <TileStyled><Link to="/issuers/add"><FormattedMessage {...messages.addNew}/></Link></TileStyled>
  </TilesStyled>
}

IssuersList.propTypes = {
  issuers: PropTypes.arrayOf(PropTypes.object).isRequired,
}
