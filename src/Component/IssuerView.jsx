import PropTypes from 'prop-types'
import React from 'react'
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
  issuer: PropTypes.object.isRequired,
}
