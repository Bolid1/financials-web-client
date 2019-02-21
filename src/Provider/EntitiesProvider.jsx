import { Provider } from 'mobx-react'
import React from 'react'
import RootStore from '../Store/RootStore'

const rootStore = new RootStore()

export default function EntitiesProvider ({children}) {
  return <Provider store={rootStore}>{children}</Provider>
}
