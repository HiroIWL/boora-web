# 🎓 Boora

Boora é uma plataforma educacional voltada para **alunos e professores**, disponível nas versões **web** e **mobile**, ambas consumindo um **único backend centralizado**.  
O sistema permite criação, envio e avaliação de **desafios**, além do gerenciamento de **turmas** e **entregas**.

---

## 🧩 Estrutura Geral

Boora é composta por **três aplicações independentes**, integradas por uma **API única**:

| Projeto             | Descrição                                  | Repositório                                                                |
| ------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| 🌐 **boora-web**    | Interface web (Next.js + TailwindCSS)      | [github.com/HiroIWL/boora-web](https://github.com/HiroIWL/boora-web)       |
| 📱 **boora-mobile** | Aplicativo mobile (Expo + NativeWind)      | [github.com/HiroIWL/boora-mobile](https://github.com/HiroIWL/boora-mobile) |
| ⚙️ **boora-back**   | API central (NestJS + Prisma + PostgreSQL) | [github.com/HiroIWL/boora-back](https://github.com/HiroIWL/boora-back)     |

Tanto o **boora-web** quanto o **boora-mobile** atendem **professores e alunos**, com o mesmo conjunto de funcionalidades e autenticação centralizada via **boora-back**.

---

## ⚙️ Backend — `boora-back`

A API é desenvolvida em **NestJS**, com **Prisma ORM** e **PostgreSQL**.  
Toda a autenticação, controle de roles e lógica de negócios residem aqui.

### 🔐 Autenticação e Roles

-   Autenticação via **JWT**
-   Roles de usuário:
    -   `ALUNO`
    -   `PROFESSOR`
-   Proteção de rotas com **guards** e decorators `@Roles()`

### 🧱 Estrutura de Pastas

```

src/
├─ auth/ → autenticação e geração de tokens JWT
├─ dtos/ → data transfer objects compartilhados
├─ enums/ → enums globais (ex: TipoUsuario)
├─ modules/
│ ├─ desafio/ → lógica de desafios
│ ├─ entrega/ → lógica de entregas
│ ├─ ranking/ → lógica de pontuação
│ ├─ turma/ → controle de turmas
│ └─ usuario/ → controle de usuários
├─ prisma/ → acesso direto ao client do Prisma
├─ app.module.ts
└─ main.ts

```

### 🗄️ Modelagem de Banco (Prisma)

```prisma
model Usuario {
  id              String   @id @default(uuid())
  nome            String
  senha           String
  tipo            TipoUsuario
  codigo_registro String   @unique
  id_turma        String?
  turma           Turma?   @relation(fields: [id_turma], references: [id])
  entregas        Entrega[]
  desafios        Desafio[]
}

model Turma {
  id       String         @id @default(uuid())
  nome     String
  desafios DesafioTurma[]
  alunos   Usuario[]
}

model Desafio {
  id                   String    @id @default(uuid())
  nome                 String
  duracao              Int
  descricao            String
  video_url            String
  nota_maxima          Decimal   @db.Decimal(5, 2)
  ordem                Int       @default(autoincrement())
  id_usuario_professor String
  data_desafio         DateTime?
  professor Usuario        @relation(fields: [id_usuario_professor], references: [id])
  turmas    DesafioTurma[]
  entregas  Entrega[]
}

model Entrega {
  id               String   @id @default(uuid())
  id_desafio       String
  id_usuario_aluno String
  video_url        String
  nota             Decimal? @db.Decimal(5, 2)
  desafio Desafio @relation(fields: [id_desafio], references: [id])
  aluno   Usuario @relation(fields: [id_usuario_aluno], references: [id])
  @@unique([id_desafio, id_usuario_aluno])
}
```

---

## 🌐 Frontend — `boora-web`

Interface web construída com **Next.js (App Router)** e **TailwindCSS**, focada em fornecer a mesma experiência visual e lógica do aplicativo mobile.

### 🔧 Stack

-   **Next.js 14+ (App Router)**
-   **TypeScript**
-   **TailwindCSS**
-   **Axios** + **Context API** para consumo da API
-   **Middleware JWT** para rotas protegidas
-   **Design System compartilhado** com o app mobile

### 📂 Estrutura de Pastas

```
src/
 ├─ app/
 │   ├─ api/            → endpoints internos (Next API routes)
 │   │   ├─ desafios/
 │   │   ├─ entregas/
 │   │   ├─ ranking/
 │   │   ├─ turmas/
 │   │   ├─ login/
 │   │   ├─ logout/
 │   │   ├─ register/
 │   │   └─ me/
 │   ├─ desafios/        → páginas de desafios
 │   ├─ entregas/        → páginas de entregas
 │   ├─ ranking/         → visualização de ranking
 │   ├─ login/           → tela de login
 │   ├─ register/        → tela de cadastro
 │   ├─ select-user/     → seleção de tipo de usuário
 │   ├─ layout.tsx
 │   └─ page.tsx
 ├─ components/          → componentes reutilizáveis (Button, Modal, Typography, Container, etc)
 ├─ context/             → contextos globais (auth, tipo de usuário, etc)
 ├─ lib/                 → funções utilitárias
 ├─ models/              → tipagens e entidades
 ├─ services/            → comunicação com a API
 └─ styles/              → configuração Tailwind e temas
```

---

## 📱 Mobile — `boora-mobile`

Aplicativo desenvolvido com **Expo** e **NativeWind**, mantendo a mesma lógica e fluxo do web.
Utiliza os mesmos contextos, serviços e design system adaptado para React Native.

### 🔧 Stack

-   **Expo (React Native)**
-   **TypeScript**
-   **NativeWind**
-   **Axios + Context API**
-   **Rotas com Expo Router**
-   **Reaproveitamento de UI e serviços do web**

### 📂 Estrutura de Pastas

```
app/
 ├─ desafios/        → listagem e visualização de desafios
 ├─ entregas/        → envio e histórico de entregas
 ├─ ranking/         → ranking geral
 ├─ login/           → tela de login
 ├─ register/        → cadastro
 ├─ select-user/     → escolha do tipo de usuário
 ├─ _layout.tsx
 └─ index.tsx
components/          → componentes reutilizáveis
context/             → contexto global (usuário, auth, etc)
lib/                 → funções utilitárias
services/            → consumo da API
assets/              → imagens e ícones
```

---

## 🔗 Integração entre os Projetos

```
[ boora-web ]        [ boora-mobile ]
        │                     │
        └────────► [ boora-back ] ◄────────┘
                           │
                     [ PostgreSQL ]
```

O **boora-back** centraliza toda a lógica e autenticação,
enquanto o **boora-web** e o **boora-mobile** compartilham código, UI e comportamento.

---

## 🧭 Como Rodar o Web

```bash
# Instalar dependências
yarn install

# Rodar em desenvolvimento
yarn dev

# Build de produção
yarn build && yarn start
```

Crie um arquivo `.env.local` com:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🌍 Deploy

-   Frontend: [https://boora-web.vercel.app](https://boora-web.vercel.app)
-   Backend: [https://boora-back.vercel.app](https://boora-back.vercel.app)

---

## 🧠 Conceitos-Chave

-   **Mesma lógica, múltiplas interfaces:** web e mobile funcionam de forma idêntica.
-   **Design System compartilhado:** Tailwind ↔ NativeWind.
-   **Autenticação JWT:** sessão única e segura.
-   **API única:** centralização de dados e regras de negócio.
-   **Arquitetura modular:** separação clara entre camadas.
