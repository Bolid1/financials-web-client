import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import LeftSide from './Component/LeftSide'
import pages from './config/pages'
import EntitiesProvider from './Provider/EntitiesProvider'
import LanguageProvider from './Provider/LanguageProvider'
import StyleProvider from './Provider/StyleProvider'
import Routes from './Routes'

const Application = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`

const Content = styled.div`
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  
  padding: ${({theme: {layout: {paddingVertical, rightSide: {paddingHorizontal}}}}) => `${paddingVertical} ${paddingHorizontal}`};
  box-sizing: border-box;
`

export default hot(module)(
  function App () {
    return (
      <LanguageProvider>
        <BrowserRouter>
          <StyleProvider>
            <EntitiesProvider>
              <Application>
                <LeftSide/>
                <Content>
                  <Routes pages={pages}/>
                </Content>
              </Application>
            </EntitiesProvider>
          </StyleProvider>
        </BrowserRouter>
      </LanguageProvider>
    )
  },
)
