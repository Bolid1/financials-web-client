import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import media from '../config/media'
import pages from '../config/pages'
import Navigation from '../Element/Navigation'
import ToggleNavButton from '../Element/ToggleNavButton'
import FlagOfRussia from '../Icon/FlagOfRussia'
import FlagOfUnitedKingdom from '../Icon/FlagOfUnitedKingdom'

const LeftSideStyled = styled.aside`
  height: 100%;
  background-color: #0e0e23;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0;
  box-sizing: border-box;
  padding: ${({theme: {layout: {paddingVertical, leftSide: {paddingHorizontal}}}}) => `${paddingVertical} ${paddingHorizontal}`};
  
  .select-language {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    svg {
      width: 40%;
      display: inline-block;
    }
  }
  
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

export default class LeftSide extends Component {
  state = {
    minimized: true,
  }

  render () {
    return <LeftSideStyled minimized={this.state.minimized}>
      <ToggleNavButton className="toggle-nav-button" onClick={() => this.setState({minimized: !this.state.minimized})}/>
      <Navigation className="nav-menu" pages={pages}/>
      <div className="select-language">
        <FlagOfRussia/>
        <FlagOfUnitedKingdom/>
      </div>
    </LeftSideStyled>
  }
}
