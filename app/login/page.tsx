'use client'

import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

type FormData = {
  username: string
  password: string
}

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { user, status, login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  // Show loading while checking authentication status
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  // Don't render login form if authenticated
  if (status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Redirecting...</div>
      </div>
    )
  }

  const onSubmit = async (data: FormData) => {
    setError('')

    try {
      const success = await login(data.username, data.password)
      
      if (success) {
        router.push('/')
      } else {
        setError('Invalid credentials')
      }
    } catch (error) {
      setError('An error occurred')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use username and password: <strong>user@example.com | user</strong>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.username ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 2,
                    message: 'Username must be at least 2 characters',
                  },
                })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 2,
                    message: 'Password must be at least 2 characters',
                  },
                })}
              />
            </div>
          </div>

          {(errors.username || errors.password || error) && (
            <div className="text-red-600 text-sm text-center">
              {errors.username?.message || errors.password?.message || error}
            </div>
          )}

          <div>
            <button
              id='login-button'
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}