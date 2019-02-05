import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondsList from '../Component/BondsList'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы облигаций
    description: 'В этом разделе находится информация об облигациях.',
  },
)

export default function BondsPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
    <BondsList/>
  </>
}

BondsPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}
