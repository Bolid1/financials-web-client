import React from 'react'
import Issuer from '../Entity/Issuer'
import issuers from '../samples/issuers'
import TilesStyled from '../Styled/TilesStyled'
import TileStyled from '../Styled/TileStyled'
import IssuerView from './IssuerView'

export default class IssuersList extends React.Component {
  /**
   * @type {{issuers: {saved: boolean, issuer: Issuer}[]}}
   */
  state = {
    issuers: [],
  }

  componentDidMount () {
    this.setState(
      {
        issuers: issuers
          .map(issuer => ({saved: true, issuer: (new Issuer()).applyData(issuer)}))
          .concat([{saved: false, issuer: new Issuer()}]),
      },
    )
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
        this.state.issuers
            .map(
              ({saved, issuer}, key) => <TileStyled key={key}>
                <IssuerView onSave={this.onIssuerSave.bind(this, issuer)} issuer={issuer}/>
              </TileStyled>,
            )
      }
    </TilesStyled>
  }
}
