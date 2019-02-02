import PropTypes from 'prop-types'
import React from 'react'
import PageHeader from '../Styled/PageHeaderStyled'

export default function BondsPage ({title}) {
  return <>
    <PageHeader>{title}</PageHeader>
    <article>
      В этом разделе находится информация об облигациях.
    </article>
    <ol>
      <li>
        РЖД
      </li>
    </ol>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Тикер</th>
        <th>Компания</th>
        <th>НДФЛ</th>
        <th>Количество</th>
        <th>Номинал</th>
        <th>Стоимость (% от номинала)</th>
        <th>Периодичность выплат</th>
        <th>Следующая дата выплаты</th>
        <th>Размер купона</th>
        <th>Итого по купонам</th>
        <th>Доходность в год, %</th>
        <th>Дата оферты</th>
        <th>Дата погашения</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>#</th>
        <th> </th>
        <th> </th>
        <th> </th>
        <th> </th>
        <th>Сумма номинала</th>
        <th>Сумма стоимости</th>
        <th>Средняя периодичность</th>
        <th>Следующая дата выплаты</th>
        <th> </th>
        <th>Ежегодно получаешь</th>
        <th>Среднегодовая доходность</th>
        <th>Следующая оферта</th>
        <th>Следующая дата погашения</th>
      </tr>
      <tr>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
        <td> </td>
      </tr>
      </tfoot>
      <tbody>
      </tbody>
    </table>
  </>
}

BondsPage.propTypes = {
  title: PropTypes.string.isRequired,
}
