'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Simula envio — em produção, substituir por fetch real
    setTimeout(() => { setLoading(false); setSent(true) }, 1400)
  }

  return (
    <section
      id="diagnostico"
      ref={ref}
      className="relative py-28 lg:py-40 border-t border-[#E6E5E3] overflow-hidden bg-[#FFFFFF]"
    >
      {/* Pixel grid background */}
      <div className="absolute inset-0 pixel-grid pointer-events-none" style={{ opacity: 0.5 }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">
        {/* Centered — exception allowed in this section */}
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="accent-line mx-auto" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#0A0909] font-extrabold mt-6 mb-4"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 48px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Agende seu{' '}
            <em className="em-serif" style={{ color: '#C4962A', fontSize: '1.02em' }}>diagnóstico</em>{' '}
            gratuito.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#6B6B6B] mb-12 max-w-[48ch]"
            style={{ fontSize: '16px', lineHeight: 1.65 }}
          >
            45 minutos. A gente entende o seu negócio, mapeia onde está a oportunidade e te diz qual é o próximo passo —
            sem apresentação de portfólio, sem pitch de serviços.
            Só o que importa para o seu momento.
          </motion.p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[520px]"
          >
            {sent ? (
              <div className="liquid-glass rounded-card p-10 text-center">
                <p className="text-[#0A0909] font-bold text-lg mb-2">Recebemos sua mensagem.</p>
                <p className="text-[#6B6B6B] text-sm">Resposta em até 24 horas. Sem pitch, sem pressão.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="liquid-glass rounded-card p-8 flex flex-col gap-4 text-left"
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B6B]">
                    Nome completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E6E5E3] text-[#0A0909] text-sm focus:outline-none focus:border-[#C4962A] transition-colors duration-200"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B6B]">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E6E5E3] text-[#0A0909] text-sm focus:outline-none focus:border-[#C4962A] transition-colors duration-200"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="whatsapp" className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B6B]">
                    WhatsApp com DDD *
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E6E5E3] text-[#0A0909] text-sm focus:outline-none focus:border-[#C4962A] transition-colors duration-200"
                    placeholder="(96) 99999-0000"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="desafio" className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B6B]">
                    Maior desafio agora <span className="normal-case tracking-normal">(opcional)</span>
                  </label>
                  <textarea
                    id="desafio"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E6E5E3] text-[#0A0909] text-sm focus:outline-none focus:border-[#C4962A] transition-colors duration-200 resize-none"
                    placeholder="Ex: Invisto em tráfego mas não sei se está convertendo de verdade."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.97, y: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C4962A] text-white rounded-lg font-bold text-sm hover:bg-[#A07820] transition-colors duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
                        style={{ animation: 'spin 0.8s linear infinite' }}
                      />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Quero entender o que está travando meu crescimento
                      <ArrowRight size={15} strokeWidth={2} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-[11px] text-[#999999]">
                  Resposta em até 24 horas. Sem compromisso.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
