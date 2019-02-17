import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import Issuer from '../Entity/Issuer'
import IssuersStore from '../Store/IssuersStore'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import IssuerView from './IssuerView'

export default @observer
class IssuersList extends React.Component {
  static propTypes = {
    issuersStore: PropTypes.instanceOf(IssuersStore).isRequired,
  }

  /**
   * @returns {IssuersStore}
   */
  get issuersStore () {
    return this.props.issuersStore
  }

  componentDidMount () {
    this.issuersStore.loadIssuers()
  }

  /**
   * Функция, которая вызывается после сохранения эмитента
   * @param {Issuer} savedIssuer
   */
  onIssuerSave (savedIssuer) {
    this.setState(prev => {
      return {
        issuers: prev
          .issuers
          .map(({saved, issuer}) => ({saved: saved || issuer === savedIssuer, issuer}))
          .concat([{saved: false, issuer: new Issuer()}]),
      }
    })
  }

  render () {
    return <TilesStyled>
      {
        this.issuersStore.entities
            .map(
              (issuer, key) => <TileStyled key={key}>
                <IssuerView onSave={this.onIssuerSave.bind(this, issuer)} issuer={issuer}/>
              </TileStyled>,
            )
      }
    </TilesStyled>
  }
}
