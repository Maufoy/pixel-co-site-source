import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pixel.Co — Inteligência Digital',
  description: 'Você já sabe que pode faturar mais. Nós sabemos por onde começar. Diagnóstico estratégico do ecossistema digital do seu negócio.',
  openGraph: {
    title: 'Pixel.Co — Do pixel à escala.',
    description: 'Antes de qualquer proposta, diagnosticamos o ecossistema digital do seu negócio — e entregamos o próximo passo com precisão.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={dmSans.variable}>
      <body className="bg-[#0A0909] text-[#F8F7F6] antialiased">
        {children}
      </body>
    </html>
  )
}
