'use client'

import { motion } from 'framer-motion'

const links = ['Cases', 'Diagnóstico', 'Contato', 'Privacidade']

export default function Footer() {
  return (
    <footer className="border-t border-[#3D3C38] py-10">
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div>
            <div className="text-[#F8F7F6] font-extrabold text-lg tracking-tightest mb-1">
              Pixel<span className="text-[#00D4FF]">.</span>Co
            </div>
            <p className="text-[#616059] text-[11px]">Do pixel à escala.</p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[11px] text-[#616059] hover:text-[#8C8B89] transition-colors duration-200 font-medium"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-[#3D3C38] text-[10px] font-mono">
            &copy; 2025 Pixel.Co — Inteligência Digital
          </p>
        </div>
      </div>

      {/* Status badge */}
      <div className="status-badge">
        <span className="status-dot" />
        <span>Sistema ativo</span>
      </div>
    </footer>
  )
}
