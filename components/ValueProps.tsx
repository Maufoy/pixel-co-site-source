'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Eye, Target } from 'lucide-react'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function ValueProps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proposta-de-valor" ref={ref} className="py-20 lg:py-32 border-t border-[#E6E5E3]">
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">

        {/* Section header */}
        <div className="section-label mb-12 lg:mb-16">Proposta de valor</div>

        {/* Asymmetric grid: big + medium + small + wide */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_320px] gap-4"
        >
          {/* Card grande — Diagnóstico antes de prescrição */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="liquid-glass rounded-card p-7 lg:row-span-2 flex flex-col gap-6 min-h-[280px] lg:min-h-[320px]"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(196,150,42,0.10)' }}
            >
              <Search size={20} strokeWidth={1.5} className="text-[#C4962A]" />
            </div>
            <div className="flex-1">
              <h3
                className="text-[#0A0909] font-bold mb-3"
                style={{ fontSize: '19px', lineHeight: 1.2 }}
              >
                Diagnóstico antes de prescrição
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed max-w-[65ch]" style={{ fontSize: '13px' }}>
                Na Pixel.Co, nenhuma solução é entregue antes de entender o momento do negócio do
                cliente. O primeiro passo de toda relação é uma análise do ecossistema digital —
                não uma proposta comercial.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E6E5E3]">
              <span className="text-[11px] font-semibold text-[#C4962A] uppercase tracking-widest">
                100% dos projetos começam com análise
              </span>
            </div>
          </motion.div>

          {/* Card médio — Transparência ativa */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="liquid-glass rounded-card p-7 flex flex-col gap-4 min-h-[140px]"
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(196,150,42,0.10)' }}
              >
                <Eye size={20} strokeWidth={1.5} className="text-[#C4962A]" />
              </div>
            </div>
            <div>
              <h3
                className="text-[#0A0909] font-bold mb-2"
                style={{ fontSize: '17px', lineHeight: 1.2 }}
              >
                Transparência ativa
              </h3>
              <p className="text-[#6B6B6B]" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                Dashboard em tempo real — você não precisa perguntar.
                Entregamos antes de ser perguntados.
              </p>
            </div>
          </motion.div>

          {/* Card pequeno — Resultado mensurável */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="liquid-glass rounded-card p-7 flex flex-col gap-4 min-h-[140px]"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(196,150,42,0.10)' }}
            >
              <Target size={20} strokeWidth={1.5} className="text-[#C4962A]" />
            </div>
            <div>
              <h3
                className="text-[#0A0909] font-bold mb-2"
                style={{ fontSize: '17px', lineHeight: 1.2 }}
              >
                Resultado mensurável
              </h3>
              <p className="text-[#6B6B6B]" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                +47% conversão média nos primeiros 90 dias.
                O único produto que entregamos é crescimento.
              </p>
            </div>
          </motion.div>

          {/* Wide card — modelo de trabalho */}
          <motion.div
            variants={cardVariants}
            className="liquid-glass rounded-card p-7 lg:col-span-2 lg:col-start-2 flex items-center gap-6"
          >
            <div className="flex-1">
              <p className="text-[#6B6B6B] text-[11px] font-semibold uppercase tracking-widest mb-1">
                Modelo de trabalho
              </p>
              <p className="text-[#0A0909] font-semibold" style={{ fontSize: '14px' }}>
                Não somos uma agência. Somos o parceiro que o seu negócio digital precisava.
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[#C4962A] font-mono font-bold text-xl">3×</div>
              <div className="text-[#6B6B6B] text-[10px]">parcerias / trimestre</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
