# Boilerplate Backoffice

A backoffice application built with [Next.js](https://nextjs.org) 15, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Package Manager**: pnpm
- **Linting & Formatting**: Biome

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### First-Time Setup

1. Install dependencies:

```bash
pnpm install
```

2. Set up the local database:

```bash
pnpm db:setup
```

### Development

Run the development server:

```bash
pnpm dev
```

Run the database studio:

```bash
pnpm db:studio
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start development server (Turbopack) |
| `pnpm build`   | Build for production                 |
| `pnpm start`   | Start production server              |
| `pnpm lint`    | Run Biome linter                     |
| `pnpm format`  | Format code with Biome               |

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run `pnpm lint` to check for issues and `pnpm format` to auto-fix formatting.
