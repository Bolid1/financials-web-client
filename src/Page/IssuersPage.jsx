import { reaction } from 'mobx'
import { disposeOnUnmount, inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuersList from '../Component/IssuersList'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'
import createScrollStore from '../utils/createScrollStore'

const messages = defineMessages(
  {
    // Описание страницы эмитентов
    description: 'В этом разделе находится информация об эмитентах',
  },
)

export default @inject('store') @observer
class IssuersPage extends React.Component {
  static propTypes = {
    title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
  }

  scrollStore = createScrollStore()

  @disposeOnUnmount
  fetchOnBottom = reaction(
    () => this.scrollStore.isBottom,
    (isBottom) => {
      console.info({isBottom})
      if (isBottom) {
        this.list.fetchNext()
      }
    },
  )

  /**
   * @return {IIssuerList}
   */
  get list () {
    return this.props.store.issuer.list
  }

  handleScroll = event => {
    this.scrollStore.onScroll(event.target)
  }

  componentDidMount () {
    this.list.fetch()
  }

  render () {
    if (!this.list.items) {
      return <LoaderFlex/>
    }

    return <PageContainer onScroll={this.handleScroll}>
      <PageHeader>{this.props.title}</PageHeader>
      <article>
        <FormattedMessage {...messages.description}/>
      </article>
      <IssuersList
        issuers={this.list.map(issuer => issuer)}
      />
    </PageContainer>
  }
}
