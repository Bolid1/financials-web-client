import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import Link from '../Element/Link'
import BondsStore from '../Store/BondsStore'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import BondView from './BondView'

const messages = defineMessages(
  {
    // Добавить новую облигацию
    addNew: 'Добавить',
  },
)

export default @observer
class BondsList extends React.Component {
  static propTypes = {
    bondsStore: PropTypes.instanceOf(BondsStore).isRequired,
  }

  /**
   * @returns {BondsStore}
   */
  get bondsStore () {
    return this.props.bondsStore
  }

  componentDidMount () {
    this.bondsStore.loadBonds()
  }

  render () {
    return <TilesStyled>
      {this.bondsStore.entities.map((bond, key) => <TileStyled key={key}><BondView bond={bond}/></TileStyled>)}
      <TileStyled><Link to="/bonds/add"><FormattedMessage {...messages.addNew}/></Link></TileStyled>
    </TilesStyled>
  }
}
