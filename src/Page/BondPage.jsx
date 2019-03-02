import { Formik } from 'formik'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { getIdentifier } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'
import BondEdit from '../Component/BondEdit'
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
class BondPage extends Component {
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
   * @return {Bond}
   */
  get bond () {
    const id = this.props.match.params.id

    return this.domain.find('bonds', id)
  }

  componentWillUnmount () {
    const bond = this.bond

    if (bond && !bond.saved) {
      this.domain.remove(bond)
    }
  }

  prepareForSave (data) {
    const changeISIN = entity => Object.assign({}, entity, {bond: data.ISIN})

    return Object.assign(data, {
      coupons: data.coupons.map(changeISIN),
      amortizations: data.amortizations.map(changeISIN),
    })
  }

  /**
   * @param {string} id
   * @param {object} data
   */
  saveBond (id, data) {
    this.saveInProgress = true
    this.domain
      .save('bonds', this.prepareForSave(data), id)
      .then(id => {
        this.redirectTo = `/bonds/${id}`
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

    let bond = this.bond

    if (!bond) {
      bond = domain.makeBond()

      return <Redirect to={`/bonds/${getIdentifier(bond)}`}/>
    }

    const initialValues = bond.toForm()

    return <PageContainer>
      <PageHeader>{this.props.title}</PageHeader>
      <article><FormattedMessage {...messages.description}/></article>
      <Formik initialValues={initialValues} onSubmit={this.saveBond.bind(this, getIdentifier(bond))}>
        <BondEdit/>
      </Formik>
    </PageContainer>
  }
}

export default BondPage
