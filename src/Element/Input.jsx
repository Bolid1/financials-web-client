import { Field } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import InputStyle from '../Style/InputStyle'

const StyledInput = styled.input`
  ${InputStyle};
`

function InputComponent ({field, form, ...props}) {
  return <StyledInput
    {...field}
    {...{form}}
    {...props}
    onPaste={function (event, ...args) {
      if (/number|range/.test(props.type)) {
        const value = event.clipboardData.getData('text/plain')
        setTimeout(function () {
          form.setFieldValue(field.name, value.replace(/[^\d,.]/g, ''))
        }, 0)
      }

      if (props.onPaste) {
        props.onPaste.call(this, event, ...args)
      }
    }}
  />
}

InputComponent.propTypes = {
  field: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      onPaste: PropTypes.func,
    }
  ).isRequired,
  type: PropTypes.string.isRequired,
  form: PropTypes.shape(
    {
      setFieldValue: PropTypes.func.isRequired,
    }
  ).isRequired,
}

export default function Input (props) {
  return <Field component={InputComponent} {...props}/>
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
}

Input.defaultProps = {
  type: 'text',
}
