import React from 'react'

export default function InputNumber (props) {
  return <input {...Object.assign({type: 'number'}, props)}/>
}
