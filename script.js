'use strict';

// =============================================
// Telegram WebApp Init
// =============================================
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
}

// =============================================
// Global State
// =============================================
const audio = new Audio();
let currentStation = null;
let isPlaying = false;
let isMuted = false;
let volume = 0.8;
let retryCount = 0;
const MAX_RETRIES = 3;
let retryTimer = null;
let loadTimeout = null;
let currentCategory = 'Все';
let favorites = [];
let searchDebounceTimer = null;

// =============================================
// Category Emojis
// =============================================
const categoryEmojis = {
    "Все": "🎵",
    "❤️ Избранное": "❤️",
    "Поп-музыка": "🎤",
    "Рок-музыка": "🎸",
    "Шансон и народная музыка": "🪗",
    "Классическая музыка": "🎻",
    "Джаз и блюз": "🎷",
    "Электронная музыка": "💿",
    "Ретро и ностальгия": "📻",
    "Новости и Политика": "📰",
    "Детские": "🧸",
    "Религиозные": "⛪",
    "Региональные": "🗺️",
    "Зарубежные": "🌍",
    "Разговорные": "🎙️",
    "Москва и Московская область": "🏙️",
    "Санкт-Петербург": "🌉",
    "Сибирь": "🌲",
    "Урал": "⛰️",
    "Юг России": "☀️",
    "Развлекательные": "🎭",
    "Образовательные": "📚",
    "Музыкальные": "🎼",
    "Европа": "🇪🇺",
    "Северная Америка": "🗽",
    "Азия": "🏯"
};

