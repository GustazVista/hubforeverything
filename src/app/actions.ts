'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SECTIONS } from '@/lib/sections'

export async function save(section: string, fd: FormData) {
  const S = SECTIONS[section]
  if (!S) return
  const sb = await createClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/login')
  const row: Record<string, unknown> = {}
  for (const f of S.fields) {
    const v = String(fd.get(f.k) ?? '').trim()
    row[f.k] = v === '' ? null : f.t === 'number' ? Math.max(0, Math.min(100, Number(v) || 0)) : v
  }
  if (S.single) await sb.from(S.table).upsert({ ...row, user_id: user.id }, { onConflict: 'user_id' })
  else await sb.from(S.table).insert(row)
  revalidatePath('/' + section)
  revalidatePath('/')
}

export async function remove(section: string, id: string) {
  const S = SECTIONS[section]
  if (!S) return
  const sb = await createClient()
  await sb.from(S.table).delete().eq('id', id)
  revalidatePath('/' + section)
  revalidatePath('/')
}

export async function signOut() {
  const sb = await createClient()
  await sb.auth.signOut()
  redirect('/login')
}
