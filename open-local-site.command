#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
SITE_URL="http://127.0.0.1:3001/"
cd "$PROJECT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js and npm are required."
  echo "Install Node.js LTS from https://nodejs.org/ then run this file again."
  read -r -p "Press Enter to close..."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Installing project dependencies for the first time..."
  npm ci
fi

if curl --silent --fail "$SITE_URL" >/dev/null 2>&1; then
  open "$SITE_URL"
  exit 0
fi

echo "Starting mahmoud.jp locally..."
npm run dev -- -H 127.0.0.1 -p 3001 &
SERVER_PID=$!

cleanup() {
  if kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT INT TERM

for _ in $(seq 1 60); do
  if curl --silent --fail "$SITE_URL" >/dev/null 2>&1; then
    open "$SITE_URL"
    echo "Local site: $SITE_URL"
    wait "$SERVER_PID"
    exit $?
  fi
  sleep 0.5
done

echo "The local site did not start. Review the messages above."
exit 1

