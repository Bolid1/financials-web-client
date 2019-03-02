import { Formik } from 'formik'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'
import IssuerEdit from '../Component/IssuerEdit'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы добавления облигации
    description: 'Страница облигации',
  },
)

@inject('domain')
@observer
class IssuerPage extends Component {
  static propTypes = {
    title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
    match: PropTypes.shape(
      {
        params: PropTypes.shape(
          {id: PropTypes.string.isRequired},
        ).isRequired,
      },
    ).isRequired,
  }

  @observable saveInProgress = false
  @observable redirectTo = ''

  /**
   * @return {DomainModel}
   */
  get domain () {
    return this.props.domain
  }

  /**
   * @return {Issuer}
   */
  get issuer () {
    const id = this.props.match.params.id

    return this.domain.issuers.get(id)
  }

  componentWillUnmount () {
    const issuer = this.issuer

    if (issuer && !issuer.saved) {
      this.domain.deleteIssuer(issuer)
    }
  }

  saveIssuer (data) {
    this.saveInProgress = true
    this.domain
      .saveIssuer(data)
      .then(id => {
        this.redirectTo = `/issuers/${id}`
        this.saveInProgress = false
      })
  }

  render () {
    const domain = this.domain

    if (!domain.loaded || this.saveInProgress) {
      return <LoaderFlex/>
    }

    if (this.redirectTo) {
      return <Redirect to={this.redirectTo}/>
    }

    let issuer = this.issuer

    if (!issuer) {
      issuer = domain.makeIssuer()

      return <Redirect to={`/issuers/${issuer.id}`}/>
    }

    const initialValues = issuer.toForm()

    return <PageContainer>
      <PageHeader>{this.props.title}</PageHeader>
      <article><FormattedMessage {...messages.description}/></article>
      <Formik initialValues={initialValues} onSubmit={this.saveIssuer.bind(this)}>
        <IssuerEdit/>
      </Formik>
    </PageContainer>
  }
}

export default IssuerPage
