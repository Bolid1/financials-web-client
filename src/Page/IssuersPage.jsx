import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuersList from '../Component/IssuersList'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы эмитентов
    description: 'В этом разделе находится информация об эмитентах.',
  },
)

export default function IssuersPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article>
      <FormattedMessage {...messages.description}/>
    </article>
    <IssuersList/>
  </>
}

IssuersPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}
