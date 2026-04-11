'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Manifesto() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="manifesto"
      ref={ref}
      className="py-20 lg:py-32 border-t border-[#E6E5E3] bg-[#F8F7F6]"
    >
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 lg:gap-24 items-start">

          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="accent-line" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] block mt-4 mb-6">
              Manifesto
            </span>
            <p
              className="text-[#6B6B6B] max-w-[280px]"
              style={{ fontSize: '12px', lineHeight: 1.6 }}
            >
              O mercado está cheio de fornecedores que respondem perguntas.
              Vazio de parceiros que enxergam o que ainda não foi perguntado.
            </p>
          </motion.div>

          {/* Right: manifesto text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[#0A0909] font-light"
              style={{
                fontSize: 'clamp(18px, 2.2vw, 28px)',
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
              }}
            >
              Não somos uma agência. Não vendemos tráfego, tecnologia ou conteúdo.
              Vendemos{' '}
              <em>clareza</em>{' '}
              sobre o que está represando o crescimento do seu negócio —
              e entregamos o ecossistema exato para destravar.
            </p>

            {/* Signature line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 pt-8 border-t border-[#E6E5E3] flex items-center gap-4"
            >
              <span className="w-8 h-px bg-[#C4962A] flex-shrink-0" />
              <span className="text-[#6B6B6B] text-[11px] font-semibold uppercase tracking-widest">
                Pixel.Co — Do pixel à escala.
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
