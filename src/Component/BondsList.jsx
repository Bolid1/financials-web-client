import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import Link from '../Element/Link'
import Bond from '../Entity/Bond'
import em from '../Infrastructure/EntityManager'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import BondView from './BondView'

const messages = defineMessages(
  {
    // Добавить новую облигацию
    addNew: 'Добавить',
  },
)

export default class BondsList extends React.Component {
  state = {
    bonds: [],
  }

  componentDidMount () {
    em.rm.byEntityClass(Bond)
      .findBy()
      .then(
        bonds => this.setState({bonds}),
        error => console.error(error),
      )
  }

  render () {
    return <TilesStyled>
      {this.state.bonds.map((bond, key) => <TileStyled key={key}><BondView bond={bond}/></TileStyled>)}
      <TileStyled><Link to="/bonds/add"><FormattedMessage {...messages.addNew}/></Link></TileStyled>
    </TilesStyled>
  }
}
