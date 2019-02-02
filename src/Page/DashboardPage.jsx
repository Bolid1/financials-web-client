import PropTypes from 'prop-types'
import React from 'react'
import PageHeader from '../Styled/PageHeaderStyled'

export default function DashboardPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <p>Всего в наличии: </p>
  </>
}

DashboardPage.propTypes = {
  title: PropTypes.string.isRequired,
}
