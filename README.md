# Quadrinhando

Plataforma para organizar e visualizar a ordem cronológica de HQs da Marvel e DC.

Acesse o projeto: https://quadrinhando.vercel.app

---

## Sobre

O Quadrinhando permite consultar universos, sagas, personagens e HQs de forma estruturada. O sistema nao hospeda conteudo protegido — apenas metadados e links oficiais de compra.

---

## Funcionalidades

- Listagem de universos por editora
- Sagas organizadas em ordem cronologica dentro de cada universo
- HQs em scroll horizontal dentro de cada saga
- Personagens com todas as HQs em que aparecem, em ordem
- Busca em tempo real de universos e personagens
- Autenticacao JWT com roles (USER e ADMIN)
- Painel administrativo para cadastro de todo o conteudo
- Layout responsivo com abordagem mobile first

---

## Tecnologias

**Backend**
- Node.js + Express
- PostgreSQL
- Prisma ORM v6
- JWT + bcryptjs
- Helmet + Rate Limiting

**Frontend**
- React + Vite
- React Router DOM
- Axios
- CSS puro (mobile first)

---

## Estrutura do projeto

```
quadrinhando/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── services/
```

---

## Como rodar localmente

### Requisitos

- Node.js 18+
- PostgreSQL instalado e rodando

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/quadrinhando"
JWT_SECRET=seu_secret_aqui
JWT_EXPIRES_IN=7d
PORT=3333
NODE_ENV=development
```

```bash
# Crie o banco no PostgreSQL com o nome: quadrinhando

npx prisma migrate deploy
node prisma/seed.js
npm run dev
```

API disponivel em: `http://localhost:3333/api/v1`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edite o `.env`:

```env
VITE_API_URL=http://localhost:3333/api/v1
```

```bash
npm run dev
```

Frontend disponivel em: `http://localhost:5173`

---

## Modelo de dados

```
Company (Editora)
└── Universe (Universo)
    ├── Saga
    │   └── Comic (HQ)
    │       └── ComicCharacter
    │           └── Character (Personagem)
    └── Event (Evento)
```

---

## Rotas da API

### Publicas

```
GET  /api/v1/health
GET  /api/v1/universes
GET  /api/v1/universes/:slug
GET  /api/v1/universes/:slug/sagas
GET  /api/v1/sagas/:slug
GET  /api/v1/characters
GET  /api/v1/characters/:slug
GET  /api/v1/characters/:slug/comics
GET  /api/v1/comics
GET  /api/v1/comics/:slug
GET  /api/v1/companies
```

### Autenticacao

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Admin (requer JWT + role ADMIN)

```
POST   /api/v1/universes
PUT    /api/v1/universes/:id
DELETE /api/v1/universes/:id

POST   /api/v1/sagas
PUT    /api/v1/sagas/:id
DELETE /api/v1/sagas/:id

POST   /api/v1/comics
PUT    /api/v1/comics/:id
DELETE /api/v1/comics/:id

POST   /api/v1/characters
PUT    /api/v1/characters/:id
DELETE /api/v1/characters/:id
```

---

## Seguranca

- Autenticacao via JWT
- Senhas com hash bcrypt
- Rate limiting (100 requisicoes por 15 minutos, 10 tentativas de login)
- Headers de seguranca com Helmet
- CORS restrito ao dominio do frontend em producao
- Roles de acesso (USER e ADMIN)

---

## Admin padrao (seed)

```
email: admin@quadrinhando.com
senha: admin123
```

Troque a senha apos o primeiro acesso em producao.

---

## Scripts

### Backend

```bash
npm run dev                              # Desenvolvimento
npm start                                # Producao
npx prisma studio                        # Interface visual do banco
npx prisma migrate dev --name nome       # Nova migration
```

### Frontend

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de producao
npm run preview  # Visualizar build
```

---

## Deploy

- Frontend: Vercel
- Backend: Render
- Banco de dados: PostgreSQL no Render

---

## Licenca

Arthur Victor de Sá Rodrigues
