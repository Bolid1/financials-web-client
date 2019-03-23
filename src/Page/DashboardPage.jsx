import * as PropTypes from 'prop-types'
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import PageHeader from '../Styled/PageHeaderStyled'

const messages = defineMessages(
  {
    // Описание рабочего стола
    description: 'Что-то о рабочем столе',
  },
)

// noinspection JSUnusedGlobalSymbols
export default function DashboardPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article><FormattedMessage {...messages.description}/></article>
  </>
}

DashboardPage.propTypes = {
  title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
}

/*
<article>
  Займёмся составлением твоего портфеля.
  Для этого нам необходимо выбрать:
  <ul>
    <li>
      Безирсковую (ну почти) часть, состоящую из:
      <ul>
        <li>Вклада в банк</li>
        <li>ОФЗ (облигаций федерального займа)</li>
        <li>Муниципальных облигаций</li>
        <li>Корпоративных облигаций</li>
      </ul>
    </li>

    <li>
      Рисковую часть, состояющую из:
      <ul>
        <li>ETF</li>
        <li>ПИФов</li>
        <li>Акций</li>
        <li>Фьючерсов</li>
        <li>Криптовалют</li>
        <li>Мусорных облигаций</li>
        <li>Любых других инструментов</li>
      </ul>
    </li>
  </ul>

  В итоге получается такая картина:
  <ul>
    <li>Рисковая часть приносит основную доходность</li>
    <li>Безрисковая часть своей небольшой доходностью страхует возможные убытки от рисковой части</li>
  </ul>
  Это и есть слаженная работа команды активов.
</article>
 */
