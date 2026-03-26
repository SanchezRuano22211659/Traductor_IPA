FROM node:20-alpine AS builder

WORKDIR /app

# Enable corepack for proper package manager usage if strictly needed, or just use npm
# Copy package file(s)
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# Build Next.js application (standalone mode required in next.config.ts)
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Copy exactly what is needed to run the standalone Next.js server
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
