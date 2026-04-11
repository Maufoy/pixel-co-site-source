import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pixel.Co — Inteligência Digital',
  description: 'A Pixel.Co diagnostica o ecossistema digital do seu negócio e entrega a combinação certa de tráfego, tecnologia e produto digital para destravar o crescimento. Diagnóstico gratuito.',
  openGraph: {
    title: 'Pixel.Co — Do pixel à escala.',
    description: 'Você fatura bem. O potencial está represado. A Pixel.Co enxerga o que está bloqueando o crescimento do seu negócio — e entrega o próximo passo com clareza.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#F8F7F6] text-[#0A0909] antialiased">
        {children}
      </body>
    </html>
  )
}
