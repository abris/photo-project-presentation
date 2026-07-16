#!/usr/bin/env bash
# Збірка презентації «УКРАЇНЦІ — фотопроєкт» в один самодостатній HTML.
# Обгортка над build.py: знаходить Python і запускає збірку.
#
#   ./build.sh                       # -> dist/Українці презентація.html
#   ./build.sh шлях/назва.html       # свій шлях/назва файлу
set -e

cd "$(dirname "$0")"

# Обрати доступний Python 3
if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  PY=python
else
  echo "Помилка: не знайдено python3/python. Встановіть Python і повторіть." >&2
  exit 1
fi

exec "$PY" build.py "$@"
