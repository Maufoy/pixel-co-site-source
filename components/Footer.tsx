'use client'

const links = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Resultados',    href: '#cases' },
  { label: 'Sobre',         href: '#manifesto' },
  { label: 'Privacidade',   href: '#privacidade' },
  { label: 'Termos de Uso', href: '#termos' },
]

export default function Footer() {
  return (
    <footer className="bg-[#F8F7F6] border-t border-[#E6E5E3]">
      <div className="max-w-[1400px] mx-auto px-[34px] lg:px-[58px] py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Logo + tagline */}
          <div>
            <div className="font-extrabold text-[18px] tracking-[-0.03em] text-[#0A0909] mb-1">
              Pixel<span className="text-[#C4962A]">.</span>Co
            </div>
            <p className="text-[#6B6B6B] text-[11px]">
              Do pixel à{' '}
              <em className="em-serif text-[#C4962A]">escala</em>.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] text-[#6B6B6B] hover:text-[#0A0909] transition-colors duration-200 font-medium tracking-wide"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Status + copyright */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#C4962A] flex-shrink-0"
                style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }}
              />
              <span className="text-[11px] font-semibold text-[#6B6B6B]">Sistema ativo</span>
            </div>
            <p className="text-[#BFBDBA] text-[10px] font-mono">
              &copy; 2025 Pixel.Co — Inteligência Digital
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
