'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const links = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Resultados',    href: '#cases' },
  { label: 'Diagnóstico',   href: '#diagnostico' },
  { label: 'Privacidade',   href: '#privacidade' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <footer ref={ref} className="bg-[#F8F7F6] border-t border-[#E6E5E3]">
      <div className="max-w-[1400px] mx-auto px-[34px] lg:px-[58px] py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-extrabold text-[18px] tracking-[-0.03em] text-[#0A0909] mb-1">
              Pixel<span className="text-[#C4962A]">.</span>Co
            </div>
            <p className="text-[#6B6B6B] text-[11px]">
              Do pixel à{' '}
              <em className="em-serif text-[#C4962A]">escala</em>.
            </p>
          </motion.div>

          {/* Links */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6"
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] text-[#6B6B6B] hover:text-[#0A0909] transition-colors duration-200 font-medium tracking-wide"
              >
                {label}
              </a>
            ))}
          </motion.nav>

          {/* Status + copyright */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-2"
          >
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
          </motion.div>

        </div>
      </div>
    </footer>
  )
}
