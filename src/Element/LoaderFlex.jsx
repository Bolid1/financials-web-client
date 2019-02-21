import React from 'react'
import styled from 'styled-components'
import Loader from '../Icon/Loader'

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function LoaderFlex (props) {
  return <Container><Loader {...props}/></Container>
}
