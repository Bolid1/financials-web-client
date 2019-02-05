import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание рабочего стола
    description: 'Что-то о рабочем столе',
  },
)

export default function DashboardPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
  </>
}

DashboardPage.propTypes = {
  title: PropTypes.string.isRequired,
}
