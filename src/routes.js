import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import NotFoundPage from 'pages/DefaultPages/NotFoundPage'
import HomePage from 'pages/VMNPages/HomePage/HomePage'
import HomePage2 from 'pages/DefaultPages/HomePage'
import LoginPage from 'pages/VMNPages/LoginPage'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  // Default Pages
  '/login': {
    component: loadable(() => import('pages/VMNPages/LoginPage')),
  },
  '/empty': {
    component: loadable(() => import('pages/DefaultPages/EmptyPage')),
  },
  '/home/supply': {
    component: loadable(() => import('pages/VMNPages/HomePage/HomePage')),
  },
  '/home/plant': {
    component: loadable(() => import('pages/VMNPages/HomePage/HomePage')),
  },
  '/setting/nvm-setting': {
    component: loadable(() => import('pages/VMNPages/SettingPage/SettingPage')),
  },
  '/setting/wifi': {
    component: loadable(() => import('pages/VMNPages/SettingPage/SettingPage')),
  },
  '/setting/wifi/accesspoint': {
    component: loadable(() => import('pages/VMNPages/SettingPage/SettingPage')),
  },
  '/setting/wifi/station': {
    component: loadable(() => import('pages/VMNPages/SettingPage/SettingPage')),
  },
  '/setting/datetime': {
    component: loadable(() => import('pages/VMNPages/SettingPage/SettingPage')),
  },
  '/datalogger': {
    component: loadable(() => import('pages/VMNPages/DataLogger')),
  },

  '/dashboard/alpha': {
    component: loadable(() => import('pages/DefaultPages/HomePage')),
  },
  '/page/status': {
    component: loadable(() => import('pages/VMNPages/StatusPage')),
  },
}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path="/" component={LoginPage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
