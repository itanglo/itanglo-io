import Link from 'next/link'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  return (
    <nav className="flex gap-8 justify-center pb-8">
      {NAV_LINKS.map(({ label, href }) => (
        <Link key={href} href={href} className="text-link underline">
          {label}
        </Link>
      ))}
    </nav>
  )
}
