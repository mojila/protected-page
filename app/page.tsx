'use client'

import { useSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to login if not authenticated
      window.location.href = '/login'
    }
  })

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <div className="text-lg">Loading...</div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Protected Page</h1>
          <p className="text-gray-600 mb-6">
            Welcome, {session?.user?.name || 'User'}!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This page is protected by authentication middleware.
          </p>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