// =============================================
// Radio Stations Data
// =============================================
const radioStations = {
    "Поп-музыка": [
        { 
            name: "Русское Радио", 
            url: "http://rusradio.hostingradio.ru/rusradio96.aacp", 
            bitrate: "96 kbps",
            codec: "AAC+",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "хиты", "российская музыка"]
        },
        { 
            name: "Европа Плюс", 
            url: "http://ep128.hostingradio.ru:8030/ep128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "хиты", "европейская музыка"]
        },
        { 
            name: "Love Radio", 
            url: "http://stream.loveradio.ru/12_love_24", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "любовные песни"]
        },
        { 
            name: "Радио Energy", 
            url: "http://ic6.101.ru:8000/stream/pro/aac/64/99", 
            bitrate: "64 kbps",
            codec: "AAC",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "танцевальная музыка"]
        },
        { 
            name: "DFM", 
            url: "http://dfm.hostingradio.ru/dfm96.aacp", 
            bitrate: "96 kbps",
            codec: "AAC+",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "танцевальная музыка"]
        },
        { 
            name: "Хит FM", 
            url: "http://hitfm.hostingradio.ru/hitfm96.aacp", 
            bitrate: "96 kbps",
            codec: "AAC+",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "хиты"]
        },
        { 
            name: "Радио Maximum", 
            url: "https://maximum.hostingradio.ru/maximum96.aacp", 
            bitrate: "96 kbps",
            codec: "AAC+",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "рок", "альтернатива"]
        },
        { 
            name: "Like FM", 
            url: "http://likefm.hostingradio.ru:8015/likefm128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "хиты"]
        },
        { 
            name: "Новое Радио", 
            url: "http://icecast-newradio.cdnvideo.ru/newradio3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "новые хиты"]
        },
        { 
            name: "Радио Дача", 
            url: "http://stream.radiodacha.ru/14_dacha_24", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["поп", "ретро", "народная музыка"]
        }
    ],
    "Рок-музыка": [
        { 
            name: "Наше Радио", 
            url: "http://nashe.hostingradio.ru/nashe-128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["рок", "русский рок"]
        },
        { 
            name: "Radio ROKS", 
            url: "http://online.radioroks.ua/RadioROKS", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Ukraine",
            language: "Русский",
            tags: ["рок", "классический рок"]
        },
        { 
            name: "Ultra", 
            url: "https://ultramp3.hostingradio.ru:8443/ultra320.mp3", 
            bitrate: "320 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["рок", "альтернатива"]
        },
        { 
            name: "Rock FM", 
            url: "http://nashe2.hostingradio.ru/rock-128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["рок", "классический рок"]
        },
        { 
            name: "ROCK Radio", 
            url: "http://rockradio.hostingradio.ru:8000/rockradio128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["рок", "хард-рок"]
        },
        { 
            name: "Эхо Москвы", 
            url: "https://streams.echo.msk.ru/echo.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["рок", "разговорное радио"]
        },
        { 
            name: "Радио Би Коста", 
            url: "http://bicoste.ru:8000/radio", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["рок", "альтернатива"]
        }
    ],
    "Шансон и народная музыка": [
        { 
            name: "Радио Шансон", 
            url: "http://chanson.hostingradio.ru:8041/chanson128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["шансон", "блатная песня"]
        },
        { 
            name: "Радио Ваня", 
            url: "http://icecast-radiovanya.cdnvideo.ru/radiovanya", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["шансон", "народная музыка"]
        },
        { 
            name: "Радио Дача", 
            url: "http://stream.radiodacha.ru/14_dacha_24", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["шансон", "народная музыка", "ретро"]
        },
        { 
            name: "Милицейская Волна", 
            url: "http://radiomv.hostingradio.ru/radiomv128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["шансон", "блатная песня"]
        },
        { 
            name: "Кабриолет FM", 
            url: "http://setmedia.ru:8000/high3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["шансон", "ретро"]
        }
    ],
    "Классическая музыка": [
        { 
            name: "Радио Орфей", 
            url: "http://orfeyfm.hostingradio.ru:8034/orfeyfm192.mp3", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["классика", "академическая музыка"]
        },
        { 
            name: "Радио Классик", 
            url: "http://streams.radioclassica.ru:8000/rclassica", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["классика", "симфоническая музыка"]
        },
        { 
            name: "Classical Radio", 
            url: "http://stream.srg-ssr.ch/m/rsc_de/mp3_128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Switzerland",
            language: "Немецкий",
            tags: ["классика", "европейская классика"]
        },
        { 
            name: "Радио Культура", 
            url: "https://icecast-vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["классика", "культура"]
        }
    ],
    "Джаз и блюз": [
        { 
            name: "Радио Джаз", 
            url: "http://jazzradio.hostingradio.ru/jazzradio128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["джаз", "блюз"]
        },
        { 
            name: "Jazz FM", 
            url: "http://jfm1.hostingradio.ru:14536/ijstream.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["джаз", "современный джаз"]
        },
        { 
            name: "Серебряный Дождь", 
            url: "http://silver.hostingradio.ru:8035/silver128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["джаз", "разговорное радио"]
        }
    ],
    "Электронная музыка": [
        { 
            name: "DFM", 
            url: "http://dfm.hostingradio.ru/dfm96.aacp", 
            bitrate: "96 kbps",
            codec: "AAC+",
            country: "Russia",
            language: "Русский",
            tags: ["электроника", "танцевальная музыка", "поп"]
        },
        { 
            name: "Record", 
            url: "http://air.radiorecord.ru:8101/rr_320", 
            bitrate: "320 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["электроника", "танцевальная музыка"]
        },
        { 
            name: "Megapolis FM", 
            url: "http://stream04.media.rambler.ru/megapolis128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["электроника", "поп"]
        },
        { 
            name: "Радио Energy", 
            url: "http://ic6.101.ru:8000/stream/pro/aac/64/99", 
            bitrate: "64 kbps",
            codec: "AAC",
            country: "Russia",
            language: "Русский",
            tags: ["электроника", "танцевальная музыка", "поп"]
        },
        { 
            name: "Kissfm", 
            url: "https://online.kissfm.ua/KissFM", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Ukraine",
            language: "Русский",
            tags: ["электроника", "поп"]
        },
        { 
            name: "Promodj Radio", 
            url: "http://radio.promodj.com:8000/premium-192", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "International",
            language: "Русский",
            tags: ["электроника", "диджейская музыка"]
        }
    ],
    "Ретро и ностальгия": [
        { 
            name: "Ретро FM", 
            url: "http://retroserver.streamr.ru:8043/retro256.mp3", 
            bitrate: "256 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["ретро", "советская музыка", "ностальгия"]
        },
        { 
            name: "Радио Дача", 
            url: "http://stream.radiodacha.ru/14_dacha_24", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["ретро", "народная музыка", "ностальгия"]
        },
        { 
            name: "Милицейская Волна", 
            url: "http://radiomv.hostingradio.ru/radiomv128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["ретро", "шансон", "ностальгия"]
        },
        { 
            name: "Радио Мелодия", 
            url: "http://stream128.melodiafm.spb.ru:8000/melodia128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["ретро", "советская музыка", "ностальгия"]
        },
        { 
            name: "Радио 7 на семи холмах", 
            url: "https://radio7.hostingradio.ru:8040/radio7128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["ретро", "советская музыка", "ностальгия"]
        }
    ],
    "Новости и Политика": [
        { 
            name: "Вести FM", 
            url: "https://icecast-vgtrk.cdnvideo.ru/vestifm_mp3_192kbps", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["новости", "политика"]
        },
        { 
            name: "Эхо Москвы", 
            url: "https://streams.echo.msk.ru/echo.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["новости", "политика", "разговорное радио"]
        },
        { 
            name: "Радио Свобода", 
            url: "http://rfe-channel-01.akacast.akamaistream.net/7/371/229652/v1/ibb.akacast.akamaistream.net/rfe_channel_01.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Czechia",
            language: "Русский",
            tags: ["новости", "политика"]
        },
        { 
            name: "Комсомольская Правда", 
            url: "https://kpradio.hostingradio.ru:8000/128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["новости", "разговорное радио"]
        },
        { 
            name: "Говорит Москва", 
            url: "http://media.govoritmoskva.ru:8000/rufm.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["новости", "разговорное радио"]
        },
        { 
            name: "Бизнес FM", 
            url: "http://bfm.hostingradio.ru:8004/fm", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["новости", "бизнес", "экономика"]
        },
        { 
            name: "Радио Маяк", 
            url: "https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_192kbps", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["новости", "разговорное радио"]
        }
    ],
    "Детские": [
        { 
            name: "Детское радио", 
            url: "http://edu.detifm.ru:8000/deti-radio", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["детское", "образовательное"]
        },
        { 
            name: "Радио Kids FM", 
            url: "http://radiokidsfm.ru:8000/stream", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["детское", "развлекательное"]
        },
        { 
            name: "Радио Гном", 
            url: "http://radio.gnomradio.com:8000/live128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["детское", "сказки"]
        },
        { 
            name: "Радио Disney Россия", 
            url: "http://disney2.streamr.ru:8060/disney", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["детское", "мультфильмы"]
        }
    ],
    "Религиозные": [
        { 
            name: "Радио Вера", 
            url: "http://radiovera.hostingradio.ru:8007/radiovera_128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["религиозное", "православие", "духовное"]
        },
        { 
            name: "Радонеж", 
            url: "http://icecast.radonezh.cdnvideo.ru:8000/rad128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["религиозное", "православие", "духовное"]
        },
        { 
            name: "Православное радио", 
            url: "http://radio-spas.ru:8000/Radio-Spas", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["религиозное", "православие", "духовное"]
        },
        { 
            name: "Радио Maria", 
            url: "http://dreamsiteradiocp.com:8032/stream", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "International",
            language: "Русский",
            tags: ["религиозное", "католицизм", "духовное"]
        }
    ],
    "Региональные": [
        { 
            name: "Москва FM", 
            url: "http://icecast.vgtrk.cdnvideo.ru/moscowfm128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["москва", "региональное"]
        },
        { 
            name: "Радио Петербург", 
            url: "http://www.5-tv.ru/radio/radio.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["санкт-петербург", "региональное"]
        },
        { 
            name: "Радио Сибирь", 
            url: "http://radiosibir.ru:8090/HQ", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["сибирь", "региональное"]
        },
        { 
            name: "Радио Екатеринбург", 
            url: "http://stream.radioekb.ru:8000/radioekb", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["урал", "региональное"]
        }
    ],
    "Зарубежные": [
        { 
            name: "Русское Радио Европа", 
            url: "http://s0.radioheart.ru:8000/RH20733", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Europe",
            language: "Русский",
            tags: ["зарубежное", "европа"]
        },
        { 
            name: "Русский Берлин", 
            url: "http://rb-stream.de:8000/stream.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Germany",
            language: "Русский",
            tags: ["зарубежное", "германия"]
        },
        { 
            name: "Наше Радио Нью-Йорк", 
            url: "http://nashe1.hostingradio.ru/nasheny128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "USA",
            language: "Русский",
            tags: ["зарубежное", "сша"]
        },
        { 
            name: "Русское Радио Азия", 
            url: "http://stream.rusradio.asia:8000/rra128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Asia",
            language: "Русский",
            tags: ["зарубежное", "азия"]
        }
    ],
    "Разговорные": [
        { 
            name: "Подкаст-терминал", 
            url: "http://stream.podcasts-terminal.ru:8000/podcasts-terminal", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["разговорное радио", "подкасты", "интервью"]
        },
        { 
            name: "Радио Свобода", 
            url: "http://rfe-channel-01.akacast.akamaistream.net/7/371/229652/v1/ibb.akacast.akamaistream.net/rfe_channel_01.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "International",
            language: "Русский",
            tags: ["разговорное радио", "новости", "политика"]
        },
        { 
            name: "SWR", 
            url: "http://str.swr-fm.ru:8000/efir", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["разговорное радио", "новости", "интервью"]
        }
    ],
    "Москва и Московская область": [
        { 
            name: "Москва FM", 
            url: "http://icecast.vgtrk.cdnvideo.ru/moscowfm128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["москва", "региональное", "новости"]
        },
        { 
            name: "Радио Москвы", 
            url: "http://www.radiomoskvy.ru:8000/mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["москва", "региональное", "новости"]
        },
        { 
            name: "Capital FM", 
            url: "http://icecast.vgtrk.cdnvideo.ru/capitalfmmp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["москва", "поп", "хиты"]
        },
        { 
            name: "Мегаполис FM", 
            url: "http://stream04.media.rambler.ru/megapolis128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["москва", "поп", "электроника"]
        },
        { 
            name: "Восток FM", 
            url: "http://stream5.radiostyle.ru:8005/radioistok", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["москва", "региональное", "поп"]
        }
    ],
    "Санкт-Петербург": [
        { 
            name: "Радио Петербург", 
            url: "http://www.5-tv.ru/radio/radio.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["санкт-петербург", "региональное", "новости"]
        },
        { 
            name: "Питер FM", 
            url: "http://cdn.radiopiterfm.ru/piterfm", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["санкт-петербург", "поп", "хиты"]
        },
        { 
            name: "Радио Балтика", 
            url: "http://baltika.hostingradio.ru/baltika128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["санкт-петербург", "поп", "региональное"]
        },
        { 
            name: "Метро FM", 
            url: "http://stream2.metroradio.ru:8000/metro", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["санкт-петербург", "поп", "хиты"]
        }
    ],
    "Сибирь": [
        { 
            name: "Радио Сибирь", 
            url: "http://radiosibir.ru:8090/HQ", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["сибирь", "региональное", "новости"]
        },
        { 
            name: "Авторадио-Новосибирск", 
            url: "http://as.ermak-media.ru:4003/avtoradio", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["сибирь", "новосибирск", "поп"]
        },
        { 
            name: "Радио Юнитон", 
            url: "http://online.uniton.ru:8300/radio-uniton", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["сибирь", "региональное", "поп"]
        },
        { 
            name: "Городская волна", 
            url: "http://online.gorvolna.ru:8000/gorvolna", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["сибирь", "региональное", "новости"]
        }
    ],
    "Урал": [
        { 
            name: "Радио СК", 
            url: "http://radio.skcmg.ru:8000/sc", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["урал", "региональное", "поп"]
        },
        { 
            name: "Радио Екатеринбург", 
            url: "http://stream.radioekb.ru:8000/radioekb", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["урал", "екатеринбург", "региональное"]
        },
        { 
            name: "Радио Пилот", 
            url: "http://online.pilotfm.ru:8000/pilot", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["урал", "поп", "хиты"]
        },
        { 
            name: "Эхо Москвы в Екатеринбурге", 
            url: "http://echoe.hostingradio.ru:8015/echoekb", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["урал", "екатеринбург", "новости"]
        }
    ],
    "Юг России": [
        { 
            name: "Казак FM", 
            url: "http://radio.riktam.ru:8000/kazak128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["юг россии", "казачья музыка", "народная музыка"]
        },
        { 
            name: "Первое радио Кубани", 
            url: "http://radio.1gl.ru:8000/128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["юг россии", "кубань", "региональное"]
        },
        { 
            name: "Радио Ростова", 
            url: "http://live.radiorostov.ru:8000/rostov128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["юг россии", "ростов", "региональное"]
        },
        { 
            name: "Южная волна", 
            url: "http://stream.volna-fm.ru:8000/live", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["юг россии", "региональное", "поп"]
        }
    ],
    "Развлекательные": [
        { 
            name: "Юмор FM", 
            url: "http://humor128.hostingradio.ru:8016/humor128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["развлекательное", "юмор", "комедия"]
        },
        { 
            name: "Comedy Radio", 
            url: "http://cdn.radioplayer.ru:8000/comedy128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["развлекательное", "юмор", "комедия"]
        },
        { 
            name: "Радио Шансон", 
            url: "http://chanson.hostingradio.ru:8041/chanson128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["развлекательное", "шансон", "народная музыка"]
        },
        { 
            name: "Радио Дача", 
            url: "http://stream.radiodacha.ru/14_dacha_24", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["развлекательное", "поп", "ретро"]
        },
        { 
            name: "Авторадио", 
            url: "https://pub0302.101.ru:8443/stream/air/aac/64/100", 
            bitrate: "64 kbps",
            codec: "AAC",
            country: "Russia",
            language: "Русский",
            tags: ["развлекательное", "поп", "хиты"]
        }
    ],
    "Образовательные": [
        { 
            name: "Радио Культура", 
            url: "https://icecast-vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["образовательное", "культура", "искусство"]
        },
        { 
            name: "Радио Маяк", 
            url: "https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_192kbps", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["образовательное", "новости", "разговорное радио"]
        },
        { 
            name: "Говорит Москва", 
            url: "http://media.govoritmoskva.ru:8000/rufm.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["образовательное", "разговорное радио", "москва"]
        }
    ],
    "Музыкальные": [
        { 
            name: "101.ru (Русские Хиты)", 
            url: "http://ic6.101.ru:8000/stream/pro/aac/64/166", 
            bitrate: "64 kbps",
            codec: "AAC",
            country: "Russia",
            language: "Русский",
            tags: ["музыкальное", "поп", "хиты"]
        },
        { 
            name: "Радио Record Online", 
            url: "http://air.radiorecord.ru:8101/rr_320", 
            bitrate: "320 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["музыкальное", "электроника", "танцевальная музыка"]
        },
        { 
            name: "Promodj Radio", 
            url: "http://radio.promodj.com:8000/premium-192", 
            bitrate: "192 kbps",
            codec: "MP3",
            country: "International",
            language: "Русский",
            tags: ["музыкальное", "электроника", "диджейская музыка"]
        },
        { 
            name: "Русское Кибер Радио", 
            url: "http://cyberradio.ru:8000/rq1", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["музыкальное", "электроника", "киберпанк"]
        },
        { 
            name: "Radio Metro", 
            url: "http://stream.radiometro.ru:8230/metro", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["музыкальное", "поп", "хиты"]
        }
    ],
    "Европа": [
        { 
            name: "Русское Радио Европа", 
            url: "http://s0.radioheart.ru:8000/RH20733", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Europe",
            language: "Русский",
            tags: ["европа", "поп", "хиты"]
        },
        { 
            name: "Русский Берлин", 
            url: "http://rb-stream.de:8000/stream.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Germany",
            language: "Русский",
            tags: ["европа", "германия", "поп"]
        },
        { 
            name: "Radio RussianFM (Германия)", 
            url: "http://stream.laut.fm/russianfm", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Germany",
            language: "Русский",
            tags: ["европа", "германия", "поп"]
        },
        { 
            name: "BBC Russian Service", 
            url: "http://stream.live.vc.bbcmedia.co.uk/bbc_russian_radio", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "UK",
            language: "Русский",
            tags: ["европа", "великобритания", "новости"]
        },
        { 
            name: "Русское Радио Балтия", 
            url: "http://stream.rusradio.lt:8000/rrb128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Lithuania",
            language: "Русский",
            tags: ["европа", "балтия", "поп"]
        },
        { 
            name: "Радио Спутник", 
            url: "https://icecast-rian.cdnvideo.ru/voicerus", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["европа", "новости", "информация"]
        }
    ],
    "Северная Америка": [
        { 
            name: "Наше Радио Нью-Йорк", 
            url: "http://nashe1.hostingradio.ru/nasheny128.mp3", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "USA",
            language: "Русский",
            tags: ["северная америка", "сша", "рок"]
        },
        { 
            name: "Русская Реклама", 
            url: "http://s7.voscast.com:8528/stream", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "USA",
            language: "Русский",
            tags: ["северная америка", "сша", "поп"]
        },
        { 
            name: "Русское Радио Чикаго", 
            url: "http://s4.radioheart.ru:8025/nonstop", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "USA",
            language: "Русский",
            tags: ["северная америка", "сша", "поп"]
        },
        { 
            name: "Russian American Radio", 
            url: "http://icecast.colostreaming.com:8000/rar", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "USA",
            language: "Русский",
            tags: ["северная америка", "сша", "поп"]
        }
    ],
    "Азия": [
        { 
            name: "Русское Радио Азия", 
            url: "http://stream.rusradio.asia:8000/rra128", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Asia",
            language: "Русский",
            tags: ["азия", "поп", "хиты"]
        },
        { 
            name: "Радио Владивосток FM", 
            url: "http://vladfm.com:8000/radio", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["азия", "дальний восток", "региональное"]
        },
        { 
            name: "Восток России", 
            url: "http://stream.radio.vl.ru:8000/vostok-russia", 
            bitrate: "128 kbps",
            codec: "MP3",
            country: "Russia",
            language: "Русский",
            tags: ["азия", "дальний восток", "региональное"]
        }
    ]
};

