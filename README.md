# 💰 FinTrack - API de Controle Financeiro Pessoal

FinTrack é uma API robusta desenvolvida em Node.js para gestão de finanças pessoais. O sistema permite o controle de múltiplas contas bancárias, registro de transações (receitas e despesas), categorização inteligente e visualização de resumos mensais (Dashboard).

## 🚀 Tecnologias Utilizadas

- **Node.js** & **Express** (Framework Web)
- **Prisma ORM** (Modelagem e manipulação de dados)
- **PostgreSQL** (Banco de dados relacional)
- **JWT (JSON Web Token)** (Autenticação e segurança)
- **Bcrypt.js** (Hash de senhas)
- **Docker** (Opcional, para containerização do banco)

## 🛠️ Funcionalidades

- **Autenticação:** Registro e Login com senhas criptografadas.
- **Contas:** Gestão de múltiplas contas (ex: Carteira, Banco Inter, Nubank).
- **Transações:** - Registro de Entradas e Saídas.
  - Atualização automática de saldo (Atomicidade garantida via Prisma Transactions).
  - Filtros por Mês e Ano.
- **Categorias:** Gerenciamento automático com lógica `connectOrCreate`.
- **Dashboard:** Resumo mensal de receitas, despesas e balanço atual.
- **Tratamento de Erros:** Middleware global para respostas padronizadas e seguras.

## 📋 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- PostgreSQL ativo

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/fintrack-api.git](https://github.com/seu-usuario/fintrack-api.git)
   cd fintrack-api
   ```

2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente:**
Crie um arquivo ````.env``` na raiz e preencha conforme o exemplo:
    ```Code snippet
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/fintrack?schema=public"
    JWT_SECRET="sua_chave_secreta_aqui"
    ```

4. **Execute as Migrations do Prisma:**
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5. **Inicie o servidor:**
    ```bash
    npm run dev
    ```

### 📍 Principais Endpoints

Usuários

- ```POST /users/register``` - Cria novo usuário.
- ```POST /users/login``` - Retorna token JWT.

Transações

- ```POST /transactions``` - Registra movimentação (exige Token).
- ```GET /transactions?month=4&year=2026``` - Lista transações filtradas.

Dashboard

- ```POST /transactions``` - Registra movimentação (exige Token).
- ```GET /transactions?month=4&year=2026``` - Lista transações filtradas.

### 🏗️ Estrutura de Pastas

    ```Plaintext
    src/
    ├── controllers/   # Lógica de entrada e resposta das rotas
    ├── services/      # Lógica de negócio e comunicação com banco
    ├── middlewares/   # Filtros de autenticação e erro
    ├── utils/         # Classes de erro e funções auxiliares
    ├── routes/        # Definição das rotas da API
    └── server.js      # Ponto de entrada da aplicação
    ```

### 📄 Licença
Este projeto está sob a licença MIT.