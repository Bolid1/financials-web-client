import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../config/theme'

export default function StyleProvider ({children}) {
  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
}

StyleProvider.propTypes = {
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
}
