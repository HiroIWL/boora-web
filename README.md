o **boora-web** e o **boora-mobile** são **duas interfaces da mesma aplicação**, voltadas tanto para **alunos** quanto **professores**, consumindo o **mesmo backend (boora-back)**. o backend faz toda a gestão de autenticação, roles e dados.
ou seja:
**web = versão desktop**
**mobile = versão app**
**back = api única**

a seguir, o README corrigido, direto e limpo pra pôr no repositório **boora-web**:

---

````markdown
# 🎓 Boora

Boora é uma plataforma educacional completa para **alunos e professores**, disponível em versão **web** e **mobile**, com um único backend centralizado.  
O sistema permite criação, envio e avaliação de **desafios**, além de gerenciamento de **turmas** e **entregas**.

---

## 🧩 Estrutura do Projeto

Boora é formado por **três repositórios** independentes que se integram entre si:

| Projeto             | Descrição                                  | Repositório                                                                |
| ------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| 🌐 **boora-web**    | Interface web (Next.js + TailwindCSS)      | [github.com/HiroIWL/boora-web](https://github.com/HiroIWL/boora-web)       |
| 📱 **boora-mobile** | Aplicativo mobile (Expo + NativeWind)      | [github.com/HiroIWL/boora-mobile](https://github.com/HiroIWL/boora-mobile) |
| ⚙️ **boora-back**   | API central (NestJS + Prisma + PostgreSQL) | [github.com/HiroIWL/boora-back](https://github.com/HiroIWL/boora-back)     |

Tanto o **boora-web** quanto o **boora-mobile** atendem **professores e alunos**, compartilhando as mesmas regras de negócio e comunicação com a **API única**.

---

## ⚙️ Backend

A API (**boora-back**) é construída em **NestJS** com **Prisma ORM** e **PostgreSQL**.

### 🔐 Autenticação e Roles

-   Baseada em **JWT**
-   Usuários com roles:
    -   `ALUNO`
    -   `PROFESSOR`
-   Rotas protegidas via `@Roles()` e guards personalizados

### 🗄️ Estrutura de Banco (Prisma)

Modelagem principal:

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
````

---

## 🌐 Frontend (boora-web)

Interface feita com **Next.js** e **TailwindCSS**.
Focada em oferecer a mesma experiência que o aplicativo mobile, adaptada para navegador.

### 🔧 Stack

-   **Next.js (App Router)**
-   **TypeScript**
-   **TailwindCSS**
-   **JWT Auth Middleware**
-   **Axios + Context API** para comunicação com a API
-   **Design System próprio** compartilhado com o app mobile

### 📁 Estrutura

```
src/
 ├─ components/     → componentes reutilizáveis (Button, Container, Modal, Typography...)
 ├─ hooks/          → hooks compartilhados (auth, userType, etc)
 ├─ context/        → contexto global (usuário, tema, etc)
 ├─ lib/            → funções utilitárias
 ├─ styles/         → configuração Tailwind e tokens de cor
 └─ pages/          → rotas principais
```

### 🎨 Design System

O design system é baseado em **Tailwind**, refletido também no mobile via **NativeWind**.
Isso permite que ambos (web e app) usem a mesma base de componentes e estilos, com comportamento idêntico.

---

## 📱 Mobile (boora-mobile)

Aplicativo em **Expo**, com a mesma lógica e experiência do boora-web.
Utiliza **NativeWind** para estilização e os mesmos padrões de UI do front web.

-   Framework: **React Native / Expo**
-   Estilo: **NativeWind**
-   Integração direta com a **API do boora-back**
-   Reuso de lógica e design system do web

---

## 🔗 Integração entre os Projetos

```
[ boora-web ]        [ boora-mobile ]
        │                     │
        └────────► [ boora-back ] ◄────────┘
                           │
                     [ PostgreSQL ]
```

Todos os dados (usuários, turmas, desafios, entregas) passam pelo **boora-back**, que controla permissões e roles.
O front (web e mobile) apenas consome e exibe os dados, mantendo paridade de funcionalidades.

---

## 🧠 Conceitos-Chave

-   **Código unificado:** mesmo domínio, diferentes interfaces.
-   **Design system compartilhado:** Tailwind ↔ NativeWind.
-   **Autenticação JWT**: um único login para todas as plataformas.
-   **Controle de roles**: `ALUNO` e `PROFESSOR` com permissões distintas.
-   **Backend centralizado:** API única com Prisma + PostgreSQL.

---

## 🧭 Como Rodar o Web

```bash
# Instalar dependências
yarn install

# Rodar ambiente local
yarn dev

# Build de produção
yarn build && yarn start
```

Crie um arquivo `.env.local` com:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```
