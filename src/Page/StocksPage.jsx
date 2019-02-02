import PropTypes from 'prop-types'
import React from 'react'
import PageHeader from '../Styled/PageHeaderStyled'

export default function StocksPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article>
      В этом разделе находится информация об акциях
    </article>
  </>
}

StocksPage.propTypes = {
  title: PropTypes.string.isRequired,
}
