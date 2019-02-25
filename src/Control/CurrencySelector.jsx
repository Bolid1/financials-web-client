import { inject, observer } from 'mobx-react'
import React from 'react'
import Select from '../Element/Select'
import ObservableMapHelper from '../Helper/ObservableMapHelper'
import { getIdentifier } from 'mobx-state-tree'

/**
 * @param {Currency} currency
 * @return {*}
 * @constructor
 */
const CurrencyOption = currency => {
  const id = getIdentifier(currency)

  return <option key={id} value={id}>
    {currency.sign}
  </option>
}

/**
 * @param {DomainModel} domain
 * @param {Currency} selected
 * @param {function} onChange
 * @returns {*}
 * @constructor
 */
function CurrencySelector ({domain, selected, onChange}) {
  return <Select value={getIdentifier(selected)}
                 onChange={event => onChange(domain.currencies.get(event.target.value))}>
    {ObservableMapHelper.map(domain.currencies, CurrencyOption)}
  </Select>
}

export default inject('domain')(observer(CurrencySelector))
