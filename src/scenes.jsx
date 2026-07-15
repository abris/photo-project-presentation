/* Українці — фотопроєкт. Scene components for animations-v2 SceneStage.
 * Контент (фото, тексти, тривалості) винесено у config.js. */

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

/* ---------- palette ---------- */
const THEMES = {
  light: { bg: '#F3EFE7', ink: '#26221B', muted: '#8B8272', hair: 'rgba(38,34,27,0.22)', accent: '#9A5B3B' },
  dark:  { bg: '#17140F', ink: '#EFE9DC', muted: '#9A9384', hair: 'rgba(239,233,220,0.24)', accent: '#CE9366' },
};

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'PT Sans', system-ui, sans-serif";

function theme() {
  const t = (window.__ukTheme || 'light');
  return THEMES[t] || THEMES.light;
}

/* ---------- 1. Opening title ----------
 * Зауваження Anna:
 *  • «фотопроєкт» піднято вище й збільшено (~1.5× кегль), аби читалось з відстані;
 *  • новий правопис: «фотопроЄкт»;
 *  • назву УКРАЇНЦІ показано літера-за-літерою, як титри команди. */
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
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        transform: `translateY(calc(-50% + ${y}px))`, opacity: op,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* «фотопроєкт» — вище й крупніше (було 30px, стало 46px) */}
        <div style={{
          font: `400 46px ${SANS}`, letterSpacing: '0.6em', textIndent: '0.6em',
          textTransform: 'uppercase', color: T.muted,
          opacity: inP, transform: `translateY(${lerp(24, 0, inP)}px)`,
          marginBottom: 58,
        }}>фотопроєкт</div>
        {/* УКРАЇНЦІ — літера за літерою */}
        <div style={{ font: `500 190px ${SERIF}`, letterSpacing: '0.02em', lineHeight: 0.95, color: T.ink, whiteSpace: 'nowrap' }}>
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
        <div style={{ font: `400 30px ${SANS}`, letterSpacing: '0.34em', textIndent: '0.34em', textTransform: 'uppercase', color: T.ink }}>Фонд&nbsp;МКН</div>
      </div>
    </div>
  );
}

/* ---------- 2. Intro text (другий кадр) ----------
 * Зауваження Anna: поля — зверху трохи менше, знизу трохи більше, + бічні поля,
 * аби композиція «дихала»; кегль та інтерліньяж — читомі з відстані.
 * Текст береться з window.INTRO (чорновий — замінити на фінальний). */
