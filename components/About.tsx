'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="sobre"
      className="w-full bg-[#F8F7F6] border-t border-[#E6E5E3]"
    >
      <div className="max-w-[1400px] mx-auto px-[34px] lg:px-[58px] py-28 lg:py-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-24 items-start"
        >
          {/* Left */}
          <div>
            <motion.div variants={item} className="section-label mb-8">
              Sobre nós
            </motion.div>

            {/* Metrics column */}
            <div className="space-y-8 mt-4">
              {[
                { num: '+47%', desc: 'conversão média em 90 dias' },
                { num: '100%', desc: 'dos projetos começam com diagnóstico' },
                { num: '3', desc: 'novas parcerias por trimestre' },
              ].map(({ num, desc }, i) => (
                <motion.div
                  key={num}
                  variants={item}
                  className="flex items-baseline gap-4 border-t border-[#E6E5E3] pt-6"
                >
                  <span
                    className="font-extrabold text-[#0A0909] font-mono"
                    style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    {num}
                  </span>
                  <span className="text-[13px] text-[#6B6B6B] leading-snug max-w-[18ch]">
                    {desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — headline + body */}
          <div>
            <motion.h2
              variants={item}
              className="font-extrabold text-[#0A0909] mb-8"
              style={{
                fontSize: 'clamp(28px, 3.2vw, 48px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              Diagnóstico antes de{' '}
              <em>prescrição</em>.
              <br />
              <span className="text-[#6B6B6B]">Para negócios que já faturam bem.</span>
            </motion.h2>

            <motion.p
              variants={item}
              className="text-[#6B6B6B] mb-6 max-w-[60ch]"
              style={{ fontSize: '17px', lineHeight: 1.65 }}
            >
              Não somos uma agência. Não vendemos tráfego, tecnologia ou conteúdo.
              Vendemos clareza sobre o que está represando o crescimento do seu
              negócio — e entregamos o ecossistema exato para destravar.
            </motion.p>

            <motion.p
              variants={item}
              className="text-[#6B6B6B] max-w-[60ch]"
              style={{ fontSize: '17px', lineHeight: 1.65 }}
            >
              Cada decisão começa com dados. Cada entrega tem métrica. Cada
              parceria tem foco total — por isso limitamos a três novos clientes
              por trimestre.
            </motion.p>

            {/* Accent bar */}
            <motion.div
              variants={item}
              className="mt-12 flex items-center gap-4"
            >
              <div className="w-8 h-px bg-[#C4962A]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B6B]">
                Pixel.Co — Do pixel à escala.
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
