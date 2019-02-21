import PropTypes from 'prop-types'
import React from 'react'
import Issuer from '../Entity/Issuer'
import IssuerEdit from './IssuerEdit'

export default function IssuerView (props) {
  const mode = props.issuer.id ? 'view' : 'edit'

  if (mode === 'edit') {
    return <IssuerEdit onSave={() => {}} issuer={props.issuer}/>
  }

  return <span>
      {props.issuer.name}
    </span>
}

IssuerView.propTypes = {
  issuer: PropTypes.instanceOf(Issuer).isRequired,
}
