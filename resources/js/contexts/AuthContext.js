// AuthContext.js
import React, { createContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('user') && localStorage.getItem('token') ? true : false,
  )

  const login = (user, access_token) => {
    localStorage.setItem('user', user)
    localStorage.setItem('token', access_token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
