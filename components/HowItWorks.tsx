'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Search, Layers, Zap } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico do ecossistema digital',
    description:
      'Em 45 minutos de conversa, mapeamos o que está funcionando, o que está represando e o que está sendo ignorado no seu negócio digital. Não é uma apresentação da Pixel.Co — é uma análise do seu momento.',
    emotional: 'Você sai sabendo exatamente onde o problema está.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Mapa do próximo passo',
    description:
      'Com o diagnóstico em mãos, montamos a combinação certa: o que precisa mudar no tráfego, o que a tecnologia pode resolver, qual produto digital faz sentido agora. Você recebe um caminho claro — não uma lista de serviços.',
    emotional: 'Você para de adivinhar e começa a decidir com clareza.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Execução com dados em tempo real',
    description:
      'A implementação começa. E você acompanha cada métrica no dashboard — conversão, receita incremental, performance de mídia — sem precisar pedir. Antes de você lembrar de perguntar, a resposta já está lá.',
    emotional: 'Você finalmente tem um parceiro que entrega antes de ser cobrado.',
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
        <span className="accent-line" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] block mt-4 mb-6">
          Como funciona
        </span>
        <h2
          className="text-[#0A0909] font-extrabold"
          style={{
            fontSize: 'clamp(24px, 2.8vw, 40px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Como funciona{' '}
          <em>
            na prática
          </em>
        </h2>
        <p
          className="text-[#6B6B6B] mt-4 max-w-[480px]"
          style={{ fontSize: '13px', lineHeight: 1.6 }}
        >
          Três passos. Sem burocracia. Do diagnóstico à execução — com um
          parceiro que conhece o negócio inteiro.
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
                        style={{ fontSize: '15px', lineHeight: 1.72 }}
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
