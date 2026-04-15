'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Search, Layers, Zap, Target } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description:
      'Antes de qualquer proposta, a gente entende o seu negócio. Em 45 minutos mapeamos o que está funcionando, o que está travando e o que você acha que precisa — e o que de fato precisa.',
    emotional: 'Você sai com clareza. A gente sai com o caminho.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Reunião de alinhamento',
    description:
      'Fechou? A gente senta junto para alinhar cada detalhe. A conversa é gravada e transcrita com IA — tudo documentado, nada perdido. O resultado é um mapa claro do que vai ser feito, em qual ordem e com qual objetivo.',
    emotional: 'Assim que sua conta é configurada, você já tem acesso ao dashboard em tempo real.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Sprints de execução',
    description:
      'A gente executa em sprints — ciclos focados para resolver o que foi mapeado. Tráfego, tecnologia, produto digital — cada sprint com objetivo claro e prazo definido.',
    emotional: 'Sem chute. Sem achismo.',
  },
  {
    number: '04',
    icon: Target,
    title: 'Otimização contínua',
    description:
      'Depois da implementação, os dados falam. A gente analisa o que funcionou, ajusta o que precisa e acelera o que está gerando resultado.',
    emotional: 'Crescimento não é entrega única — é processo.',
  },
]

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ index: 0, dir: 1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const rawIndex = Math.min(steps.length - 1, Math.floor(v * steps.length))
      setState((prev) =>
        rawIndex !== prev.index
          ? { index: rawIndex, dir: rawIndex > prev.index ? 1 : -1 }
          : prev
      )
    })
    return unsubscribe
  }, [scrollYProgress])

  const { index, dir } = state

  return (
    <section
      id="como-funciona"
      className="border-t border-[#E6E5E3] bg-[#FFFFFF]"
    >
      {/* ── Section header ── */}
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px] pt-20 pb-12">
        <h2
          className="text-[#0A0909] font-extrabold"
          style={{
            fontSize: 'clamp(28px, 3.2vw, 48px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}
        >
          Do diagnóstico à execução —{' '}
          <em>sem chute, sem achismo</em>
        </h2>
        <p
          className="text-[#6B6B6B] mt-4 max-w-[480px]"
          style={{ fontSize: '16px', lineHeight: 1.6 }}
        >
          Cada passo com objetivo claro e prazo definido.
        </p>
      </div>

      {/* ── Sticky scroll stack ── */}
      <div
        ref={containerRef}
        style={{ height: `${steps.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-[680px] mx-auto px-[34px] lg:px-[58px]">

            {/* Progress dots */}
            <div className="flex items-center gap-3 mb-10">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === index ? 28 : 6,
                    background: i <= index ? '#C4962A' : '#E6E5E3',
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: 6, borderRadius: 99 }}
                />
              ))}
            </div>

            {/* Card */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                variants={{
                  enter: (d: number) => ({
                    y: d > 0 ? '100%' : '-100%',
                    opacity: 0,
                  }),
                  center: { y: 0, opacity: 1 },
                  exit: (d: number) => ({
                    y: d > 0 ? '-100%' : '100%',
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={spring}
                className="liquid-glass rounded-2xl p-8 lg:p-12"
              >
                {(() => {
                  const step = steps[index]
                  const Icon = step.icon
                  return (
                    <>
                      {/* Step header */}
                      <div className="flex items-center gap-4 mb-8">
                        <span
                          className="text-[11px] font-black font-mono tracking-[0.2em]"
                          style={{ color: '#C4962A' }}
                        >
                          {step.number}
                        </span>
                        <div
                          className="w-11 h-11 rounded-full border border-[#E6E5E3] flex items-center justify-center"
                          style={{ background: 'rgba(196,150,42,0.07)' }}
                        >
                          <Icon
                            size={18}
                            strokeWidth={1.5}
                            className="text-[#C4962A]"
                          />
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-[#0A0909] font-bold mb-5"
                        style={{
                          fontSize: 'clamp(20px, 2.2vw, 30px)',
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-[#6B6B6B] mb-8"
                        style={{ fontSize: '16px', lineHeight: 1.72 }}
                      >
                        {step.description}
                      </p>

                      {/* Emotional pull-quote */}
                      <div className="border-t border-[#E6E5E3] pt-5">
                        <p
                          className="font-semibold italic"
                          style={{ color: '#C4962A', fontSize: '13px' }}
                        >
                          {step.emotional}
                        </p>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Scroll hint */}
            <p className="text-center text-[10px] text-[#AAAAAA] tracking-[0.18em] uppercase mt-6">
              {index < steps.length - 1 ? '↓ Role para continuar' : '✓ Fim dos passos'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
