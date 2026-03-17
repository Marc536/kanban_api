
# Kanban API — Desafio Técnico Back-end Match<IT>

API REST para gerenciamento de um **quadro Kanban simplificado**, desenvolvida com **Node.js**, **TypeScript**, **Express** e **PostgreSQL**, utilizando **SQL puro** para manipulação de dados.

O sistema permite criar usuários, quadros, colunas e cards, além de mover cards entre colunas dentro de um mesmo quadro.

---

# Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker
- Docker Compose
- Jest
- Supertest

---

# Estrutura do Projeto

A estrutura do projeto foi organizada separando responsabilidades em camadas para melhorar a legibilidade e manutenção.

```
KANBAN_API
│
├── database
│   └── init.sql
│
├── Diagram
│   └── erd_kanban_api.png
│
├── src
│   ├── controllers
│   │   ├── controllerBoard.ts
│   │   ├── controllerCard.ts
│   │   ├── controllerColumn.ts
│   │   └── controllerUser.ts
│   │
│   ├── db
│   │   └── connection.ts
│   │
│   ├── repository
│   │   ├── repositoryBoard.ts
│   │   ├── repositoryCard.ts
│   │   ├── repositoryColumn.ts
│   │   └── repositoryUser.ts
│   │
│   ├── routes
│   │   └── index.ts
│   │
│   ├── service
│   │   ├── serviceBoard.ts
│   │   ├── serviceCard.ts
│   │   ├── serviceColumn.ts
│   │   └── serviceUser.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests
│   └── integration
│       └── kanban.test.ts
│
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

# Modelagem do Banco

Antes de iniciar a implementação da API, foi criado um **Diagrama de Entidade e Relacionamento (DER)** para definir a estrutura das entidades e seus relacionamentos.

O diagrama pode ser encontrado em:

```
Diagram/erd_kanban_api.png
```

As entidades principais são:

### Usuário
- id
- nome
- email
- telefone

### Quadro
- id
- nome

### Coluna
- id
- nome
- ordem
- quadro_id

Restrição importante:

```
UNIQUE (quadro_id, ordem)
```

Isso garante que duas colunas dentro do mesmo quadro não tenham a mesma ordem.

### Card
- id
- titulo
- descricao
- coluna_id
- usuario_id

---

# Endpoints da API

## Usuários

Criar usuário

```
POST /users
```

Consultar usuário

```
GET /users/:id
```

Remover usuário

```
DELETE /users/:id
```

---

## Quadros

Criar quadro

```
POST /boards
```

Listar quadros

```
GET /boards
```

Consultar quadro

```
GET /boards/:id
```

Remover quadro

```
DELETE /boards/:id
```

---

## Colunas

Criar coluna

```
POST /columns
```

Consultar coluna

```
GET /columns/:id
```

---

## Cards

Criar card

```
POST /cards
```

Exemplo de body:

```json
{
  "titulo": "Criar API",
  "descricao": "Testando integração",
  "coluna_id": 1,
  "usuario_id": 1
}
```

Consultar card

```
GET /cards/:id
```

---

### Mover Card

```
PATCH /cards/:id/move
```

Body da requisição:

```json
{
  "coluna_id": 2
}
```

Resposta esperada:

```json
{
  "message": "Card movido com sucesso"
}
```

### Regras de negócio aplicadas

Durante a movimentação do card, a API valida:

- se o **card existe**
- se a **coluna de destino existe**
- se a coluna pertence ao **mesmo quadro**

Caso alguma validação falhe, a API retorna um erro apropriado.

---

# Como rodar o projeto

O projeto foi preparado para facilitar a execução utilizando **Docker**.

## Pré‑requisitos

É necessário ter instalado:

- Docker
- Docker Compose

---

# Subindo a API

Na raiz do projeto execute:

```
docker compose up api
```

Esse comando irá:

- subir o container da API
- subir o container do PostgreSQL
- inicializar o banco utilizando:

```
database/init.sql
```

A API ficará disponível em:

```
http://localhost:3000
```

---

# Rodando os testes

Para executar os testes automatizados:

```
docker compose up test
```

Os testes utilizam:

- Jest
- Supertest

Arquivo de testes:

```
tests/integration/kanban.test.ts
```

Os testes validam:

- criação de usuário
- criação de quadro
- criação de coluna
- criação de card
- movimentação de card
- consultas GET
- deleções
- cenários de erro

---

# Processo de Pensamento

## Etapas do desenvolvimento

Antes de começar a API principal, foi criado um pequeno projeto **Hello World em Node.js com TypeScript** para revisar e me familiarizar com a configuração da stack.

Após isso, o desenvolvimento seguiu as seguintes etapas:

1. criação do **diagrama de entidades e relacionamento**
2. definição da **estrutura do banco**
3. configuração da **estrutura Docker**
4. criação das **rotas da API**
5. implementação das camadas **controller, service e repository**
6. implementação das **regras de negócio**
7. criação dos **testes de integração com Jest**

---

## Estrutura escolhida

A arquitetura foi organizada em camadas:

- **routes** → definição dos endpoints
- **controllers** → recebem requisições HTTP
- **services** → regras de negócio
- **repository** → acesso ao banco com SQL puro
- **db** → conexão com o banco

Essa separação melhora:

- organização do código
- manutenção futura
- clareza da lógica de negócio

---

## Endpoints adicionais

Além dos endpoints obrigatórios definidos no desafio, foram incluídos alguns endpoints extras:

- GET /boards
- GET /boards/:id
- GET /columns/:id
- GET /cards/:id
- GET /users/:id
- DELETE /users/:id
- DELETE /boards/:id

Esses endpoints foram adicionados para facilitar testes e tornar o fluxo de validação da API mais simples.

---

## Trade‑offs considerados

### Simplicidade

Como se trata de um desafio técnico, priorizei:

- clareza do código
- organização das camadas
- facilidade de execução do projeto

em vez de adicionar complexidade arquitetural desnecessária.

### SQL puro

As operações de banco foram implementadas com **queries SQL escritas manualmente**, conforme solicitado no desafio.

---

## O que eu faria diferente com mais tempo

Com mais tempo eu implementaria:

- endpoints de atualização das entidades
- autenticação e autorização
- validações mais robustas
- paginação de resultados
- padronização de erros
- maior cobertura de testes

---

# Uso de Inteligência Artificial

Durante o desenvolvimento utilizei **ChatGPT** como ferramenta de apoio.

### Utilizações

A IA foi utilizada para:

- criar um projeto inicial **hello world com Node.js e TypeScript**
- auxiliar na criação do **diagrama de entidades**
- ajudar no **debug do código**
- localizar erros durante o desenvolvimento
- gerar sugestões de endpoints GET
- auxiliar na elaboração do **README final**

### Validação das sugestões

As sugestões fornecidas por IA foram sempre:

1. analisadas
2. adaptadas ao contexto do projeto
3. testadas localmente
4. validadas através dos testes automatizados

A IA foi utilizada como **ferramenta de apoio**, e não como substituto do processo de desenvolvimento.

---

# Próximos passos

Possíveis evoluções do projeto:

- endpoints de atualização (PUT/PATCH)
- autenticação
- autorização
- melhoria da segurança da API
- aumento da cobertura de testes
- melhoria da padronização das respostas da API

---

# Considerações finais

O objetivo deste projeto foi construir uma API simples, organizada e fácil de executar, demonstrando manipulação direta de SQL, estruturação de um backend em camadas e implementação da principal regra de negócio de um quadro Kanban: **a movimentação de cards entre colunas**.