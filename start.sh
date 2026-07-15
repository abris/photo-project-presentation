#!/usr/bin/env bash
# Запуск презентації «УКРАЇНЦІ — фотопроєкт».
# Піднімає локальний сервер і відкриває браузер.
set -e

PORT="${1:-8000}"
cd "$(dirname "$0")"

URL="http://localhost:${PORT}/"

echo "УКРАЇНЦІ — фотопроєкт"
echo "Сервер: ${URL}"
echo "Зупинити: Ctrl+C"
echo

# Відкрити браузер за 1 сек (коли сервер уже слухає)
( sleep 1
  if command -v open >/dev/null 2>&1; then open "$URL"            # macOS
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"  # Linux
  fi
) &

# Обрати доступний Python
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  exec python -m SimpleHTTPServer "$PORT"
else
  echo "Помилка: не знайдено python3/python. Встановіть Python і повторіть." >&2
  exit 1
fi
