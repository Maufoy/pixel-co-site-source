'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="como-funciona" ref={ref} className="py-20 lg:py-32 border-t border-[#E6E5E3] bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-[#0A0909] font-extrabold"
            style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            Do diagnóstico à execução —{' '}
            <em>sem chute, sem achismo</em>
          </h2>
          <p className="text-[#6B6B6B] mt-4 max-w-[480px]" style={{ fontSize: '16px', lineHeight: 1.6 }}>
            Cada passo com objetivo claro e prazo definido.
          </p>
        </motion.div>

        {/* Steps grid — 2 colunas desktop, 1 mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass rounded-card p-8 flex flex-col gap-5"
              >
                {/* Ícone */}
                <div
                  className="w-10 h-10 rounded-full border border-[#E6E5E3] flex items-center justify-center"
                  style={{ background: 'rgba(196,150,42,0.07)' }}
                >
                  <Icon size={17} strokeWidth={1.5} className="text-[#C4962A]" />
                </div>

                {/* Título */}
                <h3
                  className="text-[#0A0909] font-bold"
                  style={{ fontSize: '20px', lineHeight: 1.15, letterSpacing: '-0.01em' }}
                >
                  {step.title}
                </h3>

                {/* Descrição */}
                <p className="text-[#6B6B6B] flex-1" style={{ fontSize: '15px', lineHeight: 1.72 }}>
                  {step.description}
                </p>

                {/* Frase emocional */}
                <div className="border-t border-[#E6E5E3] pt-4">
                  <p className="font-semibold italic" style={{ color: '#C4962A', fontSize: '13px' }}>
                    {step.emotional}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
