# Personal Management System

API REST para gerenciamento pessoal de tarefas e despesas financeiras, desenvolvida com Node.js, TypeScript, Express, Prisma e PostgreSQL.

O projeto nasceu de uma necessidade real: organizar melhor as demandas da faculdade e do meu dia a dia, além de acompanhar gastos pessoais com mais clareza. Em vez de criar apenas uma API genérica para estudo, a proposta foi transformar um problema do dia a dia em uma solução prática, bem estruturada e evolutiva.

Atualmente este repositório contém o backend da aplicação. A camada web em Next.js será desenvolvida em breve para consumir esta API e entregar uma experiência visual completa.

## Status

Backend funcional e em evolução.

Recursos já implementados:

- Cadastro e autenticação de usuários.
- Autenticação com JWT.
- Hash de senhas com bcrypt.
- CRUD de tarefas.
- CRUD de despesas.
- Validação de entrada com Zod.
- Persistência com Prisma ORM e PostgreSQL.
- Filtros e paginação em listagens.
- Tratamento centralizado de erros.
- Configuração de CORS para ambiente local e produção.
- Arquitetura em camadas com responsabilidades bem separadas.

## Objetivo do Projeto

O Personal Management System foi pensado para centralizar duas áreas que impactam diretamente minha rotina:

- Tarefas acadêmicas: acompanhar atividades, prioridades, prazos e status.
- Finanças pessoais: registrar despesas, categorias, datas e valores.

Como projeto de portfólio, ele também demonstra competências importantes de backend:

- Criação de APIs REST com Express.
- Organização de código por domínio e responsabilidade.
- Modelagem relacional com Prisma.
- Autenticação e proteção de rotas.
- Validação de contratos de entrada.
- Separação entre rotas, controllers, services, schemas e middlewares.
- Uso de migrations para versionamento do banco.

## Tecnologias Utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| Node.js | Ambiente de execução do backend |
| TypeScript | Tipagem estática e melhor manutenção do código |
| Express | Criação da API REST e roteamento HTTP |
| Prisma ORM | Modelagem, migrations e acesso ao banco de dados |
| PostgreSQL | Banco de dados relacional |
| Zod | Validação de body, params e query das requisições |
| JWT | Autenticação baseada em token |
| bcrypt | Hash e validação segura de senhas |
| CORS | Controle de origens permitidas |
| tsx | Execução do servidor em desenvolvimento com watch mode |
| module-alias | Suporte a alias de módulo no build |

## Arquitetura

A API segue uma arquitetura em camadas, mantendo cada parte do sistema com uma responsabilidade clara.

```txt
Request HTTP
    |
    v
Routes
    |
    v
Middlewares
    |
    v
Controllers
    |
    v
Services
    |
    v
Prisma Client
    |
    v
PostgreSQL
```

### Responsabilidades das camadas

| Camada | Responsabilidade |
| --- | --- |
| `routes.ts` | Declara endpoints e compõe middlewares/controllers |
| `middlewares/` | Executa validação, autenticação e tratamento transversal |
| `controllers/` | Adapta requisições HTTP para chamadas de serviço |
| `services/` | Concentra regras de negócio e acesso ao banco |
| `schemas/` | Define contratos de entrada com Zod |
| `prisma/` | Configura o Prisma Client e a modelagem do banco |

Essa divisão facilita manutenção, testes futuros, evolução de features e leitura do projeto por outros desenvolvedores.

## Estrutura de Pastas

