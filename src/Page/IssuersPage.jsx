import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuersList from '../Component/IssuersList'
import Loader from '../Element/Loader'
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

  componentDidMount () {
    this.props.store.findBy('issuers')
  }

  render () {
    const progress = this.props.store.loadInProgress

    return <div>
      <PageHeader>{this.props.title}</PageHeader>
      <article>
        <FormattedMessage {...messages.description}/>
      </article>
      {progress && <Loader/>}
      {!progress && <IssuersList issuers={this.props.store.issuersStore.entities}/>}
    </div>
  }
}

