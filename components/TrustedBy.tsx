'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const logos = [
  { name: 'Odonto Advance', src: '/logos/odonto-advance.png', width: 120 },
  { name: 'Fitoderme',      src: '/logos/fitoderme.png',      width: 120 },
  { name: 'Webflash',       src: '/logos/webflash.png',       width: 120 },
  { name: 'Berrini',        src: '/logos/berrini.png',        width: 280 },
  { name: 'Benoliel',       src: '/logos/benoliel.png',       width: 120 },
]

const track = [...logos, ...logos]

export default function TrustedBy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-12 border-t border-[#E6E5E3] bg-[#F8F7F6] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1440px] mx-auto px-[34px] lg:px-[58px] mb-8"
      >
        <p
          className="text-[#8C8B89] font-semibold uppercase tracking-widest text-center lg:text-left"
          style={{ fontSize: '11px' }}
        >
          Empresas que já cresceram
        </p>
      </motion.div>

      {/* Carrossel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden"
      >
        {/* Fade nas bordas */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F8F7F6, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F8F7F6, transparent)' }} />

        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 18,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{ width: 'max-content' }}
        >
          {track.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: `${logo.width}px`, height: '40px' }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={40}
                style={{
                  width: `${logo.width}px`,
                  height: '40px',
                  objectFit: 'contain',
                  filter: 'grayscale(100%) brightness(0.4)',
                  opacity: 0.7,
                }}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
