// Список радиостанций с категориями
const radioStations = {
    // Поп-музыка (Pop)
    "Европа Плюс": { 
        url: "http://europaplus.hostingradio.ru:8014/europaplus320.mp3", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Русское Радио": { 
        url: "https://rusradio.hostingradio.ru/rusradio96.aacp", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "96kbps"
    },
    "Новое Радио": { 
        url: "https://icecast-newradio.cdnvideo.ru/newradio3", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Love Radio": { 
        url: "http://stream.loveradio.ru/12_love_28?type=.aac", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Хит FM": { 
        url: "http://hitfm.hostingradio.ru/hitfm128.mp3", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "DFM": { 
        url: "https://dfm.hostingradio.ru/dfm96.aacp", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "96kbps"
    },
    "Радио ENERGY": { 
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/99", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "256kbps"
    },
    "Зайцев FM Pop": { 
        url: "https://zaycev.fm:9002/pop128.mp3", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Maximum": { 
        url: "https://maximum.hostingradio.ru/maximum128.mp3", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Monte Carlo": { 
        url: "https://montecarlo.hostingradio.ru/montecarlo128.mp3", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Танцевальная музыка (Dance/Electronic)
    "Радио Рекорд": { 
        url: "https://air.radiorecord.ru:805/rr_320", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "DFM Dance": { 
        url: "https://dfm-dance.hostingradio.ru/dance96.aacp", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "96kbps"
    },
    "Record Deep": { 
        url: "https://air.radiorecord.ru:805/deep_320", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Record Trance": { 
        url: "https://air.radiorecord.ru:805/trance_320", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Garage FM": { 
        url: "https://garagefm.ru:8000/garagefm", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Revolution Radio": { 
        url: "https://revolutionradio.ru:8000/live", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Q-Dance": { 
        url: "https://stream.q-dance.com/hardstyle", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Record Goa/Psy Trance": { 
        url: "https://air.radiorecord.ru:805/goa_320", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Soundpark Deep": { 
        url: "https://soundpark.hostingradio.ru/soundpark128.mp3", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Pirate Station": { 
        url: "https://air.radiorecord.ru:805/ps_320", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "320kbps"
    },

    // Рок (Rock)
    "Наше Радио": { 
        url: "https://nashe1.hostingradio.ru/nashe-256", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "256kbps"
    },
    "Rock FM": { 
        url: "https://rockfm.hostingradio.ru/rockfm128.mp3", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "Легенды Рока": { 
        url: "https://rocklegends.ru:8000/rock", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "DKFM Shoegaze Radio": { 
        url: "https://stream.dkfm.rocks:8000/shoegaze", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "Radio ROKS": { 
        url: "https://online-radio.roks.ua/RadioROKS_320", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "320kbps"
    },
    "KXRY (XRAY.fm)": { 
        url: "https://stream.xray.fm/stream", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "NTS Radio Rock": { 
        url: "https://stream-1a.ntslive.net/stream", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "Ария FM": { 
        url: "https://ariafm.ru:8000/aria", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "New New World Radio": { 
        url: "https://nnwradio.com:8000/stream", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },

    // Ретро (Retro)
    "Ретро FM": { 
        url: "https://retro.hostingradio.ru:8014/retro320.mp3", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "320kbps"
    },
    "Радио Дача": { 
        url: "https://radiodacha.hostingradio.ru/radiodacha128.mp3", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "128kbps"
    },
    "Авторадио": { 
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/100", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "256kbps"
    },
    "Радио 7": { 
        url: "https://radio7.hostingradio.ru/radio7128.mp3", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "128kbps"
    },
    "Monte Carlo Nights": { 
        url: "https://montecarlo.hostingradio.ru/nights128.mp3", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "128kbps"
    },
    "Золотые Хиты": { 
        url: "https://goldenhits.ru:8000/stream", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "128kbps"
    },
    "Радио Шторм": { 
        url: "https://shtorm.fm:8000/radio", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "128kbps"
    },
    "MJoy Greatest Songs": { 
        url: "https://mjoy.ua:8000/greatest", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "128kbps"
    },
    "Радио Сектор": { 
        url: "https://sectorradio.ru:8000/stream", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "128kbps"
    },
    "Relax FM Retro": { 
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/200", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "256kbps"
    },

    // Джаз, Блюз, Соул (Jazz/Blues/Soul)
    "Радио Jazz": { 
        url: "https://radiojazz.hostingradio.ru/radiojazz128.mp3", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Jazz FM": { 
        url: "https://listen.jazzfm.com/jazzfm", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "SomaFM Blues": { 
        url: "https://somafm.com/blues.pls", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "FIP Jazz": { 
        url: "https://stream.radiofrance.fr/fipjazz/fipjazz.m3u8", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Соул": { 
        url: "https://soulradio.ru:8000/stream", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Smooth Jazz": { 
        url: "https://smoothjazz.com:8000/stream", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Blues Radio": { 
        url: "https://bluesradio.gr:8000/stream", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "TSF Jazz": { 
        url: "https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Jazz24": { 
        url: "https://live.wastreaming.net/jazz24-128mp3", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Soul Cafe Radio": { 
        url: "https://soulcaferadio.com:8000/stream", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Релакс и Легкая музыка (Relax/Chill)
    "Relax FM": { 
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/200", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "256kbps"
    },
    "Lounge FM Chill-Out": { 
        url: "https://loungefm.com.ua:8000/chill", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Enigmatic Immersion": { 
        url: "https://enigmatic.ru:8000/stream", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Атмосфера": { 
        url: "https://atmosfera.fm:8000/stream", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Chillout Zone": { 
        url: "https://chillout.zone:8000/stream", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "SomaFM Groove Salad": { 
        url: "https://somafm.com/groovesalad.pls", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Yoga Radio": { 
        url: "https://yogaradio.ru:8000/stream", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Spa Radio": { 
        url: "https://sparadio.ru:8000/stream", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Ambient Sleeping Pill": { 
        url: "https://ambientsleepingpill.com/stream.pls", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Оазис": { 
        url: "https://oasisradio.ru:8000/stream", 
        category: "Релакс",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Хип-хоп, Рэп, R&B (Hip-Hop/Rap/R&B)
    "Зайцев FM RNB": { 
        url: "https://zaycev.fm:9002/rnb128.mp3", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Rap FM": { 
        url: "https://rapfm.ru:8000/stream", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Hot 108 Jamz": { 
        url: "https://stream.hot108.com:8000/hot108", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Power 106": { 
        url: "https://live.power106.com/power106", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "SomaFM Underground 80s": { 
        url: "https://somafm.com/u80s.pls", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Streetz Radio": { 
        url: "https://streetzradio.com:8000/stream", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "RNB Hits": { 
        url: "https://rnbradio.com:8000/stream", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Hip Hop Nation": { 
        url: "https://hiphopnation.com:8000/stream", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Boom Bap Radio": { 
        url: "https://boombapradio.com:8000/stream", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Urban FM": { 
        url: "https://urbanfm.ru:8000/stream", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Классическая музыка (Classical)
    "Радио Орфей": { 
        url: "https://orfey.hostingradio.ru/orfey128.mp3", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Classical FM": { 
        url: "https://classicalfm.co.uk:8000/stream", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "BBC Radio 3": { 
        url: "https://stream.live.bbc.co.uk/bbc_radio_three", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Культура": { 
        url: "https://kultura.hostingradio.ru/kultura128.mp3", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Classic FM": { 
        url: "https://classicfm.co.uk:8000/stream", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Venice Classic Radio": { 
        url: "https://veniceclassicradio.eu:8000/stream", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Symphony Radio": { 
        url: "https://symphonyradio.com:8000/stream", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Baroque Radio": { 
        url: "https://baroqueradio.com:8000/stream", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Classical WETA": { 
        url: "https://weta.org:8000/classical", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Шедевр": { 
        url: "https://shedevr.fm:8000/stream", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Разговорные и Новости (Talk/News)
    "Радио Sputnik": { 
        url: "https://sputnik.hostingradio.ru/sputnik128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Вести FM": { 
        url: "https://vesti.hostingradio.ru/vesti128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Эхо Москвы": { 
        url: "https://echo.msk.ru:8000/stream", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Радио КП": { 
        url: "https://radiokp.hostingradio.ru/radiokp128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Business FM": { 
        url: "https://bfm.hostingradio.ru/bfm128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Радио Маяк": { 
        url: "https://mayak.hostingradio.ru/mayak128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Соловьёв Лайф ФМ": { 
        url: "https://soloviev.live:8000/stream", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Радио Патриот": { 
        url: "https://patriot.fm:8000/stream", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "BBC World Service": { 
        url: "https://stream.live.bbc.co.uk/bbc_world_service", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "NPR Radio": { 
        url: "https://npr.org:8000/stream", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },

    // Шансон и Народная музыка (Chanson/Folk)
    "Радио Шансон": { 
        url: "https://chanson.hostingradio.ru:8041/chanson256.mp3", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "256kbps"
    },
    "Калина Красная": { 
        url: "https://kalina.hostingradio.ru/kalina128.mp3", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Родных Дорог": { 
        url: "https://rodnyedorogi.ru:8000/stream", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Русский Шансон": { 
        url: "https://russianshanson.ru:8000/stream", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Folk Radio": { 
        url: "https://folkradio.co.uk:8000/stream", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Шансон 24": { 
        url: "https://shanson24.ru:8000/stream", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Вера": { 
        url: "https://radiovera.hostingradio.ru/radiovera128.mp3", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Блатняк FM": { 
        url: "https://blatnyak.fm:8000/stream", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "FIP Ethnic": { 
        url: "https://stream.radiofrance.fr/fipethnic/fipethnic.m3u8", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Станица": { 
        url: "https://stanitsa.fm:8000/stream", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "128kbps"
    }
};

// Кэширование DOM элементов
const elements = {
    sidebar: document.querySelector('.sidebar'),
    mainContent: document.querySelector('.main-content'),
    radioGrid: document.querySelector('.radio-grid'),
    playerBar: document.querySelector('.player-bar'),
    audioPlayer: document.querySelector('#audio-player'),
    searchInput: document.querySelector('#search-input'),
    filterButton: document.querySelector('.filter-button'),
    filtersPanel: document.querySelector('.filters-panel'),
    viewControls: document.querySelector('.view-controls'),
    volumeControl: document.querySelector('.volume-control'),
    volumeSlider: document.querySelector('#volume-slider'),
    settingsButton: document.querySelector('.settings-button'),
    themeToggle: document.querySelector('.theme-toggle'),
    shareButton: document.querySelector('.share-button'),
    sleepTimerButton: document.querySelector('.sleep-timer-button'),
    sleepTimerModal: document.querySelector('.sleep-timer-modal'),
    timerOptions: document.querySelector('.timer-options'),
    modalCloseButtons: document.querySelectorAll('.modal-close')
};

// Переменные состояния
let currentStation = "";
let favorites = [];
let activeCategory = "Все";
let retryCount = 0;
const MAX_RETRIES = 3;

// ASCII-арт котик
const catFrames = [
    `
  /\\___/\\
 (  o o  )
 (  T  )
  | | |
    `,
    `
  /\\___/\\
 (  - -  )
 (  T  )
  | | |
    `,
    `
  /\\___/\\
 (  o o  )
 (  T  )
  | | |
    `
];

// Инициализация Telegram WebApp
let tg = null;

function initTelegramWebApp() {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            tg = window.Telegram.WebApp;
            
            // Расширяем приложение на весь экран
            tg.expand();
            
            // Получаем данные пользователя
            const user = tg.initDataUnsafe.user;
            if (user) {
                console.log('Telegram user:', user);
            }
            
            // Настраиваем тему
            setupTelegramTheme();
            
            // Добавляем кнопку "Поделиться" в Telegram
            setupShareButton();
            
            // Добавляем кнопку "Назад" в Telegram
            setupBackButton();
        } else {
            console.warn('Telegram WebApp not available');
        }
    } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
        // Показываем уведомление пользователю
        showNotification('Ошибка инициализации Telegram. Некоторые функции могут быть недоступны.', 'error');
    }
}

// Функция для отправки данных в Telegram
function sendDataToTelegram(data) {
    if (tg) {
        tg.sendData(JSON.stringify(data));
    }
}

// Функция для отправки уведомления в Telegram
function sendNotificationToTelegram(message) {
    if (tg) {
        tg.showPopup({
            title: 'Уведомление',
            message: message,
            buttons: [{
                type: 'ok'
            }]
        });
    }
}

// Функция для сохранения настроек в Telegram
function saveSettingsToTelegram(settings) {
    if (tg) {
        tg.MainButton.setText('Сохранить настройки');
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
            sendDataToTelegram({
                type: 'save_settings',
                data: settings
            });
            tg.MainButton.hide();
        });
    }
}

// Функция для настройки кнопки "Поделиться"
function setupShareButton() {
    if (tg) {
        const shareButton = document.createElement('button');
        shareButton.className = 'share-button';
        shareButton.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareButton.onclick = () => {
            tg.shareUrl({
                url: window.location.href,
                title: 'Radio ToT - Слушайте любимое радио!'
            });
        };
        document.querySelector('.player-container').appendChild(shareButton);
    }
}

// Функция для настройки кнопки "Назад"
function setupBackButton() {
    if (tg) {
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
        backButton.onclick = () => {
            tg.close();
        };
        document.querySelector('header').prepend(backButton);
    }
}

// Функция для сохранения избранных станций в Telegram
function saveFavoritesToTelegram() {
    if (tg) {
        const favorites = Array.from(document.querySelectorAll('.favorite-button.active'))
            .map(button => button.closest('.radio-card').querySelector('.radio-name').textContent);
        
        saveSettingsToTelegram({
            favorites: favorites,
            lastStation: currentStation,
            volume: elements.player.volume
        });
    }
}

// Функция для загрузки настроек из Telegram
function loadSettingsFromTelegram() {
    if (tg) {
        const settings = tg.initDataUnsafe.settings;
        if (settings) {
            try {
                const parsedSettings = JSON.parse(settings);
                if (parsedSettings.favorites) {
                    parsedSettings.favorites.forEach(station => {
                        const button = document.querySelector(`.radio-card:has(.radio-name:contains('${station}')) .favorite-button`);
                        if (button) {
                            button.classList.add('active');
                            button.innerHTML = '<i class="fas fa-heart"></i>';
                        }
                    });
                }
                if (parsedSettings.lastStation) {
                    currentStation = parsedSettings.lastStation;
                    elements.currentStationEl.textContent = currentStation;
                }
                if (parsedSettings.volume) {
                    elements.player.volume = parsedSettings.volume;
                }
            } catch (e) {
                console.error('Error parsing settings:', e);
            }
        }
    }
}

// Функция для анимации ASCII-котика
function animateCat() {
    const catElement = document.getElementById('ascii-cat');
    let frameIndex = 0;
    
    const animation = setInterval(() => {
        catElement.textContent = catFrames[frameIndex];
        frameIndex = (frameIndex + 1) % catFrames.length;
    }, 500);
    
    return animation;
}

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
    // Запускаем анимацию котика
    const catAnimation = animateCat();
    
    // Добавляем обработчик клика для приветственного экрана
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.addEventListener('click', () => {
        clearInterval(catAnimation);
        welcomeScreen.style.display = 'none';
        
        // Инициализируем основное приложение
        loadFavorites();
        loadLastStation();
        createCategories();
        displayRadioStations(activeCategory);
        setupKeyboardShortcuts();
        setupTelegramTheme();
        initTelegramWebApp();
        loadSettingsFromTelegram();
    });
});

// Настройка темы Telegram
function setupTelegramTheme() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.textColor);
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.buttonColor);
        document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.buttonTextColor);
    }
}

// Загрузка избранных станций
function loadFavorites() {
    const savedFavorites = localStorage.getItem("radioFavorites");
    if (savedFavorites) favorites = JSON.parse(savedFavorites);
}

// Сохранение избранных станций
function saveFavorites() {
    localStorage.setItem("radioFavorites", JSON.stringify(favorites));
}

// Загрузка последней станции
function loadLastStation() {
    const lastStation = localStorage.getItem("lastStation");
    if (lastStation) {
        currentStation = lastStation;
        updateCurrentStationDisplay();
    }
}

// Сохранение последней станции
function saveLastStation() {
    localStorage.setItem("lastStation", currentStation);
}

// Обновляем функцию создания категорий
function createCategories() {
    const categories = new Set(Object.values(radioStations).map(station => station.category));
    const sortedCategories = Array.from(categories).sort();
    const categoriesList = document.getElementById('categories-list');
    
    categoriesList.innerHTML = "";
    
    sortedCategories.forEach(category => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'nav-item';
        if (category === activeCategory) link.classList.add('active');
        link.setAttribute('data-category', category);
        
        const icon = document.createElement('i');
        icon.className = 'fas ' + getCategoryIcon(category);
        
        const text = document.createTextNode(getCategoryName(category));
        
        link.appendChild(icon);
        link.appendChild(text);
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            activeCategory = category;
            document.getElementById('current-category').textContent = getCategoryName(category);
            displayRadioStations(category);
        });
        
        li.appendChild(link);
        categoriesList.appendChild(li);
    });
}

// Функция для получения названия категории
function getCategoryName(category) {
    const categoryNames = {
        "Поп": "Поп-музыка",
        "Танцевальные": "Танцевальная музыка",
        "Рок": "Рок музыка",
        "Ретро": "Ретро хиты",
        "Джаз": "Джаз и Блюз",
        "Релакс": "Релакс и Чилаут",
        "Хип-Хоп": "Хип-Хоп и R&B",
        "Классика": "Классическая музыка",
        "Новости": "Новости и Разговорные",
        "Шансон": "Шансон и Народные"
    };
    return categoryNames[category] || category;
}

// Получение иконки для категории
function getCategoryIcon(category) {
    const icons = {
        "Все": "fa-globe",
        "Избранное": "fa-heart",
        "Танцевальные": "fa-music",
        "Рок": "fa-guitar",
        "Хип-Хоп": "fa-music",
        "Джаз": "fa-music",
        "Классика": "fa-music",
        "Поп": "fa-music",
        "Шансон": "fa-music",
        "Ретро": "fa-clock",
        "Международные": "fa-globe",
        "Новости": "fa-newspaper",
        "Экспериментальные": "fa-music"
    };
    return icons[category] || "fa-music";
}

// Оптимизированная функция отображения радиостанций
function displayRadioStations(category = "Все") {
    elements.radioList.innerHTML = "";
    
    let stationsToDisplay = Object.entries(radioStations);
    if (category === "Избранное") {
        stationsToDisplay = stationsToDisplay.filter(([name]) => favorites.includes(name));
    } else if (category !== "Все") {
        stationsToDisplay = stationsToDisplay.filter(([_, station]) => station.category === category);
    }

    if (stationsToDisplay.length === 0) {
        elements.radioList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Станции не найдены</p>
            </div>
        `;
        return;
    }

    // Используем DocumentFragment для оптимизации производительности
    const fragment = document.createDocumentFragment();
    const batchSize = 20;
    let currentBatch = 0;

    function renderBatch() {
        const start = currentBatch * batchSize;
        const end = Math.min(start + batchSize, stationsToDisplay.length);
        
        for (let i = start; i < end; i++) {
            const [name, station] = stationsToDisplay[i];
            createRadioCard(name, station, fragment);
        }
        
        elements.radioList.appendChild(fragment);
        currentBatch++;
        
        if (end < stationsToDisplay.length) {
            // Если есть ещё станции для отображения, планируем следующий батч
            requestAnimationFrame(renderBatch);
        }
    }

    // Запускаем рендеринг первого батча
    renderBatch();
}

// Оптимизированная функция создания карточки
function createRadioCard(name, station, container = elements.radioList) {
    const template = document.createElement('template');
    template.innerHTML = `
        <div class="radio-card ${name === currentStation ? 'active' : ''}" data-station="${name}">
            <div class="station-info">
                <p class="radio-name">${name}</p>
                <p class="station-details">
                    <i class="fas ${station.icon}"></i>
                    <span>${getCategoryName(station.category)}</span>
                    <span>${station.bitrate}</span>
                </p>
            </div>
            <div class="station-controls">
                <button class="control-button">
                    <i class="fas ${name === currentStation ? 'fa-pause' : 'fa-play'}"></i>
                </button>
                <button class="action-button ${favorites.includes(name) ? 'active' : ''}">
                    <i class="${favorites.includes(name) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    const card = template.content.firstElementChild;
    
    // Используем делегирование событий вместо прямых обработчиков
    card.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        
        e.stopPropagation();
        
        if (target.classList.contains('control-button')) {
            if (name === currentStation) {
                togglePlayPause();
            } else {
                playStation(name, station.url);
            }
        } else if (target.classList.contains('action-button')) {
            toggleFavorite(target);
        }
    });
    
    container.appendChild(card);
}

// Проверка поддержки аудио форматов
function checkAudioSupport() {
    const audio = document.createElement('audio');
    const formats = {
        mp3: audio.canPlayType('audio/mpeg'),
        aac: audio.canPlayType('audio/aac'),
        ogg: audio.canPlayType('audio/ogg'),
        wav: audio.canPlayType('audio/wav')
    };
    
    // Определяем предпочтительный формат
    const preferredFormat = Object.entries(formats).find(([_, support]) => 
        support === 'probably' || support === 'maybe'
    );
    
    if (!preferredFormat) {
        showNotification('Ваш браузер может не поддерживать некоторые форматы аудио.', 'warning');
        return null;
    }
    
    return preferredFormat[0];
}

// Обновляем функцию воспроизведения с учетом поддержки форматов
async function playStation(name, url) {
    try {
        if (!name || !url) {
            throw new Error('Не указано имя или URL станции');
        }

        elements.loadingIndicator.style.display = 'flex';
        
        // Проверяем поддержку форматов
        const supportedFormat = checkAudioSupport();
        if (!supportedFormat) {
            throw new Error('Неподдерживаемый формат аудио');
        }
        
        // Проверяем доступность потока
        const isAvailable = await checkStreamAvailability(url);
        if (!isAvailable) {
            throw new Error('Станция временно недоступна');
        }

        // Создаем новый экземпляр Audio
        const audio = new Audio();
        audio.src = url;
        
        // Добавляем обработчики событий для аудио
        audio.addEventListener('canplaythrough', () => {
            try {
                elements.player.src = url;
                elements.player.play();
                
                currentStation = name;
                elements.currentStationEl.textContent = name;
                
                // Обновляем состояние кнопок
                document.querySelectorAll('.radio-card').forEach(card => {
                    const playButton = card.querySelector('.control-button');
                    if (card.querySelector('.radio-name').textContent === name) {
                        card.classList.add('active');
                        playButton.innerHTML = '<i class="fas fa-pause"></i>';
                    } else {
                        card.classList.remove('active');
                        playButton.innerHTML = '<i class="fas fa-play"></i>';
                    }
                });
                
                // Показываем анимацию воспроизведения
                document.getElementById('animation-container').classList.add('active');
                
                // Отправляем уведомление в Telegram
                sendNotificationToTelegram(`Сейчас играет: ${name}`);
                
                // Сохраняем настройки
                saveSettingsToTelegram({
                    lastStation: name,
                    volume: elements.player.volume
                });
            } catch (error) {
                console.error('Error in canplaythrough handler:', error);
                throw error;
            }
        });
        
        audio.addEventListener('error', (error) => {
            console.error('Error playing station:', error);
            throw new Error('Ошибка воспроизведения');
        });

        // Добавляем таймаут для загрузки
        const loadTimeout = setTimeout(() => {
            if (elements.loadingIndicator.style.display === 'flex') {
                throw new Error('Превышено время ожидания загрузки');
            }
        }, 10000);

        // Очищаем таймаут при успешной загрузке
        audio.addEventListener('canplay', () => {
            clearTimeout(loadTimeout);
        });
        
    } catch (error) {
        console.error('Error playing station:', error);
        showNotification(error.message || `Ошибка воспроизведения ${name}. Попробуйте позже.`, 'error');
        elements.loadingIndicator.style.display = 'none';
        document.getElementById('animation-container').classList.remove('active');
    } finally {
        elements.loadingIndicator.style.display = 'none';
    }
}

// Обновляем функцию переключения воспроизведения
function togglePlayPause() {
    const playPauseButton = document.getElementById('play-pause');
    const animationContainer = document.getElementById('animation-container');
    
    if (elements.player.paused) {
        elements.player.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        animationContainer.classList.add('active');
    } else {
        elements.player.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        animationContainer.classList.remove('active');
    }
    
    // Обновляем состояние кнопок на карточках
    document.querySelectorAll('.radio-card').forEach(card => {
        if (card.classList.contains('active')) {
            const playButton = card.querySelector('.control-button');
            playButton.innerHTML = elements.player.paused ? 
                '<i class="fas fa-play"></i>' : 
                '<i class="fas fa-pause"></i>';
        }
    });
}

// Переключение избранного
function toggleFavorite(button) {
    const card = button.closest('.radio-card');
    const stationName = card.querySelector('.radio-name').textContent;
    
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        button.innerHTML = '<i class="fas fa-heart"></i>';
        favorites.push(stationName);
    } else {
        button.innerHTML = '<i class="far fa-heart"></i>';
        favorites = favorites.filter(name => name !== stationName);
    }
    
    // Добавляем анимацию для кнопки избранного
    button.classList.add('pulse');
    setTimeout(() => {
        button.classList.remove('pulse');
    }, 500);
    
    saveFavoritesToTelegram();
}

// Кэш для проверки доступности потоков
const streamAvailabilityCache = new Map();
const CACHE_TIMEOUT = 60000; // 1 минута

// Мониторинг состояния сети
let isOnline = navigator.onLine;
let networkStatusElement;
let networkCheckInterval;

function setupNetworkStatus() {
    // Создаем элемент для отображения статуса сети
    networkStatusElement = document.createElement('div');
    networkStatusElement.className = 'network-status';
    networkStatusElement.innerHTML = `
        <i class="fas fa-wifi"></i>
        <span>Соединение стабильное</span>
    `;
    document.body.appendChild(networkStatusElement);
    
    // Обновляем статус при изменении состояния сети
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    
    // Запускаем периодическую проверку состояния сети
    networkCheckInterval = setInterval(checkNetworkState, 30000); // Проверка каждые 30 секунд
}

function checkNetworkState() {
    if (navigator.onLine !== isOnline) {
        handleNetworkChange();
    }
}

function handleNetworkChange() {
    isOnline = navigator.onLine;
    
    if (isOnline) {
        networkStatusElement.innerHTML = `
            <i class="fas fa-wifi"></i>
            <span>Соединение восстановлено</span>
        `;
        networkStatusElement.classList.add('online');
        networkStatusElement.classList.add('show');
        
        // Если была играющая станция, пробуем восстановить воспроизведение
        if (currentStation && elements.player.paused) {
            setTimeout(() => {
                playStation(currentStation, radioStations[currentStation].url);
            }, 1000);
        }
    } else {
        networkStatusElement.innerHTML = `
            <i class="fas fa-wifi-slash"></i>
            <span>Нет соединения</span>
        `;
        networkStatusElement.classList.remove('online');
        networkStatusElement.classList.add('show');
        
        // Приостанавливаем воспроизведение при потере соединения
        if (currentStation && !elements.player.paused) {
            elements.player.pause();
            document.getElementById('animation-container').classList.remove('active');
            showNotification('Потеряно соединение. Воспроизведение приостановлено.', 'error');
        }
    }
    
    // Скрываем статус через 3 секунды
    setTimeout(() => {
        networkStatusElement.classList.remove('show');
    }, 3000);
}

// Улучшенная функция проверки доступности потока
async function checkStreamAvailability(url) {
    // Проверяем кэш
    const cached = streamAvailabilityCache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
        return cached.available;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут

        const response = await fetch(url, { 
            method: 'HEAD',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RadioToTBot/1.0;)'
            }
        });

        clearTimeout(timeoutId);
        
        const available = response.ok;
        
        // Сохраняем результат в кэш
        streamAvailabilityCache.set(url, {
            available,
            timestamp: Date.now()
        });
        
        return available;
    } catch (error) {
        console.error('Ошибка проверки потока:', error);
        
        // В случае ошибки сети проверяем состояние соединения
        if (!navigator.onLine) {
            throw new Error('Нет подключения к интернету');
        }
        
        // В случае ошибки считаем поток доступным, 
        // так как некоторые станции могут блокировать HEAD-запросы
        return true;
    }
}

// Очистка ресурсов при выгрузке страницы
window.addEventListener('beforeunload', () => {
    if (networkCheckInterval) {
        clearInterval(networkCheckInterval);
    }
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
    }
    if (sleepTimeout) {
        clearTimeout(sleepTimeout);
    }
});

// Оптимизация поиска
const debouncedSearch = debounce((searchTerm) => {
    const stations = Object.entries(radioStations);
    const searchTermLower = searchTerm.toLowerCase();
    
    requestAnimationFrame(() => {
        const filteredStations = stations.filter(([name, station]) => 
            name.toLowerCase().includes(searchTermLower) || 
            station.category.toLowerCase().includes(searchTermLower)
        );
        displayFilteredStations(filteredStations);
    });
}, 300);

// Добавляем обработчик для поиска
elements.searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    debouncedSearch(searchTerm);
});

// Обновление отображения текущей станции
function updateCurrentStationDisplay() {
    elements.currentStationEl.textContent = `Сейчас играет: ${currentStation || "не выбрано"}`;
}

// Настройка управления громкостью
function setupVolumeControl() {
    const volumeSlider = document.querySelector(".volume-slider");
    const volumeControl = document.querySelector(".volume-control");
    const volumeIcon = document.querySelector(".volume-control i");
    let isVolumeVisible = false;
    
    // Установка начального значения громкости
    volumeSlider.value = elements.player.volume;
    updateVolumeIcon(elements.player.volume);
    
    // Обработчик изменения громкости
    volumeSlider.addEventListener("input", (e) => {
        const volume = parseFloat(e.target.value);
        elements.player.volume = volume;
        updateVolumeIcon(volume);
        saveVolume();
    });

    // Обработчик нажатия на иконку громкости
    volumeIcon.addEventListener("click", () => {
        isVolumeVisible = !isVolumeVisible;
        volumeControl.classList.toggle("show", isVolumeVisible);
        
        // Автоматически скрываем через 3 секунды
        if (isVolumeVisible) {
            setTimeout(() => {
                isVolumeVisible = false;
                volumeControl.classList.remove("show");
            }, 3000);
        }
    });

    // Скрываем регулятор при клике вне его области
    document.addEventListener("click", (e) => {
        if (!volumeControl.contains(e.target) && isVolumeVisible) {
            isVolumeVisible = false;
            volumeControl.classList.remove("show");
        }
    });
}

// Обновление иконки громкости
function updateVolumeIcon(volume) {
    const icon = document.querySelector(".volume-control i");
    if (volume === 0) {
        icon.className = "fas fa-volume-mute";
    } else if (volume < 0.5) {
        icon.className = "fas fa-volume-down";
    } else {
        icon.className = "fas fa-volume-up";
    }
}

// Переключение режима без звука
function toggleMute() {
    const volumeSlider = document.querySelector(".volume-slider");
    elements.player.muted = !elements.player.muted;
    
    if (elements.player.muted) {
        volumeSlider.value = 0;
    } else {
        volumeSlider.value = elements.player.volume;
    }
    
    updateVolumeIcon(elements.player.volume);
    saveVolume();
}

// Настройка горячих клавиш
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        switch(e.code) {
            case "Space":
                e.preventDefault();
                if (currentStation) togglePlayPause();
                break;
            case "ArrowRight":
                playRandomStation();
                break;
            case "ArrowLeft":
                // Добавляем возможность переключения на предыдущую станцию
                const stations = Object.keys(radioStations);
                const currentIndex = stations.indexOf(currentStation);
                if (currentIndex > 0) {
                    const prevStation = stations[currentIndex - 1];
                    playStation(prevStation, radioStations[prevStation].url);
                }
                break;
        }
    });
}

// Показ уведомлений
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("show");
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Случайная станция
function playRandomStation() {
    const stations = Object.entries(radioStations);
    const [randomName, randomStation] = stations[Math.floor(Math.random() * stations.length)];
    
    // Добавляем анимацию для кнопки случайной станции
    elements.randomButton.classList.add('active');
    setTimeout(() => {
        elements.randomButton.classList.remove('active');
    }, 500);
    
    playStation(randomName, randomStation.url);
}

// Отображение отфильтрованных станций
function displayFilteredStations(stations) {
    elements.radioList.innerHTML = "";
    
    if (stations.length === 0) {
        elements.radioList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Станции не найдены</p>
            </div>
        `;
        return;
    }
    
    stations.forEach(([name, station]) => createRadioCard(name, station));
}

// Улучшаем функцию таймера сна
function setSleepTimer(minutes) {
    const sleepTimerControl = document.querySelector(".sleep-timer-control");
    const sleepTimerInput = document.getElementById("sleep-timer");
    
    if (sleepTimeout) {
        clearTimeout(sleepTimeout);
        showNotification("Таймер сна отменен");
        sleepTimerInput.value = "";
        sleepTimerControl.classList.remove("show");
    }
    
    if (minutes > 0) {
        sleepTimeout = setTimeout(() => {
            elements.player.pause();
            showNotification("Таймер сна: воспроизведение остановлено");
            sleepTimerInput.value = "";
            sleepTimerControl.classList.remove("show");
        }, minutes * 60000);
        showNotification(`Таймер сна установлен на ${minutes} минут`);
        sleepTimerControl.classList.add("show");
    }
}

// Добавляем обработчик для таймера сна
document.getElementById("sleep-timer").addEventListener("change", (e) => {
    const minutes = parseInt(e.target.value);
    if (minutes > 0 && minutes <= 120) {
        setSleepTimer(minutes);
    }
});

// Добавляем обработчик для отображения таймера сна
document.querySelector(".sleep-timer-control i").addEventListener("click", () => {
    const sleepTimerControl = document.querySelector(".sleep-timer-control");
    sleepTimerControl.classList.toggle("show");
});

// Скрываем таймер сна при клике вне его области
document.addEventListener("click", (e) => {
    const sleepTimerControl = document.querySelector(".sleep-timer-control");
    const sleepTimerIcon = document.querySelector(".sleep-timer-control i");
    
    if (!sleepTimerControl.contains(e.target) && 
        !sleepTimerIcon.contains(e.target) && 
        sleepTimerControl.classList.contains("show")) {
        sleepTimerControl.classList.remove("show");
    }
});

// Добавляем дебаунс для поиска
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Добавляем обработку свайпов для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Свайп вправо - предыдущая станция
            const stations = Object.keys(radioStations);
            const currentIndex = stations.indexOf(currentStation);
            if (currentIndex > 0) {
                const prevStation = stations[currentIndex - 1];
                playStation(prevStation, radioStations[prevStation].url);
            }
        } else {
            // Свайп влево - следующая станция
            playRandomStation();
        }
    }
}

// Обработка состояний загрузки
let loadingTimeout;

elements.player.addEventListener('waiting', () => {
    elements.loadingIndicator.style.display = 'flex';
    document.getElementById('animation-container').classList.remove('active');
    
    // Устанавливаем таймаут для загрузки
    loadingTimeout = setTimeout(() => {
        if (elements.loadingIndicator.style.display === 'flex') {
            elements.loadingIndicator.style.display = 'none';
            showNotification('Превышено время ожидания загрузки. Попробуйте еще раз.', 'error');
            retryCount++;
            if (retryCount >= MAX_RETRIES) {
                showNotification('Не удалось загрузить станцию. Попробуйте другую.', 'error');
            }
        }
    }, 10000); // 10 секунд таймаут
});

elements.player.addEventListener('playing', () => {
    clearTimeout(loadingTimeout);
    elements.loadingIndicator.style.display = 'none';
    document.getElementById('animation-container').classList.add('active');
    retryCount = 0; // Сбрасываем счетчик попыток при успешном воспроизведении
});

elements.player.addEventListener('canplay', () => {
    clearTimeout(loadingTimeout);
    elements.loadingIndicator.style.display = 'none';
});

// Настройка обработчиков событий
function setupEventListeners() {
    // Поиск с debounce
    elements.searchInput.addEventListener('input', debounce(handleSearch, 300));

    // Фильтры
    elements.filterButton.addEventListener('click', toggleFilters);
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', handleFilterChange);
    });

    // Управление видом
    elements.viewControls.addEventListener('click', handleViewChange);

    // Громкость
    elements.volumeSlider.addEventListener('input', handleVolumeChange);

    // Настройки
    elements.settingsButton.addEventListener('click', toggleSettings);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.shareButton.addEventListener('click', shareApp);
    elements.sleepTimerButton.addEventListener('click', showSleepTimer);

    // Модальные окна
    elements.modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Таймер сна
    elements.timerOptions.addEventListener('click', handleTimerOption);
}

// Обработка поиска
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredStations = Object.entries(radioStations).filter(([name]) => 
        name.toLowerCase().includes(searchTerm)
    );
    renderRadioStations(filteredStations);
}

// Переключение фильтров
function toggleFilters() {
    elements.filtersPanel.classList.toggle('show');
}

// Обработка изменения фильтра
function handleFilterChange(event) {
    const filter = event.currentTarget.dataset.filter;
    const value = event.currentTarget.dataset.value;
    
    // Обновление состояния фильтра
    event.currentTarget.classList.toggle('active');
    
    // Применение фильтра
    applyFilters();
}

// Применение фильтров
function applyFilters() {
    const activeFilters = document.querySelectorAll('.filter-option.active');
    let filteredStations = Object.entries(radioStations);

    activeFilters.forEach(filter => {
        const filterType = filter.dataset.filter;
        const filterValue = filter.dataset.value;

        filteredStations = filteredStations.filter(([name, station]) => {
            switch (filterType) {
                case 'quality':
                    return station.bitrate === filterValue;
                case 'category':
                    return station.category === filterValue;
                default:
                    return true;
            }
        });
    });

    renderRadioStations(filteredStations);
}

// Переключение вида списка
function handleViewChange(event) {
    if (event.target.classList.contains('view-button')) {
        const view = event.target.dataset.view;
        elements.radioGrid.className = `radio-grid ${view}-view`;
        
        // Обновление активной кнопки
        elements.viewControls.querySelectorAll('.view-button').forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// Обработка изменения громкости
function handleVolumeChange(event) {
    const volume = event.target.value / 100;
    elements.audioPlayer.volume = volume;
    saveSettingsToTelegram({ volume });
}

// Переключение настроек
function toggleSettings() {
    elements.sidebar.classList.toggle('show');
}

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('colored-theme');
    saveSettingsToTelegram({ theme: document.body.className });
}

// Поделиться приложением
function shareApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.share();
    }
}

// Показать таймер сна
function showSleepTimer() {
    elements.sleepTimerModal.classList.add('show');
}

// Обработка выбора таймера
function handleTimerOption(event) {
    if (event.target.classList.contains('timer-option')) {
        const minutes = parseInt(event.target.dataset.minutes);
        setSleepTimer(minutes);
        closeModal(elements.sleepTimerModal);
    }
}

// Закрытие модального окна
function closeModal(modal) {
    modal.classList.remove('show');
}
