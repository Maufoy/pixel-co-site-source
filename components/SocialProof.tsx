'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const metrics = [
  { value: '+47%',  label: 'conversão média em 90 dias' },
  { value: '100%',  label: 'dos projetos começam com diagnóstico' },
  { value: '3',     label: 'novas parcerias por trimestre' },
]

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="social-proof"
      ref={ref}
      className="py-16 lg:py-24 border-y border-[#E6E5E3] bg-[#F8F7F6]"
    >
      <div className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E5E3]">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="px-0 py-8 sm:py-0 sm:px-12 first:pl-0 last:pr-0 flex flex-col gap-2"
            >
              <span
                className="font-extrabold text-[#0A0909] font-mono"
                style={{ fontSize: 'clamp(36px, 3.5vw, 52px)', lineHeight: 1 }}
              >
                {metric.value}
              </span>
              <span className="text-[#6B6B6B] text-[11px] font-medium leading-snug">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
