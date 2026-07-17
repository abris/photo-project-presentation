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
    'assets/photos/summer/summer-23.jpg', 'assets/photos/summer/summer-24.jpg',
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

/* ---------- Рух фото ----------
 * Усі рухи генеруються з поточного порядку window.PHOTOS, тому заміна серії
 * не успадковує кадрування або напрямки руху від попередніх зображень.
 */
function createPhotoMotion(photos) {
  return Object.fromEntries(photos.map((src, index) => {
    const zoomIn = index % 2 === 0;
    const horizontal = index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0;
    const vertical = zoomIn ? -1 : 1;
    return [src, {
      scale: zoomIn ? [1.06, 1.15] : [1.15, 1.06],
      x: [0, horizontal * 2.2],
      y: [0, vertical * 1.6],
    }];
  }));
}

window.PHOTO_MOTION = Object.fromEntries(
  Object.entries(window.PHOTOS).map(([season, photos]) => [season, createPhotoMotion(photos)])
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