```txt
personal-management-system/
|-- prisma/
|   |-- migrations/
|   `-- schema.prisma
|-- src/
|   |-- @types/
|   |-- controllers/
|   |   |-- expense/
|   |   |-- task/
|   |   `-- user/
|   |-- errors/
|   |-- middlewares/
|   |-- prisma/
|   |-- schemas/
|   |-- services/
|   |   |-- expense/
|   |   |-- task/
|   |   `-- user/
|   |-- util/
|   |-- routes.ts
|   `-- server.ts
|-- relational-system.png
|-- package.json
|-- prisma.config.ts
`-- tsconfig.json
```

## Modelagem do Banco de Dados

O banco foi modelado em torno de três entidades principais: `User`, `Task` e `Expense`.

![Modelagem relacional do banco de dados](./relational-system.png)

### Relacionamentos

- Um usuário pode possuir várias tarefas.
- Um usuário pode possuir várias despesas.
- Tarefas e despesas pertencem obrigatoriamente a um usuário.
- A exclusão de um usuário remove seus registros associados por meio de relacionamento com `onDelete: Cascade`.

### Entidades

| Entidade | Campos principais |
| --- | --- |
| `User` | `id`, `name`, `email`, `password`, `createdAt` |
| `Task` | `id`, `title`, `description`, `status`, `priority`, `deadLine`, `user_id`, `createdAt`, `updatedAt` |
| `Expense` | `id`, `description`, `amount`, `date`, `category`, `user_id` |

### Enums

`TaskStatus`

- `PENDING`
- `ACTIVE`
- `DONE`

`Priority`

- `LOW`
- `MEDIUM`
- `HIGH`

## Funcionalidades

### Usuários

- Criação de usuário.
- Login com email e senha.
- Geração de token JWT válido por 30 dias.
- Remoção da própria conta autenticada.
- Senhas armazenadas com hash bcrypt.

### Tarefas

- Criação de tarefas vinculadas ao usuário autenticado.
- Listagem de tarefas do usuário autenticado.
- Atualização de título, descrição, status, prioridade e prazo.
- Remoção de tarefas.
- Filtros por status, prioridade e busca textual.
- Paginação por `page` e `limit`.

### Despesas

- Criação de despesas vinculadas ao usuário autenticado.
- Listagem de despesas do usuário autenticado.
- Atualização de descrição, valor, data e categoria.
- Remoção de despesas.
- Filtros por categoria e busca textual.
- Paginação por `page` e `limit`.

## Autenticação

As rotas protegidas utilizam JWT no header `Authorization`.

```http
Authorization: Bearer <token>
```

O token é gerado no login e contém o identificador do usuário no campo `subject`. Durante a autenticação, o middleware `isAuthenticated` valida o token e injeta o `userId` na requisição, permitindo que services criem, consultem e atualizem registros vinculados ao usuário autenticado.

## Rotas da API

### Base local

```txt
http://localhost:3333
```

### Health check

| Método | Rota | Auth | Descrição |
| --- | --- | --- | --- |
| `GET` | `/hello` | Não | Rota simples para verificar se a API está respondendo |

### Usuários e sessão

| Método | Rota | Auth | Descrição |
| --- | --- | --- | --- |
| `POST` | `/users` | Não | Cria um novo usuário |
| `POST` | `/session` | Não | Autentica usuário e retorna token JWT |
| `DELETE` | `/users/me` | Sim | Remove a conta do usuário autenticado |


#### Criar usuário

```http
POST /users
```

Body:

```json
{
  "name": "Luiz Fernando",
  "email": "luiz@example.com",
  "password": "123456"
}
```

Resposta `201`:

```json
{
  "id": "uuid",
  "name": "Luiz Fernando",
  "email": "luiz@example.com",
  "createdAt": "2026-06-06T18:00:00.000Z"
}
```

#### Login

```http
POST /session
```

Body:

```json
{
  "email": "luiz@example.com",
  "password": "123456"
}
```

Resposta `200`:

```json
{
  "userLogin": {
    "id": "uuid",
    "name": "Luiz Fernando",
    "email": "luiz@example.com",
    "token": "jwt-token"
  }
}
```

### Tarefas

| Método | Rota | Auth | Descrição |
| --- | --- | --- | --- |
| `POST` | `/tasks` | Sim | Cria uma tarefa |
| `GET` | `/tasks` | Sim | Lista tarefas do usuário autenticado |
| `PATCH` | `/tasks/:taskId` | Sim | Atualiza uma tarefa |
| `DELETE` | `/tasks/:taskId` | Sim | Remove uma tarefa |

#### Criar tarefa

```http
POST /tasks
```

Body:

```json
{
  "title": "Estudar para prova de cálculo",
  "description": "Revisar listas de exercícios e anotações da aula",
  "status": "PENDING",
  "priority": "HIGH",
  "deadLine": "2026-06-20"
}
```

Campos:

| Campo | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| `title` | string | Sim | Título da tarefa |
| `description` | string | Não | Descrição livre |
| `status` | enum | Não | `PENDING`, `ACTIVE` ou `DONE` |
| `priority` | enum | Não | `LOW`, `MEDIUM` ou `HIGH` |
| `deadLine` | string | Não | Data convertida para `Date` |

#### Listar tarefas

```http
GET /tasks
```

Query params opcionais:

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `status` | enum | Filtra por `PENDING`, `ACTIVE` ou `DONE` |
| `priority` | enum | Filtra por `LOW`, `MEDIUM` ou `HIGH` |
| `search` | string | Busca por título ou descrição |
| `page` | number | Página atual, padrão `1` |
| `limit` | number | Itens por página, padrão `10`, máximo `100` |

Exemplo:

```http
GET /tasks?status=PENDING&priority=HIGH&page=1&limit=10
```

#### Atualizar tarefa

```http
PATCH /tasks/:taskId
```

Body com pelo menos um campo:

```json
{
  "status": "DONE",
  "priority": "MEDIUM"
}
```

### Despesas

| Método | Rota | Auth | Descrição |
| --- | --- | --- | --- |
| `POST` | `/expenses` | Sim | Cria uma despesa |
| `GET` | `/expenses` | Sim | Lista despesas do usuário autenticado |
| `PATCH` | `/expenses/:expenseId` | Sim | Atualiza uma despesa |
| `DELETE` | `/expenses/:expenseId` | Sim | Remove uma despesa |

#### Criar despesa

```http
POST /expenses
```

Body:

```json
{
  "description": "Mensalidade da faculdade",
  "amount": 850.0,
  "date": "2026-06-06",
  "category": "Educação"
}
```

Campos:

| Campo | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| `description` | string | Sim | Descrição da despesa |
| `amount` | number | Sim | Valor positivo |
| `date` | string | Não | Data convertida para `Date` |
| `category` | string | Sim | Categoria da despesa |

#### Listar despesas

```http
GET /expenses
```

Query params opcionais:

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `category` | string | Filtra por categoria |
| `search` | string | Busca por descrição |
| `page` | number | Página atual, padrão `1` |
| `limit` | number | Itens por página, padrão `10`, máximo `100` |

Exemplo:

```http
GET /expenses?category=Educacao&page=1&limit=10
```

#### Atualizar despesa

```http
PATCH /expenses/:expenseId
```

Body com pelo menos um campo:

```json
{
  "amount": 900.0,
  "category": "Faculdade"
}
```

## Validação de Dados

A validação das requisições é feita com Zod antes que os controllers sejam executados.

Exemplo de resposta para payload inválido:

```json
{
  "details": [
    {
      "field": "body.email",
      "message": "Invalid email address"
    }
  ]
}
```

Esse padrão evita que dados inconsistentes cheguem aos services e ao banco de dados.

## Tratamento de Erros

O projeto possui um middleware global de erros em `src/middlewares/errorHandler.ts`.

Comportamento:

- Em desenvolvimento, retorna detalhes úteis para depuração.
- Em produção, oculta stack trace e detalhes internos.
- Erros de domínio podem ser representados com `AppError`.
- Rotas assíncronas podem ser protegidas com o utilitário `asyncHandler`.

## Como Executar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/luiz-divino/personal-management-system.git
cd personal-management-system
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/personal_management"
JWT_SECRET="sua_chave_secreta"
PORT=3333
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

### 4. Gerar Prisma Client

```bash
npx prisma generate
```

### 5. Executar migrations

```bash
npx prisma migrate dev
```

### 6. Rodar o servidor

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3333
```

