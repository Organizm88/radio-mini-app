// Основные переменные
let currentStation = null;
let tg = window.Telegram.WebApp;

// Кэшируем элементы DOM
const elements = {
    player: document.getElementById('player'),
    radioList: document.getElementById('radio-list'),
    currentStationEl: document.getElementById('current-station'),
    loadingIndicator: document.getElementById('loading')
};

// Список радиостанций
const radioStations = {
    // Поп-музыка (Pop)
    "Европа Плюс": {
        url: "http://europaplus.hostingradio.ru:8014/europaplus320.mp3",
        category: "Поп-музыка",
        bitrate: "320 kbps"
    },
    "Русское Радио": {
        url: "https://rusradio.hostingradio.ru/rusradio96.aacp",
        category: "Поп-музыка",
        bitrate: "96 kbps"
    },
    "Новое Радио": {
        url: "https://icecast-newradio.cdnvideo.ru/newradio3",
        category: "Поп-музыка",
        bitrate: "128 kbps"
    },
    "Love Radio": {
        url: "http://stream.loveradio.ru/12_love_28?type=.aac",
        category: "Поп-музыка",
        bitrate: "128 kbps"
    },
    "Хит FM": {
        url: "http://hitfm.hostingradio.ru/hitfm128.mp3",
        category: "Поп-музыка",
        bitrate: "128 kbps"
    },
    "DFM": {
        url: "https://dfm.hostingradio.ru/dfm96.aacp",
        category: "Поп-музыка",
        bitrate: "96 kbps"
    },
    "Радио ENERGY": {
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/99",
        category: "Поп-музыка",
        bitrate: "256 kbps"
    },
    "Зайцев FM Pop": {
        url: "https://zaycev.fm:9002/pop128.mp3",
        category: "Поп-музыка",
        bitrate: "128 kbps"
    },
    "Радио Maximum": {
        url: "https://maximum.hostingradio.ru/maximum128.mp3",
        category: "Поп-музыка",
        bitrate: "128 kbps"
    },
    "Радио Monte Carlo": {
        url: "https://montecarlo.hostingradio.ru/montecarlo128.mp3",
        category: "Поп-музыка",
        bitrate: "128 kbps"
    },

    // Танцевальная музыка (Dance/Electronic)
    "Радио Рекорд": {
        url: "https://air.radiorecord.ru:805/rr_320",
        category: "Танцевальная",
        bitrate: "320 kbps"
    },
    "DFM Dance": {
        url: "https://dfm-dance.hostingradio.ru/dance96.aacp",
        category: "Танцевальная",
        bitrate: "96 kbps"
    },
    "Record Deep": {
        url: "https://air.radiorecord.ru:805/deep_320",
        category: "Танцевальная",
        bitrate: "320 kbps"
    },
    "Record Trance": {
        url: "https://air.radiorecord.ru:805/trance_320",
        category: "Танцевальная",
        bitrate: "320 kbps"
    },
    "Garage FM": {
        url: "https://garagefm.ru:8000/garagefm",
        category: "Танцевальная",
        bitrate: "128 kbps"
    },
    "Revolution Radio": {
        url: "https://revolutionradio.ru:8000/live",
        category: "Танцевальная",
        bitrate: "128 kbps"
    },
    "Q-Dance": {
        url: "https://stream.q-dance.com/hardstyle",
        category: "Танцевальная",
        bitrate: "128 kbps"
    },
    "Record Goa/Psy Trance": {
        url: "https://air.radiorecord.ru:805/goa_320",
        category: "Танцевальная",
        bitrate: "320 kbps"
    },
    "Soundpark Deep": {
        url: "https://soundpark.hostingradio.ru/soundpark128.mp3",
        category: "Танцевальная",
        bitrate: "128 kbps"
    },
    "Pirate Station": {
        url: "https://air.radiorecord.ru:805/ps_320",
        category: "Танцевальная",
        bitrate: "320 kbps"
    },

    // Рок (Rock)
    "Наше Радио": {
        url: "https://nashe1.hostingradio.ru/nashe-256",
        category: "Рок",
        bitrate: "256 kbps"
    },
    "Rock FM": {
        url: "https://rockfm.hostingradio.ru/rockfm128.mp3",
        category: "Рок",
        bitrate: "128 kbps"
    },
    "Радио Maximum Rock": {
        url: "https://maximum.hostingradio.ru/maximum128.mp3",
        category: "Рок",
        bitrate: "128 kbps"
    },
    "Легенды Рока": {
        url: "https://rocklegends.ru:8000/rock",
        category: "Рок",
        bitrate: "128 kbps"
    },
    "DKFM Shoegaze Radio": {
        url: "https://stream.dkfm.rocks:8000/shoegaze",
        category: "Рок",
        bitrate: "128 kbps"
    },
    "Radio ROKS": {
        url: "https://online-radio.roks.ua/RadioROKS_320",
        category: "Рок",
        bitrate: "320 kbps"
    },
    "KXRY": {
        url: "https://stream.xray.fm/stream",
        category: "Рок",
        bitrate: "128 kbps"
    },
    "NTS Radio Rock": {
        url: "https://stream-1a.ntslive.net/stream",
        category: "Рок",
        bitrate: "128 kbps"
    },
    "Ария FM": {
        url: "https://ariafm.ru:8000/aria",
        category: "Рок",
        bitrate: "128 kbps"
    },
    "New New World Radio": {
        url: "https://nnwradio.com:8000/stream",
        category: "Рок",
        bitrate: "128 kbps"
    },

    // Ретро (Retro)
    "Ретро FM": {
        url: "https://retro.hostingradio.ru:8014/retro320.mp3",
        category: "Ретро",
        bitrate: "320 kbps"
    },
    "Радио Дача": {
        url: "https://radiodacha.hostingradio.ru/radiodacha128.mp3",
        category: "Ретро",
        bitrate: "128 kbps"
    },
    "Авторадио": {
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/100",
        category: "Ретро",
        bitrate: "256 kbps"
    },
    "Радио 7": {
        url: "https://radio7.hostingradio.ru/radio7128.mp3",
        category: "Ретро",
        bitrate: "128 kbps"
    },
    "Monte Carlo Nights": {
        url: "https://montecarlo.hostingradio.ru/nights128.mp3",
        category: "Ретро",
        bitrate: "128 kbps"
    },
    "Золотые Хиты": {
        url: "https://goldenhits.ru:8000/stream",
        category: "Ретро",
        bitrate: "128 kbps"
    },
    "Радио Шторм": {
        url: "https://shtorm.fm:8000/radio",
        category: "Ретро",
        bitrate: "128 kbps"
    },
    "MJoy Greatest Songs": {
        url: "https://mjoy.ua:8000/greatest",
        category: "Ретро",
        bitrate: "128 kbps"
    },
    "Радио Сектор": {
        url: "https://sectorradio.ru:8000/stream",
        category: "Ретро",
        bitrate: "128 kbps"
    },
    "Relax FM Retro": {
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/200",
        category: "Ретро",
        bitrate: "256 kbps"
    },

    // Джаз, Блюз, Соул (Jazz/Blues/Soul)
    "Радио Jazz": {
        url: "https://radiojazz.hostingradio.ru/radiojazz128.mp3",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "Jazz FM": {
        url: "https://listen.jazzfm.com/jazzfm",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "SomaFM Blues": {
        url: "https://somafm.com/blues.pls",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "FIP Jazz": {
        url: "https://stream.radiofrance.fr/fipjazz/fipjazz.m3u8",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "Радио Соул": {
        url: "https://soulradio.ru:8000/stream",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "Smooth Jazz": {
        url: "https://smoothjazz.com:8000/stream",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "Blues Radio": {
        url: "https://bluesradio.gr:8000/stream",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "TSF Jazz": {
        url: "https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3",
        category: "Джаз",
        bitrate: "256 kbps"
    },
    "Jazz24": {
        url: "https://live.wastreaming.net/jazz24-128mp3",
        category: "Джаз",
        bitrate: "128 kbps"
    },
    "Soul Cafe Radio": {
        url: "https://soulcaferadio.com:8000/stream",
        category: "Джаз",
        bitrate: "128 kbps"
    },

    // Релакс и Легкая музыка (Relax/Chill)
    "Relax FM": {
        url: "https://pub0301.101.ru:8443/stream/air/mp3/256/200",
        category: "Релакс",
        bitrate: "256 kbps"
    },
    "Lounge FM Chill-Out": {
        url: "https://loungefm.com.ua:8000/chill",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "Enigmatic Immersion": {
        url: "https://enigmatic.ru:8000/stream",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "Радио Атмосфера": {
        url: "https://atmosfera.fm:8000/stream",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "Chillout Zone": {
        url: "https://chillout.zone:8000/stream",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "SomaFM Groove Salad": {
        url: "https://somafm.com/groovesalad.pls",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "Yoga Radio": {
        url: "https://yogaradio.ru:8000/stream",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "Spa Radio": {
        url: "https://sparadio.ru:8000/stream",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "Ambient Sleeping Pill": {
        url: "https://ambientsleepingpill.com/stream.pls",
        category: "Релакс",
        bitrate: "128 kbps"
    },
    "Радио Оазис": {
        url: "https://oasisradio.ru:8000/stream",
        category: "Релакс",
        bitrate: "128 kbps"
    },

    // Классика
    "Радио Орфей": {
        url: "https://orfey.hostingradio.ru/orfey128.mp3",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Classical FM": {
        url: "https://classicalfm.co.uk:8000/stream",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Радио Культура": {
        url: "https://kultura.hostingradio.ru/kultura128.mp3",
        category: "Классика",
        bitrate: "128 kbps"
    },

    // Шансон
    "Радио Шансон": {
        url: "https://chanson.hostingradio.ru:8041/chanson256.mp3",
        category: "Шансон",
        bitrate: "256 kbps"
    },
    "Калина Красная": {
        url: "https://kalina.hostingradio.ru/kalina128.mp3",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Радио Родных Дорог": {
        url: "https://rodnyedorogi.ru:8000/stream",
        category: "Шансон",
        bitrate: "128 kbps"
    },

    // Хип-хоп, Рэп, R&B (Hip-Hop/Rap/R&B)
    "Зайцев FM RNB": {
        url: "https://zaycev.fm:9002/rnb128.mp3",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "Rap FM": {
        url: "https://rapfm.ru:8000/stream",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "Hot 108 Jamz": {
        url: "https://stream.hot108.com:8000/hot108",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "Power 106": {
        url: "https://live.power106.com/power106",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "SomaFM Underground 80s": {
        url: "https://somafm.com/u80s.pls",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "Streetz Radio": {
        url: "https://streetzradio.com:8000/stream",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "RNB Hits": {
        url: "https://rnbradio.com:8000/stream",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "Hip Hop Nation": {
        url: "https://hiphopnation.com:8000/stream",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "Boom Bap Radio": {
        url: "https://boombapradio.com:8000/stream",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },
    "Urban FM": {
        url: "https://urbanfm.ru:8000/stream",
        category: "Хип-хоп",
        bitrate: "128 kbps"
    },

    // Классическая музыка (Classical)
    "Радио Орфей": {
        url: "https://orfey.hostingradio.ru/orfey128.mp3",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Classical FM": {
        url: "https://classicalfm.co.uk:8000/stream",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "BBC Radio 3": {
        url: "https://stream.live.bbc.co.uk/bbc_radio_three",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Радио Культура": {
        url: "https://kultura.hostingradio.ru/kultura128.mp3",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Classic FM": {
        url: "https://classicfm.co.uk:8000/stream",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Venice Classic Radio": {
        url: "https://veniceclassicradio.eu:8000/stream",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Symphony Radio": {
        url: "https://symphonyradio.com:8000/stream",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Baroque Radio": {
        url: "https://baroqueradio.com:8000/stream",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Classical WETA": {
        url: "https://weta.org:8000/classical",
        category: "Классика",
        bitrate: "128 kbps"
    },
    "Радио Шедевр": {
        url: "https://shedevr.fm:8000/stream",
        category: "Классика",
        bitrate: "128 kbps"
    },

    // Разговорные и Новости (Talk/News)
    "Радио Sputnik": {
        url: "https://sputnik.hostingradio.ru/sputnik128.mp3",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "Вести FM": {
        url: "https://vesti.hostingradio.ru/vesti128.mp3",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "Радио КП": {
        url: "https://radiokp.hostingradio.ru/radiokp128.mp3",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "Business FM": {
        url: "https://bfm.hostingradio.ru/bfm128.mp3",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "Радио Маяк": {
        url: "https://mayak.hostingradio.ru/mayak128.mp3",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "Соловьёв Лайф ФМ": {
        url: "https://soloviev.live:8000/stream",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "Радио Патриот": {
        url: "https://patriot.fm:8000/stream",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "BBC World Service": {
        url: "https://stream.live.bbc.co.uk/bbc_world_service",
        category: "Новости",
        bitrate: "128 kbps"
    },
    "NPR Radio": {
        url: "https://npr.org:8000/stream",
        category: "Новости",
        bitrate: "128 kbps"
    },

    // Шансон и Народная музыка (Chanson/Folk)
    "Радио Шансон": {
        url: "https://chanson.hostingradio.ru:8041/chanson256.mp3",
        category: "Шансон",
        bitrate: "256 kbps"
    },
    "Калина Красная": {
        url: "https://kalina.hostingradio.ru/kalina128.mp3",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Радио Родных Дорог": {
        url: "https://rodnyedorogi.ru:8000/stream",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Русский Шансон": {
        url: "https://russianshanson.ru:8000/stream",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Folk Radio": {
        url: "https://folkradio.co.uk:8000/stream",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Шансон 24": {
        url: "https://shanson24.ru:8000/stream",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Радио Вера": {
        url: "https://radiovera.hostingradio.ru/radiovera128.mp3",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Блатняк FM": {
        url: "https://blatnyak.fm:8000/stream",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "FIP Ethnic": {
        url: "https://stream.radiofrance.fr/fipethnic/fipethnic.m3u8",
        category: "Шансон",
        bitrate: "128 kbps"
    },
    "Радио Станица": {
        url: "https://stanitsa.fm:8000/stream",
        category: "Шансон",
        bitrate: "128 kbps"
    }
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initTelegramWebApp();
    displayRadioStations();
    setupEventListeners();
});

// Инициализация Telegram WebApp
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.expand();
    }
}

// Отображение радиостанций
function displayRadioStations() {
    if (!elements.radioList) return;
    
    elements.radioList.innerHTML = '';
    
    Object.entries(radioStations).forEach(([name, station]) => {
        const card = document.createElement('div');
        card.className = 'radio-card';
        
        card.innerHTML = `
            <div class="station-info">
                <h3 class="radio-name">${name}</h3>
                <div class="station-details">
                    <span>${station.category}</span>
                    <span>${station.bitrate}</span>
                </div>
            </div>
            <button class="play-button" aria-label="Воспроизвести">
                <i class="fas fa-play"></i>
            </button>
        `;
        
        const playButton = card.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            playStation(name, station.url);
        });
        
        elements.radioList.appendChild(card);
    });
}

// Воспроизведение радиостанции
async function playStation(name, url) {
    try {
        if (currentStation === name && !elements.player.paused) {
            elements.player.pause();
            updatePlayerButtons();
        return;
    }

        elements.player.src = url;
        await elements.player.play();
        
        currentStation = name;
        elements.currentStationEl.textContent = name;
        updatePlayerButtons();
        
    } catch (error) {
        console.error('Ошибка воспроизведения:', error);
        showNotification('Ошибка воспроизведения станции', 'error');
    }
}

// Обновление кнопок плеера
function updatePlayerButtons() {
    document.querySelectorAll('.radio-card').forEach(card => {
        const playButton = card.querySelector('.play-button');
        const isCurrentStation = card.querySelector('.radio-name').textContent === currentStation;
        
        playButton.innerHTML = isCurrentStation && !elements.player.paused ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    });
}

// Показ уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Настройка обработчиков событий
function setupEventListeners() {
    elements.player.addEventListener('error', () => {
        showNotification('Ошибка воспроизведения станции', 'error');
    });
    
    elements.player.addEventListener('playing', () => {
        elements.loadingIndicator.style.display = 'none';
    });
    
    elements.player.addEventListener('waiting', () => {
        elements.loadingIndicator.style.display = 'flex';
    });
}
