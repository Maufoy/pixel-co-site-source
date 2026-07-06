'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const steps = [
  { id: 'negocio', name: 'Negócio' },
  { id: 'cliente-ideal', name: 'Cliente ideal' },
  { id: 'oferta', name: 'Oferta' },
  { id: 'provas', name: 'Provas' },
  { id: 'voz-estilo', name: 'Voz e estilo' },
  { id: 'acao', name: 'Ação' },
  { id: 'tecnico', name: 'Técnico' },
  { id: 'extra', name: 'Finalizar' },
]

type Resp = string | string[]

export default function BriefingPosCompra() {
  const searchParams = useSearchParams()
  const [leadId, setLeadId] = useState('')
  const [step, setStep] = useState(0)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const [d, setD] = useState<Record<string, Resp>>({})
  const set = (k: string, v: Resp) => setD(prev => ({ ...prev, [k]: v }))

  useEffect(() => {
    const lid = searchParams.get('leadId') || ''
    setLeadId(lid)
    // Also get lead info from sessionStorage
    const stored = sessionStorage.getItem('pagina_express_lead')
    if (stored) {
      try {
        const info = JSON.parse(stored)
        set('nome_completo', info.nome || '')
        set('lead_email', info.email || '')
        set('lead_telefone', info.whatsapp || info.telefone || '')
      } catch {}
    }
  }, [searchParams])

  const update = (k: string, v: string) => set(k, v)

  const submit = async () => {
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...d, leadId }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Erro ao enviar')
      setSent(true)
    } catch (e: any) {
      setError(e.message || 'Erro de rede')
    } finally {
      setSending(false)
    }
  }

  const chk = (k: string, v: string) => {
    const cur = (d[k] as string[]) || []
    set(k, cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v])
  }

  if (sent) {
    return (
      <div className="min-h-screen" style={{ background: '#f5f5f7', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ maxWidth: 480, width: '100%', background: 'white', borderRadius: 20, padding: 48, textAlign: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px', color: '#1d1d1f' }}>Briefing enviado!</h1>
          <p style={{ color: '#86868b', lineHeight: 1.5, margin: '0 0 24px' }}>
            Recebemos suas respostas. Vamos usar isso pra criar sua página. Em até 24h você recebe o layout pra aprovar.
          </p>
          <p style={{ color: '#86868b', fontSize: 14 }}>Entraremos em contato pelo WhatsApp.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5f5f7', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <strong style={{ fontSize: 18, color: '#1d1d1f' }}>Pixel.Co</strong>
          <span style={{ fontSize: 13, color: '#86868b' }}>Briefing · {steps[step].name}</span>
        </div>
      </header>

      {/* Progress bar */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#0071e3' : '#e8e8ed', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '4px 24px 80px' }}>
        <Step0  d={d} update={update} chk={chk} />
        <Step1  d={d} update={update} />
        <Step2  d={d} update={update} chk={chk} />
        <Step3  d={d} update={update} chk={chk} />
        <Step4  d={d} update={update} chk={chk} />
        <Step5  d={d} update={update} chk={chk} />
        <Step6  d={d} update={update} chk={chk} />
        <Step7  d={d} leadId={leadId} error={error} sending={sending} submit={submit} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            style={{ padding: '12px 24px', borderRadius: 12, border: '1px solid #d2d2d7', background: 'white', color: '#1d1d1f', fontSize: 15, fontWeight: 500, cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>
            ← Voltar
          </button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: '#0071e3', color: 'white', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
              Próximo →
            </button>
          ) : null}
        </div>

        {/* Step indicator text */}
        <p style={{ textAlign: 'center', color: '#86868b', fontSize: 12, marginTop: 16 }}>
          Passo {step + 1} de {steps.length}
        </p>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 6, marginTop: 0 }}>{children}</p>
}

function Input({ value, onChange, placeholder, rows }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  const Tag = rows ? 'textarea' as any : 'input' as any
  return <Tag value={value} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #d2d2d7', fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1d1d1f', outline: 'none', resize: rows ? 'vertical' : undefined, minHeight: rows ? 80 : undefined, boxSizing: 'border-box' }} />
}

function Radio({ name, options, d, set }: { name: string; options: { value: string; label: string; desc?: string }[]; d: Record<string, Resp>; set: (k: string, v: string) => void }) {
  const cur = d[name] as string | undefined
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {options.map(o => (
      <label key={o.value} onClick={() => set(name, o.value)}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${cur === o.value ? '#0071e3' : '#d2d2d7'}`, background: cur === o.value ? 'rgba(0,113,227,0.06)' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${cur === o.value ? '#0071e3' : '#c7c7cc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {cur === o.value && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0071e3' }} />}
        </div>
        <div>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#1d1d1f' }}>{o.label}</span>
          {o.desc && <p style={{ fontSize: 12, color: '#86868b', margin: '2px 0 0' }}>{o.desc}</p>}
        </div>
      </label>
    ))}
  </div>
}

function Checkbox({ name, options, d, chk }: { name: string; options: { value: string; label: string }[]; d: Record<string, Resp>; chk: (k: string, v: string) => void }) {
  const cur = (d[name] as string[]) || []
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {options.map(o => {
      const checked = cur.includes(o.value)
      return <label key={o.value} onClick={() => chk(name, o.value)}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${checked ? '#0071e3' : '#d2d2d7'}`, background: checked ? 'rgba(0,113,227,0.06)' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked ? '#0071e3' : '#c7c7cc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: checked ? '#0071e3' : 'transparent' }}>
          {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#1d1d1f' }}>{o.label}</span>
      </label>
    })}
  </div>
}

function Card({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  return <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.04)', marginBottom: 16 }}>
    {title && <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1d1d1f', margin: '0 0 4px' }}>{title}</h2>}
    {subtitle && <p style={{ fontSize: 14, color: '#86868b', margin: '0 0 16px' }}>{subtitle}</p>}
    {children}
  </div>
}

function Q({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return <div style={{ marginBottom: 20 }}>
    <p style={{ fontSize: 15, fontWeight: 500, color: '#1d1d1f', margin: '0 0 8px' }}>{children}{required && <span style={{ color: '#ff3b30', marginLeft: 4 }}>*</span>}</p>
  </div>
}

/* Step 0 - Negócio */
function Step0({ d, update, chk }: any) {
  return <Card title="Dados do negócio" subtitle="Informações básicas pra gente te conhecer">
    <Q required>Nome completo</Q>
    <Input value={d.nome_completo || ''} onChange={v => update('nome_completo', v)} placeholder="Seu nome completo" />
    <Q required>Como quer aparecer na página</Q>
    <Input value={d.nome_apresentacao || ''} onChange={v => update('nome_apresentacao', v)} placeholder="Ex: Dra. Christiane Reis · Psicóloga CRP 00/00000" />
    <Q required>Profissão / título</Q>
    <Input value={d.profissao || ''} onChange={v => update('profissao', v)} placeholder="Ex: Psicóloga, Nutricionista, Advogado" />
    <Q>Cidade</Q>
    <Input value={d.cidade || ''} onChange={v => update('cidade', v)} placeholder="Onde você atende" />
    <Q>Atendimento</Q>
    <Radio name="atendimento" options={[
      { value: 'Presencial', label: 'Presencial' },
      { value: 'Online', label: 'Online' },
      { value: 'Presencial e online', label: 'Presencial e online' },
    ]} d={d} set={update} />
    <Q>Links atuais (site, Instagram, redes)</Q>
    <Input value={d.links_atuais || ''} onChange={v => update('links_atuais', v)} placeholder="@seudousuario · instagram.com/..." />
  </Card>
}

/* Step 1 - Cliente ideal */
function Step1({ d, update }: any) {
  return <Card title="Cliente ideal" subtitle="Quem você quer atrair com essa página">
    <Q required>Descreva seu cliente ideal em 2 frases</Q>
    <Input rows={3} value={d.cliente_perfil || ''} onChange={v => update('cliente_perfil', v)} placeholder="Ex: Profissionais liberais de 30-50 anos que querem atrair mais pacientes mas não sabem tecnologia..." />
    <Q>Qual o principal problema que ele resolve com você?</Q>
    <Input rows={3} value={d.cliente_problema || ''} onChange={v => update('cliente_problema', v)} placeholder="Na voz do cliente: 'não consigo ser encontrado no Google'" />
    <Q>O que ele já tentou que não deu certo?</Q>
    <Input rows={2} value={d.cliente_tentativas || ''} onChange={v => update('cliente_tentativas', v)} placeholder="" />
    <Q>Maior objeção pra contratar?</Q>
    <Input rows={2} value={d.cliente_objecao || ''} onChange={v => update('cliente_objecao', v)} placeholder="" />
    <Q>Como ele descreve o resultado ideal?</Q>
    <Input rows={2} value={d.cliente_resultado || ''} onChange={v => update('cliente_resultado', v)} placeholder="" />
  </Card>
}

/* Step 2 - Oferta */
function Step2({ d, update, chk }: any) {
  return <Card title="Sua oferta" subtitle="O que você vende e como funciona">
    <Q required>O que você vende exatamente?</Q>
    <Input rows={3} value={d.oferta_descricao || ''} onChange={v => update('oferta_descricao', v)} placeholder="Ex: Consultoria de imagem pessoal com sessão inicial + acompanhamento de 3 meses" />
    <Q>Como funciona em 3 passos?</Q>
    <Input rows={3} value={d.oferta_passos || ''} onChange={v => update('oferta_passos', v)} placeholder="1. Anamnese inicial em 50 min&#10;2. Plano de tratamento&#10;3. Sessão de manutenção" />
    <Q>Mostrar preço na página?</Q>
    <Radio name="preco_modo" options={[
      { value: 'Mostrar valor', label: 'Mostrar valor', desc: 'O cliente vê o preço direto' },
      { value: 'A partir de', label: 'A partir de', desc: 'Mostra valor mínimo' },
      { value: 'Sob consulta', label: 'Sob consulta', desc: 'Esconde o preço' },
    ]} d={d} set={update} />
    <Q>Valor</Q>
    <Input value={d.preco_valor || ''} onChange={v => update('preco_valor', v)} placeholder="Ex: R$ 497 ou R$ 200/sessão" />
    <Q required>Diferencial vs concorrente mais barato?</Q>
    <Input rows={2} value={d.diferencial || ''} onChange={v => update('diferencial', v)} placeholder="" />
    <Q>Garantia?</Q>
    <Radio name="garantia" options={[
      { value: 'Sim, tenho garantia clara', label: 'Sim, tenho garantia clara' },
      { value: 'Tenho alguma política de segurança', label: 'Tenho alguma política de segurança' },
      { value: 'Não tenho garantia', label: 'Não tenho garantia' },
      { value: 'Não sei ainda', label: 'Não sei ainda' },
    ]} d={d} set={update} />
  </Card>
}

/* Step 3 - Provas */
function Step3({ d, update, chk }: any) {
  return <Card title="Provas sociais" subtitle="O que vai convencer o visitante a contratar">
    <Q>O que você tem disponível?</Q>
    <Checkbox name="provas_disponiveis" options={[
      { value: 'Depoimentos escritos', label: 'Depoimentos escritos' },
      { value: 'Prints de WhatsApp/Instagram', label: 'Prints de WhatsApp/Instagram' },
      { value: 'Avaliações no Google', label: 'Avaliações no Google' },
      { value: 'Números de resultado', label: 'Números de resultado' },
      { value: 'Ainda não tenho provas', label: 'Ainda não tenho provas' },
    ]} d={d} chk={chk} />
    <Q>Depoimentos, prints ou frases</Q>
    <Input rows={3} value={d.provas || ''} onChange={v => update('provas', v)} placeholder="Cole os depoimentos ou prints" />
    <Q>Números concretos</Q>
    <Input rows={2} value={d.numeros || ''} onChange={v => update('numeros', v)} placeholder="Ex: 200+ pacientes atendidos, 98% satisfação" />
    <Q>Autoridade (formações, certificações)</Q>
    <Input rows={3} value={d.formacoes || ''} onChange={v => update('formacoes', v)} placeholder="CRP, MBA, certificações, aparições na mídia" />
  </Card>
}

/* Step 4 - Voz e estilo */
function Step4({ d, update, chk }: any) {
  return <Card title="Voz e estilo" subtitle="A personalidade visual e textual da página">
    <Q>Caminho visual</Q>
    <Radio name="estilo_visual" options={[
      { value: 'Sóbrio e premium', label: 'Sóbrio e premium', desc: 'elegante, limpo, com bastante respiro' },
      { value: 'Moderno e direto', label: 'Moderno e direto', desc: 'objetivo, comercial, sem enfeite' },
      { value: 'Humano e acolhedor', label: 'Humano e acolhedor', desc: 'próximo, leve, com sensação de confiança' },
      { value: 'Forte e autoral', label: 'Forte e autoral', desc: 'mais marcante, com personalidade' },
    ]} d={d} set={update} />
    <Q>Como fala com o cliente?</Q>
    <Radio name="tratamento" options={[
      { value: 'Formal', label: 'Formal', desc: 'o senhor, a senhora' },
      { value: 'Neutro', label: 'Neutro', desc: 'você' },
      { value: 'Informal', label: 'Informal', desc: 'direto, próximo e leve' },
    ]} d={d} set={update} />
    <Q>Cores</Q>
    <Radio name="paleta" options={[
      { value: 'Já tenho paleta definida', label: 'Já tenho paleta definida', desc: 'mando as cores depois' },
      { value: 'Quero que a Pixel.Co defina', label: 'Quero que a Pixel.Co defina' },
      { value: 'Usar cores da minha marca/logo', label: 'Usar cores da minha marca/logo' },
    ]} d={d} set={update} />
    <Q>Referência visual específica</Q>
    <Input rows={3} value={d.referencia_visual || ''} onChange={v => update('referencia_visual', v)} placeholder="Ex: gosto da clareza da Apple, da autoridade da XP, do estilo do perfil @..." />
  </Card>
}

/* Step 5 - Ação */
function Step5({ d, update, chk }: any) {
  return <Card title="Ação" subtitle="O que o visitante precisa fazer">
    <Q required>Única ação que o visitante precisa fazer</Q>
    <Radio name="cta_unica" options={[
      { value: 'Chamar no WhatsApp', label: 'Chamar no WhatsApp' },
      { value: 'Agendar consulta', label: 'Agendar consulta' },
      { value: 'Preencher formulário', label: 'Preencher formulário' },
      { value: 'Comprar agora', label: 'Comprar agora' },
      { value: 'Outro', label: 'Outro' },
    ]} d={d} set={update} />
    <Q>Destino do clique</Q>
    <Input value={d.cta_destino || ''} onChange={v => update('cta_destino', v)} placeholder="Link do WhatsApp, URL de agendamento..." />
    <Q>Detalhes do destino</Q>
    <Input rows={2} value={d.cta_detalhes || ''} onChange={v => update('cta_detalhes', v)} placeholder="Número do WhatsApp, campos do formulário..." />
    <Q>De onde vem o tráfego?</Q>
    <Radio name="origem_trafego" options={[
      { value: 'Instagram / Redes sociais', label: 'Instagram / Redes sociais' },
      { value: 'Google (SEO)', label: 'Google (SEO)' },
      { value: 'Google Ads', label: 'Google Ads' },
      { value: 'Meta Ads (Facebook/Instagram)', label: 'Meta Ads (Facebook/Instagram)' },
      { value: 'LinkedIn', label: 'LinkedIn' },
      { value: 'Indicação / boca a boca', label: 'Indicação / boca a boca' },
    ]} d={d} set={update} />
  </Card>
}

/* Step 6 - Técnico */
function Step6({ d, update, chk }: any) {
  return <Card title="Informações técnicas" subtitle="Domínio, logo, fotos">
    <Q>Domínio</Q>
    <Radio name="dominio" options={[
      { value: 'Já tenho domínio', label: 'Já tenho domínio', desc: 'Ex: meusite.com.br' },
      { value: 'Preciso registrar', label: 'Preciso registrar' },
      { value: 'Não sei / ajuda nessa parte', label: 'Não sei / ajuda nessa parte' },
    ]} d={d} set={update} />
    {d.dominio === 'Já tenho domínio' && <Input value={(d as any).dominio_qual || ''} onChange={v => update('dominio_qual', v)} placeholder="Qual domínio?" />}
    <Q>Logo</Q>
    <Radio name="logo" options={[
      { value: 'Tenho logo em vetor (.svg/.eps/.png)', label: 'Tenho logo em vetor (.svg/.eps/.png)' },
      { value: 'Tenho logo simples / print', label: 'Tenho logo simples / print' },
      { value: 'Não tenho logo', label: 'Não tenho logo' },
    ]} d={d} set={update} />
    <Q>Fotos profissionais?</Q>
    <Radio name="fotos" options={[
      { value: 'Sim, tenho fotos profissionais', label: 'Sim, tenho fotos profissionais' },
      { value: 'Tenho fotos boas de celular', label: 'Tenho fotos boas de celular' },
      { value: 'Preciso de orientação', label: 'Preciso de orientação' },
      { value: 'Não tenho', label: 'Não tenho' },
    ]} d={d} set={update} />
  </Card>
}

/* Step 7 - Extra + Submit */
function Step7({ d, leadId, error, sending, submit }: any) {
  return <Card title="Quase lá!" subtitle="Só mais uma coisinha">
    <Q>Tem algo essencial que a gente não perguntou?</Q>
    <Input rows={4} value={d.extra || ''} onChange={v => d.update ? d.update('extra', v) : null} placeholder="" />
    <div style={{ marginTop: 8, padding: 12, borderRadius: 12, background: '#f5f5f7', fontSize: 13, color: '#86868b' }}>
      {leadId ? `Lead: ${leadId.slice(0, 20)}...` : '⚠️ Sessão não identificada. O briefing será salvo sem vínculo com sua compra.'}
    </div>
    {error && <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: '#fff2f0', color: '#cf1322', fontSize: 13 }}>{error}</div>}
    <button onClick={submit} disabled={sending}
      style={{ width: '100%', marginTop: 20, padding: '16px 24px', borderRadius: 12, border: 'none', background: '#0071e3', color: 'white', fontSize: 16, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.6 : 1 }}>
      {sending ? 'Enviando...' : 'Enviar briefing →'}
    </button>
  </Card>
}