// =============================================
// Category icon helper
// =============================================
function getCategoryIcon(category) {
    return categoryEmojis[category] || '🎵';
}

// =============================================
// Flatten all stations
// =============================================
function getAllStations() {
    const all = [];
    const seen = new Set();
    for (const cat of Object.keys(radioStations)) {
        for (const st of radioStations[cat]) {
            const key = st.name + '|' + st.url;
            if (!seen.has(key)) {
                seen.add(key);
                all.push({ ...st, category: cat });
            }
        }
    }
    return all;
}

// =============================================
// Favorites
// =============================================
function loadFavorites() {
    try {
        const raw = localStorage.getItem('radioFavorites');
        favorites = raw ? JSON.parse(raw) : [];
    } catch {
        favorites = [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem('radioFavorites', JSON.stringify(favorites));
    } catch {}
}

function isFavorite(station) {
    return favorites.some(f => f.name === station.name && f.url === station.url);
}

function toggleFavorite(station, event) {
    if (event) event.stopPropagation();
    if (isFavorite(station)) {
        favorites = favorites.filter(f => !(f.name === station.name && f.url === station.url));
        showNotification('Удалено из избранного', 'info');
    } else {
        favorites.push(station);
        showNotification('Добавлено в избранное', 'success');
    }
    saveFavorites();
    // Refresh cards fav buttons
    document.querySelectorAll('.fav-btn').forEach(btn => {
        const name = btn.dataset.name;
        const url = btn.dataset.url;
        if (name && url) {
            const st = { name, url };
            btn.classList.toggle('active', isFavorite(st));
            btn.title = isFavorite(st) ? 'Удалить из избранного' : 'Добавить в избранное';
            btn.textContent = isFavorite(st) ? '♥' : '♡';
        }
    });
    // Rebuild categories to show/hide favorites tab
    setupCategories();
}

// =============================================
// Categories
// =============================================
function setupCategories() {
    const scroll = document.getElementById('categories-scroll');
    if (!scroll) return;
    scroll.innerHTML = '';

    const cats = ['Все'];
    if (favorites.length > 0) cats.push('❤️ Избранное');
    cats.push(...Object.keys(radioStations));

    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (cat === currentCategory ? ' active' : '');
        btn.innerHTML = `<span>${getCategoryIcon(cat)}</span><span>${cat}</span>`;
        btn.addEventListener('click', () => filterStations(cat));
        scroll.appendChild(btn);
    });
}

