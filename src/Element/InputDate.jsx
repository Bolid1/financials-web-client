import React from 'react'
import Input from './Input'

export default function InputDate (props) {
  return <Input {...Object.assign({type: 'date'}, props)}/>
}
