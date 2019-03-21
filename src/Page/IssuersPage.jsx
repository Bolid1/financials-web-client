import { observable, reaction } from 'mobx'
import { disposeOnUnmount, inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import IssuersList from '../Component/IssuersList'
import ErrorInfo, { ErrorInfoButton } from '../Element/ErrorInfo'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'
import createScrollStore from '../utils/createScrollStore'

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

export default @inject('store') @observer
class IssuersPage extends React.Component {
  static propTypes = {
    title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
  }

  scrollStore = createScrollStore()
  /**
   * @member {IErrorModel|undefined}
   */
  @observable error

  @disposeOnUnmount
  fetchOnBottom = reaction(
    () => this.scrollStore.isBottom,
    (isBottom) => {
      if (isBottom) {
        this.list.fetchNext()
      }
    },
  )

  @disposeOnUnmount
  showError = reaction(
    () => this.list.error,
    /**
     * @param {IErrorModel} error?
     */
    (error) => {
      if (error) {
        this.error = error
      } else {
        this.error = undefined
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
    this.restartFetch()
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
      {this.error && <ErrorInfo>
        {this.error.message}
        <ErrorButtonContainer>
          <ErrorInfoButton
            onClick={event => {
              event.preventDefault()
              this.restartFetch()
            }}
          >Reload</ErrorInfoButton>
        </ErrorButtonContainer>
      </ErrorInfo>}
      {!this.error && <IssuersList
        issuers={this.list.map(issuer => issuer)}
      />}
      {this.list.loading && <LoaderFlex/>}
    </PageContainer>
  }
}
