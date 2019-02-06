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
    // Заголовок страницы добавления облигации
    titleAddBond: 'Добавление облигации',
    // Заголовок страницы эмитентов
    titleIssuers: 'Эмитенты',
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
    path: '/accounts',
    title: <FormattedMessage {...messages.titleAccounts}/>,
    component: 'AccountsPage',
    showInLeftMenu: true,
  },
  {
    path: '/stocks',
    title: <FormattedMessage {...messages.titleStocks}/>,
    component: 'StocksPage',
    showInLeftMenu: true,
  },
  {
    path: '/bonds',
    title: <FormattedMessage {...messages.titleBonds}/>,
    component: 'BondsPage',
    showInLeftMenu: true,
  },
  {
    path: '/bonds/add',
    title: <FormattedMessage {...messages.titleAddBond}/>,
    component: 'AddBondPage',
    showInLeftMenu: false,
  },
  {
    path: '/issuers',
    title: <FormattedMessage {...messages.titleIssuers}/>,
    component: 'IssuersPage',
    showInLeftMenu: true,
  },
];
