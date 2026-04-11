'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURED_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'

export default function FeaturedVideo() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="abordagem"
      className="w-full bg-[#FFFFFF] border-t border-[#E6E5E3]"
    >
      <div className="max-w-[1400px] mx-auto px-[34px] lg:px-[58px] py-28 lg:py-36">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-label mb-16"
        >
          Nossa abordagem
        </motion.div>

        {/* Asymmetric grid: video big left, text card right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-stretch">

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative rounded-card overflow-hidden aspect-[16/9] lg:aspect-auto lg:min-h-[440px] bg-[#E6E5E3]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src={FEATURED_VIDEO}
            />
            {/* Subtle overlay to keep brand colors */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0909]/30 via-transparent to-transparent" />
          </motion.div>

          {/* Liquid glass card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="liquid-glass rounded-card p-8 lg:p-10 flex flex-col justify-between"
            style={{ background: 'rgba(255,255,255,0.7)' }}
          >
            <div>
              <div className="w-8 h-px bg-[#C4962A] mb-6" />
              <h2
                className="font-extrabold text-[#0A0909] mb-6"
                style={{
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                }}
              >
                Nossa Abordagem
              </h2>
              <p
                className="text-[#6B6B6B] mb-6"
                style={{ fontSize: '16px', lineHeight: 1.65 }}
              >
                Antes de qualquer entrega, mapeamos o ecossistema digital completo
                do seu negócio. Tráfego, produto, tecnologia e conteúdo — analisados
                juntos, porque é assim que eles funcionam na prática.
              </p>
              <p
                className="text-[#6B6B6B]"
                style={{ fontSize: '16px', lineHeight: 1.65 }}
              >
                O resultado é um diagnóstico preciso que elimina suposições e aponta
                onde está o maior alavancador de crescimento disponível agora.
              </p>
            </div>

            {/* Bottom pill */}
            <div className="mt-10 flex items-center gap-3 border-t border-[#E6E5E3] pt-6">
              <span
                className="w-2 h-2 rounded-full bg-[#C4962A] flex-shrink-0"
                style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B6B]">
                Ecossistema integrado
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
