import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <article className="max-w-[70ch] self-center flex flex-col gap-8">
        <p>
          {" "}
          My name is Paolo Di Pasquale and this is my personal website. It&apos;s for writing and
          capturing lots of different stuff including, but not limited to my work as a web engineer.
          My domain name is &quot;itanglo.io&quot;, it&apos;s a play on words that refers to my
          mixed heritage. My late father was Italian and my mother is English. I was born in Italy
          and moved over to England with my family when I was 8 years old. This makes me an Italian
          Anglo, or &quot;Itanglo&quot;. The top level domain of &quot;.io&quot;, has the fortunate
          coincidence that &quot;io&quot; means &quot;me&quot; in Italian.
        </p>
        <div className="flex flex-col sm:flex-row items-center">
          <q className="text-2xl md:text-4xl py-4 sm:px-4 md:px-10 italic">
            I read this on the train. It&apos;s sort of like a social repellent.
          </q>
          <figure>
            <Image
              src="/me-code-complete.jpg"
              alt="Me holding a copy of Code Complete 2 and looking quite chuffed with myself."
              width={600}
              height={800}
              className="self-center"
            />
            <figcaption className="text-base text-gray-500 pt-2">
              Me holding a copy of Code Complete 2 and looking quite chuffed with myself.
            </figcaption>
          </figure>
        </div>
      </article>
    </main>
  );
}
