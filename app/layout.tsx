import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: {
    default: "Paolo Di Pasquale",
    template: "%s — Paolo Di Pasquale",
  },
  description:
    "The personal website of Paolo Di Pasquale, an AI-powered Software Engineer.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
