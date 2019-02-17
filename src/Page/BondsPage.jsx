import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import BondsList from '../Component/BondsList'
import BondsStore from '../Store/BondsStore'
import CurrenciesStore from '../Store/CurrenciesStore'
import IssuersStore from '../Store/IssuersStore'
import PageHeader from '../Styled/PageHeaderStyled'

const bondsStore = new BondsStore(new IssuersStore(), new CurrenciesStore())

const messages = defineMessages(
  {
    // Описание страницы облигаций
    description: 'В этом разделе находится информация об облигациях.',
  },
)

export default function BondsPage ({title}) {
  return <Provider bondsStore={bondsStore}>
    <div>
      <PageHeader>{title}</PageHeader>
      <article><FormattedMessage {...messages.description}/></article>
      <BondsList bondsStore={bondsStore}/>
    </div>
  </Provider>
}

BondsPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}

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
