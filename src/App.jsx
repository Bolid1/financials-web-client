import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import pages from './config/pages'
import Navigation from './Element/Navigation'
import Routes from './Routes'
import theme from './theme'

const Application = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`

const LeftSide = styled.aside`
  height: 100%;
  min-width: 120px;
  background-color: #0e0e23;
`

const Content = styled.div`
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  
  padding: ${({theme: {layout: {paddingFromTop}}}) => paddingFromTop} 20px 0 20px;
  box-sizing: border-box;
`

export default hot(module)(
  function App () {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Application>
            <LeftSide>
              <Navigation pages={pages}/>
            </LeftSide>
            <Content>
              <Routes pages={pages}/>
            </Content>
          </Application>
        </ThemeProvider>
      </BrowserRouter>
    )
  },
)
