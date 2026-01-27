# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal Next.js 16 starter with TypeScript, React 19, and Tailwind CSS 4.

## Development Commands

- **Development server**: `pnpm dev`
- **Build**: `pnpm build`
- **Production server**: `pnpm start`
- **Lint**: `pnpm lint` (uses Biome)
- **Format**: `pnpm format` (uses Biome with auto-write)

## Code Style & Linting

- Uses Biome for linting and formatting (configured in `biome.json`)
- 2-space indentation
- Next.js and React domain rules enabled
- Import organization is automated
- Always run `pnpm lint` after making changes

## Architecture

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with custom CSS variables for theming
- **Fonts**: Barlow from Google Fonts
- **Path aliases**: `@/*` maps to `./src/*`
- **Dark mode**: Supported via CSS media queries and custom properties

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/app/globals.css` - Global styles with Tailwind and theme variables
- `src/components/ui/` - shadcn/ui components
- `src/lib/utils.ts` - Utility functions (cn helper)
- `src/config.ts` - App name and company name

## Component Registries (shadcn)

Two registries are configured in `components.json`:

- **@shadcn** - Default shadcn/ui components
- **@originui** - Origin UI components (https://originui.com)

### Origin UI Workaround

The @originui registry does not expose a public `registry.json` index file, so listing all components will fail. However, individual components can still be fetched and installed by name:

```bash
# This will fail (no index available):
npx shadcn@latest view @originui

# This works - fetch specific components by name:
npx shadcn@latest add @originui/comp-513
```

To find available Origin UI component names, browse their website at https://coss.com/origin
