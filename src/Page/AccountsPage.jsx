import PropTypes from 'prop-types'
import React from 'react'
import PageHeader from '../Styled/PageHeaderStyled'

export default function AccountsPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article>
      В этом разделе находится информация о счетах.
      Кредитные карты и наличные
    </article>
  </>
}

AccountsPage.propTypes = {
  title: PropTypes.string.isRequired,
}
