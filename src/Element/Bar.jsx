import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledBar = styled.div`
  display: inline-block;
  position: relative;
  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
  }
  &:before {
    background-color: ${({completeColor}) => completeColor};
    left: 0;
    right: ${({complete}) => 100 - complete}%;
  }
  &:after {
    background-color: ${({unCompleteColor}) => unCompleteColor};
    left: ${({complete}) => complete}%;
    right: 0;
  }
`

export default function Bar (props) {
  const completeOn = Math.round(100 * props.current / props.total)

  return <StyledBar {...props} complete={completeOn}>
    {props.children}
  </StyledBar>
}

Bar.propTypes = {
  current: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,

  completeColor: PropTypes.string,
  unCompleteColor: PropTypes.string,

  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
}

Bar.defaultProps = {
  completeColor: 'rgba(0, 255, 0, 0.2)',
  unCompleteColor: 'rgba(255, 0, 0, 0.2)',
}
