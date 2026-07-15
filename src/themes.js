/* ============================================================================
 * УКРАЇНЦІ — фотопроєкт. Реєстр тем оформлення.
 * Кожна тема — це «характер»: палітра + шрифти + стиль руху + ефекти на фото.
 * Перша тема в масиві — типова (на перший запуск).
 * Сцени (scenes.jsx) читають активну тему через theme() і window.__ukThemeId.
 * ==========================================================================*/
window.UK_THEMES = [
  {
    id: 'classic',
    label: 'Класика',
    swatch: ['#F3EFE7', '#9A5B3B', '#26221B'],
    palette: { bg: '#F3EFE7', ink: '#26221B', muted: '#8B8272', hair: 'rgba(38,34,27,0.22)', accent: '#9A5B3B' },
    fonts: {
      display: "'Playfair Display', Georgia, serif",
      body: "'PT Sans', system-ui, sans-serif",
      mono: "'PT Mono', ui-monospace, monospace",
    },
    motion: { photoFade: 0.30, photoOut: 0.34, kenBurns: 1 },
    fx: { filter: '', grain: false, vignette: false },
  },
  {
    id: 'modern',
    label: 'Модерн',
    swatch: ['#F1F2F4', '#1B3A6B', '#14161A'],
    palette: { bg: '#F1F2F4', ink: '#14161A', muted: '#8A9099', hair: 'rgba(20,22,26,0.18)', accent: '#1B3A6B' },
    fonts: {
      display: "'Montserrat', system-ui, sans-serif",
      body: "'PT Sans', system-ui, sans-serif",
      mono: "'PT Mono', ui-monospace, monospace",
    },
    motion: { photoFade: 0.18, photoOut: 0.28, kenBurns: 0.4 },
    fx: { filter: '', grain: false, vignette: false },
  },
  {
    id: 'archive',
    label: 'Архів',
    swatch: ['#E9DFCB', '#7A5230', '#2A2018'],
    palette: { bg: '#E9DFCB', ink: '#2A2018', muted: '#8A7960', hair: 'rgba(42,32,24,0.24)', accent: '#7A5230' },
    fonts: {
      display: "'PT Mono', ui-monospace, monospace",
      body: "'PT Sans', system-ui, sans-serif",
      mono: "'PT Mono', ui-monospace, monospace",
    },
    motion: { photoFade: 0.32, photoOut: 0.36, kenBurns: 1 },
    fx: { filter: 'sepia(0.34) contrast(1.05) brightness(0.98) saturate(0.88)', grain: true, vignette: true },
  },
];
