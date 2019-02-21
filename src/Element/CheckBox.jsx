import React from 'react'
import Input from './Input'

export default function CheckBox (props) {
  return <Input {...Object.assign({type: 'checkbox'}, props)}/>
}
