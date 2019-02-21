import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondsList from '../Component/BondsList'
import Loader from '../Element/Loader'
import RootStore from '../Store/RootStore'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы облигаций
    description: 'В этом разделе находится информация об облигациях.',
  },
)

export default @inject('store') @observer
class BondsPage extends Component {
  static propTypes = {
    title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
    store: PropTypes.instanceOf(RootStore).isRequired,
  }

  componentDidMount () {
    this.props.store.findBy('bonds')
  }

  render () {
    const progress = this.props.store.loadInProgress

    return <>
      <PageHeader>{this.props.title}</PageHeader>
      <article><FormattedMessage {...messages.description}/></article>
      {progress && <Loader/>}
      {!progress && <BondsList bonds={this.props.store.bondsStore.entities}/>}
    </>
  }
}

/*
<form onSubmit={(event) => event.preventDefault()}>
  <select multiple={true}>
    <option>ОФЗ</option>
    <option>Муниципальные</option>
    <option>Корпоративные</option>
  </select>
  <select multiple={true}>
    <option>Процентные</option>
    <option>Дисконтные</option>
  </select>
  <button type="submit">Фильтровать</button>
</form>
*/
