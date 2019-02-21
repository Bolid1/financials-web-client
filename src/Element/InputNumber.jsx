import React from 'react'
import Input from './Input'

export default function InputNumber (props) {
  return <Input {...Object.assign({type: 'number'}, props)}/>
}
