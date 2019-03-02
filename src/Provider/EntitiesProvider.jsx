import { Provider } from 'mobx-react'
import React from 'react'
import API from '../Infrastructure/API'
import DomainModel from '../Store/DomainModel'

const domainModel = DomainModel.create(
  {
    newId: 0,
    loaded: false
  },
  {
    api: API,
  }
)

function EntitiesProvider ({children}) {
  return <Provider domain={domainModel}>
    {children}
  </Provider>
}

export default EntitiesProvider
