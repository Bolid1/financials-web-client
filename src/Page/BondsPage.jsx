import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondsList from '../Component/BondsList'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    title: 'Облигации',
    description: 'В этом разделе находится информация об облигациях.',
  },
)

export default function BondsPage () {
  return <>
    <PageHeader>
      <FormattedMessage {...messages.title}/>
    </PageHeader>
    <article>
      <FormattedMessage {...messages.description}/>
    </article>
    <BondsList/>
  </>
}
