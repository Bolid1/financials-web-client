import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondsList from '../Component/BondsList'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
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

  @observable loaded

  componentDidMount () {
    this.props.store
        .clear()
        .then(() => this.props.store.findBy('bonds'))
        .then(() => this.loaded = true)
  }

  render () {
    return <PageContainer>
      <PageHeader>{this.props.title}</PageHeader>
      <article><FormattedMessage {...messages.description}/></article>
      {!this.loaded && <LoaderFlex/>}
      {this.loaded && <BondsList bonds={this.props.store.bondsStore.entities}/>}
    </PageContainer>
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
