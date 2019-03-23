import { createDefault } from 'bolid1-financials-domain-model-ts'
import { Provider } from 'mobx-react'
import React from 'react'
import { ENTRYPOINT } from '../config/entrypoint'

const store = createDefault({linkToApi: ENTRYPOINT})

function EntitiesProvider ({children}) {
  return <Provider store={store}>
    {children}
  </Provider>
}

export default EntitiesProvider
