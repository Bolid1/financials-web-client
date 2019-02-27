import { Field } from 'formik'
import { inject, observer } from 'mobx-react'
import { getIdentifier } from 'mobx-state-tree'
import React from 'react'
import Select from '../Element/Select'
import ObservableMapHelper from '../Helper/ObservableMapHelper'

/**
 * @param {Issuer} issuer
 * @return {*}
 * @constructor
 */
const IssuerOption = issuer => {
  const id = getIdentifier(issuer)

  return <option key={id} value={id} label={issuer.name}>
    {issuer.name}
  </option>
}

export default inject('domain')(observer(
  /**
   * @param {DomainModel} domain
   * @param {Object} props
   * @returns {*}
   * @constructor
   */
  function IssuerSelector ({domain, ...props}) {
    return <Field component={Select} {...props}>
      {ObservableMapHelper.map(domain.issuers, IssuerOption)}
    </Field>
  }
))
