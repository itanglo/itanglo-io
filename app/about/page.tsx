import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <article className="max-w-[70ch] self-center">
        <header>
          <h2 className="text-3xl">About</h2>
        </header>
        <p className="pt-8">
          My name is Paolo Di Pasquale and this is my personal website. It&apos;s for writing and
          capturing lots of different stuff including, but not limited to my work as a web engineer.
          My domain name is itanglo.io, it&apos;s a play on words that refers to my mixed heritage.
          My late father was Italian and my mother is English. I was born in Italy and moved over to
          England with my family when I was 8 years old. This makes me an Italian Anglo, or
          &quot;Itanglo&quot;. The top level domain of .iohas the fortunate coincidence that
          &quot;io&quot; means &quot;me&quot; in Italian.
        </p>
      </article>
    </main>
  );
}
