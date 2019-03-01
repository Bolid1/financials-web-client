import { Formik } from 'formik'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import IssuerEdit from '../Component/IssuerEdit'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы добавления облигации
    description: 'Страница облигации',
  },
)

function IssuerPage (props) {
  const id = props.match.params.id
  const issuer = props.domain.issuers.get(id)

  if (!issuer) {
    return <LoaderFlex/>
  }

  const initialValues = issuer.toForm()

  return <PageContainer>
    <PageHeader>{props.title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
    <Formik initialValues={initialValues} onSubmit={console.info}>
      <IssuerEdit/>
    </Formik>
  </PageContainer>
}

IssuerPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
  match: PropTypes.shape(
    {
      params: PropTypes.shape(
        {id: PropTypes.string.isRequired},
      ).isRequired,
    },
  ).isRequired,
}

export default inject('domain')(observer(IssuerPage))
