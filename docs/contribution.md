# Setup

## Prerequisite
Before you can contribute to our project, you need to install the following below:
  - **[Node.js](https://nodejs.org/)** (LTS version)
  - **[PNPM](https://pnpm.io/)** - run `corepack enable` to install (Node.js >= 16.9.0)
  - **[Docker](https://www.docker.com/)** - Support on Window (including WSL), Linux, and MacOS

**TypeScript** is strongly recommended you learn because we mainly use this language for all of our services.

## Steps
1. Clone the sourcecode from github https://github.com/vectier/codern/.
2. Run `pnpm i` to install the required dependencies.
3. Add `.env` (the content same as `.env.example`) to the following folder:
    - `/services/auth`
    - `/services/frontend`
    - `/services/gateway`
    - `/services/grading`
    - `/services/workspace`
    - `/` (project root)
4. Run `docker compose up -d` to setup development environments.
5. Run `pnpm db:generate` to generate **[Prisma](https://www.prisma.io/)** client for database connection.
6. Run `pnpm db:push` to sync the Prisma schema to the database.
7. Run `pnpm dev` to start everything up.
8. Take your coffee ☕️

## Development Environments

- **phpMyAdmin** for manaing database stuffs with web-based via http://localhost:81/
- **RabbitMQ** management on http://localhost:15672/
- **SeaweedFS** for the storage system
  - Master: http://localhost:9333/
  - Volume: http://localhost:8080/
  - Filter: http://localhost:8888/
