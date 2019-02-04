import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { BrowserRouter, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import pages from './config/pages'
import Loader from './Element/Loader'
import Navigation from './Element/Navigation'
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
              {
                pages
                  .map(
                    ({path, title, component}, key) =>
                      <Route key={key} path={path} exact component={
                        Loadable(
                          {
                            loader: () => import(`./Page/${component}`),
                            loading: Loader,
                            /**
                             * @param {{default: React.Component}} loaded
                             * @param {history, location, match} props
                             * @returns {*}
                             */
                            render (loaded, props) {
                              const Component = loaded.default

                              return <Component {...{title}} {...props}/>
                            },
                          },
                        )
                      }/>,
                  )
              }
            </Content>
          </Application>
        </ThemeProvider>
      </BrowserRouter>
    )
  },
)
