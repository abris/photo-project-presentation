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
    'assets/photos/winter/winter-07.jpg', 'assets/photos/winter/winter-08.jpg',
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

/* ---------- Точне кадрування для окремих фото ----------
 * Значення y - у відсотках висоти фото. Позитивний зсув опускає зображення
 * у кадрі, залишаючи більше простору над головами.
 */
window.PHOTO_MOTION = {
  winter: {
    'winter-01.jpg': { scale: [1.05, 1.11], x: [0.4, 1.7], y: [0.0, 0.4] },
    'winter-02.jpg': { scale: [1.04, 1.07], x: [-0.4, -1.2], y: [0.3, 0.9] },
    'winter-03.jpg': { scale: [1.05, 1.11], x: [-0.4, -1.6], y: [0.0, 0.3] },
    'winter-04.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.0, 0.5] },
    'winter-05.jpg': { scale: [1.10, 1.05], x: [0.0, 0.8], y: [0.5, 1.1] },
    'winter-06.jpg': { scale: [1.04, 1.07], x: [-0.3, -1.1], y: [0.0, 0.2] },
    'winter-07.jpg': { scale: [1.06, 1.04], x: [0.2, 1.0], y: [-0.2, -0.6] },
    'winter-08.jpg': { scale: [1.05, 1.11], x: [-0.3, -1.3], y: [0.4, 1.5] },
    'winter-09.jpg': { scale: [1.045, 1.09], x: [0.0, 0.0], y: [0.0, -0.7] },
    'winter-10.jpg': { scale: [1.05, 1.08], x: [0.0, 0.0], y: [0.8, 1.6] },
    'assets/photos/winter/winter-11.jpg': {
      scale: [1.06, 1.08], y: [1.2, 2.0],
    },
    'winter-12.jpg': { scale: [1.05, 1.08], x: [0.0, 0.0], y: [0.7, 1.5] },
    'winter-13.jpg': { scale: [1.025, 1.045], x: [0.0, 0.2], y: [0.0, 0.2] },
    'winter-14.jpg': { scale: [1.02, 1.04], x: [0.0, 0.0], y: [0.0, 0.2] },
  },
  spring: {
    'spring-01.jpg': { scale: [1.05, 1.11], x: [0.3, 1.3], y: [0.0, 0.4] },
    'spring-02.jpg': { scale: [1.045, 1.09], x: [0.3, 1.1], y: [-0.2, -0.8] },
    'spring-03.jpg': { scale: [1.05, 1.11], x: [0.0, 0.3], y: [0.0, 0.4] },
    'spring-04.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.0, -0.8] },
    'spring-05.jpg': { scale: [1.045, 1.09], x: [0.0, 0.0], y: [0.0, 0.3] },
    'spring-06.jpg': { scale: [1.05, 1.11], x: [-0.3, -1.3], y: [0.3, 1.0] },
    'spring-07.jpg': { scale: [1.03, 1.055], x: [0.0, 0.0], y: [0.0, 0.1] },
    'spring-08.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.1, 0.7] },
    'spring-09.jpg': { scale: [1.05, 1.12], x: [0.0, 0.0], y: [0.0, 0.0] },
    'spring-10.jpg': { scale: [1.035, 1.06], x: [-0.2, -0.7], y: [0.0, 0.3] },
    'spring-11.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.3, 1.0] },
    'spring-12.jpg': { scale: [1.045, 1.09], x: [0.0, 0.4], y: [0.0, 0.4] },
    'spring-13.jpg': { scale: [1.045, 1.09], x: [0.0, 0.0], y: [0.0, 0.5] },
    'spring-14.jpg': { scale: [1.04, 1.07], x: [0.0, -0.4], y: [0.0, 0.2] },
    'spring-15.jpg': { scale: [1.04, 1.07], x: [-0.2, -0.8], y: [0.0, -0.4] },
    'spring-16.jpg': { scale: [1.04, 1.07], x: [0.2, 0.8], y: [0.0, 0.1] },
    'spring-17.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [-0.3, -1.2] },
  },
  summer: {
    'summer-01.jpg': { scale: [1.05, 1.12], x: [0.0, 0.0], y: [0.0, 0.4] },
    'summer-02.jpg': { scale: [1.04, 1.07], x: [-0.2, -0.8], y: [0.0, 0.5] },
    'summer-03.jpg': { scale: [1.05, 1.11], x: [0.3, 1.3], y: [0.0, 0.2] },
    'summer-04.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.0, 0.0] },
    'summer-05.jpg': { scale: [1.05, 1.12], x: [0.0, 0.0], y: [0.0, 0.3] },
    'summer-06.jpg': { scale: [1.05, 1.12], x: [0.0, -0.5], y: [0.0, 0.2] },
    'summer-07.jpg': { scale: [1.05, 1.11], x: [-0.3, -1.3], y: [0.0, 0.2] },
    'summer-08.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.0, 0.4] },
    'summer-09.jpg': { scale: [1.05, 1.11], x: [-0.3, -1.3], y: [0.0, -0.6] },
    'summer-10.jpg': { scale: [1.045, 1.09], x: [0.0, 0.3], y: [0.0, 0.4] },
    'summer-11.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.0, 0.6] },
    'summer-12.jpg': { scale: [1.05, 1.11], x: [-0.3, -1.3], y: [0.0, 0.2] },
    'summer-13.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [-0.3, -1.1] },
    'summer-14.jpg': { scale: [1.04, 1.07], x: [-0.2, -0.8], y: [0.0, -0.4] },
  },
  autumn: {
    'autumn-01.jpg': { scale: [1.05, 1.11], x: [0.3, 1.2], y: [0.1, 0.9] },
    'autumn-02.jpg': { scale: [1.045, 1.09], x: [0.0, 0.0], y: [0.0, 0.2] },
    'autumn-03.jpg': { scale: [1.04, 1.07], x: [-0.2, -1.0], y: [0.0, 0.1] },
    'autumn-04.jpg': { scale: [1.04, 1.07], x: [0.0, 0.2], y: [-0.2, -0.8] },
    'autumn-05.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.0, 0.4] },
    'autumn-06.jpg': { scale: [1.05, 1.11], x: [-0.1, -0.8], y: [0.0, 0.4] },
    'autumn-07.jpg': { scale: [1.045, 1.09], x: [0.0, 0.0], y: [0.0, 0.3] },
    'autumn-08.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.0, -0.8] },
    'autumn-09.jpg': { scale: [1.04, 1.07], x: [0.2, 0.8], y: [0.0, -0.4] },
    'autumn-10.jpg': { scale: [1.045, 1.09], x: [0.0, 0.0], y: [0.0, 0.4] },
    'autumn-11.jpg': { scale: [1.045, 1.09], x: [0.0, 0.3], y: [0.0, 0.3] },
    'autumn-12.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [0.3, 1.0] },
    'autumn-13.jpg': { scale: [1.045, 1.09], x: [0.0, 0.0], y: [0.0, 0.3] },
    'autumn-14.jpg': { scale: [1.05, 1.11], x: [0.0, 0.0], y: [-0.3, -1.1] },
  },
};

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
