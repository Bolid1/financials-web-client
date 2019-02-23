import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondEdit from '../Component/BondEdit'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import RootStore from '../Store/RootStore'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы добавления облигации
    description: 'Страница облигации',
  },
)

export default @inject('store') @observer
class BondPage extends Component {
  static propTypes = {
    title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
    store: PropTypes.instanceOf(RootStore).isRequired,
    match: PropTypes.shape(
      {
        params: PropTypes.shape(
          {id: PropTypes.string.isRequired},
        ).isRequired,
      },
    ).isRequired,
  }

  @observable loaded

  get bond () {
    return this.props.store.bondsStore.first
  }

  componentDidMount () {
    const id = this.props.match.params.id

    this.props.store
        .clear()
        .then(() => this.props.store.findBy('issuers'))
        .then(() => this.props.store.findBy('currencies'))
        .then(() => id === 'add'
                    ? this.props.store.create('bond')
                    : this.props.store.find('bond', id),
        )
        .then(() => this.loaded = true)
        .catch(console.error)
  }

  render () {
    const bond = this.bond
    const currencies = this.props.store.currenciesStore.entities
    const issuers = this.props.store.issuersStore.entities

    return <PageContainer>
      <PageHeader>{this.props.title}</PageHeader>
      <article><FormattedMessage {...messages.description}/></article>
      {!this.loaded && <LoaderFlex/>}
      {this.loaded && bond && <BondEdit {...{bond, issuers, currencies}}/>}
    </PageContainer>
  }
}