function IntroText(p) {
  const T = theme();
  const pr = p.progress;
  const data = window.INTRO || { kicker: '', lines: [] };
  const inP = easeOut(ramp(pr, 0, 0.22));
  const outP = easeIn(ramp(pr, 0.8, 1));
  const op = inP * (1 - outP);
  const y = lerp(40, 0, inP) + lerp(0, 60, outP);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      {/* Поля, що «дихають»: зверху 16%, знизу 22%, з боків 15% */}
      <div style={{
        position: 'absolute', top: '16%', bottom: '22%', left: '15%', right: '15%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        opacity: op, transform: `translateY(${y}px)`,
      }}>
        <div style={{
          font: `400 26px ${SANS}`, letterSpacing: '0.5em', textIndent: '0.5em',
          textTransform: 'uppercase', color: T.accent, marginBottom: 18,
        }}>{data.kicker}</div>
        <div style={{ width: 120, height: 1, background: T.hair, marginBottom: 50 }}></div>
        <div style={{ font: `500 58px ${SERIF}`, lineHeight: 1.42, color: T.ink, letterSpacing: '0.005em' }}>
          {data.lines.map((ln, i) => {
            const ri = easeOut(ramp(pr, 0.1 + i * 0.06, 0.4 + i * 0.06)) * (1 - outP);
            return (
              <div key={i} style={{ opacity: ri, transform: `translateY(${lerp(16, 0, ri)}px)` }}>{ln}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. Project team (третій кадр) ----------
 * Зауваження Anna:
 *  • блок «команда проєкту» з рисочкою піднято вище (~1.5×);
 *  • літери в «команда проєкту» та в посадах трохи наведено (щільніше/жирніше),
 *    але зі збереженням легкості. */
function Team(p) {
  const T = theme();
  const pr = p.progress;
  const team = window.TEAM || [];
  const inP = easeOut(ramp(pr, 0, 0.2));
  const outP = easeIn(ramp(pr, 0.78, 1));
  /* блок центровано, але зсунуто вище на ~90px (піднято «в півтора рази») */
  const y = lerp(-120, -90, inP) + lerp(0, 150, outP);
  const op = inP * (1 - outP);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, calc(-50% + ${y}px))`, opacity: op,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        width: 1120,
      }}>
        <div style={{
          font: `700 26px ${SANS}`, letterSpacing: '0.46em', textIndent: '0.46em',
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
                <div style={{ font: `500 54px ${SERIF}`, color: T.ink, minWidth: 520 }}>{row[0]}</div>
                <div style={{ flex: 1, height: 1, background: T.hair, alignSelf: 'center' }}></div>
                <div style={{ font: `700 29px ${SANS}`, color: T.muted, letterSpacing: '0.02em' }}>{row[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. Participants (опційний кадр, потребує фото) ----------
 * Anna: «фото учасників проекту (не дуже великі), перед зимою».
 * Активується, коли заповнено window.PARTICIPANTS і додано кадр «Учасники»
 * у config.js. Якщо фото немає — показуємо коректну заглушку. */
function Participants(p) {
  const T = theme();
  const pr = p.progress;
  const people = window.PARTICIPANTS || [];
  const inP = easeOut(ramp(pr, 0, 0.2));
  const outP = easeIn(ramp(pr, 0.8, 1));
  const op = inP * (1 - outP);
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, calc(-50% + ${lerp(-90, -110, inP) + lerp(0, 140, outP)}px))`,
        opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 1400,
      }}>
        <div style={{ font: `700 26px ${SANS}`, letterSpacing: '0.46em', textIndent: '0.46em', textTransform: 'uppercase', color: T.accent, marginBottom: 10 }}>учасники проєкту</div>
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
                  <div style={{ font: `400 24px ${SANS}`, color: T.ink, textAlign: 'center' }}>{row[1]}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ font: `400 22px 'PT Mono', ui-monospace, monospace`, letterSpacing: '0.28em', textIndent: '0.28em', textTransform: 'uppercase', color: T.muted }}>фото учасників додаються</div>
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${scale})`, opacity: op, filter: `blur(${blur}px)` }}>
        <div style={{ font: `500 158px ${SERIF}`, letterSpacing: '0.14em', textIndent: '0.14em', color: T.ink }}>{word}</div>
        <div style={{ width: 340 * rule, height: 1, background: T.hair, marginTop: 22 }}></div>
      </div>
    </div>
  );
}

/* ---------- 6. Photo sequence — повний екран без рамки + Ken Burns ----------
 * Зауваження Anna: замість зменшеної білої рамки — повний екран без рамки;
 * анімація Ken Burns (кадр у сталому форматі динамічно розширюється/звужується). */
function PhotoSequence(p) {
  const T = theme();
  const pr = p.progress;
  const key = SEASON_OF[p.scene && p.scene.name];
  const photos = (window.PHOTOS && window.PHOTOS[key]) || [];
  const n = photos.length;
  const g = pr * n;
  const FADE = 0.3;
  const OUT = 0.34;
  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, overflow: 'hidden' }}>
      {photos.map((src, k) => {
        if (g < k - 0.001) return null;
        if (k < n - 1 && g > k + 1 + FADE + 0.05) return null;
        const appear = easeInOut(clamp((g - k) / FADE, 0, 1));
        let op = appear;
        if (k === n - 1) op = appear * (1 - easeInOut(clamp((g - (n - OUT)) / OUT, 0, 1)));
        const lp = clamp(g - k, 0, 1.2);
        const zoomIn = k % 2 === 0;
        const kbScale = zoomIn ? lerp(1.06, 1.15, lp) : lerp(1.15, 1.06, lp);
        const dirX = (k % 3 === 0 ? 1 : k % 3 === 1 ? -1 : 0);
        const dirY = (k % 2 === 0 ? -1 : 1);
        const tx = dirX * lerp(0, 2.2, lp);
        const ty = dirY * lerp(0, 1.6, lp);
        const kb = `scale(${kbScale}) translate(${tx}%, ${ty}%)`;
        return (
          <div key={k} style={{ position: 'absolute', inset: 0, opacity: op, zIndex: k, willChange: 'opacity' }}>
            <img src={res(src)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: kb }} />
          </div>
        );
      })}
    </div>
  );
}

/* назва фотокадру -> ключ сезону в window.PHOTOS */
const SEASON_OF = { 'ФотоЗима': 'winter', 'ФотоВесна': 'spring', 'ФотоЛіто': 'summer', 'ФотоОсінь': 'autumn' };

/* ---------- Root ---------- */
function UkraintsiVideo() {
  const [t, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS);
  window.__ukTheme = t.theme;
  const T = THEMES[t.theme] || THEMES.light;
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

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg }}>
      <SceneStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={T.bg} transition="cut">
        {map}
      </SceneStage>
      <audio ref={audioRef} src={res(AUDIO)} loop preload="auto"></audio>
      <button onClick={toggleSound} style={{
        position: 'fixed', right: 18, bottom: 18, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 18px', borderRadius: 999, border: `1px solid ${T.hair}`,
        background: T.bg, color: T.ink, cursor: 'pointer',
        font: `400 15px ${SANS}`, letterSpacing: '0.16em', textTransform: 'uppercase',
        boxShadow: '0 6px 22px rgba(0,0,0,0.18)',
      }}>
        <span style={{ fontSize: 13 }}>{sound ? '❚❚' : '▶'}</span>
        <span>{sound ? 'Музика' : 'Звук'}</span>
      </button>

      <window.TweaksPanel>
        <window.TweakSection label="Оформлення" />
        <window.TweakRadio label="Фон" value={t.theme} options={['light', 'dark']}
          onChange={(v) => setTweak('theme', v)} />
        <window.TweakSection label="Редактор" />
        <window.TweakToggle label="Motion editor" value={t.motionEditor}
          onChange={(v) => setTweak('motionEditor', v)} />
      </window.TweaksPanel>
    </div>
  );
}

window.UkraintsiVideo = UkraintsiVideo;
