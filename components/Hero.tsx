'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const visualVariants = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.5,
    },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Pixel grid background */}
      <div className="pixel-grid-bg" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[34px] lg:px-[58px] pt-24 pb-16">
        {/* Asymmetric grid: text left (wider), visual right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center">

          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-[640px]"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="accent-line" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8C8B89]">
                Inteligência Digital
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-extrabold text-[#F8F7F6] mb-[58px]"
              style={{
                fontSize: 'clamp(32px, 4.4vw, 64px)',
                lineHeight: 0.90,
                letterSpacing: '-0.02em',
              }}
            >
              Você já sabe que<br />
              pode faturar mais.<br />
              <span className="text-[#00D4FF]">Nós sabemos por</span><br />
              onde começar.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={itemVariants}
              className="text-[#8C8B89] mb-10 max-w-[65ch]"
              style={{ fontSize: '17px', lineHeight: 1.55, fontWeight: 400 }}
            >
              Antes de qualquer proposta, diagnosticamos o ecossistema digital
              do seu negócio — e entregamos o próximo passo com precisão.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <motion.a
                href="#como-funciona"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#00D4FF] text-[#0A0909] rounded-lg font-bold text-sm hover:bg-[#00AECF] transition-colors duration-200"
              >
                Ver como funciona
                <ArrowRight size={16} strokeWidth={2} />
              </motion.a>

              <motion.a
                href="#cases"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-1.5 text-[#8C8B89] hover:text-[#F8F7F6] text-sm font-semibold transition-colors duration-200"
              >
                Ler cases reais
                <ChevronRight size={14} strokeWidth={2} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Visual element */}
          <motion.div
            variants={visualVariants}
            initial="hidden"
            animate="show"
            className="hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[420px]">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-[#3D3C38]" />
      <div className="absolute inset-6 rounded-full border border-[#262523]" />

      {/* Center panel */}
      <div className="absolute inset-12 rounded-2xl bg-[#141312] border border-[#3D3C38] p-6 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8C8B89]">
              Diagnóstico
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"
              style={{ animation: 'pulse 2s infinite ease-in-out' }}
            />
          </div>
          <div className="h-px bg-[#3D3C38] mb-4" />
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          {[
            { label: 'Tráfego orgânico', value: '+38%', color: '#00D4FF' },
            { label: 'Taxa de conversão', value: '+47%', color: '#00AECF' },
            { label: 'Receita incremental', value: '+R$280k', color: '#0086A6' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center justify-between"
            >
              <span className="text-[10px] text-[#616059]">{metric.label}</span>
              <span
                className="text-[11px] font-bold font-mono"
                style={{ color: metric.color }}
              >
                {metric.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div>
          <div className="h-px bg-[#3D3C38] mt-4 mb-3" />
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"
              style={{ animation: 'pulse 2s infinite ease-in-out' }}
            />
            <span className="text-[10px] text-[#8C8B89]">Análise em tempo real</span>
          </div>
        </div>
      </div>

      {/* Floating data points */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4, type: 'spring', stiffness: 300 }}
        className="absolute -top-2 -right-4 bg-[#141312] border border-[#3D3C38] border-l-2 border-l-[#00D4FF] rounded-lg px-3 py-2"
      >
        <div className="text-[10px] text-[#8C8B89]">Ecossistema</div>
        <div className="text-[13px] font-bold text-[#F8F7F6] font-mono">100%</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, type: 'spring', stiffness: 300 }}
        className="absolute -bottom-2 -left-4 bg-[#141312] border border-[#3D3C38] border-l-2 border-l-[#00AECF] rounded-lg px-3 py-2"
      >
        <div className="text-[10px] text-[#8C8B89]">90 dias</div>
        <div className="text-[13px] font-bold text-[#F8F7F6] font-mono">+47%</div>
      </motion.div>
    </div>
  )
}
