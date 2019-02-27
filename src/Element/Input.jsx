import React from 'react'
import styled from 'styled-components'
import InputStyle from '../Style/InputStyle'

const StyledInput = styled.input`
  ${InputStyle};
`

export default function Input ({field, ...props}) {
  return <StyledInput type="text" {...field} {...props} />
}