function filterStations(category) {
    currentCategory = category;
    // Clear search
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.classList.add('hidden');
    document.getElementById('categories-wrap').classList.remove('hidden');

    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.querySelector('span:last-child')?.textContent === category);
    });

    let stations;
    if (category === 'Все') {
        stations = getAllStations();
    } else if (category === '❤️ Избранное') {
        stations = favorites;
    } else {
        stations = (radioStations[category] || []).map(s => ({ ...s, category }));
    }

    displayStations(stations);
}

// =============================================
// Search
// =============================================
function searchStations(query) {
    const categoriesWrap = document.getElementById('categories-wrap');
    const searchClear = document.getElementById('search-clear');

    if (!query.trim()) {
        searchClear.classList.add('hidden');
        categoriesWrap.classList.remove('hidden');
        filterStations(currentCategory);
        return;
    }

    searchClear.classList.remove('hidden');
    categoriesWrap.classList.add('hidden');

    const q = query.toLowerCase();
    const results = getAllStations().filter(s => {
        return s.name.toLowerCase().includes(q) ||
            (s.tags && s.tags.some(tag => tag.toLowerCase().includes(q)));
    });

    displayStations(results, `Поиск: «${query}»`);
}

// =============================================
// Display Stations
// =============================================
function displayStations(stations, title) {
    const list = document.getElementById('radio-list');
    if (!list) return;
    list.innerHTML = '';

    if (!stations || stations.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📻</div>
                <div class="empty-state-text">Станции не найдены</div>
                <div class="empty-state-sub">Попробуйте другой запрос или категорию</div>
            </div>`;
        return;
    }

    stations.forEach(station => {
        const card = createStationCard(station);
        list.appendChild(card);
    });
}

// =============================================
// Create Station Card
// =============================================
function createStationCard(station) {
    const card = document.createElement('div');
    const isActive = currentStation && currentStation.name === station.name && currentStation.url === station.url;
    const isFav = isFavorite(station);
    const icon = getCategoryIcon(station.category || currentCategory);

    card.className = 'radio-card' + (isActive ? ' active' : '');
    card.innerHTML = `
        <div class="card-icon">${icon}</div>
        <div class="card-body">
            <div class="card-name" title="${station.name}">${station.name}</div>
            <div class="card-meta">
                <span class="card-bitrate">${station.bitrate || ''}</span>
                <span class="card-codec">${station.codec || ''}</span>
                <div class="card-playing-badge">
                    <div class="card-playing-waves">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    В ЭФИРЕ
                </div>
            </div>
        </div>
        <div class="card-actions">
            <button class="fav-btn ${isFav ? 'active' : ''}" 
                    data-name="${station.name}" 
                    data-url="${station.url}" 
                    title="${isFav ? 'Удалить из избранного' : 'Добавить в избранное'}">
                ${isFav ? '♥' : '♡'}
            </button>
        </div>`;

    card.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;
        if (isActive && isPlaying) {
            stopPlayback();
        } else {
            playStation(station);
        }
    });

    card.querySelector('.fav-btn').addEventListener('click', (e) => {
        toggleFavorite(station, e);
    });

    return card;
}

// =============================================
// Player UI Update
// =============================================
function updatePlayerUI(station) {
    const nameEl = document.getElementById('player-station-name');
    const iconEl = document.getElementById('station-icon');
    const onAirTag = document.getElementById('on-air-tag');
    const soundWaves = document.getElementById('sound-waves');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    if (station) {
        nameEl.textContent = station.name;
        iconEl.textContent = getCategoryIcon(station.category || currentCategory);
    }

    if (isPlaying) {
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
        onAirTag.classList.add('visible');
        soundWaves.classList.add('visible');
        iconEl.classList.add('playing');
    } else {
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
        onAirTag.classList.remove('visible');
        soundWaves.classList.remove('visible');
        iconEl.classList.remove('playing');
    }
}

function updatePlayingCards() {
    document.querySelectorAll('.radio-card').forEach(card => {
        const nameEl = card.querySelector('.card-name');
        if (!nameEl) return;
        const isActive = currentStation && nameEl.textContent === currentStation.name;
        card.classList.toggle('active', isActive);
    });
}

// =============================================
// Playback
// =============================================
function playStation(station) {
    if (!navigator.onLine) {
        showNotification('Нет интернет-соединения', 'error');
        return;
    }

    retryCount = 0;
    attemptPlay(station);
}

function attemptPlay(station) {
    clearTimeout(retryTimer);
    clearTimeout(loadTimeout);

    currentStation = station;
    showLoadingOverlay(true);
    showNotification('Загрузка...', 'info');

    audio.pause();
    audio.src = station.url;
    audio.load();

    loadTimeout = setTimeout(() => {
        if (!isPlaying) {
            showLoadingOverlay(false);
            if (retryCount < MAX_RETRIES) {
                retryCount++;
                showNotification(`Ошибка загрузки станции. Попытка повтора... (${retryCount}/${MAX_RETRIES})`, 'warning');
                retryTimer = setTimeout(() => attemptPlay(station), 2000);
            } else {
                showNotification('Таймаут загрузки. Проверьте подключение', 'error');
                currentStation = null;
                isPlaying = false;
                updatePlayerUI(null);
                updatePlayingCards();
            }
        }
    }, 15000);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(err => {
            // Handled by onerror event
        });
    }
}

function stopPlayback() {
    clearTimeout(retryTimer);
    clearTimeout(loadTimeout);
    audio.pause();
    isPlaying = false;
    showLoadingOverlay(false);
    showNotification('Остановлено', 'info');
    updatePlayerUI(currentStation);
    updatePlayingCards();
}

function startPlayback() {
    if (!currentStation) {
        showNotification('Выберите станцию', 'info');
        return;
    }
    playStation(currentStation);
}

// =============================================
// Audio Events (set up ONCE)
// =============================================
function setupAudioEvents() {
    audio.volume = volume;

    audio.addEventListener('playing', () => {
        clearTimeout(loadTimeout);
        isPlaying = true;
        retryCount = 0;
        showLoadingOverlay(false);
        showNotification(`Воспроизведение: ${currentStation?.name || ''}`, 'success');
        updatePlayerUI(currentStation);
        updatePlayingCards();
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayerUI(currentStation);
        updatePlayingCards();
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        showLoadingOverlay(false);
        updatePlayerUI(currentStation);
        updatePlayingCards();
    });

    audio.addEventListener('waiting', () => {
        showLoadingOverlay(true);
    });

    audio.addEventListener('canplay', () => {
        showLoadingOverlay(false);
    });

    audio.addEventListener('error', () => {
        clearTimeout(loadTimeout);
        showLoadingOverlay(false);
        isPlaying = false;

        const err = audio.error;
        if (err) {
            const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
            if (err.code === MEDIA_ERR_SRC_NOT_SUPPORTED && currentStation) {
                const codec = currentStation.codec || 'неизвестный';
                showNotification(`Формат ${codec} не поддерживается браузером`, 'error');
                return;
            }
        }

        if (retryCount < MAX_RETRIES && currentStation) {
            retryCount++;
            showNotification(`Ошибка загрузки станции. Попытка повтора... (${retryCount}/${MAX_RETRIES})`, 'warning');
            retryTimer = setTimeout(() => attemptPlay(currentStation), 2000);
        } else {
            showNotification('Станция не доступна', 'error');
            updatePlayerUI(currentStation);
            updatePlayingCards();
        }
    });

    audio.addEventListener('stalled', () => {
        showLoadingOverlay(true);
    });
}

// =============================================
// Loading Overlay
// =============================================
function showLoadingOverlay(show) {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    overlay.classList.toggle('hidden', !show);
}

// =============================================
// Notification
// =============================================
let notificationTimer = null;
function showNotification(message, type = '') {
    const el = document.getElementById('notification');
    if (!el) return;
    clearTimeout(notificationTimer);
    el.textContent = message;
    el.className = `notification ${type}`;
    // Force reflow for animation restart
    void el.offsetWidth;
    el.classList.add('show');
    notificationTimer = setTimeout(() => {
        el.classList.remove('show');
    }, 3000);
}

// =============================================
// Telegram Theme
// =============================================
function applyTelegramTheme() {
    if (!tg || !tg.themeParams) return;
    const p = tg.themeParams;
    const root = document.documentElement;
    const set = (v, k) => v && root.style.setProperty(k, v);

    set(p.bg_color, '--tg-theme-bg-color');
    set(p.text_color, '--tg-theme-text-color');
    set(p.hint_color, '--tg-theme-hint-color');
    set(p.button_color, '--tg-theme-button-color');
    set(p.button_text_color, '--tg-theme-button-text-color');
    set(p.secondary_bg_color, '--tg-theme-secondary-bg-color');
    if (p.button_color) {
        root.style.setProperty('--accent', p.button_color);
    }
    if (p.secondary_bg_color) {
        root.style.setProperty('--card-bg', p.secondary_bg_color);
    }
}

// =============================================
// Init
// =============================================
function init() {
    if (tg) applyTelegramTheme();

    loadFavorites();
    setupCategories();
    setupAudioEvents();

    // Initial display — all stations
    filterStations('Все');

    // Play/Pause button
    document.getElementById('btn-play-pause').addEventListener('click', () => {
        if (isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
    });

    // Mute button
    const btnMute = document.getElementById('btn-mute');
    const iconVol = document.getElementById('icon-vol');
    const iconMute = document.getElementById('icon-mute');
    btnMute.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        btnMute.classList.toggle('muted', isMuted);
        iconVol.classList.toggle('hidden', isMuted);
        iconMute.classList.toggle('hidden', !isMuted);
    });

    // Volume slider
    const volSlider = document.getElementById('volume-slider');
    volSlider.value = Math.round(volume * 100);
    volSlider.addEventListener('input', () => {
        volume = volSlider.value / 100;
        audio.volume = volume;
        if (volume === 0) {
            isMuted = true;
            audio.muted = true;
            btnMute.classList.add('muted');
            iconVol.classList.add('hidden');
            iconMute.classList.remove('hidden');
        } else if (isMuted) {
            isMuted = false;
            audio.muted = false;
            btnMute.classList.remove('muted');
            iconVol.classList.remove('hidden');
            iconMute.classList.add('hidden');
        }
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
            searchStations(searchInput.value);
        }, 300);
    });

    // Search clear
    document.getElementById('search-clear').addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    });

    // Offline/online events
    window.addEventListener('offline', () => {
        showNotification('Нет интернет-соединения', 'error');
        if (isPlaying) stopPlayback();
    });
    window.addEventListener('online', () => {
        showNotification('Подключение восстановлено', 'success');
    });

    // Update player bar initial state
    updatePlayerUI(null);
}

document.addEventListener('DOMContentLoaded', init);
