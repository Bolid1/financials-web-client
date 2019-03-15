import { createDefault } from 'bolid1-financials-domain-model-ts'
import { Provider } from 'mobx-react'
import React from 'react'
import { ENTRYPOINT } from '../config/entrypoint'
import API from '../Infrastructure/API'
import DomainModel from '../Store/DomainModel'

const domainModel = DomainModel.create(
  {
    fakeId: 1000,
    newId: 0,
    loaded: false,
  },
  {
    api: API,
  },
)

const store = createDefault({linkToApi: ENTRYPOINT})

function EntitiesProvider ({children}) {
  return <Provider store={store} domain={domainModel}>
    {children}
  </Provider>
}

export default EntitiesProvider
