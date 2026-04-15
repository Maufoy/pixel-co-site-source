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
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
    >
      {/* Floating pill nav */}
      <div
        className={`liquid-glass flex items-center justify-between gap-8 px-5 py-3 rounded-full border transition-all duration-400 w-full max-w-[780px] ${
          scrolled
            ? 'shadow-[0_8px_32px_rgba(0,0,0,0.18)] border-white/20'
            : 'border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
        }`}
        style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center"
          style={{ minWidth: '80px' }}
          aria-label="Pixel.Co"
        >
          <span className="font-extrabold text-[18px] tracking-[-0.03em] text-white">
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
              className="text-[11px] font-semibold transition-colors duration-200 tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.75)' }}
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
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[#0A0909] text-[10px] font-bold uppercase tracking-widest transition-colors duration-200"
          style={{ background: '#C4962A' }}
        >
          Começar diagnóstico
          <ArrowRight size={11} strokeWidth={2.5} />
        </motion.a>
      </div>
    </motion.header>
  )
}
