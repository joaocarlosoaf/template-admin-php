// AuthContext.js
import React, { createContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('user') ? true : false,
  )

  const login = (user) => {
    localStorage.setItem('user', user)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
