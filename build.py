#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Збірка презентації «УКРАЇНЦІ» в один самодостатній HTML-файл.

Навіщо: у режимі розробки index.html підвантажує JSX через fetch(), тому потрібен
локальний сервер (file:// блокує fetch). Зібраний файл вкладає в себе ВСЕ —
бібліотеки, шрифти, фото, музику й скомпільовані на льоту сцени — тож його можна
відкрити подвійним кліком або переслати одним файлом, без сервера й без інтернету.

Як працює: замість fetch кожен ассет вкладається як data-URI. Фото й музика
підставляються через готовий механізм сцен — window.__resources[шлях] -> data-URI
(див. enc()/res() у src/scenes.jsx), тому src/config.js лишається без змін.
JSX-модулі загортаються в IIFE та вставляються як <script type="text/babel">,
щоб Babel-standalone скомпілював їх у браузері (як це робить boot-завантажувач).

Запуск:
    python3 build.py                     # -> dist/Українці презентація.html
    python3 build.py вихід.html          # свій шлях/назва файлу

Без сторонніх залежностей — лише стандартна бібліотека Python 3.
"""

import base64
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"

# Порядок JSX-модулів такий самий, як у boot-завантажувачі index.html.
JSX_MODULES = [
    "src/animations-v2.jsx",   # window.SceneStage, useScene, рушій анімації
    "src/tweaks-panel.jsx",    # window.TweaksPanel (у standalone не показується)
    "src/scenes.jsx",          # window.UkraintsiVideo
]

# Бібліотеки середовища виконання (вкладаються як звичайні скрипти).
JS_LIBS = ["assets/js/react.js", "assets/js/react-dom.js", "assets/js/babel.min.js"]

# Дані/налаштування (звичайний JS, лишаються без змін).
PLAIN_JS = ["src/themes.js", "src/config.js"]

MIME = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
    ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
    ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".ogg": "audio/ogg",
    ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf",
}


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def data_uri(path: Path) -> str:
    mime = MIME.get(path.suffix.lower(), "application/octet-stream")
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def esc_script(js: str) -> str:
    """Знешкодити </script> усередині вкладеного JS, щоб не закрити тег раніше часу."""
    return re.sub(r"</(script)", r"<\\/\1", js, flags=re.IGNORECASE)


def build_resources() -> str:
    """window.__resources = { 'assets/.../file': 'data:...base64,...' } — фото + музика.

    Ключі точно збігаються зі шляхами у config.js (window.PHOTOS / AUDIO_SRC),
    які сцени резолвлять через res()/enc()."""
    entries = []
    files = sorted((ASSETS / "photos").rglob("*")) + sorted((ASSETS / "audio").rglob("*"))
    for f in files:
        if not f.is_file() or f.suffix.lower() not in MIME:
            continue
        key = f.relative_to(ROOT).as_posix()          # напр. assets/photos/winter/winter-01.jpg
        entries.append(f"  {key!r}: {data_uri(f)!r}")
    body = ",\n".join(entries)
    return "window.__resources = {\n" + body + "\n};"


def inline_fonts_css() -> str:
    """fonts.css з url('*.woff2') -> url(data:font/woff2;base64,...), шляхи від assets/fonts/."""
    css = read("assets/fonts/fonts.css")
    fonts_dir = ASSETS / "fonts"

    def repl(m):
        name = m.group(2)
        f = fonts_dir / name
        if not f.is_file():
            return m.group(0)                          # лишити як є, якщо файлу немає
        return f"url({data_uri(f)})"

    return re.sub(r"url\((['\"]?)([^'\"()]+)\1\)", repl, css)


def extract(pattern, text, label):
    m = re.search(pattern, text, flags=re.DOTALL | re.IGNORECASE)
    if not m:
        sys.exit(f"build: не знайдено {label} у index.html")
    return m.group(1)


def main():
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist" / "Українці презентація.html"
    out.parent.mkdir(parents=True, exist_ok=True)

    index = read("index.html")
    title = extract(r"<title>(.*?)</title>", index, "<title>")
    boot_style = extract(r"<style>(.*?)</style>", index, "<style> (boot)")
    root_div = extract(r'(<div id="root">.*?</div>\s*</div>|<div id="root">.*?</div>)',
                       index, '<div id="root">')

    parts = []
    parts.append("<!DOCTYPE html>")
    parts.append('<html lang="uk">')
    parts.append("<head>")
    parts.append('<meta charset="utf-8">')
    parts.append('<meta name="viewport" content="width=device-width, initial-scale=1">')
    parts.append(f"<title>{title}</title>")

    # Шрифти (вкладені) + базові стилі із index.html.
    parts.append("<style>\n" + inline_fonts_css() + "\n</style>")
    parts.append("<style>" + boot_style + "</style>")

    # Бібліотеки середовища виконання.
    for lib in JS_LIBS:
        parts.append(f"<!-- {lib} -->")
        parts.append("<script>\n" + esc_script(read(lib)) + "\n</script>")

    # Фото + музика як data-URI (механізм window.__resources зі сцен).
    parts.append("<!-- ассети: фото + музика -->")
    parts.append("<script>\n" + esc_script(build_resources()) + "\n</script>")

    # Дані/теми/контент (без змін).
    for js in PLAIN_JS:
        parts.append(f"<!-- {js} -->")
        parts.append("<script>\n" + esc_script(read(js)) + "\n</script>")

    parts.append("</head>")
    parts.append("<body>")
    parts.append(root_div)

    # JSX-модулі: загортаємо в IIFE (ізоляція, як у boot) і віддаємо Babel-standalone.
    for mod in JSX_MODULES:
        code = "(function(){\n" + read(mod) + "\n})();"
        parts.append(f"<!-- {mod} -->")
        parts.append('<script type="text/babel" data-presets="react">\n'
                     + esc_script(code) + "\n</script>")

    # Монтування (після того, як усі модулі виконались; повторюємо, доки готове).
    mount = """(function mount(){
  if (!window.UkraintsiVideo) return setTimeout(mount, 30);
  var splash = document.getElementById('boot-splash');
  if (splash) splash.remove();
  ReactDOM.createRoot(document.getElementById('root'))
    .render(React.createElement(window.UkraintsiVideo));
})();"""
    parts.append('<script type="text/babel" data-presets="react">\n' + mount + "\n</script>")

    parts.append("</body>")
    parts.append("</html>")

    html = "\n".join(parts) + "\n"
    out.write_text(html, encoding="utf-8")

    size_mb = out.stat().st_size / (1024 * 1024)
    print(f"✓ Зібрано: {out}")
    print(f"  Розмір:  {size_mb:.1f} МБ (самодостатній — відкривається подвійним кліком)")


if __name__ == "__main__":
    main()
