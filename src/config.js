/* ============================================================================
 * УКРАЇНЦІ — фотопроєкт. Контент і налаштування презентації.
 * Тут зібрано все, що може змінюватись без правок логіки (scenes.jsx):
 * список фото по сезонах, порядок і тривалість кадрів, команда, тексти.
 * ==========================================================================*/

/* ---------- Фотографії по сезонах (повний екран, без рамки) ---------- */
window.PHOTOS = {
  winter: [
    'assets/photos/winter/winter-01.jpg', 'assets/photos/winter/winter-02.jpg',
    'assets/photos/winter/winter-03.jpg', 'assets/photos/winter/winter-04.jpg',
    'assets/photos/winter/winter-05.jpg', 'assets/photos/winter/winter-06.jpg',
    'assets/photos/winter/winter-08.jpg',
    'assets/photos/winter/winter-09.jpg', 'assets/photos/winter/winter-10.jpg',
    'assets/photos/winter/winter-11.jpg', 'assets/photos/winter/winter-12.jpg',
    'assets/photos/winter/winter-13.jpg', 'assets/photos/winter/winter-14.jpg',
  ],
  spring: [
    'assets/photos/spring/spring-01.jpg', 'assets/photos/spring/spring-02.jpg',
    'assets/photos/spring/spring-03.jpg', 'assets/photos/spring/spring-04.jpg',
    'assets/photos/spring/spring-05.jpg', 'assets/photos/spring/spring-06.jpg',
    'assets/photos/spring/spring-07.jpg', 'assets/photos/spring/spring-08.jpg',
    'assets/photos/spring/spring-09.jpg', 'assets/photos/spring/spring-10.jpg',
    'assets/photos/spring/spring-11.jpg', 'assets/photos/spring/spring-12.jpg',
    'assets/photos/spring/spring-13.jpg', 'assets/photos/spring/spring-14.jpg',
    'assets/photos/spring/spring-15.jpg', 'assets/photos/spring/spring-16.jpg',
    'assets/photos/spring/spring-17.jpg',
  ],
  summer: [
    'assets/photos/summer/summer-01.jpg', 'assets/photos/summer/summer-02.jpg',
    'assets/photos/summer/summer-03.jpg', 'assets/photos/summer/summer-04.jpg',
    'assets/photos/summer/summer-05.jpg', 'assets/photos/summer/summer-06.jpg',
    'assets/photos/summer/summer-07.jpg', 'assets/photos/summer/summer-08.jpg',
    'assets/photos/summer/summer-09.jpg', 'assets/photos/summer/summer-10.jpg',
    'assets/photos/summer/summer-11.jpg', 'assets/photos/summer/summer-12.jpg',
    'assets/photos/summer/summer-13.jpg', 'assets/photos/summer/summer-14.jpg',
    'assets/photos/summer/summer-15.jpg', 'assets/photos/summer/summer-16.jpg',
    'assets/photos/summer/summer-17.jpg', 'assets/photos/summer/summer-18.jpg',
    'assets/photos/summer/summer-19.jpg', 'assets/photos/summer/summer-20.jpg',
    'assets/photos/summer/summer-21.jpg', 'assets/photos/summer/summer-22.jpg',
    'assets/photos/summer/summer-24.jpg',
    'assets/photos/summer/summer-25.jpg', 'assets/photos/summer/summer-26.jpg',
  ],
  autumn: [
    'assets/photos/autumn/autumn-01.jpg', 'assets/photos/autumn/autumn-02.jpg',
    'assets/photos/autumn/autumn-03.jpg', 'assets/photos/autumn/autumn-04.jpg',
    'assets/photos/autumn/autumn-05.jpg', 'assets/photos/autumn/autumn-06.jpg',
    'assets/photos/autumn/autumn-07.jpg', 'assets/photos/autumn/autumn-08.jpg',
    'assets/photos/autumn/autumn-09.jpg', 'assets/photos/autumn/autumn-10.jpg',
    'assets/photos/autumn/autumn-11.jpg', 'assets/photos/autumn/autumn-12.jpg',
    'assets/photos/autumn/autumn-13.jpg', 'assets/photos/autumn/autumn-14.jpg',
  ],
};

/* ---------- Фокальні точки й рух фото ----------
 * [x, y] — положення головного об'єкта у відсотках від ширини та висоти фото.
 * Кадрування й Ken Burns обертаються навколо цієї точки, а не навколо центру.
 */
