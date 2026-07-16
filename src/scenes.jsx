/* Українці — фотопроєкт. Scene components for animations-v2 SceneStage.
 * Контент (фото, тексти, тривалості) — у config.js; теми — у themes.js. */

/* ---------- helpers ---------- */
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const ramp = (t, a, b) => (b <= a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a), 0, 1));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIn = (t) => t * t * t;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

/* Path -> URL. Без бандлера повертає сам шлях (encodeURI для кирилиці/пробілів);
 * усередині зібраного html підхоплює blob-URL із window.__resources. */
const enc = (p) => {
  var id = window.__uk_res_map && window.__uk_res_map[p];
  var r = window.__resources;
  if (id && r && r[id]) return r[id];
  return encodeURI(p);
};
const res = (p) => (window.__resources && window.__resources[p]) || enc(p);

/* ---------- активна тема ----------
 * Повертає обʼєкт: {bg, ink, muted, hair, accent, fonts, motion, fx, id, label}.
 * Палітра розкладена в корінь (сумісність із T.bg/T.ink…), решта — вкладені. */
function theme() {
  const list = window.UK_THEMES || [];
  const th = list.find((t) => t.id === window.__ukThemeId) || list[0] || {};
  const p = th.palette || {};
  return Object.assign({}, p, {
    fonts: th.fonts || {}, motion: th.motion || {}, fx: th.fx || {}, page: th.page || {},
    id: th.id, label: th.label,
  });
}

/* ---------- Підпис теми на текстових кадрах ----------
 * Тонкі декоративні шари за контентом (не на фото-кадрах):
 * рамка-кант / градієнт / зерно / акцентна риска / моно-позначка в кутку.
 * Керується T.page; кожна тема вмикає свій набір. */
function PageFx(props) {
  const T = props.T;
  const pg = T.page || {};
  return (
    <React.Fragment>
      {pg.gradient ? <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: pg.gradient }}></div> : null}
      {pg.grain ? <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06, mixBlendMode: 'multiply', backgroundImage: `url("${GRAIN_URI}")`, backgroundSize: '240px 240px' }}></div> : null}
      {pg.frame ? <div style={{ position: 'absolute', top: 46, left: 46, right: 46, bottom: 46, pointerEvents: 'none', border: `1px solid ${T.hair}` }}></div> : null}
      {pg.accentTick ? <div style={{ position: 'absolute', top: 62, left: 66, width: 66, height: 3, background: T.accent, pointerEvents: 'none' }}></div> : null}
      {pg.corner ? <div style={{ position: 'absolute', left: 66, bottom: 54, pointerEvents: 'none', font: `400 15px ${T.fonts.mono}`, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.muted, opacity: 0.85 }}>{pg.corner}</div> : null}
    </React.Fragment>
  );
}

/* ---------- 1. Opening title ----------
 * «фотопроєкт» піднято вище й збільшено; новий правопис «фотопроЄкт»;
 * назву УКРАЇНЦІ показано літера-за-літерою, як титри команди. */
function Opening(p) {
  const T = theme();
  const pr = p.progress;
  const inP = easeOut(ramp(pr, 0, 0.16));
  const outP = easeIn(ramp(pr, 0.76, 1));
  const y = lerp(90, 0, inP) + lerp(0, 150, outP);
  const op = 1 - outP;
  const title = 'УКРАЇНЦІ'.split('');
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      <PageFx T={T} />
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        transform: `translateY(calc(-50% + ${y}px))`, opacity: op,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          font: `400 46px ${T.fonts.body}`, letterSpacing: '0.6em', textIndent: '0.6em',
          textTransform: 'uppercase', color: T.muted,
          opacity: inP, transform: `translateY(${lerp(24, 0, inP)}px)`,
          marginBottom: 58,
        }}>фотопроєкт</div>
        <div style={{ font: `500 190px ${T.fonts.display}`, letterSpacing: '0.02em', lineHeight: 0.95, color: T.ink, whiteSpace: 'nowrap' }}>
          {title.map((ch, i) => {
            const li = easeOut(ramp(pr, 0.06 + i * 0.05, 0.42 + i * 0.05));
            return (
              <span key={i} style={{ display: 'inline-block', opacity: li, transform: `translateY(${lerp(34, 0, li)}px)` }}>{ch}</span>
            );
          })}
        </div>
        <div style={{ width: 120, height: 1, background: T.hair, marginTop: 30, opacity: easeOut(ramp(pr, 0.5, 0.85)) }}></div>
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 96,
        transform: `translateY(${y * 0.5}px)`, opacity: inP * (1 - outP),
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{ font: `400 30px ${T.fonts.body}`, letterSpacing: '0.34em', textIndent: '0.34em', textTransform: 'uppercase', color: T.ink }}>Фонд&nbsp;МКН</div>
      </div>
    </div>
  );
}

