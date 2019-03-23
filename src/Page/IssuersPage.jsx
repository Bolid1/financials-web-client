import { reaction } from 'mobx'
import { disposeOnUnmount, inject, observer } from 'mobx-react'
import * as PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import IssuersList from '../Component/IssuersList'
import LoaderFlex from '../Element/LoaderFlex'
import createScrollStore from '../Store/ScrollStore'
import ErrorInfo, { ErrorInfoButton } from '../Styled/ErrorInfo'
import PageContainer from '../Styled/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы эмитентов
    description: 'В этом разделе находится информация об эмитентах.',
  },
)

const ErrorButtonContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`

// noinspection JSUnusedGlobalSymbols
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
      if (isBottom) {
        this.list.fetchNext()
      }
    },
  )

  /**
   * @return {IIssuerDomain}
   */
  get list () {
    return this.props.store.issuer
  }

  handleScroll = event => {
    this.scrollStore.onScroll(event.target)
  }

  restartFetch () {
    this.list.clear()
    this.list.fetch()
  }

  componentDidMount () {
    this.list.fetch()
  }

  render () {
    return <PageContainer onScroll={this.handleScroll}>
      <PageHeader>{this.props.title}</PageHeader>
      <article>
        <FormattedMessage {...messages.description}/>
      </article>
      {this.list.error && <ErrorInfo>
        {this.list.error.message}
        <ErrorButtonContainer>
          <ErrorInfoButton
            onClick={event => {
              event.preventDefault()
              this.restartFetch()
            }}
          >Reload</ErrorInfoButton>
        </ErrorButtonContainer>
      </ErrorInfo>}
      {!this.list.error && <IssuersList
        issuers={this.list.map(issuer => issuer)}
      />}
      {this.list.loading && <LoaderFlex/>}
    </PageContainer>
  }
}
