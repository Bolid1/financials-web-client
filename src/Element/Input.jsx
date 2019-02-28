import { Field } from 'formik'
import React from 'react'
import styled from 'styled-components'
import InputStyle from '../Style/InputStyle'

const StyledInput = styled.input`
  ${InputStyle};
`

function InputComponent ({field, ...props}) {
  return <StyledInput {...field} {...props} />
}

export default function Input (props) {
  return <Field component={InputComponent} {...props}/>
}