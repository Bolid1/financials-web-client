import React from 'react'

export default function InputText (props) {
  return <input {...Object.assign({type: 'text'}, props)}/>
}
