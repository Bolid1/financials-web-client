import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы счетов
    description: `В этом разделе находится информация о счетах.
      Кредитные карты и наличные.`,
  },
)

export default function AccountsPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
  </>
}

AccountsPage.propTypes = {
  title: PropTypes.string.isRequired,
}
