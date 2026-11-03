# Documentação Técnica — Landing Page 02: ERP Sob Medida | ON Solutions Brasil

> Documento gerado após a implementação. Reflete o que foi **efetivamente** construído e testado no projeto, incluindo pendências reais.

---

## 1. Objetivo e escopo

Landing page única, estática, responsiva e orientada a conversão para o serviço de **ERP sob medida** da ON Solutions Brasil. O objetivo central é conduzir o visitante a iniciar uma conversa comercial pelo **WhatsApp** com uma mensagem pré-preenchida.

**Escopo:** exclusivamente esta landing page (LP 02 — ERP Sob Medida). Não há outras páginas, rotas, painel administrativo, CMS, banco de dados ou backend. Não foram reaproveitados textos, desafios ou benefícios da Landing Page 01.

---

## 2. Estrutura de arquivos

| Arquivo | Responsabilidade | Status |
|---|---|---|
| `index.html` | Marcação semântica de todas as seções da página. | Criado |
| `css/styles.css` | Estilos, variáveis de cor, tipografia, responsividade e animações. | Criado |
| `js/main.js` | Comportamentos: WhatsApp dinâmico, origem de anúncios, seleção de desafios, header on-scroll, carrossel, rastreamento. | Criado |
| `assets/img/` | Pasta reservada para os logotipos originais (ver Seção 19 — Pendências). | Vazia |
| `README.md` | Arquivo pré-existente do repositório. | Não modificado |
| `DOCUMENTACAO-LP02-ERP-SOB-MEDIDA.md` | Este documento. | Criado |

---

## 3. Arquitetura

- **Tecnologia:** HTML5 + CSS3 + JavaScript puro (vanilla), sem frameworks nem dependências de build.
- **Justificativa:** o ambiente encontrado continha apenas `README.md` e a pasta `.git`. Não havia framework, `package.json` nem ferramenta de build. A solução mais simples, adequada e fiel à referência é um site estático. Nenhuma arquitetura foi imposta; nenhuma biblioteca pesada foi instalada.
- **Organização:** HTML, CSS e JS foram separados em arquivos próprios para facilitar manutenção (a referência original os concentrava em um único arquivo).
- **Única dependência externa:** a fonte **Poppins** via Google Fonts (`<link>` com `preconnect`). O WhatsApp é acessado por link `wa.me` (sem SDK).

---

## 4. Estrutura da página (ordem das seções)

1. **Header** fixo (logo + telefone + botão Orçamento).
2. **Hero** (badge, título, subtítulo, pontos, selos de confiança, card ilustrativo do WhatsApp).
3. **Dores** (`#dores`) — 4 desafios selecionáveis.
4. **Benefícios** (`#beneficios`) — 4 cards.
5. **Clientes e indicadores** (`#clientes`) — indicadores + carrossel de clientes.
6. **Como funciona** (`#como-funciona`) — 3 passos.
7. **Conversa gratuita** (`#oferta`).
8. **Dúvidas frequentes** (`#duvidas`) — 3 perguntas em `<details>`.
9. **CTA final** (`#conversa`).
10. **Footer**.
11. **Botão fixo de WhatsApp** (barra inferior).

---

## 5. Identidade visual

### Paleta (variáveis CSS em `:root`)
```
--ink:#0B1220  --navy:#0F172A  --bg:#F5F8FB  --line:#E2E8F0
--text:#0F172A --soft:#52627A  --mint:#5EEAD4 --teal:#0D9488
--tealD:#0F766E --wa:#25D366   --waD:#1EBE5B
```
Aplicação conforme a referência: fundos escuros (`--ink`/`--navy`), fundo claro (`--bg`), destaques em turquesa (`--mint`), botões WhatsApp em verde (`--wa`) com hover (`--waD`).

### Tipografia
**Poppins** (pesos 400, 500, 600, 700, 800), carregada via Google Fonts. Fallbacks: `"Segoe UI", system-ui, -apple-system, sans-serif`.

### Elementos gráficos
- Gradientes radiais discretos no Hero e no CTA final.
- Ícones SVG inline nos benefícios, no botão WhatsApp e no check dos desafios.
- `theme-color` `#0B1220`.

---

## 6. Conteúdo

Todo o conteúdo textual comercial foi **preservado** da referência, sem reescrita:

