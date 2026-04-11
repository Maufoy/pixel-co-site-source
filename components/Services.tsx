'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const TRAFFIC_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'
const PRODUCT_VIDEO  = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

interface ServiceCardProps {
  tag: string
  title: string
  description: string
  videoSrc: string
  delay?: number
  inView: boolean
}

function ServiceCard({ tag, title, description, videoSrc, delay = 0, inView }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="group relative rounded-card overflow-hidden bg-[#EDEDED] border border-[#DBDBDB] hover:border-[#BFBFBF] transition-colors duration-300"
    >
      {/* Video */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          src={videoSrc}
        />
        {/* Tag overlay */}
        <div className="absolute top-4 left-4">
          <span className="liquid-glass rounded-pill px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0A0909]">
            {tag}
          </span>
        </div>
        {/* Arrow overlay */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-[#0A0909] flex items-center justify-center">
            <ArrowUpRight size={14} className="text-[#F8F8F8]" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="p-6 lg:p-8">
        <div className="w-6 h-px bg-[#C4962A] mb-4" />
        <h3
          className="font-bold text-[#0A0909] mb-3"
          style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          {title}
        </h3>
        <p
          className="text-[#6B6B6B]"
          style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '52ch' }}
        >
          {description}
        </p>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="servicos"
      className="w-full bg-[#F8F8F8] border-t border-[#DBDBDB]"
    >
      <div className="max-w-[1400px] mx-auto px-[34px] lg:px-[58px] py-28 lg:py-36">

        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-end"
        >
          <div>
            <motion.div variants={item} className="section-label mb-8">
              O que fazemos
            </motion.div>
            <motion.h2
              variants={item}
              className="font-extrabold text-[#0A0909]"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 52px)',
                lineHeight: 0.96,
                letterSpacing: '-0.03em',
              }}
            >
              Dois{' '}
              <em>vetores</em>,<br />
              um ecossistema.
            </motion.h2>
          </div>
          <motion.p
            variants={item}
            className="text-[#6B6B6B] lg:text-right"
            style={{ fontSize: '16px', lineHeight: 1.65, maxWidth: '48ch', marginLeft: 'auto' }}
          >
            Tráfego e produto não são departamentos separados. São as duas metades
            de um ecossistema digital que cresce junto — ou não cresce.
          </motion.p>
        </motion.div>

        {/* Asymmetric 2-card grid (not equal 50/50) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
          <ServiceCard
            tag="Tráfego"
            title="Diagnóstico & Performance"
            description="Mapeamos cada canal de aquisição, identificamos ineficiências e reconstruímos a estrutura de tráfego com base em dados reais do seu negócio — não em benchmarks genéricos."
            videoSrc={TRAFFIC_VIDEO}
            delay={0.1}
            inView={inView}
          />
          <ServiceCard
            tag="Produto"
            title="Tecnologia & Escala"
            description="Construímos ou otimizamos a infraestrutura de produto digital para suportar o crescimento sem quebrar. Da stack técnica à experiência do usuário final."
            videoSrc={PRODUCT_VIDEO}
            delay={0.22}
            inView={inView}
          />
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#DBDBDB] pt-10"
        >
          <div>
            <p
              className="font-bold text-[#0A0909] mb-1"
              style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
            >
              Pronto para destravar o crescimento?
            </p>
            <p className="text-[#6B6B6B] text-[14px]">
              Iniciamos poucas parcerias por trimestre para garantir foco total.
            </p>
          </div>
          <motion.a
            href="#diagnostico"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#C4962A] text-[#0A0909] rounded-lg font-bold text-sm tracking-tight hover:bg-[#A07820] transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            Falar com um especialista
            <ArrowUpRight size={15} strokeWidth={2} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
