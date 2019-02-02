import PropTypes from 'prop-types'
import React from 'react'
import PageHeader from '../Styled/PageHeaderStyled'

export default function IssuersPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article>
      В этом разделе находится информация об эмитентах.
    </article>
  </>
}

IssuersPage.propTypes = {
  title: PropTypes.string.isRequired,
}