- **Hero:** badge "Orçamento direto no WhatsApp"; título "**ERP sob medida** para a sua empresa"; subtítulo "Financeiro, estoque, compras e vendas em um só sistema."; 3 pontos; selos "Conversa gratuita / Sem compromisso / Resposta pelo WhatsApp".
- **Dores:** 4 desafios específicos de ERP (ver Seção 9).
- **Benefícios:** Financeiro completo; Estoque e compras; Vendas e pedidos; Notas fiscais (com descrições da referência).
- **Indicadores:** 100+ projetos entregues; 50+ clientes ativos; Brasil e exterior.
- **Como funciona:** 3 passos.
- **Oferta:** 3 pontos da conversa gratuita.
- **FAQ:** Quanto custa? / Vocês trocam o sistema que eu já uso? / Minha equipe vai conseguir usar?
- **Footer:** assinatura institucional + e-mail `contato@onsolutionsbrasil.com.br`.

Nenhum número, cliente, módulo, integração ou promessa foi inventado.

---

## 7. Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Links WhatsApp | Todos os CTAs com `data-wa` recebem `href` para `wa.me` com mensagem codificada, `target="_blank"` e `rel="noopener"`. |
| Origem de anúncios | Lê `utm_term`/`kw`, `utm_campaign`, `gclid` e anexa "Origem: anúncio \| Termo … \| Campanha …" à mensagem quando presentes. Controlado por `ON_APPEND_ORIGIN = true`. |
| Seleção de desafios | Cada desafio é um botão com `aria-pressed`; seleção múltipla, marca/desmarca. |
| Mensagem dinâmica | Atualiza todos os botões `data-wa-main` e a prévia do card do Hero conforme a seleção. |
| Header on-scroll | Esconde ao rolar para baixo, reaparece ao rolar para cima; sempre visível próximo ao topo e ao receber foco. |
| Carrossel de clientes | Loop infinito suave; pausa ao toque; respeita `prefers-reduced-motion`. |
| FAQ | `<details>`/`<summary>` nativos (expansível, acessível por teclado). |
| Rastreamento | GTM/GA4/Google Ads carregados **apenas** se houver ID configurado. |

---

## 8. WhatsApp

- **Número:** `5511972243329`.
- **Link-base:** `https://wa.me/5511972243329?text=...` com `encodeURIComponent()`.
- **Mensagem padrão:** `Olá, vim do site e gostaria de saber mais sobre os serviços de ERP Personalizado.`
- **Mensagem com 1 desafio:** acrescenta ` Meu maior desafio hoje: [desafio].`
- **Mensagem com vários:** acrescenta ` Meus maiores desafios hoje: [a]; [b]; [c].`
- **Sincronização:** os 3 pontos de contato principais usam `data-wa-main` (telefone do topo, botão Orçamento do header, botão fixo) e são atualizados juntos.
- **Origem:** anexada ao final da mensagem quando há parâmetros de anúncio.

Verificado via Node: mensagens padrão, com um e com vários desafios geradas corretamente e corretamente codificadas na URL.

---

## 9. Seleção de problemas

Opções (específicas de ERP, preservadas exatamente):
1. Meus setores não conversam entre si.
2. Fecho o mês no sufoco.
3. Não sei qual é o meu lucro de verdade.
4. O ERP pronto me obriga a mudar meu processo.

- **Funcionamento:** cada opção é um `<button aria-pressed>` dentro de um `role="group"`. Seleção múltipla; clicar novamente desmarca.
- **Prévia:** o balão do Hero (`data-bubble`) reflete a mensagem atual.
- **Feedback (`data-hint`, `aria-live="polite"`):** vazio quando nada selecionado; "Pronto! Agora toque em …" com 1; "Você marcou N. Isso tem solução: …" com vários.
- **Reset:** ao mudar o hash da URL, as seleções e o texto auxiliar são limpos.

---

## 10. Clientes e indicadores

- **Indicadores:** 100+ / 50+ / Brasil e exterior (valores da referência).
- **Carrossel:** faixa horizontal com loop infinito (o JS duplica os itens), velocidade proporcional à largura (`--dur`), pausa ao toque, desativado sob `prefers-reduced-motion`.
- **Logotipos:** os nomes exibidos são Braziliana, Quatri Automação, Brooks Construtora, CrossHR, MultiLife Care, Mafedo Engenharia e Central RZ.

> **Importante (ver Seção 19):** nesta entrega os seis primeiros clientes estão representados pelo **wordmark textual** (mesmo padrão `.wm` que a referência já usa para "Central RZ"), e **não** pelos logotipos raster originais. Isso é uma pendência documentada, não uma substituição definitiva.

---

## 11. Rastreamento

Estrutura preparada, **desativada por padrão** (nada é carregado com os campos vazios):
```js
var ON_TRACKING = { gtmId: "", ga4Id: "", gadsId: "", gadsConversionLabel: "" };
```
- **GTM:** injetado só se `gtmId` preenchido.
- **GA4 / Google Ads:** `gtag.js` injetado só se houver `ga4Id` ou `gadsId`.
- **Eventos:** `whatsapp_click` (com `service` e `position`) em todo clique para `wa.me`; `generate_lead` quando `gtag` existe; `conversion` do Google Ads quando há `gadsId` + `gadsConversionLabel`.
- **Posições:** `data-pos="topo"`, `data-pos="topo-telefone"`, `data-pos="barra-fixa"`.
- **Sem IDs fictícios.** Não há disparos sem ação do usuário.