const PHOTO_FOCUS = {
  winter: {
    'winter-01.jpg': [28, 45], 'winter-02.jpg': [64, 40],
    'winter-03.jpg': [63, 52], 'winter-04.jpg': [50, 50],
    'winter-05.jpg': [55, 72], 'winter-06.jpg': [48, 47],
    'winter-08.jpg': [54, 70], 'winter-09.jpg': [73, 42],
    'winter-10.jpg': [55, 58], 'winter-11.jpg': [52, 18],
    'winter-12.jpg': [52, 27], 'winter-13.jpg': [54, 43],
    'winter-14.jpg': [63, 48],
  },
  spring: {
    'spring-01.jpg': [61, 57], 'spring-02.jpg': [25, 62],
    'spring-03.jpg': [49, 59], 'spring-04.jpg': [46, 54],
    'spring-05.jpg': [61, 62], 'spring-06.jpg': [43, 47],
    'spring-07.jpg': [58, 53], 'spring-08.jpg': [45, 49],
    'spring-09.jpg': [53, 50], 'spring-10.jpg': [67, 42],
    'spring-11.jpg': [53, 45], 'spring-12.jpg': [57, 50],
    'spring-13.jpg': [44, 48], 'spring-14.jpg': [66, 51],
    'spring-15.jpg': [64, 53], 'spring-16.jpg': [53, 53],
    'spring-17.jpg': [36, 55],
  },
  summer: {
    'summer-01.jpg': [56, 40], 'summer-02.jpg': [30, 55],
    'summer-03.jpg': [55, 51], 'summer-04.jpg': [53, 44],
    'summer-05.jpg': [70, 55], 'summer-06.jpg': [54, 45],
    'summer-07.jpg': [55, 53], 'summer-08.jpg': [50, 57],
    'summer-09.jpg': [56, 52], 'summer-10.jpg': [50, 70],
    'summer-11.jpg': [46, 58], 'summer-12.jpg': [52, 70],
    'summer-13.jpg': [52, 58], 'summer-14.jpg': [45, 47],
    'summer-15.jpg': [47, 53], 'summer-16.jpg': [50, 48],
    'summer-17.jpg': [58, 52], 'summer-18.jpg': [61, 47],
    'summer-19.jpg': [68, 48], 'summer-20.jpg': [50, 57],
    'summer-21.jpg': [58, 48], 'summer-22.jpg': [35, 58],
    'summer-24.jpg': [70, 55], 'summer-25.jpg': [55, 47],
    'summer-26.jpg': [65, 48],
  },
  autumn: {
    'autumn-01.jpg': [52, 30], 'autumn-02.jpg': [50, 50],
    'autumn-03.jpg': [64, 50], 'autumn-04.jpg': [56, 55],
    'autumn-05.jpg': [50, 55], 'autumn-06.jpg': [52, 55],
    'autumn-07.jpg': [50, 53], 'autumn-08.jpg': [53, 45],
    'autumn-09.jpg': [55, 65], 'autumn-10.jpg': [34, 55],
    'autumn-11.jpg': [50, 52], 'autumn-12.jpg': [50, 52],
    'autumn-13.jpg': [50, 50], 'autumn-14.jpg': [50, 50],
  },
};

window.PHOTO_FOCUS = PHOTO_FOCUS;

function createPhotoMotion(photos, focalPoints) {
  return Object.fromEntries(photos.map((src, index) => {
    const name = src.split('/').pop();
    const zoomIn = index % 2 === 0;
    return [src, {
      focus: focalPoints[name] || [50, 50],
      scale: zoomIn ? [1.06, 1.15] : [1.15, 1.06],
      x: [0, 0],
      y: [0, 0],
    }];
  }));
}

window.PHOTO_MOTION = Object.fromEntries(
  Object.entries(window.PHOTOS).map(([season, photos]) =>
    [season, createPhotoMotion(photos, PHOTO_FOCUS[season] || {})]
  )
);

/* ---------- Команда проєкту (третій кадр) ---------- */
window.TEAM = [
  ['Ганна Коришова', 'куратор проєкту'],
  ['Михайло Коришов', 'куратор групи фотографів'],
  ['Юлія Муренко', 'PR-менеджер'],
  ['Олександр Дмитріюк', 'куратор технічної частини'],
  ['Ольга Бублик', 'бухгалтер'],
];

/* ---------- Учасники проєкту (кадр 4, опційно) ----------
 * Anna: «можемо ще додати фото учасників проекту (не дуже великі),
 *        наприклад четвертим кадром, перед зимою».
 * ⚠️ Фотографій учасників поки немає. Додайте їх у assets/photos/team/
 *    і заповніть список нижче, а потім увімкніть кадр «Учасники»
 *    у window.OM_SCENES (розкоментуйте рядок). Формат: [шлях, ім'я].
 */
window.PARTICIPANTS = [
  // ['assets/photos/team/01.jpg', 'Ганна Коришова'],
  // ['assets/photos/team/02.jpg', 'Михайло Коришов'],
];

/* ---------- Вступний текст (другий кадр) ----------
 * Композицію (поля, кегль, інтерліньяж) задано у scenes.jsx / IntroText.
 */
window.INTRO = {
  kicker: 'про проєкт',
  text: '«Українці» — фотопроєкт про людей, їхні щоденні історії та красу, яка народжується під час змін пір року. Протягом чотирьох сезонів ми збирали моменти, у яких проступає характер, тепло і сила нашого народу.',
};

/* ---------- Порядок і тривалість кадрів (секунди) ----------
 * Титри сезонів — 3.5с; фотосерії — ~4с на кадр.
 * Щоб додати кадр «Учасники», розкоментуйте його рядок нижче.
 */
window.OM_SCENES = JSON.stringify([
  { name: 'Опенінг', dur: 6 },
  { name: 'Вступ', dur: 9 },
  { name: 'Команда', dur: 6 },
  // { name: 'Учасники', dur: 7 },
  { name: 'ЗИМА', dur: 3.5, text: 'ЗИМА' },
  { name: 'ФотоЗима', dur: 56 },
  { name: 'ВЕСНА', dur: 3.5, text: 'ВЕСНА' },
  { name: 'ФотоВесна', dur: 68 },
  { name: 'ЛІТО', dur: 3.5, text: 'ЛІТО' },
  { name: 'ФотоЛіто', dur: 56 },
  { name: 'ОСІНЬ', dur: 3.5, text: 'ОСІНЬ' },
  { name: 'ФотоОсінь', dur: 56 },
]);

window.OM_PLAYBACK = JSON.stringify({ mode: 'loop' });
window.TWEAK_DEFAULTS = { theme: 'light', motionEditor: false };
window.AUDIO_SRC = 'assets/audio/soundtrack.mp3';
