import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import styled from 'styled-components'
import pages from './config/pages'
import Loader from './Element/Loader'

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

const paddingFromTop = '10px'

const Navigation = styled.nav`
  padding: ${paddingFromTop};
  box-sizing: border-box;
`

const NavItem = styled.li`
  list-style: none;
  
  a {
    text-decoration: none;
    color: deepskyblue;
  }
`

const Content = styled.div`
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  
  padding: ${paddingFromTop} 20px;
  box-sizing: border-box;
`

export default hot(module)(
  function App () {
    return (
      <BrowserRouter>
        <Application>
          <LeftSide>
            <Navigation>
              {
                Object.values(pages)
                      .map(
                        ({path, title}, key) => <NavItem key={key}>
                          <Link to={path}>{title}</Link>
                        </NavItem>,
                      )
              }
            </Navigation>
          </LeftSide>
          <Content>
            {
              Object.values(pages)
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
      </BrowserRouter>
    )
  },
)
