// PrivateRoute.js
import React, { useContext } from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const ProtectedComponentWrapper = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/#/admin" />
  }
  return <Outlet />
}

const PrivateRoute = (props) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route {...props}>
      <ProtectedComponentWrapper isAuthenticated={isAuthenticated} />
    </Route>
  )
}

export default PrivateRoute
