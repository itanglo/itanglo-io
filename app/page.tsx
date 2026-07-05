import Nav from '@/components/Nav'
import Avatar from '@/components/Avatar'
import { FinLogo, IntercomLogo } from '@/components/LogoSvgs'

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
            <FinLogo className="inline-block align-middle w-[0.9em] h-[0.9em] relative top-[-0.08em]" />
            {' '}
            <span className="whitespace-nowrap">
              (fka Intercom&nbsp;
              <IntercomLogo className="inline-block align-middle w-[0.9em] h-[0.9em] relative top-[-0.08em]" />
              )
            </span>
          </p>
        </div>
        <Nav />
      </div>
      <div className="flex-1 flex justify-center items-start">
        <Avatar src="/me.jpg" alt="A picture of me, Paolo Di Pasquale, at the Ale House in Reading" />
      </div>
    </main>
  )
}
