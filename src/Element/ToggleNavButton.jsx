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
  width: ${({theme}) => theme.iconToggle.size};
  height: ${({theme}) => theme.iconToggle.size};

  box-sizing: border-box;
  padding: 0;
`

export default function ToggleNavButton (props) {
  return <Button {...props}>
    <Lines/>
  </Button>
}
