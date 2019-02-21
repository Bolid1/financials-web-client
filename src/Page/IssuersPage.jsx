import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuersList from '../Component/IssuersList'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import RootStore from '../Store/RootStore'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы эмитентов
    description: 'В этом разделе находится информация об эмитентах.',
  },
)

export default @inject('store') @observer
class IssuersPage extends Component {
  static propTypes = {
    title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
    store: PropTypes.instanceOf(RootStore).isRequired,
  }

  @observable loaded

  componentDidMount () {
    this.props.store
        .clear()
        .then(() => this.props.store.findBy('issuers'))
        .then(() => this.loaded = true)
  }

  render () {
    return <PageContainer>
      <PageHeader>{this.props.title}</PageHeader>
      <article>
        <FormattedMessage {...messages.description}/>
      </article>
      {!this.loaded && <LoaderFlex/>}
      {this.loaded && <IssuersList issuers={this.props.store.issuersStore.entities}/>}
    </PageContainer>
  }
}

