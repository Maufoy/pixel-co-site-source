'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

const metrics = [
  { value: '+R$ 1,2M', label: 'em receita incremental identificada em diagnósticos' },
  { value: '47%',     label: 'de aumento médio em conversão nos primeiros 90 dias' },
  { value: '100%',    label: 'dos clientes com dashboard em tempo real' },
]

export default function Hero() {
  const metricsRef = useRef(null)
  const metricsInView = useInView(metricsRef, { once: true, margin: '-60px' })

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">

      {/* ── Video background ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src={HERO_VIDEO}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[34px] lg:px-[58px] pb-20 pt-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[840px] mx-auto flex flex-col items-center text-center"
        >
          {/* Label */}
          <motion.div variants={item} className="section-label mb-8 justify-center" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>
            Inteligência Digital
          </motion.div>

          {/* Headline — copy from landing-page.md, recommended headline */}
          <motion.h1
            variants={item}
            className="font-extrabold text-white mb-8"
            style={{
              fontSize: 'clamp(34px, 4.6vw, 64px)',
              lineHeight: 0.93,
              letterSpacing: '-0.03em',
            }}
          >
            Você investe. Você fatura.<br />
            E ainda assim sente que está{' '}
            <em style={{ color: '#C4962A', fontStyle: 'italic' }}>deixando dinheiro</em>{' '}
            na mesa.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="mb-10 max-w-[58ch] mx-auto"
            style={{ fontSize: '18px', lineHeight: 1.55, fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}
          >
            A Pixel.Co diagnostica o ecossistema digital do seu negócio inteiro —
            e entrega o próximo passo com clareza. Não mais um serviço.
            A combinação certa para o momento que você está.
          </motion.p>

          {/* Inline metrics — 3 numbers, no icons, no boxes */}
          <motion.div
            ref={metricsRef}
            variants={item}
            className="grid grid-cols-3 gap-0 mb-12 divide-x divide-[rgba(255,255,255,0.15)] w-full"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.value}
                initial={{ opacity: 0, y: 10 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-1 px-0 pr-6 first:pl-0 pl-6"
              >
                <span
                  className="font-extrabold text-white font-mono leading-none"
                  style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}
                >
                  {m.value}
                </span>
                <span className="text-[11px] font-medium leading-snug max-w-[18ch]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {m.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#diagnostico"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#0A0909] rounded-lg font-bold text-sm tracking-tight hover:bg-[#F0EFEE] transition-colors duration-200"
            >
              Quero entender o que está represando meu crescimento
              <ArrowRight size={15} strokeWidth={2} />
            </motion.a>
            <a
              href="#como-funciona"
              className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200 py-3.5"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Ver como funciona
              <ChevronDown size={14} strokeWidth={2} />
            </a>
          </motion.div>

          {/* Subtexto CTA */}
          <motion.p
            variants={item}
            className="text-[11px] tracking-wide mt-4"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Diagnóstico gratuito. Resposta em até 24 horas. Sem compromisso.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
