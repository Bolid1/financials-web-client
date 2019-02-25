import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuersList from '../Component/IssuersList'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы эмитентов
    description: 'В этом разделе находится информация об эмитентах.',
  },
)

function IssuersPage (props) {
  return <PageContainer>
    <PageHeader>{props.title}</PageHeader>
    <article>
      <FormattedMessage {...messages.description}/>
    </article>
    <IssuersList issuers={Array.from(props.domain.issuers.values())}/>
  </PageContainer>
}

IssuersPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}

export default inject('domain')(observer(IssuersPage))