/* ---------- 2. Intro text (другий кадр) ----------
 * «Дихаючі» поля (зверху менше, знизу більше, з боків); читомий кегль/інтерліньяж.
 * Текст — з window.INTRO. */
function IntroText(p) {
  const T = theme();
  const pr = p.progress;
  const data = window.INTRO || { kicker: '', text: '' };
  const inP = easeOut(ramp(pr, 0, 0.22));
  const outP = easeIn(ramp(pr, 0.8, 1));
  const textIn = easeOut(ramp(pr, 0.1, 0.48));
  const op = inP * (1 - outP);
  const y = lerp(40, 0, inP) + lerp(0, 60, outP);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      <PageFx T={T} />
      <div style={{
        position: 'absolute', top: '16%', bottom: '22%', left: '15%', right: '15%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        opacity: op, transform: `translateY(${y}px)`,
      }}>
        <div style={{
          font: `400 26px ${T.fonts.body}`, letterSpacing: '0.5em', textIndent: '0.5em',
          textTransform: 'uppercase', color: T.accent, marginBottom: 18,
        }}>{data.kicker}</div>
        <div style={{ width: 120, height: 1, background: T.hair, marginBottom: 50 }}></div>
        <div style={{
          maxWidth: 1280, font: `500 54px ${T.fonts.display}`, lineHeight: 1.35,
          color: T.ink, letterSpacing: '0.005em', textWrap: 'balance',
          opacity: textIn * (1 - outP),
          transform: `translateY(${lerp(16, 0, textIn)}px)`,
        }}>{data.text}</div>
      </div>
    </div>
  );
}

/* ---------- 3. Project team (третій кадр) ----------
 * Блок із рисочкою піднято вище; «команда проєкту» і посади трохи наведено. */
function Team(p) {
  const T = theme();
  const pr = p.progress;
  const team = window.TEAM || [];
  const inP = easeOut(ramp(pr, 0, 0.2));
  const outP = easeIn(ramp(pr, 0.78, 1));
  const y = lerp(-120, -90, inP) + lerp(0, 150, outP);
  const op = inP * (1 - outP);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      <PageFx T={T} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, calc(-50% + ${y}px))`, opacity: op,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        width: 1120,
      }}>
        <div style={{
          font: `700 26px ${T.fonts.body}`, letterSpacing: '0.46em', textIndent: '0.46em',
          textTransform: 'uppercase', color: T.accent, marginBottom: 8,
        }}>команда проєкту</div>
        <div style={{ width: '100%', height: 1, background: T.hair, marginBottom: 46 }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '100%' }}>
          {team.map((row, i) => {
            const ri = easeOut(ramp(pr, 0.08 + i * 0.05, 0.34 + i * 0.05));
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 28,
                opacity: ri, transform: `translateY(${lerp(18, 0, ri)}px)`,
              }}>
                <div style={{ font: `500 54px ${T.fonts.display}`, color: T.ink, minWidth: 520 }}>{row[0]}</div>
                <div style={{ flex: 1, height: 1, background: T.hair, alignSelf: 'center' }}></div>
                <div style={{ font: `700 29px ${T.fonts.body}`, color: T.muted, letterSpacing: '0.02em' }}>{row[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. Participants (опційний кадр, потребує фото) ---------- */
function Participants(p) {
  const T = theme();
  const pr = p.progress;
  const people = window.PARTICIPANTS || [];
  const inP = easeOut(ramp(pr, 0, 0.2));
  const outP = easeIn(ramp(pr, 0.8, 1));
  const op = inP * (1 - outP);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      <PageFx T={T} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, calc(-50% + ${lerp(-90, -110, inP) + lerp(0, 140, outP)}px))`,
        opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 1400,
      }}>
        <div style={{ font: `700 26px ${T.fonts.body}`, letterSpacing: '0.46em', textIndent: '0.46em', textTransform: 'uppercase', color: T.accent, marginBottom: 10 }}>учасники проєкту</div>
        <div style={{ width: 340, height: 1, background: T.hair, marginBottom: 54 }}></div>
        {people.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'center' }}>
            {people.map((row, i) => {
              const ri = easeOut(ramp(pr, 0.1 + i * 0.04, 0.4 + i * 0.04));
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: 220, opacity: ri, transform: `translateY(${lerp(18, 0, ri)}px)` }}>
                  <div style={{ width: 180, height: 180, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.22)' }}>
                    <img src={res(row[0])} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ font: `400 24px ${T.fonts.body}`, color: T.ink, textAlign: 'center' }}>{row[1]}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ font: `400 22px ${T.fonts.mono}`, letterSpacing: '0.28em', textIndent: '0.28em', textTransform: 'uppercase', color: T.muted }}>фото учасників додаються</div>
        )}
      </div>
    </div>
  );
}

