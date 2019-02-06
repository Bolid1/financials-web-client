import PropTypes from 'prop-types'
import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'
import Loader from './Element/Loader'

export default function Routes ({pages}) {
  return <Switch>
    {
      pages
        .map(
          ({path, title, component}, key) =>
            <Route key={key} path={path} exact component={
              Loadable(
                {
                  loader: () => import(`./Page/${component}`),
                  loading: Loader,
                  /**
                   * @param {{default: React.Component}} loaded
                   * @param {history, location, match} props
                   * @returns {*}
                   */
                  render (loaded, props) {
                    const Component = loaded.default

                    return <Component {...{title}} {...props}/>
                  },
                },
              )
            }/>,
        )
    }
  </Switch>
}

Routes.propTypes = {
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
