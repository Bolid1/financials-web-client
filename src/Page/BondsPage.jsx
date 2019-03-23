import { reaction } from 'mobx'
import { disposeOnUnmount, inject, observer } from 'mobx-react'
import * as PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import BondsList from '../Component/BondsList'
import ErrorInfo, { ErrorInfoButton } from '../Element/ErrorInfo'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'
import createScrollStore from '../utils/createScrollStore'

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
   * @return {IBondDomain}
   */
  get list () {
    return this.props.store.bond
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
      <article><FormattedMessage {...messages.description}/></article>
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
