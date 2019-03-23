import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'

const messages = defineMessages(
  {
    // Заголовок рабочего стола
    titleDashboard: 'Dashboard',
    // Заголовок страницы счетов
    titleAccounts: 'Счета',
    // Заголовок страницы акций
    titleStocks: 'Акции',
    // Заголовок страницы облигаций
    titleBonds: 'Облигации',
    // Заголовок страницы добавления/редактирования облигации
    titleBond: 'Облигация',
    // Заголовок страницы эмитентов
    titleIssuers: 'Эмитенты',
    // Заголовок страницы добавления/редактирования эмитента
    titleIssuer: 'Эмитент',
  },
)

export default [
  {
    path: '/',
    title: <FormattedMessage {...messages.titleDashboard}/>,
    component: 'DashboardPage',
    showInLeftMenu: true,
  },
  {
    path: '/bonds',
    title: <FormattedMessage {...messages.titleBonds}/>,
    component: 'BondsPage',
    showInLeftMenu: true,
  },
  {
    path: '/issuers',
    title: <FormattedMessage {...messages.titleIssuers}/>,
    component: 'IssuersPage',
    showInLeftMenu: true,
  },
]
