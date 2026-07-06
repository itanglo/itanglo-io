import Avatar from '@/components/Avatar'
import FinLogo from '@/components/FinLogo'
import IntercomLogo from '@/components/IntercomLogo'

export default function HomePage() {
  return (
    <main className="flex gap-8 justify-center items-center">
      <div data-id="intro" className="text-4xl">
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
      <Avatar src="/me.jpg" alt="A picture of me, Paolo Di Pasquale, at the Ale House in Reading" />
    </main>
  )
}
