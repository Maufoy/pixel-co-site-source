'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ValueProps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="problema" ref={ref} className="py-20 lg:py-32 border-t border-[#E6E5E3] bg-[#F8F7F6]">
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">

        {/* H2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-[#0A0909] font-extrabold max-w-[640px]"
            style={{ fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            Você já passou por isso:
          </h2>
        </motion.div>

        {/* Grid assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-14">

          {/* Narrativa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <p className="text-[#3D3C38]" style={{ fontSize: '16px', lineHeight: 1.75 }}>
              Você contratou uma agência. Entregaram o card, entregaram o vídeo, jogaram o tráfego.
              Três meses depois, você ainda estava na mesma conversa.
            </p>
            <p className="text-[#6B6B6B]" style={{ fontSize: '16px', lineHeight: 1.75 }}>
              Não porque eram ruins. Porque eles chegaram com a solução antes de entender o problema.
            </p>
            <p className="text-[#3D3C38]" style={{ fontSize: '16px', lineHeight: 1.75 }}>
              A maioria das agências tem três ofertas: tráfego pago, card e vídeo.
              É o que elas fazem — independente do que você precisa.
            </p>
            <p className="text-[#3D3C38]" style={{ fontSize: '16px', lineHeight: 1.75 }}>
              A Pixel.Co funciona diferente. Antes de qualquer proposta, a gente entende o que está
              travando o crescimento do seu negócio. Às vezes é tráfego. Às vezes é o processo
              comercial. Às vezes é o e-commerce que não existe ainda. Às vezes é o CRM que ninguém
              configurou direito.
            </p>
            <p className="text-[#0A0909] font-semibold" style={{ fontSize: '16px', lineHeight: 1.75 }}>
              A solução depende do diagnóstico.
            </p>
          </motion.div>

          {/* Card — Júlia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass rounded-card p-8 flex flex-col gap-5 self-start"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C4962A]">
                Caso real
              </span>
              <h3
                className="text-[#0A0909] font-bold mt-2"
                style={{ fontSize: '18px', lineHeight: 1.2, letterSpacing: '-0.01em' }}
              >
                Júlia — Oliver For Man
              </h3>
            </div>

            <p className="text-[#6B6B6B]" style={{ fontSize: '14px', lineHeight: 1.7 }}>
              Ela chegou querendo vender mais. Faturava bem — só que vendia para quem já a conhecia.
            </p>
            <p className="text-[#6B6B6B]" style={{ fontSize: '14px', lineHeight: 1.7 }}>
              A resposta não era tráfego pago. Era um e-commerce integrado ao Mercado Livre e ao
              Magazine Luiza. Com a estrutura certa, ela passou a vender em escala nacional.
            </p>

            <div className="border-t border-[#E6E5E3] pt-5">
              <div
                className="text-[#0A0909] font-extrabold font-mono"
                style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1 }}
              >
                +R$70 mil
              </div>
              <p className="text-[#6B6B6B] mt-1" style={{ fontSize: '13px' }}>
                em faturamento novo por mês
              </p>
            </div>

            <p className="text-[#8C8B89] italic" style={{ fontSize: '13px', lineHeight: 1.6 }}>
              "Não porque faltava criativo. Porque faltava alguém que enxergasse o negócio inteiro."
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
