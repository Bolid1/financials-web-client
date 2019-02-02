import PropTypes from 'prop-types'
import React from 'react'
import BondsList from '../Component/BondsList'
import PageHeader from '../Styled/PageHeaderStyled'

export default function BondsPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article>
      В этом разделе находится информация об облигациях.
    </article>
    <BondsList/>
  </>
}

BondsPage.propTypes = {
  title: PropTypes.string.isRequired,
}
