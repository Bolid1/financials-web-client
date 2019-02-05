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
    // Заголовок страницы эмитентов
    titleIssuers: 'Эмитенты',
  },
)

export default [
  {
    path: '/',
    title: <FormattedMessage {...messages.titleDashboard}/>,
    component: 'DashboardPage',
  },
  {
    path: '/accounts',
    title: <FormattedMessage {...messages.titleAccounts}/>,
    component: 'AccountsPage',
  },
  {
    path: '/stocks',
    title: <FormattedMessage {...messages.titleStocks}/>,
    component: 'StocksPage',
  },
  {
    path: '/bonds',
    title: <FormattedMessage {...messages.titleBonds}/>,
    component: 'BondsPage',
  },
  {
    path: '/issuers',
    title: <FormattedMessage {...messages.titleIssuers}/>,
    component: 'IssuersPage',
  },
];