---

## 12. Responsividade

Breakpoints preservados da referência:
- `max-width:430px` — oculta a seta do CTA, ajusta padding/fonte.
- `max-width:400px` — oculta o complemento " Brasil" da marca (`.br`).
- `max-width:380px` e `max-width:340px` — ajustes finos de CTA e largura do container.
- `min-width:860px` — layout desktop: Hero em 2 colunas, benefícios em 4 colunas, passos/indicadores em 3 colunas, oferta em 2 colunas.

Container `.w` com largura fluida (`min(1120px, 100% - margem)`), `overflow-x:hidden` no body para evitar rolagem horizontal. Botão fixo respeita `env(safe-area-inset-bottom)`.

---

## 13. SEO e metadados

- **Title:** `ERP Sob Medida | ON Solutions Brasil`
- **Description:** `Financeiro, estoque, compras e vendas em um só sistema.`
- **Canonical:** `https://onsolutionsbrasil.com.br/lp/erp-sob-medida/`
- **Robots:** `noindex,follow` (preservado — não alterado).
- **theme-color:** `#0B1220`
- `lang="pt-BR"`, charset UTF-8, meta viewport com `viewport-fit=cover`.
- Hierarquia de headings: um `<h1>` (Hero), `<h2>` por seção.

---

## 14. Acessibilidade

- HTML semântico (`header`, `main`, `section`, `footer`, `button`, `details`).
- `aria-pressed` nos desafios; `aria-live="polite"` no feedback; `aria-label` no grupo de desafios e no carrossel; `aria-hidden` em ícones e itens duplicados do carrossel.
- `:focus-visible` com contraste (turquesa em fundos escuros).
- FAQ navegável por teclado (nativo).
- `prefers-reduced-motion`: desativa animações e o carrossel automático.
- Marcas textuais da ON e dos clientes marcadas com `aria-hidden`/texto legível conforme o caso.

> Validação completa de conformidade WCAG exige testes manuais com tecnologias assistivas e revisão especializada.

---

## 15. Performance

- CSS e JS externos e enxutos; sem bibliotecas.
- Uma única requisição de fonte externa (Poppins) com `preconnect`.
- **Sem imagens raster na entrega atual** — favicon e marcas são SVG/CSS, o que reduz drasticamente o peso da página (HTML ≈ 11 KB).
- Ícones em SVG inline; carrossel usa `will-change` e animação CSS.
- Sem scripts duplicados; JS encapsulado em IIFE.

---

## 16. Execução (local)

Por ser site estático, basta abrir `index.html` no navegador. Para ambiente idêntico ao de produção (caminhos relativos e fontes), use um servidor local:

```powershell
# Opção 1 (Python)
python -m http.server 8080
# Opção 2 (Node)
npx serve .
```
Depois acesse `http://localhost:8080`.

---

## 17. Manutenção

| O que alterar | Onde |
|---|---|
| Telefone exibido | `index.html` (texto do `.top-phone`). |
| Número do WhatsApp | `js/main.js` → `WA_NUMBER`. |
| Mensagem padrão / serviço | atributo `data-service` no `<main>` e textos `data-wa`. |
| Textos comerciais | `index.html` (seções correspondentes). |
| Cores / tipografia / espaçamentos | `css/styles.css` (variáveis em `:root` e regras). |
| IDs de rastreamento | `js/main.js` → objeto `ON_TRACKING`. |
| Logotipos dos clientes / da ON | ver Seção 19 (substituir marcas textuais pelos arquivos em `assets/img/`). |

---

## 18. Checklist de testes (resultados reais)

| Teste | Método | Resultado |
|---|---|---|
| Sintaxe do JavaScript | `node --check js/main.js` | OK, sem erros |
| Balanceamento de chaves CSS | contagem `{` vs `}` | 161 = 161 (balanceado) |
| Balanceamento de tags HTML | contagem de abre/fecha | section 8/8, div 64/64, details 3/3, button 4/4 |
| Mensagem WhatsApp padrão | simulação em Node | gerada corretamente |
| Mensagem com 1 desafio | simulação em Node | "Meu maior desafio hoje: …" correto |
| Mensagem com vários desafios | simulação em Node | "Meus maiores desafios hoje: …" correto |
| Codificação da URL | `encodeURIComponent` em Node | URL `wa.me` válida e codificada |
| Ausência de Base64 corrompido no HTML | varredura por `base64` | 0 ocorrências |
| CSS e JS referenciados | varredura no HTML | ambos presentes |

