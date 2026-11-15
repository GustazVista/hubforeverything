'use client'
export default function Confirm({ children }: { children: React.ReactNode }) {
  return <button className="btn dg" onClick={(e) => { if (!confirm('Delete this entry permanently?')) e.preventDefault() }}>{children}</button>
}
