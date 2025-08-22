import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Simple authentication check
    if (username === 'user@example.com' && password === 'user') {
      const user = {
        id: '1',
        name: 'User',
        email: 'user@example.com',
      }

      // Generate a simple token (in production, use proper JWT)
      const token = `auth-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      return NextResponse.json({
        success: true,
        user,
        token,
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}