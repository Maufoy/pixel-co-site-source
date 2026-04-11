'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const cases = [
  {
    segment: 'E-commerce de Moda — Amapá',
    before:
      'A loja investia R$18.000/mês em tráfego pago. Taxa de conversão: 0,8%. O problema estava sendo diagnosticado como "criativo fraco" há quatro meses — mais vídeos, mais variações de anúncio, mesmo resultado.',
    action:
      'O diagnóstico revelou que 74% do tráfego chegava pelo celular e encontrava um checkout com três etapas desnecessárias. Reestruturamos o funil de compra, implementamos recuperação de carrinho via push e ajustamos a segmentação para o perfil que de fato convertia.',
    result: '+63% em taxa de conversão em 60 dias.',
    resultDetail: 'Receita mensal: R$87k → R$142k com o mesmo investimento em mídia.',
  },
  {
    segment: 'Varejo de Grande Porte — Amapá',
    before:
      'Rede com 4 lojas físicas e operação digital subutilizada. Mais de 12.000 clientes cadastrados sem nenhum canal de reengajamento ativo. Campanhas de tráfego desconectadas do histórico de compra na loja física.',
    action:
      'Desenvolvemos um aplicativo com catálogo digital, notificações push segmentadas por perfil de compra e integração com o sistema de estoque. As campanhas passaram a usar dados do app para retargeting com intenção de compra real.',
    result: '+8.400 downloads nos primeiros 45 dias.',
    resultDetail: 'Recompra +38% entre usuários do app. CPV reduzido em 22%.',
  },
  {
    segment: 'E-commerce de Nicho — Empreendedora',
    before:
      'Negócio validado com produto de alta margem, faturando R$80k/mês via Instagram e indicação. Sem site próprio, sem tráfego pago, sem funil estruturado. Potencial represado sem um caminho claro para escalar.',
    action:
      'O diagnóstico revelou dependência de um único canal (DM do Instagram) para fechar vendas. Construímos e-commerce de alta conversão integrado ao tráfego pago e à produção de criativos. A operação passou de manual para sistematizada em 45 dias.',
    result: 'Faturamento: R$80k → R$210k/mês em 90 dias.',
    resultDetail: 'Custo de aquisição caiu 41%. Vendas saíram do DM para o dashboard.',
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
          <div className="section-label mb-6">Resultados reais</div>
          <h2
            className="text-[#0A0909] font-extrabold"
            style={{
              fontSize: 'clamp(26px, 3vw, 44px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Resultados reais.{' '}
            <em>Números reais</em>.
          </h2>
          <p className="text-[#6B6B6B] mt-4 max-w-[55ch]" style={{ fontSize: '14px', lineHeight: 1.6 }}>
            Cada número abaixo tem um negócio real por trás. Um problema diagnosticado,
            uma combinação certa de soluções e uma execução que entregou o que foi prometido.
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
              {/* Segment tag */}
              <div className="px-6 pt-6 pb-4 border-b border-[#E6E5E3]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C4962A]">
                  {c.segment}
                </span>
              </div>

              {/* Before */}
              <div className="px-6 py-4 flex-1 flex flex-col gap-4">
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

                {/* Result highlight */}
                <div className="mt-auto pt-4 border-t border-[#E6E5E3]">
                  <p
                    className="text-[#0A0909] font-extrabold font-mono mb-1"
                    style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.2 }}
                  >
                    {c.result}
                  </p>
                  <p className="text-[#6B6B6B] text-[11px] leading-snug">{c.resultDetail}</p>
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
