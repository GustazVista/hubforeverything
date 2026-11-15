import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SECTIONS } from '@/lib/sections'
import { save, remove } from '../../actions'
import Confirm from '@/components/Confirm'

export default async function Section({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const S = SECTIONS[section]
  if (!S) notFound()
  const sb = await createClient()
  const { data, error } = await sb.from(S.table).select('*').order('created_at', { ascending: false })
  const rows = (data ?? []) as Record<string, any>[]
  const cur = S.single ? rows[0] : undefined
  return (
    <>
      <h1>{S.label}</h1>
      {error && <p className="dn">Could not load data: {error.message}</p>}
      <form action={save.bind(null, section)} className="cd" style={{ margin: '16px 0' }}>
        {S.fields.map((f) => (
          <label key={f.k}>{f.l}{f.r ? ' *' : ''}
            {f.t === 'textarea' ? <textarea name={f.k} rows={3} defaultValue={cur?.[f.k] ?? ''} />
              : f.t === 'select' ? <select name={f.k} defaultValue={cur?.[f.k] ?? f.o![0]}>{f.o!.map((o) => <option key={o}>{o}</option>)}</select>
              : <input name={f.k} type={f.t === 'date' ? 'date' : f.t === 'number' ? 'number' : 'text'} required={f.r} defaultValue={cur?.[f.k] ?? ''} />}
          </label>
        ))}
        <div><button className="btn pri">{S.single ? 'Save' : 'Add'}</button></div>
      </form>
      {!S.single && (rows.length === 0 ? <div className="empty"><div className="e4">ERROR 404</div><p>Nothing saved here yet.</p></div> :
        <div className="grid">{rows.map((r) => (
          <div className="cd" key={r.id}>
            <b>{r.name}</b>
            {r.status && <span className="bg">{r.status}</span>}
            {r.progress != null && <div className="mu">{r.progress}% complete</div>}
            {r.author && <div className="mu">{r.author}</div>}
            {r.notes && <div className="mu">{r.notes}</div>}
            <div className="row">
              {r.url && <a className="btn" href={/^https?:\/\//i.test(r.url) ? r.url : 'https://' + r.url} target="_blank" rel="noopener noreferrer">Open</a>}
              <form action={remove.bind(null, section, r.id)}><Confirm>Delete</Confirm></form>
            </div>
          </div>))}</div>)}
    </>
  )
}
