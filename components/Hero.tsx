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
        {/* Light mode overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(248,247,246,0.82)' }}
        />
        {/* Pixel grid */}
        <div className="absolute inset-0 pixel-grid" style={{ opacity: 0.35 }} />
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
          <motion.div variants={item} className="section-label mb-8 justify-center">
            Inteligência Digital
          </motion.div>

          {/* Headline — copy from landing-page.md, recommended headline */}
          <motion.h1
            variants={item}
            className="font-extrabold text-[#0A0909] mb-8"
            style={{
              fontSize: 'clamp(34px, 4.6vw, 64px)',
              lineHeight: 0.93,
              letterSpacing: '-0.03em',
            }}
          >
            Você investe. Você fatura.<br />
            E ainda assim sente que está{' '}
            <em>deixando dinheiro</em>{' '}
            na mesa.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="text-[#6B6B6B] mb-10 max-w-[58ch] mx-auto"
            style={{ fontSize: '18px', lineHeight: 1.55, fontWeight: 400 }}
          >
            A Pixel.Co diagnostica o ecossistema digital do seu negócio inteiro —
            e entrega o próximo passo com clareza. Não mais um serviço.
            A combinação certa para o momento que você está.
          </motion.p>

          {/* Inline metrics — 3 numbers, no icons, no boxes */}
          <motion.div
            ref={metricsRef}
            variants={item}
            className="grid grid-cols-3 gap-0 mb-12 divide-x divide-[#E6E5E3] w-full"
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
                  className="font-extrabold text-[#0A0909] font-mono leading-none"
                  style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}
                >
                  {m.value}
                </span>
                <span className="text-[11px] text-[#8C8B89] font-medium leading-snug max-w-[18ch]">
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
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0A0909] text-[#F8F7F6] rounded-lg font-bold text-sm tracking-tight hover:bg-[#333333] transition-colors duration-200"
            >
              Quero entender o que está represando meu crescimento
              <ArrowRight size={15} strokeWidth={2} />
            </motion.a>
            <a
              href="#como-funciona"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6B6B6B] hover:text-[#0A0909] transition-colors duration-200 py-3.5"
            >
              Ver como funciona
              <ChevronDown size={14} strokeWidth={2} />
            </a>
          </motion.div>

          {/* Subtexto CTA */}
          <motion.p
            variants={item}
            className="text-[11px] text-[#999999] tracking-wide mt-4"
          >
            Diagnóstico gratuito. Resposta em até 24 horas. Sem compromisso.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
