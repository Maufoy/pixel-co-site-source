'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PHIL_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="como-funciona"
      className="w-full bg-[#F8F7F6] border-t border-[#E6E5E3]"
    >
      <div className="max-w-[1400px] mx-auto px-[34px] lg:px-[58px] py-28 lg:py-36">

        {/* Header row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={item} className="section-label mb-8">
            Método
          </motion.div>
          <motion.h2
            variants={item}
            className="font-extrabold text-[#0A0909]"
            style={{
              fontSize: 'clamp(30px, 4vw, 56px)',
              lineHeight: 0.94,
              letterSpacing: '-0.03em',
              maxWidth: '14ch',
            }}
          >
            Diagnóstico{' '}
            <em className="em-serif text-[#C4962A]" style={{ fontSize: '1.02em' }}>x</em>{' '}
            Resultado
          </motion.h2>
        </motion.div>

        {/* Grid: video left, steps right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative rounded-card overflow-hidden aspect-[4/5] lg:aspect-[3/4]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src={PHIL_VIDEO}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F7F6]/20" />
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-0"
          >
            {[
              {
                num: '01',
                title: 'Diagnóstico',
                body: 'Analisamos o ecossistema digital completo — tráfego, produto, tecnologia e conteúdo. Identificamos onde está o maior bloqueio de crescimento.',
              },
              {
                num: '02',
                title: 'Estratégia',
                body: 'Com base no diagnóstico, definimos o próximo passo certo. Não o passo completo, o passo certo. Aquele que debloqueia o máximo com o mínimo de fricção.',
              },
              {
                num: '03',
                title: 'Execução',
                body: 'Entregamos tráfego, produto e tecnologia como um ecossistema integrado — não como serviços isolados. O resultado é mensurável desde o primeiro mês.',
              },
            ].map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                variants={item}
                className="relative pl-12 border-b border-[#E6E5E3] py-8 last:border-0"
              >
                {/* Step number */}
                <span
                  className="absolute left-0 top-8 font-mono font-bold text-[11px] tracking-widest text-[#BFBFBF]"
                >
                  {num}
                </span>

                {/* Connector line */}
                {i < 2 && (
                  <div
                    className="absolute left-[7px] top-[52px] bottom-0 w-px bg-gradient-to-b from-[#E6E5E3] to-transparent"
                  />
                )}

                <h3
                  className="font-bold text-[#0A0909] mb-3"
                  style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#6B6B6B] max-w-[50ch]"
                  style={{ fontSize: '15px', lineHeight: 1.65 }}
                >
                  {body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
