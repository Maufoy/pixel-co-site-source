'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const cases = [
  {
    segment: 'Júlia — Oliver For Man',
    before:
      'Ela faturava bem vendendo para quem já a conhecia. Queria o Brasil. Precisava de escala. A resposta não era mais tráfego para o mesmo canal.',
    action:
      'Era um e-commerce integrado aos maiores marketplaces do país — Mercado Livre, Magazine Luiza — com tráfego pago rodando em cima de uma estrutura que comportava volume.',
    result: '+R$70 mil em faturamento novo por mês.',
    resultDetail: 'De vendas locais para escala nacional.',
  },
  {
    segment: 'Varejo com 4 lojas físicas',
    before:
      '12.000 clientes cadastrados. Nenhum canal de reengajamento ativo. Tráfego desconectado do histórico de compra.',
    action:
      'Desenvolvemos um aplicativo com catálogo digital, notificações push segmentadas e integração com o estoque físico. As campanhas passaram a usar dados reais de comportamento de compra.',
    result: '8.400 downloads em 45 dias.',
    resultDetail: 'Recompra +38%. Custo por venda no tráfego -22%.',
  },
  {
    segment: 'E-commerce — produto de alta margem',
    before:
      'Faturava R$80k/mês fechando venda por DM no Instagram. Sabia que estava preso num canal único. Queria crescer com consistência.',
    action:
      'Construímos o e-commerce, estruturamos o funil de tráfego pago e a produção de criativos. Em 45 dias, a operação estava sistematizada.',
    result: 'R$80k → R$210k/mês em 90 dias.',
    resultDetail: 'Custo de aquisição -41%.',
  },
]

export default function Cases() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cases"
      ref={ref}
      className="py-20 lg:py-32 border-t border-[#E6E5E3] bg-[#F8F7F6]"
    >
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-16"
        >
          <h2
            className="text-[#0A0909] font-extrabold"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 48px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            O que aconteceu quando a{' '}
            <em>solução certa</em>{' '}
            foi entregue.
          </h2>
          <p className="text-[#6B6B6B] mt-4 max-w-[55ch]" style={{ fontSize: '16px', lineHeight: 1.6 }}>
            Cada número abaixo tem um negócio real por trás. Um diagnóstico honesto, a combinação certa — e o resultado entregue.
          </p>
        </motion.div>

        {/* Cases grid — 3 equal on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.segment}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-card overflow-hidden flex flex-col"
            >
              {/* Result number — destaque no topo */}
              <div className="px-6 pt-6 pb-4 border-b border-[#E6E5E3]">
                <p
                  className="text-[#0A0909] font-extrabold font-mono leading-none mb-1"
                  style={{ fontSize: 'clamp(22px, 2.2vw, 30px)' }}
                >
                  {c.result}
                </p>
                <p className="text-[#6B6B6B] text-[11px]">{c.resultDetail}</p>
              </div>

              {/* Narrativa */}
              <div className="px-6 py-5 flex-1 flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C4962A]">
                  {c.segment}
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B6B6B] mb-2">
                    Situação antes
                  </p>
                  <p className="text-[#333333] text-[12px] leading-relaxed">{c.before}</p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B6B6B] mb-2">
                    O que foi feito
                  </p>
                  <p className="text-[#333333] text-[12px] leading-relaxed">{c.action}</p>
                </div>
              </div>

              {/* CTA inline */}
              <a
                href="#diagnostico"
                className="flex items-center gap-1.5 px-6 py-4 border-t border-[#E6E5E3] text-[11px] font-semibold text-[#C4962A] hover:text-[#A07820] transition-colors duration-200 group"
              >
                Quero resultados assim
                <ArrowRight
                  size={12}
                  strokeWidth={2.5}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
