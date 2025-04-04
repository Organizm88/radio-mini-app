// Audio player instance
let audio = new Audio();
let currentStation = null;
let isPlaying = false;
let volume = 1;
let isMuted = false;
let isLoading = false;

// DOM elements
const playerBar = document.querySelector('.player-bar');
const currentStationElement = document.getElementById('current-station');
const playPauseButton = document.getElementById('play-pause');
const prevStationButton = document.getElementById('prev-station');
const nextStationButton = document.getElementById('next-station');
const muteButton = document.getElementById('mute');
const volumeSlider = document.getElementById('volume-slider');
const loadingOverlay = document.getElementById('loading');
const notification = document.getElementById('notification');
const categoriesContainer = document.getElementById('categories');
const radioList = document.getElementById('radio-list');

// Radio stations data
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

// Add format support detection
const audioFormats = {
    canPlayType: (function() {
        const audio = new Audio();
        return {
            mp3: audio.canPlayType('audio/mpeg').replace(/^no$/, ''),
            aac: audio.canPlayType('audio/aac').replace(/^no$/, ''),
            aacp: audio.canPlayType('audio/aacp').replace(/^no$/, ''),
            ogg: audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
            opus: audio.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
            m3u8: audio.canPlayType('application/vnd.apple.mpegurl').replace(/^no$/, ''),
            m3u: audio.canPlayType('audio/x-mpegurl').replace(/^no$/, '')
        };
    })()
};

// Initialize the application
function init() {
    setupCategories();
    displayRadioStations();
    setupPlayerControls();
    setupVolumeControls();
    setupAudioEvents();
}

// Setup category buttons
function setupCategories() {
    const categories = Object.keys(radioStations);
    categories.unshift("Все"); // Add "All" category
    
    const fragment = document.createDocumentFragment();
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-button';
        if (category === "Все") button.classList.add('active');
        button.textContent = category;
        button.dataset.category = category;
        button.addEventListener('click', () => filterStations(category));
        fragment.appendChild(button);
    });
    
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.innerHTML = '';
    categoriesContainer.appendChild(fragment);
}

// Filter stations by category
function filterStations(category) {
    // Update active category button
    document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Get stations for the selected category
    const stations = category === "Все" 
        ? Object.values(radioStations).flat()
        : radioStations[category] || [];
    
    // Display filtered stations
    displayStations(stations);
}

// Display stations in the grid
function displayStations(stations) {
    const fragment = document.createDocumentFragment();
    
    if (stations.length === 0) {
        const message = document.createElement('div');
        message.className = 'no-stations';
        message.textContent = 'No stations found in this category';
        fragment.appendChild(message);
    } else {
        stations.forEach(station => {
            const card = createStationCard(station);
            fragment.appendChild(card);
        });
    }
    
    radioList.innerHTML = '';
    radioList.appendChild(fragment);
}

// Create station card element
function createStationCard(station) {
    const card = document.createElement('div');
    card.className = 'radio-card';
    
    card.innerHTML = `
        <div class="station-info">
            <h3 class="radio-name">${station.name}</h3>
            <div class="station-details">${station.bitrate}</div>
        </div>
        <button class="play-button">▶</button>
    `;
    
    const playButton = card.querySelector('.play-button');
    playButton.addEventListener('click', () => playStation(station));
    
    return card;
}

// Setup player controls
function setupPlayerControls() {
    if (!playPauseButton) return;
    
    // Play/Pause button
    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            stopPlayback();
        } else if (currentStation) {
            startPlayback();
        } else {
            showNotification('Please select a station first', 'info');
        }
    });
    
    // Update play/pause button state when audio state changes
    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });
    
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
    
    audio.addEventListener('error', handlePlaybackError);
    audio.addEventListener('waiting', showLoading);
    audio.addEventListener('canplay', hideLoading);
    
    // Add ended event listener to properly handle stream end
    audio.addEventListener('ended', () => {
        stopPlayback();
    });
}

// Stop playback completely
function stopPlayback() {
    if (!audio) return;
    
    try {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        isLoading = false;
        updatePlayPauseButton();
        hideLoading();
        showNotification('Playback stopped', 'info');
    } catch (error) {
        console.error('Error stopping playback:', error);
    }
}

