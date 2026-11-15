import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SECTIONS } from '@/lib/sections'

export default async function Dashboard() {
  const sb = await createClient()
  const entries = Object.entries(SECTIONS).filter(([, s]) => !s.single)
  const counts = await Promise.all(entries.map(([, s]) => sb.from(s.table).select('*', { count: 'exact', head: true })))
  return (
    <>
      <h1>Welcome back</h1>
      <div className="grid" style={{ marginTop: 16 }}>
        {entries.map(([k, s], i) => (
          <Link key={k} href={'/' + k} className="cd"><span className="mu">{s.label}</span><b className="big">{counts[i].count ?? 0}</b></Link>
        ))}
      </div>
    </>
  )
}
