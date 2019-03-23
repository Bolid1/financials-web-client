import { inject } from 'mobx-react'
import * as PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import FlagOfRussia from '../Icon/FlagOfRussia'
import FlagOfUnitedKingdom from '../Icon/FlagOfUnitedKingdom'
import LanguageStore from '../Store/LanguageStore'

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

function LanguageSelector ({languageStore, className}) {
  return <Container className={className}>
    <FlagOfRussia onClick={() => languageStore.setLang('ru')}/>
    <FlagOfUnitedKingdom onClick={() => languageStore.setLang('en')}/>
  </Container>
}

LanguageSelector.propTypes = {
  languageStore: PropTypes.instanceOf(LanguageStore).isRequired,
  className: PropTypes.string,
}

export default inject('languageStore')(LanguageSelector)
