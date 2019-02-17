import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuersList from '../Component/IssuersList'
import IssuersStore from '../Store/IssuersStore'
import PageHeader from '../Styled/PageHeaderStyled'

const issuersStore = new IssuersStore()

const messages = defineMessages(
  {
    // Описание страницы эмитентов
    description: 'В этом разделе находится информация об эмитентах.',
  },
)

export default function IssuersPage ({title}) {
  return <Provider issuersStore={issuersStore}>
    <div>
      <PageHeader>{title}</PageHeader>
      <article>
        <FormattedMessage {...messages.description}/>
      </article>
      <IssuersList issuersStore={issuersStore}/>
    </div>
  </Provider>
}

IssuersPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}
