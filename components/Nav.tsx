import Link from 'next/link'

interface NavLink {
  label: string
  href: string
}

export default function Nav({ links }: { links: NavLink[] }) {
  return (
    <nav className="flex gap-8 justify-center">
      {links.map(({ label, href }) => (
        <Link key={href} href={href} className="text-[#0000ee] underline whitespace-nowrap">
          {label}
        </Link>
      ))}
    </nav>
  )
}
