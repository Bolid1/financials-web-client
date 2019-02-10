import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import LeftSide from './Component/LeftSide'
import pages from './config/pages'
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
  
  padding: ${({theme: {layout: {paddingFromTop}}}) => paddingFromTop} 20px 0 20px;
  box-sizing: border-box;
`

export default hot(module)(
  function App () {
    return (
      <LanguageProvider>
        <BrowserRouter>
          <StyleProvider>
            <Application>
              <LeftSide/>
              <Content>
                <Routes pages={pages}/>
              </Content>
            </Application>
          </StyleProvider>
        </BrowserRouter>
      </LanguageProvider>
    )
  },
)
