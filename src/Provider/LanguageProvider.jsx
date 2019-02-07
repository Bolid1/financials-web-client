import PropTypes from 'prop-types'
import React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'
import ruMessages from '../translations/ru'

addLocaleData(ruLocaleData)
addLocaleData(enLocaleData)

export default function LanguageProvider ({children}) {
  return <IntlProvider locale="ru" messages={ruMessages}>
    {children}
  </IntlProvider>
}

LanguageProvider.propTypes = {
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
}
