import React from 'react'
import Input from './Input'

const override = props => {
  const result = {}

  result.onChange = function (event, ...args) {
    event.target.value = Number(event.target.value)

    if (typeof props.onChange === 'function') {
      props.onChange.call(this, event, ...args)
    }
  }

  return result
}

export default function InputNumber (props) {
  const newProps = props && typeof props === 'object' ? override(props) : {}

  return <Input {...Object.assign({type: 'number'}, props, newProps)}/>
}
