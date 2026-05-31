import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { PageViewTracker } from '@/components/PageViewTracker'

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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MVWRMS98');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="bg-[#F8F7F6] text-[#0A0909] antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MVWRMS98"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
