import { Formik } from 'formik'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondEdit from '../Component/BondEdit'
import LoaderFlex from '../Element/LoaderFlex'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы добавления облигации
    description: 'Страница облигации',
  },
)

function BondPage (props) {
  const domain = props.domain

  if (!domain.loaded) {
    return <LoaderFlex/>
  }

  const id = props.match.params.id
  const bond = domain.bonds.get(id) || domain.makeBond()
  const initialValues = bond.toForm()

  return <PageContainer>
    <PageHeader>{props.title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
    <Formik initialValues={initialValues} onSubmit={console.info}>
      <BondEdit/>
    </Formik>
  </PageContainer>
}

BondPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
  match: PropTypes.shape(
    {
      params: PropTypes.shape(
        {id: PropTypes.string.isRequired},
      ).isRequired,
    },
  ).isRequired,
}

export default inject('domain')(observer(BondPage))
