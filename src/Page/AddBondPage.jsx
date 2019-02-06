import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы добавления облигации
    description: 'Вы добавляете новую облигацию.',
  },
)

export default function AddBondPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
  </>
}

AddBondPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}
