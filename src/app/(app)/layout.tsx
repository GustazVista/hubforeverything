import Nav from '@/components/Nav'
import { SECTIONS } from '@/lib/sections'
import { signOut } from '../actions'
import { createClient } from '@/lib/supabase/server'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  const items: [string, string][] = [['/', 'Dashboard'], ...Object.entries(SECTIONS).map(([k, s]) => ['/' + k, s.label] as [string, string])]
  return (
    <div id="app">
      <aside>
        <div className="brand">KNOWLEDGE//HUB</div>
        <Nav items={items} />
        <div className="mu" style={{ marginTop: 'auto', padding: 10, wordBreak: 'break-all' }}>{user?.email}</div>
        <form action={signOut}><button className="btn" style={{ width: '100%' }}>Sign out</button></form>
      </aside>
      <main>{children}</main>
    </div>
  )
}
