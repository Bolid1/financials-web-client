import { observer, Provider } from 'mobx-react'
import * as PropTypes from 'prop-types'
import React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import LanguageStore from '../Store/LanguageStore'

const languageStore = new LanguageStore()
LanguageStore.supportedLanguages.forEach(lang => addLocaleData(require('react-intl/locale-data/' + lang)))

function LanguageProvider ({children}) {
  return <Provider languageStore={languageStore}>
    <IntlProvider locale={languageStore.lang} messages={languageStore.messages}>
      {children}
    </IntlProvider>
  </Provider>
}

LanguageProvider.propTypes = {
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
}

export default observer(LanguageProvider)
