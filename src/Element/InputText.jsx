import React from 'react'
import Input from './Input'

export default function InputText (props) {
  return <Input {...Object.assign({type: 'text'}, props)}/>
}
