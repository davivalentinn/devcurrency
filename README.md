# 🪙  DEVCURRENCY

Uma aplicação web feita em **React + TypeScript** que consome a API da [CoinCap](https://coincap.io/) para exibir informações em tempo real sobre criptomoedas. O usuário pode buscar moedas, visualizar listas paginadas e acessar detalhes individuais de cada criptoativo.

## 🚀 Funcionalidades

- 📄 **Home**
  - Lista as criptomoedas mais populares com nome, símbolo, valor de mercado, preço, volume e variação de 24h.
  - Campo de busca para navegar diretamente até os detalhes de uma moeda específica.
  - Botão "Carregar mais" para paginação dinâmica via `offset`.

- 🔍 **Details**
  - Página com informações detalhadas da criptomoeda escolhida.
  - Mostra nome, símbolo, imagem, preço atual, valor de mercado, volume negociado e variação nas últimas 24h.

- ❌ **NotFound**
  - Página exibida quando a rota acessada não existe.
  - Inclui link para retornar à página principal.

## 🧱 Tecnologias Utilizadas

- **React** (com Hooks)
- **TypeScript**
- **React Router DOM** (`useNavigate`, `useParams`, `Link`)
- **CoinCap API** (com autenticação por token)
- **CSS Modules** para estilização local
- **Intl.NumberFormat** para formatação de valores monetários e compactos

## 🚀 Deploy
https://davivalentinn.github.io/devcurrency/
