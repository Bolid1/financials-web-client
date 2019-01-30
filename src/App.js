import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import styled from 'styled-components'

const Application = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`

const LeftSide = styled.aside`
  height: 100%;
  min-width: 300px;
  background-color: cornsilk;
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
    color: darkblue;
  }
`

const Content = styled.div`
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  
  padding: ${paddingFromTop} 20px;
  box-sizing: border-box;
`

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Application>
          <LeftSide>
            <Navigation>
              <NavItem>
                <Link to="/">Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link to="/accounts">Счета</Link>
              </NavItem>
              <NavItem>
                <Link to="/stocks">Акции</Link>
              </NavItem>
              <NavItem>
                <Link to="/bonds">Облигации</Link>
              </NavItem>
            </Navigation>
          </LeftSide>
          <Content>
            <Route path="/" exact component={
              Loadable(
                {
                  loader: () => import('./Page/Dashboard'),
                  loading: () => <span>...</span>,
                },
              )
            }/>
            <Route path="/accounts" exact component={
              Loadable(
                {
                  loader: () => import('./Page/Accounts'),
                  loading: () => <span>...</span>,
                },
              )
            }/>
            <Route path="/stocks" exact component={
              Loadable(
                {
                  loader: () => import('./Page/Stocks'),
                  loading: () => <span>...</span>,
                },
              )
            }/>
            <Route path="/bonds" exact component={
              Loadable(
                {
                  loader: () => import('./Page/Bonds'),
                  loading: () => <span>...</span>,
                },
              )
            }/>
          </Content>
        </Application>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
