###############################
# Copy necessary assets stage #
###############################
FROM node:18.12.1-alpine3.15 as installer
WORKDIR /app
# Check https://github.com/nodejs/docker-node#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN yarn global add turbo

# Prune unnecessary things which not related to building context
COPY ./services/auth/ ./services/auth/
COPY ./packages/ ./packages/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
RUN turbo prune --scope=auth --docker

##################################################
# Build and install necessary dependencies stage #
##################################################
FROM node:18.12.1-alpine3.15 as builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

# Add lockfile and package.json of isolated workspace
COPY --from=installer /app/out/json/ .
COPY --from=installer /app/out/pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch
RUN pnpm install --offline --frozen-lockfile --ignore-scripts

# Copy sourcecode
COPY --from=installer /app/out/full/ .
COPY turbo.json .

# Generate Prisma client
RUN pnpm --filter auth db:generate

# Build the application
RUN pnpm turbo run build --filter=auth...

# Prevent generated Prisma client from dev dependencies cleaning in the next instruction
RUN mv /app/services/auth/node_modules/.prisma /tmp/

# Install only production dependencies
RUN rm -rf node_modules && pnpm recursive exec -- rm -rf ./node_modules ./src
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch
RUN pnpm install --offline --frozen-lockfile --ignore-scripts --prod

# Move Prisma client into production node modules
RUN mv /tmp/.prisma /app/services/auth/node_modules/

# Copy protocol buffer language (.proto) for gRPC
COPY ./packages/proto/ ./proto

###########################
# Production runner stage #
###########################
FROM node:18.12.1-alpine3.15 as runner
WORKDIR /app
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

# Set timezone to GMT+7
RUN apk add tzdata
ENV TZ Asia/Bangkok

# Run as non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Create logging directory
RUN mkdir logs
RUN chown nestjs logs

USER nestjs

COPY --from=builder --chown=nestjs:nodejs /app/ .

CMD node services/auth/dist/App.js