## Scripts Disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor em modo desenvolvimento com watch |
| `npm run build` | Gera Prisma Client e compila TypeScript para `dist/` |
| `npm run migrate:deploy` | Aplica migrations em ambiente alvo |
| `npm test` | Script reservado para testes futuros |

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `DATABASE_URL` | Sim | URL de conexão com PostgreSQL |
| `JWT_SECRET` | Sim | Chave usada para assinar tokens JWT |
| `PORT` | Não | Porta do servidor, padrão `3333` |
| `NODE_ENV` | Não | Define comportamento de ambiente |
| `FRONTEND_URL` | Não | Origem liberada no CORS em produção |

## Segurança

Cuidados implementados:

- Senhas nunca são retornadas nas respostas da API.
- Senhas são armazenadas com hash bcrypt.
- Rotas privadas exigem token JWT.
- CORS restringe origens conhecidas.
- Validação de payload reduz entradas inválidas.
- Stack traces são ocultados em produção.

## Roadmap

Melhorias planejadas:

- Criar interface web com Next.js.
- Adicionar documentação OpenAPI/Swagger.
- Implementar testes unitários para services.
- Implementar testes de integração para rotas principais.
- Padronizar ainda mais respostas de sucesso e erro.
- Adicionar dashboard financeiro com totais por período e categoria.
- Criar filtros avançados para tarefas por prazo.
- Adicionar Docker para facilitar setup local.
- Configurar pipeline de CI para build e testes.

## Diferenciais Técnicos

Este projeto busca demonstrar mais do que apenas endpoints funcionando. Ele evidencia:

- Capacidade de transformar uma dor pessoal em uma solução técnica.
- Preocupação com arquitetura e separação de responsabilidades.
- Uso de ferramentas modernas do ecossistema Node.js.
- Modelagem relacional clara.
- Autenticação e validação em camadas dedicadas.
- Estrutura preparada para crescimento do produto.
- Pensamento de manutenção, onboarding e evolução futura.

## Licença

Este projeto está sob a licença ISC.