// Start playback
function startPlayback() {
    if (!currentStation || !audio) return;
    
    if (isLoading) {
        showNotification('Please wait while the station is loading', 'info');
        return;
    }
    
    try {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isPlaying = true;
                    updatePlayPauseButton();
                    showNotification(`Playing: ${currentStation.name}`, 'info');
                })
                .catch(error => {
                    handlePlaybackError(error);
                });
        }
    } catch (error) {
        handlePlaybackError(error);
    }
}

// Toggle play/pause (updated)
function togglePlayPause() {
    if (!currentStation) {
        showNotification('Please select a station first', 'info');
        return;
    }
    
    if (isLoading) {
        showNotification('Please wait while the station is loading', 'info');
        return;
    }
    
    if (isPlaying) {
        stopPlayback();
    } else {
        startPlayback();
    }
}

// Setup volume controls
function setupVolumeControls() {
    // Set initial volume
    audio.volume = volume;
    volumeSlider.value = volume * 100;
    updateMuteButton();
    
    // Volume slider change
    volumeSlider.addEventListener('input', (e) => {
        volume = e.target.value / 100;
        audio.volume = volume;
        updateMuteButton();
        
        if (volume > 0) {
            isMuted = false;
            audio.muted = false;
        }
    });
    
    // Mute button click
    muteButton.addEventListener('click', toggleMute);
}

// Update play/pause button
function updatePlayPauseButton() {
    if (!playPauseButton) return;
    playPauseButton.textContent = isPlaying ? '⏸' : '▶';
}

// Toggle mute
function toggleMute() {
    isMuted = !isMuted;
    audio.muted = isMuted;
    
    if (isMuted) {
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = volume;
        volumeSlider.value = volume * 100;
    }
    
    updateMuteButton();
}

// Update mute button
function updateMuteButton() {
    if (isMuted || volume === 0) {
        muteButton.textContent = '🔇';
    } else if (volume < 0.5) {
        muteButton.textContent = '🔈';
    } else {
        muteButton.textContent = '🔊';
    }
}

// Show loading overlay
function showLoading() {
    loadingOverlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// Enhanced error handling with format-specific messages
function handlePlaybackError(error) {
    console.error('Playback error:', error);
    hideLoading();
    isLoading = false;
    
    let message = 'Error playing station';
    
    if (!navigator.onLine) {
        message = 'No internet connection';
    } else if (error.name === 'NotSupportedError') {
        const codec = currentStation?.codec || 'Unknown';
        message = `Audio format ${codec} not supported by your browser`;
    } else if (error.name === 'NotAllowedError') {
        message = 'Playback not allowed';
    } else if (error.message === 'Loading timeout') {
        message = 'Station loading timeout';
    } else if (error.name === 'AbortError') {
        message = 'Playback aborted';
    } else if (error.name === 'MediaError') {
        switch(error.code) {
            case 1:
                message = 'Stream loading aborted';
                break;
            case 2:
                message = 'Network error while loading stream';
                break;
            case 3:
                message = `Error decoding ${currentStation?.codec || 'audio'} stream`;
                break;
            case 4:
                message = `Stream format ${currentStation?.codec || ''} not supported`;
                break;
        }
    }
    
    showNotification(message, 'error');
    
    if (currentStation) {
        isPlaying = false;
        updatePlayPauseButton();
    }
}

// Show notification with auto-hide
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    // Clear any existing timeout
    if (notification.hideTimeout) {
        clearTimeout(notification.hideTimeout);
    }
    
    // Update notification
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    // Auto-hide after delay
    notification.hideTimeout = setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Enhanced audio events setup
function setupAudioEvents() {
    audio.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseButton();
        showNotification('Stream ended', 'info');
    });
    
    audio.addEventListener('error', (e) => {
        isPlaying = false;
        isLoading = false;
        handlePlaybackError(e.error || new Error('Audio error'));
    });
    
    audio.addEventListener('waiting', () => {
        isLoading = true;
        showLoading();
    });
    
    audio.addEventListener('playing', () => {
        isLoading = false;
        hideLoading();
        isPlaying = true;
        updatePlayPauseButton();
    });
    
    audio.addEventListener('canplay', () => {
        isLoading = false;
        hideLoading();
    });
    
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
    
    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });
    
    audio.addEventListener('stalled', () => {
        isLoading = true;
        showLoading();
    });
    
    audio.addEventListener('suspend', () => {
        isLoading = false;
        hideLoading();
    });
    
    // Add buffering detection
    let lastPlayPos = 0;
    let currentPlayPos = 0;
    let bufferingDetected = false;
    
    const checkBuffering = setInterval(() => {
        currentPlayPos = audio.currentTime;
        
        // Check if position has changed
        const offset = 1 / 50;
        if (!bufferingDetected && currentPlayPos < (lastPlayPos + offset) && !audio.paused) {
            showLoading();
            bufferingDetected = true;
        }
        
        // Check if buffering has ended
        if (bufferingDetected && currentPlayPos > (lastPlayPos + offset) && !audio.paused) {
            hideLoading();
            bufferingDetected = false;
        }
        
        lastPlayPos = currentPlayPos;
    }, 100);
}

