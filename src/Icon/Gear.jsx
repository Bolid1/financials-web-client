import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const GearIcon = styled.span`
  display: inline-block;
  position: relative;
  margin: ${(props) => props.size / 5}${(props) => props.unit};
  width: ${(props) => props.size}${(props) => props.unit};
  height: ${(props) => props.size}${(props) => props.unit};
  background: white;
  border-radius: 50%;
  border: ${(props) => props.size / 3.5}${(props) => props.unit} solid gray;
  box-sizing: border-box;
  
  &:before,
  &:after {
    content: '×';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-family: "times new roman", serif;
    font-weight: bold;
    font-size: ${(props) => props.size * 2.5}${(props) => props.unit};
    color: gray;
  }
  
  &:after {
    transform: translate(-50%,-50%) rotate(45deg);
  }
`

export default function Gear (props) {
  return <GearIcon {...props}/>
}

Gear.propTypes = {
  size: PropTypes.number,
  unit: PropTypes.string,
}

Gear.defaultProps = {
  size: 1,
  unit: 'em',
}
