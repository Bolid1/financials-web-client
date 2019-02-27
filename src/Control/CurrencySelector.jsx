import { inject, observer } from 'mobx-react'
import { getIdentifier } from 'mobx-state-tree'
import React from 'react'
import Select from '../Element/Select'
import ObservableMapHelper from '../Helper/ObservableMapHelper'

/**
 * @param {Currency} currency
 * @return {*}
 * @constructor
 */
const CurrencyOption = currency => {
  const id = getIdentifier(currency)

  return <option key={id} value={id} label={currency.sign}>
    {currency.sign}
  </option>
}

export default inject('domain')(observer(
  /**
   * @param {DomainModel} domain
   * @param {Object} props
   * @returns {*}
   * @constructor
   */
  function CurrencySelector ({domain, ...props}) {
    return <Select component={Select} {...props}>
      {ObservableMapHelper.map(domain.currencies, CurrencyOption)}
    </Select>
  }
))
