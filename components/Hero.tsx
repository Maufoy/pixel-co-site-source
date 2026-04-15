'use client'

import { motion } from 'framer-motion'
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

export default function Hero() {

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
          {/* Headline — copy from landing-page-v3.md */}
          <motion.h1
            variants={item}
            className="font-extrabold text-white mb-4"
            style={{
              fontSize: 'clamp(34px, 4.6vw, 64px)',
              lineHeight: 0.93,
              letterSpacing: '-0.03em',
            }}
          >
            Tráfego, tecnologia e estratégia integrados para{' '}
            <em style={{ color: '#C4962A', fontStyle: 'italic' }}>crescimento acelerado</em>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-8 max-w-[52ch] mx-auto"
            style={{ fontSize: '20px', lineHeight: 1.4, fontWeight: 400, color: 'rgba(255,255,255,0.85)' }}
          >
            Aqui não existe pacote — existe diagnóstico.
          </motion.p>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="mb-10 max-w-[58ch] mx-auto"
            style={{ fontSize: '16px', lineHeight: 1.65, fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}
          >
            7 anos de mercado. Mais de 50 empresas atendidas — de Macapá a São Paulo.
            O que aprendemos: o que trava o crescimento raramente é o que aparece na superfície.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#diagnostico"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#0A0909] rounded-lg font-bold text-sm tracking-tight hover:bg-[#F0EFEE] transition-colors duration-200"
            >
              Quero acelerar minha empresa
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
