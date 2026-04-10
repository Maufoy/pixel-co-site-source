'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0909]/90 backdrop-blur-md border-b border-[#3D3C38]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center"
            style={{ width: '116px' }}
            aria-label="Pixel.Co"
          >
            <span className="text-[#F8F7F6] font-extrabold text-xl tracking-tightest">
              Pixel<span className="text-[#00D4FF]">.</span>Co
            </span>
          </a>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {['Como funciona', 'Cases', 'Diagnóstico'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[11px] font-semibold text-[#8C8B89] hover:text-[#F8F7F6] transition-colors duration-200 tracking-wide uppercase"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA pill */}
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4FF] text-[#0A0909] text-[11px] font-bold uppercase tracking-wide hover:bg-[#00AECF] transition-colors duration-200"
          >
            Começar diagnóstico
            <ArrowRight size={12} strokeWidth={2.5} />
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
