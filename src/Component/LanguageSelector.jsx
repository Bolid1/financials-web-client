import React from 'react'
import styled from 'styled-components'
import FlagOfRussia from '../Icon/FlagOfRussia'
import FlagOfUnitedKingdom from '../Icon/FlagOfUnitedKingdom'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    > * {
      cursor: pointer;
      width: 30px;
      height: 20px;
      display: inline-block;
    }
`

export default function LanguageSelector () {
  return <Container>
    <FlagOfRussia onClick={() => console.info('select ru')}/>
    <FlagOfUnitedKingdom onClick={() => console.info('select en')}/>
  </Container>
}
