#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "--- Verificando atualizações em $(date) ---"

git fetch origin main
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
  echo "Atualização detectada. Executando git pull..."
  git reset --hard origin/main
  git clean -fd
  docker exec store nginx -s reload
  echo "Atualização aplicada em $(date)"
else
  echo "Nenhuma atualização encontrada."
fi

echo "Processo finalizado."
