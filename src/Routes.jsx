import * as PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoaderFlex from './Element/LoaderFlex'

function Routes ({pages}) {
  return <Switch>
    {
      pages
        .map(
          ({path, title, component}, key) => {
            const Page = React.lazy(() => import(`./Page/${component}`))
            const PageAsync = props => <React.Suspense fallback={<LoaderFlex/>}>
              <Page {...props} title={title}/>
            </React.Suspense>

            return <Route key={key} path={path} exact component={PageAsync}/>
          },
        )
    }
  </Switch>
}

export default Routes

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
