'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-28 lg:py-40 border-t border-[#3D3C38] overflow-hidden"
    >
      {/* Pixel grid background */}
      <div className="pixel-grid-bg" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[34px] lg:px-[58px]">
        {/* Centered — exceção permitida nessa seção */}
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
            className="text-[#F8F7F6] font-extrabold mt-4 mb-[34px]"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Pronto para destravar<br />
            o crescimento?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#8C8B89] mb-10 max-w-[440px]"
            style={{ fontSize: '15px', lineHeight: 1.6 }}
          >
            Iniciamos poucas parcerias por trimestre para garantir foco total.
          </motion.p>

          <motion.a
            href="mailto:contato@pixel.co"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ transition: undefined }}
            className="flex items-center gap-3 px-8 py-4 bg-[#00D4FF] text-[#0A0909] rounded-lg font-bold text-sm hover:bg-[#00AECF] transition-colors duration-200"
          >
            Falar com um especialista
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
