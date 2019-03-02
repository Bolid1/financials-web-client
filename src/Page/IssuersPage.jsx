import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuersList from '../Component/IssuersList'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import ObservableMapHelper from '../Helper/ObservableMapHelper'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы эмитентов
    description: 'В этом разделе находится информация об эмитентах.',
  },
)

function IssuersPage (props) {
  const domain = props.domain

  if (!domain.loaded) {
    return <LoaderFlex/>
  }

  return <PageContainer>
    <PageHeader>{props.title}</PageHeader>
    <article>
      <FormattedMessage {...messages.description}/>
    </article>
    <IssuersList issuers={ObservableMapHelper.toArray(domain.issuers)}/>
  </PageContainer>
}

IssuersPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}

export default inject('domain')(observer(IssuersPage))

