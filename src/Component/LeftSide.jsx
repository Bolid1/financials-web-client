import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import media from '../config/media'
import pages from '../config/pages'
import Navigation from '../Element/Navigation'
import ToggleNavButton from '../Element/ToggleNavButton'

const LeftSideStyled = styled.aside`
  height: 100%;
  min-width: 120px;
  background-color: #0e0e23;
  
  .toggle-nav-button {
    display: none;
  }

  ${
  media.phone`
    ${
    ({minimized}) => minimized && css`
  min-width: ${({theme: {layout: {paddingFromTop, leftSide: {paddingHorizontal, iconToggle: {size}}}}}) => `${size}`};
  .nav-menu {
    display: none;
  }
`
    }
  
  .toggle-nav-button {
    display: block;
  }
`
  }
`

export default class LeftSide extends Component {
  state = {
    minimized: true,
  }

  render () {
    return <LeftSideStyled minimized={this.state.minimized}>
      <ToggleNavButton className="toggle-nav-button" onClick={() => this.setState({minimized: !this.state.minimized})}/>
      <Navigation className="nav-menu" pages={pages}/>
    </LeftSideStyled>
  }
}
