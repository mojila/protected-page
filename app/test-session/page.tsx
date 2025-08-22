'use client'

import { useSession } from 'next-auth/react'

export default function TestSessionPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Session Test</h1>
        <div className="space-y-2">
          <p><strong>Status:</strong> {status}</p>
          <p><strong>User:</strong> {session?.user?.name || 'Not logged in'}</p>
          <p><strong>Email:</strong> {session?.user?.email || 'N/A'}</p>
          <p><strong>Session ID:</strong> {session?.user?.id || 'N/A'}</p>
        </div>
        
        {status === 'loading' && (
          <div className="mt-4 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 inline-block mr-2"></div>
            Loading session...
          </div>
        )}
        
        {status === 'unauthenticated' && (
          <div className="mt-4 text-red-600">
            ❌ Not authenticated - SessionProvider is working!
          </div>
        )}
        
        {status === 'authenticated' && (
          <div className="mt-4 text-green-600">
            ✅ Authenticated - SessionProvider is working!
          </div>
        )}
      </div>
    </div>
  )
}