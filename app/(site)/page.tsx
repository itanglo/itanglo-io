import Image from "next/image";
import Avatar from "@/components/Avatar";

export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row gap-8 items-center justify-center">
      <div data-id="intro" className="lg:text-3xl">
        <p>Ciao&nbsp;👋</p>
        <p className="pl-6 max-sm:pl-0">
          I&apos;m Paolo, an AI-powered Software Engineer&nbsp;🤖&nbsp;💪
        </p>
        <p>Living in Blighty 🇬🇧, hailing from the shores of Sicily&nbsp;🇮🇹</p>
        <p className="pl-6 max-sm:pl-0">
          Part of Team 🌱&nbsp;Growth @ Synthesia&nbsp;
          <Image
            src="/synthesia-logo.svg"
            alt=""
            width={139}
            height={94}
            className="inline-block h-[0.9em] w-auto align-middle"
          />
        </p>
      </div>
      <Avatar src="/me.jpg" alt="A picture of me, Paolo Di Pasquale, at the Ale House in Reading" />
    </main>
  );
}
