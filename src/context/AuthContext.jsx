import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ccs_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (email, password) => {
    // Simulated authentication - replace with real API call
    const mockUser = {
      id: 1,
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'faculty',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff`
    }
    setUser(mockUser)
    localStorage.setItem('ccs_user', JSON.stringify(mockUser))
    return mockUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ccs_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

