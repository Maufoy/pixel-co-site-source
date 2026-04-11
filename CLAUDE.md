# Pixel.Co Site — Contexto do Projeto

## 1. Contexto do Projeto

- **Stack:** Next.js 14 (App Router) + Tailwind CSS v3 + Framer Motion + Lucide React
- **Repositório:** https://github.com/Maufoy/pixel-co-site
- **GitHub Pages:** https://maufoy.github.io/pixel-co-site
- **Brand:** Pixel.Co — "Do pixel à escala."
- **Posicionamento:** Empresa de inteligência digital premium para empresários estabelecidos
- **Arquétipo:** O Mago (principal) + O Sábio (secundário)
- **Modo visual padrão:** Light Mode First (v2)

---

## 2. Taste Skill — Leitura Obrigatória

Antes de qualquer alteração visual, leia obrigatoriamente:

```
/root/.agents/skills/design-taste-frontend/SKILL.md
```

Nenhuma decisão de design deve ser tomada sem ter esse arquivo como referência.

---

## 3. Configurações da Taste Skill para a Pixel.Co

- **DESIGN_VARIANCE: 7** — Layouts assimétricos, hero left-aligned, grid com espaços vazios intencionais. Não centrado. Não simétrico. Referência visual: Monocle, Financial Times, Hermès digital.
- **MOTION_INTENSITY: 6** — Transições fluidas com cubic-bezier premium. Fade-up no scroll. Hover states com spring physics. Sem exagero cinematográfico.
- **VISUAL_DENSITY: 3** — Art Gallery Mode. Espaço generoso. Tudo respira. Cada elemento tem espaço para existir.

---

## 4. Tokens Visuais da Marca

### Paleta de Cores (sistema completo)

**Pixel Black** (H=20°, S variável — tom quente, não neutro puro)

| Token | HEX | Uso |
|---|---|---|
| `--color-black-100` | `#F8F7F6` | Fundo light mode principal (off-white quente) |
| `--color-black-200` | `#E6E5E3` | Superfícies secundárias light mode / bordas |
| `--color-black-300` | `#C0BFBD` | Bordas sutis, texto desabilitado |
| `--color-black-400` | `#8C8B89` | Texto secundário, labels, metadados |
| `--color-black-500` | `#616059` | Texto terciário, placeholders |
| `--color-black-600` | `#3D3C38` | Bordas dark mode, ícones secundários |
| `--color-black-700` | `#262523` | Superfícies secundárias dark mode (cards) |
| `--color-black-800` | `#141312` | Superfície primária dark mode |
| `--color-black-900` | `#0A0909` | Pixel Black — fundo deep dark / texto máximo |

**Pixel Gold** (H=42° fixo — dourado âmbar queimado — COR PRIMÁRIA v2)

| Token | HEX | Uso |
|---|---|---|
| `--color-gold-100` | `#FCF6E8` | Fundo sutil, callouts, highlights suaves |
| `--color-gold-200` | `#F5E8C9` | Hover bg leve, superfícies de destaque sutil |
| `--color-gold-300` | `#E8D29E` | Ícones ativos light mode |
| `--color-gold-400` | `#DEBB6A` | CTAs hover em light mode, badges |
| `--color-gold-500` | `#C4962A` | **COR BASE — CTA principal, border-left, linha de acento** |
| `--color-gold-600` | `#A1791D` | Hover state de CTAs e botões |
| `--color-gold-700` | `#7A5B12` | Estados pressionados (active) |
| `--color-gold-800` | `#523C0A` | Destaque em dark mode profundo |
| `--color-gold-900` | `#2E2205` | Fundo sutil dark mode |

**Pixel Cyan** (H=192° — ACENTO SECUNDÁRIO — uso restrito)

> Removido do papel de acento primário na v2. Uso restrito: dashboards, dados técnicos, contextos internos. NÃO usar como CTA, border-left ou linha de acento de marca.

| Token | HEX | Uso |
|---|---|---|
| `--color-cyan-500` | `#00D4FF` | Cor base — restrito a dados técnicos |

### Tokens Semânticos (Light Mode — padrão)

```css
--bg-primary:      #F8F7F6;   /* off-white quente — fundo principal */
--bg-surface:      #FFFFFF;   /* cards, modais, painéis */
--bg-elevated:     #EDEDED;   /* superfícies elevadas, separação de seção */
--text-primary:    #0A0909;   /* Pixel Black — autoridade máxima */
--text-secondary:  #6B6B6B;   /* labels, metadados, descrições de suporte */
--text-disabled:   #BFBFBF;   /* texto inativo */
--border:          #E6E5E3;   /* borda de 0.5px — define sem pesar */
--border-strong:   #C0BFBD;   /* borda com ênfase */
--cta:             #C4962A;   /* Pixel Gold — CTA principal */
--cta-hover:       #A1791D;   /* hover de CTA */
--cta-text:        #FFFFFF;   /* branco sobre dourado */
--accent-subtle:   #FCF6E8;   /* bg sutil de callouts */
--accent-line:     #C4962A;   /* linha de acento, border-left de cards */
```

