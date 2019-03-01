import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Element/Button'
import Input from '../Element/Input'
import InputsRow from '../Element/InputsRow'

export default function CouponsList (props) {
  return <>
    {props.form.values.coupons.map((coupon, index) => <InputsRow key={index}>
      <Input type="date" name={`coupons[${index}].date`}/>
      <Input type="number" name={`coupons[${index}].value`}/>
      <Button onClick={() => props.remove(index)}>Remove</Button>
    </InputsRow>)}
    <Button onClick={() => props.push({date: '', value: 0})}>Add</Button>
  </>
}

CouponsList.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
  swap: PropTypes.func,
  move: PropTypes.func,
  insert: PropTypes.func,
  replace: PropTypes.func,
  unshift: PropTypes.func,
  remove: PropTypes.func,
  handlePush: PropTypes.func,
  handlePop: PropTypes.func,
  handleSwap: PropTypes.func,
  handleMove: PropTypes.func,
  handleInsert: PropTypes.func,
  handleReplace: PropTypes.func,
  handleUnshift: PropTypes.func,
  handleRemove: PropTypes.func,
  form: PropTypes.shape(
    {
      values: PropTypes.object,
      errors: PropTypes.object,
      touched: PropTypes.object,
      isSubmitting: PropTypes.bool,
      isValidating: PropTypes.bool,
      submitCount: PropTypes.number,
      status: PropTypes.any,
      resetForm: PropTypes.func,
      submitForm: PropTypes.func,
      validateForm: PropTypes.func,
      validateField: PropTypes.func,
      setError: PropTypes.func,
      setErrors: PropTypes.func,
      setFieldError: PropTypes.func,
      setFieldTouched: PropTypes.func,
      setFieldValue: PropTypes.func,
      setStatus: PropTypes.func,
      setSubmitting: PropTypes.func,
      setTouched: PropTypes.func,
      setValues: PropTypes.func,
      setFormikState: PropTypes.func,
      dirty: PropTypes.bool,
      isValid: PropTypes.bool,
      initialValues: PropTypes.object,
      registerField: PropTypes.func,
      unregisterField: PropTypes.func,
      handleBlur: PropTypes.func,
      handleChange: PropTypes.func,
      handleReset: PropTypes.func,
      handleSubmit: PropTypes.func,
      validateOnChange: PropTypes.bool,
      validateOnBlur: PropTypes.bool,
    }
  ),
  name: PropTypes.string,
}
