import Nav from '@/components/Nav'
import Avatar from '@/components/Avatar'

const NAV_LINKS = [
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' },
]

export default function HomePage() {
  return (
    <main className="flex gap-8 items-start pt-[8rem] px-[6%] pb-12 max-sm:flex-col max-sm:items-center max-sm:pt-8 max-sm:pb-8">
      <div className="flex flex-col gap-8">
        <div>
          <p>Ciao&nbsp;👋</p>
          <p className="pl-6 max-sm:pl-0">I&apos;m Paolo, an AI-powered web engineer&nbsp;🤖&nbsp;💪</p>
          <p>Living in Blighty 🇬🇧, hailing from the shores of Sicily&nbsp;🇮🇹</p>
          <p className="pl-6 max-sm:pl-0">
            Part of Team Web @ Fin&nbsp;
            <svg className="inline-block align-middle w-[0.9em] h-[0.9em] relative top-[-0.08em]">
              <use href="#logo-fin" />
            </svg>
            {' '}
            <span className="whitespace-nowrap">
              (fka Intercom&nbsp;
              <svg className="inline-block align-middle w-[0.9em] h-[0.9em] relative top-[-0.08em]">
                <use href="#logo-intercom" />
              </svg>
              )
            </span>
          </p>
        </div>
        <Nav links={NAV_LINKS} />
      </div>
      <div className="flex-1 flex justify-center items-start">
        <Avatar src="/me.jpg" alt="Paolo Di Pasquale" />
      </div>
    </main>
  )
}
