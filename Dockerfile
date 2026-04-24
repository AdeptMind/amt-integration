# Multi-stage build for packages/demo-site (Next.js 16, npm workspaces).
# Build stage installs workspace deps and runs `next build`.
# Runtime stage copies the standalone server + static assets only.

FROM node:20-alpine AS builder
WORKDIR /app

# Install workspace deps. Copying package.json files first maximizes layer cache.
COPY package.json package-lock.json ./
COPY packages/demo-site/package.json packages/demo-site/
RUN npm ci --workspaces --include-workspace-root

# Build the demo-site (emits .next/standalone and .next/static).
COPY . .
RUN npm run build --workspace=@amt-integration/demo-site

# --- runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root runtime user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone output already includes a minimal node_modules tree.
COPY --from=builder --chown=nextjs:nodejs /app/packages/demo-site/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/demo-site/.next/static ./packages/demo-site/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/packages/demo-site/public ./packages/demo-site/public

USER nextjs
EXPOSE 3000

CMD ["node", "packages/demo-site/server.js"]
