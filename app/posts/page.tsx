import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Posts — Paolo Di Pasquale',
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function PostsPage() {
  return (
    <main className="flow-root max-w-[60ch] pt-[8rem] px-[6%] pb-12 max-sm:pt-8 max-sm:pb-8">
      <Nav links={NAV_LINKS} />
      <div className="text-[1.25rem] leading-[1.7]">
        <p>Nothing to see yet.</p>
      </div>
    </main>
  )
}
