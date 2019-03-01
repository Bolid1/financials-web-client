import React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  
`

export default function Button (props) {
  return <ButtonStyled type="button" {...props}>{props.children}</ButtonStyled>
}