// Enhanced playStation function
function playStation(station) {
    if (!station || !station.url) {
        showNotification('Invalid station data', 'error');
        return;
    }
    
    // Check internet connection
    if (!navigator.onLine) {
        showNotification('No internet connection', 'error');
        return;
    }
    
    // If clicking the same station that's currently playing, stop it
    if (currentStation && currentStation.url === station.url && isPlaying) {
        stopPlayback();
        return;
    }
    
    // Start loading
    isLoading = true;
    showLoading();
    
    try {
        // Stop current playback if any
        if (audio.src) {
            stopPlayback();
        }
        
        // Create new Audio element for each stream
        audio = new Audio();
        
        // Set audio attributes
        audio.crossOrigin = "anonymous";
        audio.preload = "auto";
        
        // Check format support
        const codec = station.codec.toLowerCase();
        const isSupported = checkCodecSupport(codec);
        
        if (!isSupported) {
            showNotification(`Warning: ${station.codec} format may not be fully supported by your browser`, 'warning');
        }
        
        // Add format-specific optimizations
        if (codec === 'aac' || codec === 'aac+' || codec === 'aacp') {
            audio.mozAudioChannelType = 'content';
        }
        
        // Set up error recovery
        setupErrorRecovery(station);
        
        // Set up enhanced audio events
        setupAudioEvents();
        
        // Configure audio settings
        audio.volume = volume;
        audio.muted = isMuted;
        
        currentStation = station;
        audio.src = station.url;
        
        // Force load the audio
        audio.load();
        
        // Update UI
        currentStationElement.textContent = station.name;
        
        // Attempt to play with timeout
        const playPromise = audio.play();
        
        // Set a timeout for the initial loading
        const loadingTimeout = setTimeout(() => {
            if (isLoading) {
                stopPlayback();
                handlePlaybackError(new Error('Loading timeout'));
            }
        }, 10000);
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    clearTimeout(loadingTimeout);
                    isLoading = false;
                    hideLoading();
                    isPlaying = true;
                    updatePlayPauseButton();
                    showNotification(`Playing: ${station.name} (${station.codec} ${station.bitrate})`, 'info');
                })
                .catch(error => {
                    clearTimeout(loadingTimeout);
                    handlePlaybackError(error);
                });
        }
    } catch (error) {
        handlePlaybackError(error);
    }
}

// Setup error recovery
function setupErrorRecovery(station) {
    let errorRetryCount = 0;
    const maxRetries = 3;
    
    audio.onerror = function(e) {
        console.error('Audio error:', e);
        if (errorRetryCount < maxRetries) {
            errorRetryCount++;
            console.log(`Retrying playback (attempt ${errorRetryCount})`);
            
            setTimeout(() => {
                if (currentStation === station) {
                    audio.load();
                    audio.play().catch(handlePlaybackError);
                }
            }, 1000);
        } else {
            handlePlaybackError(e);
        }
    };
}

// Check codec support
function checkCodecSupport(codec) {
    codec = codec.toLowerCase();
    switch (codec) {
        case 'mp3':
            return audioFormats.canPlayType.mp3;
        case 'aac':
        case 'aac+':
        case 'aacp':
            return audioFormats.canPlayType.aac || audioFormats.canPlayType.aacp;
        case 'ogg':
            return audioFormats.canPlayType.ogg;
        case 'opus':
            return audioFormats.canPlayType.opus;
        default:
            return false;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
