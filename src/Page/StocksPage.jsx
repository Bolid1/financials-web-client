import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы акций
    description: 'В этом разделе находится информация об акциях',
  },
)

export default function StocksPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
  </>
}

StocksPage.propTypes = {
  title: PropTypes.string.isRequired,
}
