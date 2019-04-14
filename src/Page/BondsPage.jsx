import { observable, reaction } from 'mobx'
import { disposeOnUnmount, inject, observer } from 'mobx-react'
import * as PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import BondsList from '../Component/BondsList'
import LoaderFlex from '../Element/LoaderFlex'
import createScrollStore from '../Store/ScrollStore'
import ErrorInfo, { ErrorInfoButton } from '../Styled/ErrorInfo'
import PageContainer from '../Styled/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы облигаций
    description: 'В этом разделе находится информация об облигациях.',
  },
)

const ErrorButtonContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`

// noinspection JSUnusedGlobalSymbols
export default @inject('store') @observer
class BondsPage extends React.Component {
  static propTypes = {
    title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
  }

  containerRef = React.createRef()

  @observable loading = false

  scrollStore = createScrollStore()

  /**
   * @return {ICurrencyDomain}
   */
  get currencies () {
    return this.props.store.currency
  }

  /**
   * @return {IBondDomain}
   */
  get list () {
    return this.props.store.bond
  }

  handleScroll = () => {
    this.scrollStore.onScroll(this.containerRef?.current)
  }

  fetchNext = () => {
    this.loading = true

    this.list.fetchNext({itemsPerPage: 100})
      .then(this.handleScroll)
      .then(() => this.loading = false)
  }

  @disposeOnUnmount
  fetchOnBottom = reaction(
    () => !this.loading
      && this.scrollStore.isBottom
      && !this.list.loading
      && (!this.list.items.size || this.list.items.size < this.list.totalItems),
    (shouldLoad) => {
      if (shouldLoad) {
        this.fetchNext()
      }
    },
  )

  restartFetch () {
    this.list.clear()
    this.fetchNext()
  }

  componentDidMount () {
    this.currencies.fetch()
      .then(this.fetchNext)
  }

  render () {
    return <PageContainer onScroll={this.handleScroll} ref={this.containerRef}>
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
      {!this.list.error && <BondsList
        bonds={this.list.map(bond => bond)}
      />}
      {this.list.loading && <LoaderFlex/>}
    </PageContainer>
  }
}
