import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  return (
    <nav className="flex gap-8 justify-center">
      {NAV_LINKS.map(({ label, href }) => (
        <Link key={href} href={href} className="text-link underline whitespace-nowrap">
          {label}
        </Link>
      ))}
    </nav>
  )
}
