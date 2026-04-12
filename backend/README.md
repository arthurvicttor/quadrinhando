# Quadrinhando — Backend

## Requisitos

- Node.js 18+
- PostgreSQL instalado e rodando

## Configuração

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/quadrinhando"
JWT_SECRET=quadrinhando_secret_super_seguro_2024
JWT_EXPIRES_IN=7d
PORT=3333
NODE_ENV=development
```

### 3. Crie o banco no PostgreSQL

No pgAdmin ou psql, crie um banco chamado: Quadrinhando

### 4. Rode as migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Popule o banco com dados iniciais

```bash
node prisma/seed.js
```

### 6. Inicie o servidor

```bash
npm run dev
```

### 7. Teste

Acesse: http://localhost:3333/api/v1/health

## Admin padrão

email: admin@quadrinhando.com
senha: admin123
