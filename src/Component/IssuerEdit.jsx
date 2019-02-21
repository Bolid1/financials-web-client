import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import Issuer from '../Entity/Issuer'

export default @observer class IssuerEdit extends React.Component  {
  static propTypes = {
    issuer: PropTypes.instanceOf(Issuer),
    onSave: PropTypes.func.isRequired,
  }

  /**
   * Эмитент, за которого отвечает данный класс
   * @returns {Issuer}
   */
  get issuer () {
    return this.props.issuer
  }

  onSave () {
    this.issuer.id = Math.round(Math.random() * 1000)
    this.props.onSave()
  }

  onChange (prop, {target:{value}}) {
    this.issuer[prop] = value;
  }

  render () {
    return <form onSubmit={this.onSave.bind(this)}>
      <input type="text" value={this.issuer.name} onChange={this.onChange.bind(this, 'name')}/>
      <button type="submit">Сохранить</button>
    </form>
  }
}