### Liquid Glass (elemento visual proprietário — uso restrito)

```css
--glass-bg:     rgba(255, 255, 255, 0.7);
--glass-blur:   blur(12px);
--glass-border: 0.5px solid rgba(0, 0, 0, 0.08);
--glass-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.9);
```

> Reservar para: navbar, cards de serviço, elementos flutuantes. NÃO aplicar em todos os elementos.

### Tipografia

| Nível | Fonte | Tamanho | Peso | Line-height |
|---|---|---|---|---|
| Headline / H1 | DM Sans | `clamp(32px, 4.4vw, 64px)` | 800 ExtraBold | 0.90 |
| Subhead / H2 | DM Sans | 21px | 700 Bold | 1.15 |
| Body / P | DM Sans | 11px | 400 Regular | 1.40 |
| Acento editorial | News Reader | livre | 400 Italic | — |

- **Font primária:** `'DM Sans'` — estrutural, headlines, body
- **Font de acento:** `'News Reader'` italic — máximo 1–2 palavras por bloco. Nunca ocupa uma linha inteira.
- **Tracking headline:** `-0.02em` (negativo para densidade e impacto)
- **Tracking body:** `0`

### Espaçamento

- **Margem desktop:** 58px (`1440 ÷ 25`)
- **Margem mobile:** 34px (`844 ÷ 25`)
- **Logo width desktop:** 116px (2× margem)
- **Logo width mobile:** 68px (2× margem)
- **Gap headline → subhead:** 58px desktop / 34px mobile
- **Section gap:** `clamp(80px, 8vw, 120px)`
- **Page margin:** `min(5vw, 80px)`
- **Component padding:** `clamp(24px, 2.5vw, 40px)`
- **Grid base unit:** 8px (todos os espaçamentos são múltiplos de 8)

### Border Radius

- `--radius-sm: 4px` — botões pequenos, badges, tags
- `--radius-md: 8px` — cards, inputs, caixas de conteúdo

---

## 5. Regras Visuais Invioláveis

### Tipografia
- NUNCA usar Inter como fonte — DM Sans é a fonte aprovada para este brand system
- News Reader italic é acento — máximo 1–2 palavras, nunca estrutural
- Headlines: `tracking-tighter`, `leading-none`, `font-extrabold`
- Body: `leading-relaxed`, `max-w-[65ch]`, `text-base`

### Cores
- NUNCA usar `#000000` puro — usar `#0A0909` (Pixel Black com tom quente)
- Pixel Gold (`#C4962A`) é o único acento de marca — CTAs, border-left, linhas de acento
- Pixel Cyan (`#00D4FF`) é restrito a dashboards e dados técnicos — NUNCA em UI de marca
- NUNCA gradientes de marca (exceto pixel-grid pattern com opacity máxima de 0.04–0.05)
- Liquid Glass: somente navbar, cards de serviço e elementos flutuantes

### Layout
- Hero SEMPRE left-aligned — NUNCA centrado
- NUNCA 3 cards iguais em linha — usar grid assimétrico (2-1, 1-2, etc.)
- Usar CSS Grid com fractional units
- Margens baseadas nos tokens matemáticos: 58px desktop / 34px mobile
- O modo padrão é Light Mode — dark mode é variante para contextos específicos

### Animações
- Spring physics em todos os elementos interativos
- `staggerChildren` para listas e grids
- Fade-up para elementos entrando na viewport
- Magnetic hover nos CTAs principais
- NUNCA animar `top` / `left` / `width` / `height` — apenas `transform` e `opacity`

### Proibições absolutas
- Sem emojis em nenhum lugar
- Sem neon glows ou box-shadow excessivo
- Sem 3 cards iguais horizontais
- Sem nomes fictícios genéricos (João Silva, Maria Souza, etc.)
- Sem `h-screen` — usar `min-h-[100dvh]`
- Sem Inter font

---

## 6. Arquivos de Referência da Marca

| Arquivo | Conteúdo |
|---|---|
| `/root/brand-system/output/pixel-co/03-brand-identity-v2.md` | Identidade completa: posicionamento, arquétipo, personalidade, tom de voz |
| `/root/brand-system/output/pixel-co/04-design-tokens-v2.md` | Sistema de tokens completo (Jack Watson): cores HSB, tipografia, espaçamento |
| `/root/brand-system/output/pixel-co/copy/00-diretrizes-copy.md` | Diretrizes de copy: modelo emocional, tom, vocabulário, proibições |
| `/root/brand-system/output/pixel-co/07-site-deploy.md` | Relatório de deploy: URL, arquivos criados, status |
| `/root/.agents/skills/design-taste-frontend/SKILL.md` | Taste Skill: padrões de design de alto nível (leitura obrigatória antes de alterar visual) |

---

## 7. Componentes e Funções

