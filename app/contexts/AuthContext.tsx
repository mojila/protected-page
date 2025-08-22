'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setStatus('authenticated')
      } catch (error) {
        // Invalid data, clear storage
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
        setStatus('unauthenticated')
      }
    } else {
      setStatus('unauthenticated')
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        }
        
        localStorage.setItem('auth-token', data.token)
        localStorage.setItem('user-data', JSON.stringify(userData))
        setUser(userData)
        setStatus('authenticated')
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-data')
    setUser(null)
    setStatus('unauthenticated')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook that mimics next-auth's useSession for easier migration
export function useSession() {
  const { user, status } = useAuth()
  
  return {
    data: user ? { user } : null,
    status,
  }
}