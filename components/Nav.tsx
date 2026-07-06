import Link from 'next/link'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function Nav({ className }: { className?: string }) {
  return (
    <nav className={cn('flex gap-8 justify-center text-xl', className)}>
      {NAV_LINKS.map(({ label, href }) => (
        <Link key={href} href={href} className="text-link underline">
          {label}
        </Link>
      ))}
    </nav>
  )
}
