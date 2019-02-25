import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondsList from '../Component/BondsList'
import PageContainer from '../Element/PageContainer'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание страницы облигаций
    description: 'В этом разделе находится информация об облигациях.',
  },
)

function BondsPage (props) {
  return <PageContainer>
    <PageHeader>{props.title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
    <BondsList bonds={Array.from(props.domain.bonds.values())}/>
  </PageContainer>
}

BondsPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}

export default inject('domain')(observer(BondsPage))

/*
<form onSubmit={(event) => event.preventDefault()}>
  <select multiple={true}>
    <option>ОФЗ</option>
    <option>Муниципальные</option>
    <option>Корпоративные</option>
  </select>
  <select multiple={true}>
    <option>Процентные</option>
    <option>Дисконтные</option>
  </select>
  <button type="submit">Фильтровать</button>
</form>
*/
