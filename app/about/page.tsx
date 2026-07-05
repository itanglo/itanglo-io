import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Avatar from '@/components/Avatar'

export const metadata: Metadata = {
  title: 'About — Paolo Di Pasquale',
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function AboutPage() {
  return (
    <main className="flow-root max-w-[60ch] pt-[8rem] px-[6%] pb-12 max-sm:pt-8 max-sm:pb-8">
      <Nav links={NAV_LINKS} />
      <h1 className="text-[1.953125rem] leading-[1.2]">About</h1>
      <Avatar src="/me-code-complete.jpg" alt="Paolo Di Pasquale" float />
      <div className="text-[1.25rem] leading-[1.7]">
        <p>
          My name is Paolo Di Pasquale and this is my personal website. It&apos;s for writing and
          capturing lots of different stuff including, but not limited to my work as a web engineer.
          My domain name is <code>itanglo.io</code>, it&apos;s a play on words that refers to my
          mixed heritage. My late father was Italian and my mother is English. I was born in Italy
          and moved over to England with my family when I was 8 years old. This makes me an Italian
          Anglo, or &quot;Itanglo&quot;. The top level domain of <code>.io</code> has the fortunate
          coincidence that &quot;io&quot; means &quot;me&quot; in Italian.
        </p>
      </div>
    </main>
  )
}
