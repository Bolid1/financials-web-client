import React from 'react'
import styled from 'styled-components'
import Lines from '../Icon/Lines'

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline:none;
  background: none;
  color: #ffffff;
  margin: 0;
  width: ${({theme: {layout: {leftSide: {iconToggle: {size}}}}}) => size};
  height: ${({theme: {layout: {leftSide: {iconToggle: {size}}}}}) => size};

  box-sizing: border-box;
  padding: 0;
`

export default function ToggleNavButton (props) {
  return <Button {...props}>
    <Lines/>
  </Button>
}
