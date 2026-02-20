# cloneTabNews

Este projeto é para fixação dos conceitos básicos de desenvolvimento de software. Atualmente, ele evoluiu para se tornar um Portfólio de Desenvolvedor e uma Plataforma de Comunidade, construído com tecnologias modernas.

## 🚀 Tecnologias Utilizadas

- **Frontend & Backend**: [Next.js](https://nextjs.org/) (React)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Estilização**: CSS Modules puros com design moderno e premium
- **E-mails**: [Resend](https://resend.com/)
- **Infraestrutura Local**: Docker & Docker Compose
- **Testes**: Jest
- **Migrações**: node-pg-migrate

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos
- Node.js (versão 18+ recomendada)
- Docker e Docker Compose instalados

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Otavio17061992/cloneTabNews.git
   cd cloneTabNews
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Suba os serviços de infraestrutura (Banco de Dados)**
   ```bash
   npm run services:up
   ```

4. **Rode as migrações do banco de dados**
   Isso criará as tabelas e inserirá os dados iniciais.
   ```bash
   npm run migration:up
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. O projeto estará rodando em [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Comandos Úteis (Scripts)

- `npm run dev`: Sobe o banco de dados via Docker e inicia o Next.js no modo de desenvolvimento.
- `npm run services:up`: Sobe apenas os containers do Docker.
- `npm run services:stop`: Para os containers do Docker sem destruí-los.
- `npm run services:down`: Destrói os containers do Docker.
- `npm run migration:create <nome>`: Cria um novo arquivo de migração.
- `npm run migration:up`: Executa todas as migrações pendentes no banco local.
- `npm run test`: Roda a suíte de testes de integração.
- `npm run lint:check` e `npm run lint:fix`: Verifica e corrige a formatação do código usando Prettier.

## 🧑‍💻 Autor

Desenvolvido por **João Mesquita** (Otávio17061992).
