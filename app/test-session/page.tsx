'use client'

import { useAuth } from '../contexts/AuthContext'

export default function TestSessionPage() {
  const { user, status } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Session Test</h1>
        <div className="space-y-2">
          <p><strong>Status:</strong> {status}</p>
          <p><strong>User:</strong> {user?.name || 'Not logged in'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
        </div>
        
        {status === 'loading' && (
          <div className="mt-4 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 inline-block mr-2"></div>
            Loading session...
          </div>
        )}
        
        {status === 'unauthenticated' && (
          <div className="mt-4 text-red-600">
            ❌ Not authenticated - Custom auth is working!
          </div>
        )}
        
        {status === 'authenticated' && (
          <div className="mt-4 text-green-600">
            ✅ Authenticated - Custom auth is working!
          </div>
        )}
      </div>
    </div>
  )
}