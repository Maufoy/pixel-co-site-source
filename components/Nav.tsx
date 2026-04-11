'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 md:px-[58px]"
    >
      {/* Pill nav */}
      <div
        className={`liquid-glass rounded-pill w-full max-w-[900px] transition-all duration-400 ${
          scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.10)]' : ''
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center"
            style={{ minWidth: '80px' }}
            aria-label="Pixel.Co"
          >
            <span className="font-extrabold text-[18px] tracking-[-0.03em] text-[#0A0909]">
              Pixel<span className="text-[#C4962A]">.</span>Co
            </span>
          </a>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: 'Como funciona', href: '#como-funciona' },
              { label: 'Cases', href: '#cases' },
              { label: 'Diagnóstico', href: '#diagnostico' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] font-semibold text-[#6B6B6B] hover:text-[#0A0909] transition-colors duration-200 tracking-widest uppercase"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA pill */}
          <motion.a
            href="#diagnostico"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-pill bg-[#0A0909] text-[#F8F8F8] text-[10px] font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors duration-200"
          >
            Começar diagnóstico
            <ArrowRight size={11} strokeWidth={2.5} />
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
