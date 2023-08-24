import './globals.css'
import type { Metadata } from 'next'
import { Zen_Kaku_Gothic_Antique } from 'next/font/google'

const inter = Zen_Kaku_Gothic_Antique({ weight: "900", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'マラソンは地球を救う。',
  description: 'たぶん救わないんですよ。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
