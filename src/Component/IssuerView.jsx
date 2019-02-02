import PropTypes from 'prop-types'
import React from 'react'
import Issuer from '../Entity/Issuer'
import IssuerEdit from './IssuerEdit'

export default class IssuerView extends React.Component {
  static propTypes = {
    issuer: PropTypes.instanceOf(Issuer).isRequired,
    onSave: PropTypes.func,
  }

  state = {
    mode: 'view',
  }

  constructor (props) {
    super(props)

    this.state = {
      mode: this.issuer.name ? 'view' : 'edit',
    }
  }

  /**
   * Эмитент, за которого отвечает данный класс
   * @returns {Issuer}
   */
  get issuer () {
    return this.props.issuer
  }

  onSave () {
    this.setState({mode: 'view'})
    this.props.onSave()
  }

  render () {
    if (this.state.mode === 'edit') {
      return <IssuerEdit onSave={this.onSave.bind(this)} issuer={this.issuer}/>
    }

    return <span>
      {this.issuer.name}
    </span>
  }
}
