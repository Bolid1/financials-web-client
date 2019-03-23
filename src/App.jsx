import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import LeftSide from './Component/LeftSide'
import pages from './config/pages'
import theme from './config/theme'
import EntitiesProvider from './Provider/EntitiesProvider'
import LanguageProvider from './Provider/LanguageProvider'
import Routes from './Routes'

const Application = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
  color: ${(({theme}) => theme.color)};
`

const Content = styled.div`
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  
  padding: ${({theme}) => `${theme.paddingVertical} ${theme.paddingHorizontal}`};
  box-sizing: border-box;
  background: ${({theme}) => theme.background};
  display: flex;
  flex-direction: row;
`

export default hot(module)(
  function App () {
    return (
      <LanguageProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <EntitiesProvider>
              <Application>
                <ThemeProvider theme={theme.leftSide}>
                  <LeftSide/>
                </ThemeProvider>
                <ThemeProvider theme={theme.rightSide}>
                  <Content>
                    <Routes pages={pages}/>
                  </Content>
                </ThemeProvider>
              </Application>
            </EntitiesProvider>
          </ThemeProvider>
        </BrowserRouter>
      </LanguageProvider>
    )
  },
)
