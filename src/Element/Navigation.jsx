import * as PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from '../Styled/Link'

const NavigationContainer = styled.nav`
  padding: 0;
  box-sizing: border-box;
  flex-grow: 1;
`

const NavItem = styled.li`
  list-style: none;
  margin-bottom: 10px;
`

export default function Navigation ({className, pages}) {
  return <NavigationContainer className={className}>
    {
      pages
        .filter(({showInLeftMenu}) => showInLeftMenu)
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
          title: PropTypes.object/*instanceOf(FormattedMessage)*/.isRequired,
        },
      ),
    )
    .isRequired,
}
