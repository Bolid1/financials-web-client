import { observable } from 'mobx'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import media from '../config/media'
import pages from '../config/pages'
import Navigation from '../Element/Navigation'
import ToggleNavButton from '../Element/ToggleNavButton'
import LanguageSelector from './LanguageSelector'

const LeftSideStyled = styled.aside`
  height: 100%;
  background-color: #0e0e23;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0;
  box-sizing: border-box;
  padding: ${({theme: {layout: {paddingVertical, leftSide: {paddingHorizontal}}}}) => `${paddingVertical} ${paddingHorizontal}`};
  
  .toggle-nav-button {
    display: none;
  }

  ${
  media.phone`
    ${({minimized}) => minimized && css`
  .nav-menu, .select-language {
    display: none;
  }
`}

  .nav-menu {
    margin-top: 10px;
  }
  
  .toggle-nav-button {
    display: block;
  }
`
  }
`

export default @observer
class LeftSide extends Component {
  @observable minimized = true

  render () {
    return <LeftSideStyled minimized={this.minimized}>
      <ToggleNavButton className="toggle-nav-button" onClick={() => this.minimized = !this.minimized}/>
      <Navigation className="nav-menu" pages={pages}/>
      <LanguageSelector className="select-language"/>
    </LeftSideStyled>
  }
}