| Arquivo | Função |
|---|---|
| [components/Nav.tsx](components/Nav.tsx) | Navegação sticky com Liquid Glass ao scroll. Logo (116px desktop / 68px mobile). CTA pill "Começar diagnóstico". |
| [components/Hero.tsx](components/Hero.tsx) | Seção principal. Layout assimétrico left-aligned. Headline, subhead, CTAs primário e secundário. Pixel-grid pattern no fundo (opacity 0.04). |
| [components/SocialProof.tsx](components/SocialProof.tsx) | 3 métricas em linha horizontal com separadores. Números font-mono tamanho grande. |
| [components/ValueProps.tsx](components/ValueProps.tsx) | Grid assimétrico 2-1. Cards com `border-left: 2px solid #C4962A`. Ícones Lucide. |
| [components/Manifesto.tsx](components/Manifesto.tsx) | Texto corrido de posicionamento, sem cards. Tipografia grande, peso leve, muito espaço. |
| [components/HowItWorks.tsx](components/HowItWorks.tsx) | 3 steps numerados verticalmente com linha conectora. Ícones Lucide por step. |
| [components/CTASection.tsx](components/CTASection.tsx) | Seção de conversão final. Centralizada (exceção aprovada ao anti-center). Pixel-grid pattern. |
| [components/Footer.tsx](components/Footer.tsx) | Logo + tagline "Do pixel à escala." Links. Status badge (ponto pulsante). |
| [components/Services.tsx](components/Services.tsx) | Seção de serviços oferecidos pela Pixel.Co. |
| [components/Cases.tsx](components/Cases.tsx) | Cases de clientes com resultados mensuráveis (números reais). |
| [components/Philosophy.tsx](components/Philosophy.tsx) | Seção de filosofia / valores da marca. |
| [components/About.tsx](components/About.tsx) | Seção institucional sobre a Pixel.Co. |
| [components/FeaturedVideo.tsx](components/FeaturedVideo.tsx) | Componente de vídeo em destaque. |
| [lib/tokens.ts](lib/tokens.ts) | Design tokens exportados como constantes TypeScript para uso nos componentes. |

---

## 8. Workflow de Deploy

```bash
git add .
git commit -m "descrição das alterações"
npm run deploy
```

O comando `npm run deploy` executa `next build && gh-pages -d out` e publica automaticamente na branch `gh-pages`.

**Para verificar o status do deploy:**
```bash
gh repo view Maufoy/pixel-co-site --web
```

**URL do site publicado:**
`https://maufoy.github.io/pixel-co-site`

---

## 9. Diretrizes de Copy

### Tom de voz
Parceiro estratégico sênior conversando com um empresário experiente. Direto, limpo, sem enrolação. Sofisticação vem do visual — o texto é humano.

- **Sério / Casual:** 70% sério, 60% casual (conversa de board, não e-mail corporativo)
- **Direto / Entusiasmado:** 70% direto — entusiasmo se manifesta em resultado, não em exclamação
- **Respeitoso / Irreverente:** 35% irreverente — irreverente com o mercado, nunca com o cliente

### Estrutura emocional obrigatória

Todo bloco de copy que fala diretamente com o cliente deve seguir:
1. **VALIDAR** — reconhecer o que ele já construiu
2. **NOMEAR A IMPACIÊNCIA** — a dor sofisticada, sem culpa
3. **POSICIONAR O PRÓXIMO NÍVEL** — a ambição como destino
4. **ENTREGAR A PROMESSA** — o que a Pixel.Co faz

### Vocabulário da marca (usar)

`Diagnóstico` · `Ecossistema digital` · `Próximo passo` · `Destravar` · `Visão sistêmica`
`Momento do negócio` · `Inteligência aplicada` · `Dados em tempo real` · `Escala` · `Construir`
`Revelar` · `Resultado mensurável` · `Antes de ser pedido` · `Combinação certa` · `Clareza`

### Vocabulário proibido (nunca usar)

| Proibido | Motivo |
|---|---|
| "Agência" | Diminui o posicionamento |
| "Parceria" | Clichê absoluto |
| "Performance" (isolado) | Commodity no segmento |
| "Alavancar" | Clichê de agência |
| "Soluções" | Genérico e vazio |
| "Apaixonados por" | Não verificável |
| "Inovação" (sem demonstração) | Promessa sem prova |
| "Incrível", "Sensacional", "Revolucionário" | Hipérbole sem evidência |
| "Marketing digital" (como auto-identificação) | Diminui o posicionamento |
| "Você está perdendo dinheiro" | Copy de dor de sobrevivência — rejeitado pelo cliente ideal |
| "Pare de errar" | Posiciona o cliente como quem falhou |
| "Elevate", "Seamless", "Next-Gen", "Unleash" | Genérico AI-generated |

### Promessa central
> "Revelamos o tamanho real do seu negócio — e construímos o caminho digital para ele chegar lá."

### Tagline oficial
> "Do pixel à escala."

### Headlines aprovadas para o site
1. "Você já sabe que pode faturar mais. Nós sabemos por onde começar."
2. "Antes de construir, vemos o que está represando o crescimento do seu negócio."
3. "Do diagnóstico ao ecossistema completo — sem precisar trocar de parceiro no meio do caminho."

### Copy de potencialização (sempre)
- "Seu negócio já provou que funciona"
- "O próximo passo"
- "Crescer mais rápido"
- "Clareza sobre o que vem depois"
- "Você sabe que pode mais"
