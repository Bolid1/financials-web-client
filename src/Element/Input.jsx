import styled from 'styled-components'
import InputStyle from '../Style/InputStyle'
import React from 'react'

const StyledInput = styled.input`
  ${InputStyle};
`

export default function Input (props) {
  const newProps = typeof props.value !== 'undefined' ? props : Object.assign({}, props, {value: ''})

  return <StyledInput {...newProps}/>
}
