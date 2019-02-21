import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`

const Stick = styled.div`
  transform-origin: ${props => props.size / 2}px ${props => props.size / 2}px;
  animation: lds-spinner 1.2s linear infinite;
  transform: rotate(${props => props.rotate}deg);
  animation-delay: ${props => props.delay}s;

  &:after {
    content: " ";
    display: block;
    position: absolute;
    top: ${props => 3 * props.size / 64}px;
    left: ${props => 29 * props.size / 64}px;
    width: ${props => 5 * props.size / 64}px;
    height: ${props => 14 * props.size / 64}px;
    border-radius: 20%;
    background: #000000;
  }

  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export default function Loader (props) {
  let key = 0

  return <Spinner {...props}>
    {
      [...Array(12)].map(
        () => <Stick
          {...{key, size: props.size, rotate: 30 * key, delay: -(12 - ++key) / 10}}
        />,
      )
    }
  </Spinner>
}

Loader.propTypes = {
  size: PropTypes.number,
}

Loader.defaultProps = {
  size: 64,
}