/* ---------- 5. Season title (soft emerge from centre) ---------- */
function SeasonTitle(p) {
  const T = theme();
  const pr = p.progress;
  const word = (p.scene && p.scene.text) || '';
  const inP = easeOut(ramp(pr, 0, 0.34));
  const outP = easeInOut(ramp(pr, 0.72, 1));
  const scale = 0.9 + 0.1 * inP + 0.05 * outP;
  const blur = 16 * (1 - inP);
  const op = inP * (1 - outP);
  const rule = easeOut(ramp(pr, 0.12, 0.5)) * (1 - outP);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PageFx T={T} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${scale})`, opacity: op, filter: `blur(${blur}px)` }}>
        <div style={{ font: `500 158px ${T.fonts.display}`, letterSpacing: '0.14em', textIndent: '0.14em', color: T.ink }}>{word}</div>
        <div style={{ width: 340 * rule, height: 1, background: T.hair, marginTop: 22 }}></div>
      </div>
    </div>
  );
}

/* ---------- 6. Photo sequence — повний екран без рамки + Ken Burns + fx ----------
 * Параметри розчинення й силу Ken Burns бере з активної теми (T.motion);
 * ефекти сепія/зерно/віньєтка — з T.fx (тема «Архів»). */
function PhotoSequence(p) {
  const T = theme();
  const pr = p.progress;
  const key = SEASON_OF[p.scene && p.scene.name];
  const photos = (window.PHOTOS && window.PHOTOS[key]) || [];
  const n = photos.length;
  const g = pr * n;
  const FADE = T.motion.photoFade || 0.3;
  const OUT = T.motion.photoOut || 0.34;
  const amp = (T.motion.kenBurns == null ? 1 : T.motion.kenBurns);
  const fx = T.fx || {};
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      {photos.map((src, k) => {
        if (g < k - 0.001) return null;
        if (k < n - 1 && g > k + 1 + FADE + 0.05) return null;
        const appear = easeInOut(clamp((g - k) / FADE, 0, 1));
        let op = appear;
        if (k === n - 1) op = appear * (1 - easeInOut(clamp((g - (n - OUT)) / OUT, 0, 1)));
        const lp = clamp(g - k, 0, 1.2);
        const motionSet = (window.PHOTO_MOTION || {})[key] || {};
        const motion = motionSet[src] || motionSet[src.split('/').pop()] || {};
        const zoomIn = k % 2 === 0;
        const z0 = 1 + 0.06 * amp, z1 = 1 + 0.15 * amp;
        const kbScale = motion.scale
          ? 1 + (lerp(motion.scale[0], motion.scale[1], lp) - 1) * amp
          : (zoomIn ? lerp(z0, z1, lp) : lerp(z1, z0, lp));
        const dirX = (k % 3 === 0 ? 1 : k % 3 === 1 ? -1 : 0);
        const dirY = (k % 2 === 0 ? -1 : 1);
        const tx = motion.x ? lerp(motion.x[0], motion.x[1], lp) * amp : dirX * lerp(0, 2.2, lp) * amp;
        const ty = motion.y ? lerp(motion.y[0], motion.y[1], lp) * amp : dirY * lerp(0, 1.6, lp) * amp;
        const kb = `scale(${kbScale}) translate(${tx}%, ${ty}%)`;
        return (
          <div key={k} style={{ position: 'absolute', inset: 0, opacity: op, zIndex: k, willChange: 'opacity' }}>
            <img src={res(src)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: kb, filter: fx.filter || 'none' }} />
          </div>
        );
      })}
      {fx.vignette ? (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: n + 1,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 52%, rgba(30,20,10,0.42) 100%)' }}></div>
      ) : null}
      {fx.grain ? (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: n + 2, opacity: 0.10, mixBlendMode: 'overlay',
          backgroundImage: `url("${GRAIN_URI}")`, backgroundSize: '260px 260px' }}></div>
      ) : null}
    </div>
  );
}

/* тонке зерно — SVG feTurbulence як data-URI */
const GRAIN_URI = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"
);

/* назва фотокадру -> ключ сезону в window.PHOTOS */
const SEASON_OF = { 'ФотоЗима': 'winter', 'ФотоВесна': 'spring', 'ФотоЛіто': 'summer', 'ФотоОсінь': 'autumn' };

/* ---------- Кнопка «Тема» + меню вибору ---------- */
function ThemeSwitcher(props) {
  const T = props.T;
  const themes = window.UK_THEMES || [];
  const [open, setOpen] = React.useState(false);
  const btn = {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 18px', borderRadius: 999, border: `1px solid ${T.hair}`,
    background: T.bg, color: T.ink, cursor: 'pointer',
    font: `400 15px ${T.fonts.body}`, letterSpacing: '0.16em', textTransform: 'uppercase',
    boxShadow: '0 6px 22px rgba(0,0,0,0.18)',
  };
  return (
    <div style={{ position: 'relative' }}>
      {open ? (
        <div style={{
          position: 'absolute', right: 0, bottom: 'calc(100% + 10px)', minWidth: 210,
          background: T.bg, border: `1px solid ${T.hair}`, borderRadius: 14,
          boxShadow: '0 14px 40px rgba(0,0,0,0.24)', padding: 6, overflow: 'hidden',
        }}>
          {themes.map((th) => {
            const active = th.id === props.value;
            return (
              <button key={th.id} onClick={() => { props.onChange(th.id); setOpen(false); }} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '10px 12px', border: 'none', borderRadius: 10, cursor: 'pointer',
                background: active ? T.hair : 'transparent', color: T.ink, textAlign: 'left',
                font: `400 15px ${T.fonts.body}`,
              }}>
                <span style={{ display: 'flex', borderRadius: 5, overflow: 'hidden', boxShadow: `0 0 0 1px ${T.hair}` }}>
                  {(th.swatch || []).map((c, i) => (
                    <span key={i} style={{ width: 16, height: 16, background: c }}></span>
                  ))}
                </span>
                <span style={{ flex: 1 }}>{th.label}</span>
                <span style={{ width: 14, textAlign: 'center', color: T.accent }}>{active ? '●' : ''}</span>
              </button>
            );
          })}
        </div>
      ) : null}
      <button onClick={() => setOpen((o) => !o)} style={btn} title="Тема оформлення">
        <span style={{ fontSize: 14 }}>◑</span>
        <span>Тема</span>
      </button>
    </div>
  );
}

/* ---------- Root ---------- */
function UkraintsiVideo() {
  const themes = window.UK_THEMES || [];
  const [themeId, setThemeId] = React.useState(() => {
    let saved = null;
    try { saved = localStorage.getItem('uk_theme'); } catch (e) {}
    const ok = saved && themes.some((t) => t.id === saved);
    return ok ? saved : (themes[0] && themes[0].id);
  });
  window.__ukThemeId = themeId;
  const T = theme();

  const pickTheme = (id) => {
    setThemeId(id);
    window.__ukThemeId = id;
    try { localStorage.setItem('uk_theme', id); } catch (e) {}
  };

  const audioRef = React.useRef(null);
  const [sound, setSound] = React.useState(false);
  const AUDIO = window.AUDIO_SRC;

  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onSeek = (e) => {
      const d = e.detail || {};
      if (typeof d.time === 'number' && a.duration) {
        try { a.currentTime = d.time % a.duration; } catch (err) {}
      }
      if (d.playing === false) { a.pause(); }
      else if (sound) { a.play().catch(() => {}); }
    };
    document.addEventListener('data-om-seek-to-time-frame', onSeek, true);
    return () => document.removeEventListener('data-om-seek-to-time-frame', onSeek, true);
  }, [sound]);

  const toggleSound = () => {
    const a = audioRef.current;
    if (!a) return;
    if (sound) { a.pause(); setSound(false); }
    else { a.play().then(() => setSound(true)).catch(() => setSound(true)); }
  };

  const SceneStage = window.SceneStage;
  const map = {
    'Опенінг': Opening,
    'Вступ': IntroText,
    'Команда': Team,
    'Учасники': Participants,
    'ЗИМА': SeasonTitle, 'ВЕСНА': SeasonTitle, 'ЛІТО': SeasonTitle, 'ОСІНЬ': SeasonTitle,
    'ФотоЗима': PhotoSequence, 'ФотоВесна': PhotoSequence, 'ФотоЛіто': PhotoSequence, 'ФотоОсінь': PhotoSequence,
  };

  const ctrlBtn = {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 18px', borderRadius: 999, border: `1px solid ${T.hair}`,
    background: T.bg, color: T.ink, cursor: 'pointer',
    font: `400 15px ${T.fonts.body}`, letterSpacing: '0.16em', textTransform: 'uppercase',
    boxShadow: '0 6px 22px rgba(0,0,0,0.18)',
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg }}>
      <SceneStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={T.bg} transition="cut">
        {map}
      </SceneStage>

      <audio ref={audioRef} src={res(AUDIO)} loop preload="auto"></audio>

      {/* Контроли: «Тема» + «Звук» у правому нижньому куті */}
      <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 50, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
        <ThemeSwitcher T={T} value={themeId} onChange={pickTheme} />
        <button onClick={toggleSound} style={ctrlBtn}>
          <span style={{ fontSize: 13 }}>{sound ? '❚❚' : '▶'}</span>
          <span>{sound ? 'Музика' : 'Звук'}</span>
        </button>
      </div>
    </div>
  );
}

window.UkraintsiVideo = UkraintsiVideo;
