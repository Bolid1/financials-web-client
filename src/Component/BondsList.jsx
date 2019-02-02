import React from 'react'
import Bond from '../Entity/Bond'
import em from '../Infrastructure/EntityManager'
import TilesStyled from '../Styled/TilesStyled'

export default class BondsList extends React.Component {
  state = {
    bonds: [],
  }

  componentDidMount () {
    em.rm.byEntityClass(Bond)
      .findBy()
      .then(
        bonds => console.info(bonds),
        error => console.error(error),
      )
  }

  render () {
    return <TilesStyled>

    </TilesStyled>
  }
}
