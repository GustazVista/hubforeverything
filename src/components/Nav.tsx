'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav({ items }: { items: [string, string][] }) {
  const p = usePathname()
  return <nav>{items.map(([href, label]) => (
    <Link key={href} href={href} className={'nv' + (p === href ? ' on' : '')}>{label}</Link>
  ))}</nav>
}
