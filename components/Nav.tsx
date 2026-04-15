'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('hero-sentinel')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const logoColor = overHero ? 'text-white' : 'text-[#0A0909]'
  const linkColor = overHero ? 'rgba(255,255,255,0.75)' : '#6B6B6B'
  const navBg = overHero
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(255,255,255,0.85)'
  const navBorder = overHero
    ? scrolled ? 'border-white/20' : 'border-white/10'
    : 'border-black/8'
  const navShadow = scrolled
    ? overHero
      ? 'shadow-[0_8px_32px_rgba(0,0,0,0.18)]'
      : 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
    : 'shadow-[0_4px_16px_rgba(0,0,0,0.06)]'

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
    >
      <div
        className={`liquid-glass flex items-center justify-between gap-8 px-5 py-3 rounded-full border transition-all duration-300 w-full max-w-[780px] ${navBorder} ${navShadow}`}
        style={{ background: navBg, backdropFilter: 'blur(16px)' }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center" style={{ minWidth: '80px' }} aria-label="Pixel.Co">
          <span className={`font-extrabold text-[18px] tracking-[-0.03em] transition-colors duration-300 ${logoColor}`}>
            Pixel<span className="text-[#C4962A]">.</span>Co
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: 'Como funciona', href: '#como-funciona' },
            { label: 'Cases', href: '#cases' },
            { label: 'Diagnóstico', href: '#diagnostico' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300"
              style={{ color: linkColor }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
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
