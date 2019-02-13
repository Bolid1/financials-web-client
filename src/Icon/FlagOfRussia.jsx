import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Line = styled.span`
  background-color: ${(props) => props.color};
  height: 33.333333%;
  display: block;
`

export default function FlagOfRussia () {
  return <Container>
    <Line color="#ffffff"/>
    <Line color="#d52b1e"/>
    <Line color="#0039a6"/>
  </Container>
}
