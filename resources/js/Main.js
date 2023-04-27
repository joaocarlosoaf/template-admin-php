import React, { Component, Suspense } from 'react'
import { HashRouter, Navigate, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './contexts/AuthContext'
import routes from './routes'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const RoutesComponent = () => {
  const { isAuthenticated } = useContext(AuthContext)

  const mainRoutes = [
    { path: '/login', element: isAuthenticated ? <Navigate to="/" /> : <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/404', element: <Page404 /> },
    { path: '/500', element: <Page500 /> },
    {
      path: '/',
      element: isAuthenticated ? <DefaultLayout /> : <Navigate to="/login" />,
      children: routes.map((route) => ({
        ...route,
        path: '/' + route.path,
      })),
    },
  ]

  const renderedRoutes = useRoutes(mainRoutes)
  return renderedRoutes
}


class Main extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <RoutesComponent />
        </Suspense>
      </HashRouter>
    )
  }
}

export default Main
