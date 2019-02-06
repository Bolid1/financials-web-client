import React from 'react'

export default function InputDate (props) {
  return <input {...Object.assign({type: 'date'}, props)}/>
}
