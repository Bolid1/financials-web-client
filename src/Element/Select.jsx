import React from 'react'
import styled from 'styled-components'
import InputStyle from '../Style/InputStyle'

const StyledSelect = styled.select`
  ${InputStyle};
`

export default function Select ({field, ...props}) {
  return <StyledSelect {...field} {...props} />
}