> **Não testado em navegador real nesta sessão** (ambiente sem navegador): comportamentos visuais de scroll, animações, carrossel e abertura efetiva do WhatsApp foram validados por análise estática/lógica, não por execução no navegador. Recomenda-se um teste manual final (ver Seção 20).

---

## 19. Pendências

1. **Logotipos raster originais (ON Solutions + 6 clientes).**
   - **Situação:** o arquivo de referência traz esses logotipos embutidos em Base64. Por uma **limitação técnica real da ferramenta de escrita** desta sessão (não foi possível emitir com segurança as strings Base64 muito longas — elas interrompiam o fluxo de escrita), esses PNGs **não puderam ser externalizados nem mantidos inline sem risco de corromper os dados**.
   - **O que foi feito:** para não deixar a página quebrada nem inventar imagens aleatórias, o logotipo da ON (header e card) e os seis clientes foram representados por **marcas textuais** (`.brand-mark`, `.chat-mark` e o padrão `.wm` que a própria referência já usa para "Central RZ"). O favicon foi substituído por um SVG inline "ON" na cor da marca.
   - **Como restaurar os originais (recomendado):**
     1. Coloque o arquivo de referência `02-lp-erp-sob-medida.html` na raiz do projeto.
     2. Rode o comando abaixo no PowerShell (extrai cada `data:image/png;base64,...` e grava os PNGs em `assets/img/`):
        ```powershell
        $html = Get-Content 02-lp-erp-sob-medida.html -Raw
        $nomes = @('favicon','on-solutions-logo','cliente-braziliana','cliente-quatri-automacao','cliente-brooks-construtora','cliente-crosshr','cliente-multilife-care','cliente-mafedo-engenharia')
        $i = 0
        [regex]::Matches($html,'data:image/png;base64,([A-Za-z0-9+/=]+)') | ForEach-Object {
          $bytes = [Convert]::FromBase64String($_.Groups[1].Value)
          $nome = if ($i -lt $nomes.Count) { $nomes[$i] } else { "img-$i" }
          [IO.File]::WriteAllBytes("assets/img/$nome.png", $bytes)
          $i++
        }
        ```
     3. No `index.html`, troque as marcas textuais pelos `<img>`:
        - Header: `<span class="brand-mark">ON</span>` → `<img src="assets/img/on-solutions-logo.png" alt="" width="32" height="32">`
        - Card: `<span class="chat-mark">ON</span>` → `<img src="assets/img/on-solutions-logo.png" alt="" width="38" height="38">`
        - Cada `<div class="chip"><span class="wm">Nome</span></div>` dos seis clientes → `<div class="chip"><img src="assets/img/cliente-XXXX.png" alt="Logo Nome" decoding="async"></div>`
     4. (Opcional) Troque o favicon SVG pelo `assets/img/favicon.png`.
   - **Observação:** o CSS do `.chip` já está dimensionado para os logotipos originais (`max-width:136px; max-height:42px; object-fit:contain`), então os PNGs entram sem ajustes.

2. **Links legais do rodapé** ("LGPD e proteção de dados", "Política de privacidade"): permanecem como `href="#"`, exatamente como na referência. Não existem páginas/destinos reais no projeto. Não foram inventadas URLs. Preencher quando os documentos existirem.

3. **IDs de rastreamento (GTM/GA4/Google Ads):** vazios por padrão. Preencher `ON_TRACKING` em `js/main.js` quando houver contas configuradas.

---

## 20. Observações técnicas

- **Decisão de arquitetura:** site estático puro, coerente com o ambiente vazio encontrado e com a referência.
- **Separação de camadas:** HTML/CSS/JS divididos para manutenção; comportamento idêntico ao do arquivo único da referência.
- **Marcas textuais vs. logotipos raster:** escolha conservadora diante da limitação técnica de escrita das imagens Base64. Usou-se o padrão de fallback que a própria referência já adota (`.wm`), evitando imagens aleatórias e elementos quebrados. A Seção 19 traz o caminho exato de restauração.
- **Favicon:** originalmente um PNG Base64 que ficou corrompido na primeira escrita por conta do limite de tamanho; foi substituído por um favicon SVG inline leve e válido para não enviar um `data:` malformado.
- **Teste em navegador:** recomenda-se, antes da publicação, abrir a página localmente (Seção 16) e conferir em diferentes resoluções (desktop grande, notebook, tablet, celular e celular pequeno) o header on-scroll, o carrossel, a seleção de desafios, a prévia da mensagem e a abertura do WhatsApp.
