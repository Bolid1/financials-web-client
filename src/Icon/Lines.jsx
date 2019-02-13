import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

function modeToFlexDirection (mode) {
  return mode === 'vertical' ? 'row' : 'column'
}

function modeToLineStyle (mode, size) {
  return mode === 'vertical' ? {width: size, height: '100%'} : {width: '100%', height: size}
}

const Container = styled.div`
  background-color: inherit;
  display: flex;
  flex-direction: ${props => modeToFlexDirection(props.mode)};
  justify-content: space-between;
  height: 100%;
  width: 100%;
`

const Line = styled.span`
  background-color: white;
  height: 20%;
  display: block;
`

export default function Lines ({count, mode, color}) {
  const style = modeToLineStyle(mode, `${100 / (count * 2 - 1)}%`)
  let key = 0

  return <Container mode={mode}>
    {[...Array(count)].map(() => <Line {...{key: ++key, color, style}} />)}
  </Container>
}

Lines.propTypes = {
  count: PropTypes.number,
  mode: PropTypes.oneOf(['horizontal', 'vertical']),
  color: PropTypes.string,
}

Lines.defaultProps = {
  count: 3,
  mode: 'horizontal',
  color: '#ffffff',
}
