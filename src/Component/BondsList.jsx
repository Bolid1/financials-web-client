import * as PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import Link from '../Element/Link'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import BondView from './BondView'

const messages = defineMessages(
  {
    // Добавить новую облигацию
    addNew: 'Добавить',
  },
)

export default function BondsList (props) {
  return <TilesStyled>
    {props.bonds.map((bond, key) => <TileStyled key={key}><BondView bond={bond}/></TileStyled>)}
    <TileStyled><Link to="/bonds/add"><FormattedMessage {...messages.addNew}/></Link></TileStyled>
  </TilesStyled>
}

BondsList.propTypes = {
  bonds: PropTypes.arrayOf(PropTypes.object).isRequired,
}
