'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Layers, Zap } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description:
      'Analisamos o ecossistema completo do seu negócio digital — tráfego, conversão, produto, tecnologia — sem pular etapas e sem vender o que não foi pedido.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Estratégia',
    description:
      'Definimos o próximo passo certo. Não um plano genérico de 12 meses — a ação específica que vai destravar o crescimento agora, baseada no que encontramos.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Execução',
    description:
      'Entregamos tráfego, produto digital e tecnologia integrados. Um parceiro para todo o ecossistema — você não precisa trocar de fornecedor a cada nova etapa.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="py-20 lg:py-32 border-t border-[#3D3C38]"
    >
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-24">

          {/* Left: header */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="accent-line" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8C8B89]">
                Como funciona
              </span>
              <h2
                className="text-[#F8F7F6] font-extrabold mt-6"
                style={{
                  fontSize: 'clamp(24px, 2.8vw, 40px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                Três etapas.<br />
                Um sistema.
              </h2>
              <p className="text-[#8C8B89] mt-4 max-w-[280px]" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                O processo completo — do diagnóstico à execução — com um parceiro que conhece o negócio inteiro.
              </p>
            </motion.div>
          </div>

          {/* Right: steps */}
          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLast = i === steps.length - 1

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex gap-6 pb-10"
                >
                  {/* Step number + connector */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#141312] border border-[#3D3C38] flex items-center justify-center">
                      <Icon size={16} strokeWidth={1.5} className="text-[#00D4FF]" />
                    </div>
                    {/* Connector line */}
                    {!isLast && (
                      <div
                        className="absolute left-[19px] top-10 bottom-0 w-px"
                        style={{
                          background: 'linear-gradient(to bottom, #3D3C38, transparent)',
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[10px] font-bold text-[#3D3C38] font-mono tracking-widest">
                        {step.number}
                      </span>
                      <h3
                        className="text-[#F8F7F6] font-bold"
                        style={{ fontSize: '17px', lineHeight: 1.2 }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[#8C8B89] max-w-[65ch]" style={{ fontSize: '13px', lineHeight: 1.65 }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
