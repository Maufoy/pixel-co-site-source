# Plano: Quiz Página Express

## Objetivo
Criar um quiz interativo que substitui o lead gate + briefing separado por uma experiência única de vendas. O quiz captura o lead, apresenta o portfólio e já coleta o briefing — tudo em sequência natural.

## Fluxo do Usuário

```
📱 Anúncio Instagram → /pagina-express-v2/
                              ↓
                  Tela inicial: "Qual página profissional
                  combina com você?"
                              ↓
                  P1: "Você já tem uma página profissional?"
                  (Não/Nunca tive | Tenho Linktree | Tenho mas não gosto | Já tive mas saiu do ar)
                              ↓
                  P2: "Qual seu ramo?"
                  (Psicologia | Advocacia | Nutrição | Arquitetura | Consultoria | Outro)
                              ↓
                  🖼️ Mostra portfólio filtrado pelo ramo
                  "Veja páginas que fizemos para [ramo] como a sua:"
                              ↓
                  P3: "Qual dessas páginas mais combina com você?"
                  (escolhe uma das 4-6 páginas mostradas)
                              ↓
                  "Boa escolha! Essa página ficou pronta em 3 dias.
                   Quer uma igual pra você?"
                              ↓
                  P4: "Qual seu maior desafio?"
                  (Não consigo atrair clientes | Não tenho tempo de criar |
                   Já tentei e desisti | Outro)
                              ↓
                  📥 CAPTURA DE LEAD
                  "Pra gente preparar sua página personalizada:
                   Qual seu nome? Qual seu WhatsApp?"
                              ↓
                  Briefing leve (5 perguntas):
                  P5: "Como quer ser chamado na página?"
                  P6: "Tem alguma cor preferida?"
                  P7: "Já tem domínio?"
                  P8: "Tem logo?"
                  P9: "Algo mais que queira contar?"
                              ↓
                  ✅ TELA FINAL
                  "Briefing recebido! Em até 1h útil
                   a gente confirma no WhatsApp."
```

## Estrutura Técnica

### Novo diretório
- `public/pagina-express-v2/index.html` — Página única do quiz (SPA-like, CSS+JS inline)

### Rotas
- Next.js redirect em `next.config.js`:
  ```
  source: '/pagina-express-v2/',
  destination: '/pagina-express-v2/index.html',
  ```

### APIs existentes (reutilizar)
- `POST /api/lead` — já envia lead + CAPI + WhatsApp ✅
- `POST /api/briefing` — já salva briefing completo ✅

### Eventos
- **PageView** — eventID `quiz-pv-{uuid}` → GTM (PageView) + CAPI ✅
- **Lead** (captura nome/whatsapp) — eventID `quiz-lead-{uuid}` → GTM (Lead) + CAPI ✅
- **QuizStep** (opcional) — a cada pergunta respondida, dataLayer.push pra GTM (se quiser medir abandono)

## Design

### Tom visual
- **Diferente da landing page** — mais lúdico, interativo, "game feel"
- Fundo mais claro ou gradiente suave (não o verde escuro da LP)
- Cards grandes pra escolher (tipo escolha múltipla visual)
- Transições suaves entre perguntas (slide/fade)
- Barra de progresso visível

### Paleta sugerida
- Fundo: gradiente suave (ex: `#F8F7F6` → `#E8F0EA`)
- Cards: branco com borda sutil
- Acento: manter verde Pixel (`#002D25` / `#C1D66D`) pra consistência de marca
- Tipografia: Sora (mesma da LP)

### Portfólio
- Grid de 2x2 ou 3x2 com screenshots das páginas reais
- Cada card: screenshot + nome do profissional + ramo
- Ao clicar, expande ou seleciona
- Filtro por ramo (P2 define quais mostrar)

## Etapas de Implementação

1. **Criar arquivo base** (`quiz/index.html`) com estrutura HTML + CSS responsivo
2. **Implementar navegação do quiz** em JS (step-based, progress bar, transições)
3. **Adicionar grid de portfólio** com as imagens existentes em `public/pagina-express-v1/portfolio/`
4. **Implementar lead capture** (P5) → POST `/api/lead`
5. **Implementar briefing leve** (P6-P9) → POST `/api/briefing`
6. **Adicionar eventos** (PageView, Lead, Step tracking) no dataLayer
7. **Configurar rota** no `next.config.js`
8. **Adicionar imagens de portfólio** se não existirem no formato correto
9. **Testar** fluxo completo: quiz → lead → briefing → CAPI

## Arquivos a serem criados/modificados

| Arquivo | Ação |
|---------|------|
| `public/pagina-express-v2/index.html` | 🆕 Criar (quiz completo) |
| `next.config.js` | 🔧 Adicionar redirect |
| `public/pagina-express-v1/portfolio/` | 🔧 Imagens reutilizadas (copiar pro v2) |

## Validação

- ✅ Fluxo completo no navegador (localhost:3000/pagina-express-v1/quiz/)
- ✅ Lead chega no `/api/lead` (CAPI + WhatsApp + .md)
- ✅ Briefing chega no `/api/briefing` (.md)
- ✅ Meta Events Manager: Lead recebido com eventId correto
- ✅ Responsivo mobile (maioria do tráfego Instagram)

## Riscos e Abertos

- **Imagens de portfólio**: precisam estar em formato leve (webp, ~200KB cada) pra não pesar o carregamento
- **Briefing híbrido**: o quiz coleta briefing incompleto (5 perguntas). O `POST /api/briefing` aceita payload parcial? Verificar schema da API
- **Abandono**: se o usuário sair no meio do quiz, podemos recuperar via WhatsApp com os dados parciais (localStorage)
- **CTA do anúncio**: o anúncio do Instagram precisa apontar pra `/pagina-express-v1/quiz/` em vez da landing page atual
