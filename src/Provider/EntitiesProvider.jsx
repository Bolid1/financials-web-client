import { Provider } from 'mobx-react'
import React from 'react'
import RootStore from '../Store/RootStore'

export default function EntitiesProvider ({children}) {
  return <Provider store={new RootStore()}>{children}</Provider>
}
