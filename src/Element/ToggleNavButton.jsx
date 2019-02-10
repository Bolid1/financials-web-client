import React from 'react'
import styled from 'styled-components'
import ThreeHorizontalLines from '../Icon/ThreeHorizontalLines'

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
  padding: ${({theme: {layout: {paddingFromTop, leftSide: {paddingHorizontal}}}}) => `${paddingFromTop} ${paddingHorizontal} 0 ${paddingHorizontal}`};
`

export default function ToggleNavButton (props) {
  return <Button {...props}>
    <ThreeHorizontalLines/>
  </Button>
}
