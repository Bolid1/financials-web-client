import { inject, observer } from 'mobx-react'
import React from 'react'
import Select from '../Element/Select'
import ObservableMapHelper from '../Helper/ObservableMapHelper'
import { getIdentifier } from 'mobx-state-tree'

/**
 * @param {Issuer} issuer
 * @return {*}
 * @constructor
 */
const IssuerOption = issuer => {
  const id = getIdentifier(issuer)

  return <option key={id} value={id}>
    {issuer.name}
  </option>
}

/**
 * @param {DomainModel} domain
 * @param {Issuer} selected
 * @param {function} onChange
 * @returns {*}
 * @constructor
 */
function IssuerSelector ({domain, selected, onChange}) {
  return <Select value={getIdentifier(selected)} onChange={event => onChange(domain.issuers.get(event.target.value))}>
    {ObservableMapHelper.map(domain.issuers, IssuerOption)}
  </Select>
}

export default inject('domain')(observer(IssuerSelector))
