#!/bin/bash

# Script to push database changes to production
# Usage: pnpm db:push:prod

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

ENV_FILE="$PROJECT_ROOT/.env.production"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env.production file not found at $ENV_FILE"
  exit 1
fi

echo "Loading environment from .env.production..."

# Export variables from .env.production
while IFS= read -r line || [ -n "$line" ]; do
  # Skip empty lines and comments (// or #)
  if [[ -z "$line" || "$line" =~ ^[[:space:]]*// || "$line" =~ ^[[:space:]]*# ]]; then
    continue
  fi
  # Export the variable
  export "$line"
done < "$ENV_FILE"

echo ""
echo "Pushing database changes to PRODUCTION..."
echo "Database: $POSTGRES_HOST / $POSTGRES_DATABASE"
echo ""

# Confirmation prompt
read -p "Are you sure you want to push to PRODUCTION? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

# Run drizzle-kit push
cd "$PROJECT_ROOT"
pnpm drizzle-kit push

echo ""
echo "Production database push completed successfully!"
