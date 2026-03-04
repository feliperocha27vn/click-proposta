# Stage 1: Build
FROM node:22-slim AS build

WORKDIR /app

# Instala curl para saúde do container se necessário e pnpm
RUN apt-get update && apt-get install -y curl && npm install -g pnpm

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala todas as dependências (incluindo dev para o build)
RUN pnpm install --frozen-lockfile

# Copia o restante do código
COPY . .

# Gera o build de produção via tsup
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-slim AS runtime

WORKDIR /app

RUN apt-get update && apt-get install -y curl && npm install -g pnpm

# Copia apenas o que é essencial do build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala apenas dependências de produção
RUN pnpm install --prod --frozen-lockfile

# Expõe a porta configurada no server.ts
EXPOSE 3334

# Variáveis de ambiente padrão
ENV NODE_ENV=production

# Comando para iniciar o bot usando o arquivo transpilado
CMD ["node", "dist/server.js"]
