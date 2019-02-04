import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavigationContainer = styled.nav`
  padding: ${({theme: {layout: {paddingFromTop}}}) => paddingFromTop} 10px 0 10px;
  box-sizing: border-box;
`

const NavItem = styled.li`
  list-style: none;
`

export default function Navigation ({pages}) {
  return <NavigationContainer>
    {
      pages
        .map(
          ({path, title}, key) => <NavItem key={key}>
            <Link to={path}>{title}</Link>
          </NavItem>,
        )
    }
  </NavigationContainer>
}

Navigation.propTypes = {
  pages: PropTypes
    .arrayOf(
      PropTypes.shape(
        {
          path: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        },
      ),
    )
    .isRequired,
}
