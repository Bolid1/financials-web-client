import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondEdit from '../Component/BondEdit'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'
import LoaderFlex from '../Element/LoaderFlex'

const messages = defineMessages(
  {
    // Описание страницы добавления облигации
    description: 'Страница облигации',
  },
)

function BondPage (props) {
  const id = props.match.params.id
  const domain = props.domain
  const bond = props.domain.bonds.get(id)
  const currencies = Array.from(domain.currencies.values())
  const issuers = Array.from(domain.issuers.values())

  if (!bond) {
    return <LoaderFlex/>
  }

  return <PageContainer>
    <PageHeader>{props.title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
    <BondEdit {...{bond, issuers, currencies}}/>
  </PageContainer>
}

BondPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
  match: PropTypes.shape(
    {
      params: PropTypes.shape(
        {id: PropTypes.string.isRequired},
      ).isRequired,
    },
  ).isRequired,
}

export default inject('domain')(observer(BondPage))
