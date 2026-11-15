'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function Login() {
  const [busy, setBusy] = useState(false)
  async function google() {
    setBusy(true)
    await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }
  return (
    <div className="gate">
      <div className="cd" style={{ maxWidth: 420, width: '100%' }}>
        <h1>KNOWLEDGE//HUB</h1>
        <p className="mu">Sign in with your Google account. Your data is stored in your own private space — nobody else can see it.</p>
        <button className="btn pri" onClick={google} disabled={busy}>{busy ? 'Redirecting…' : 'Continue with Google'}</button>
      </div>
    </div>
  )
}
