import React from 'react'
import AppContainer from './src/routes'
import {StoreProvider} from './src/store'

const App = () => (
  <StoreProvider>
    <AppContainer />
  </StoreProvider>
)

export default App
