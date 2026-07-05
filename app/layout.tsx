import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-atkinson',
})

export const metadata: Metadata = {
  title: 'Paolo Di Pasquale',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={atkinson.variable}>
      <body className="bg-white font-sans text-[1.25rem] leading-[1.7] text-black min-h-[100dvh] flex justify-center xl:text-[2rem]">
        {children}
      </body>
    </html>
  )
}
