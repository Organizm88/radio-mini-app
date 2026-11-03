// ============================================================
//  RadioTotBot — Telegram Mini App   (Spotify-style)
// ============================================================

// ---- Telegram SDK ----
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// ---- Audio & State ----
const audio = new Audio();
audio.preload = 'none';
let currentStation = null;
let isPlaying = false;
let isMuted = false;
let volume = 1;
let currentCategory = 'Все';
let favorites = [];
let stationList = [];   // currently visible flat list
let stationIdx = -1;    // index in stationList
let searchTimer = null;
let retryCount = 0;
let loadTimer = null;

// ---- Gradients ----
const GRADS = [
    'linear-gradient(135deg,#667eea,#764ba2)',
    'linear-gradient(135deg,#f093fb,#f5576c)',
    'linear-gradient(135deg,#4facfe,#00f2fe)',
    'linear-gradient(135deg,#43e97b,#38f9d7)',
    'linear-gradient(135deg,#fa709a,#fee140)',
    'linear-gradient(135deg,#a18cd1,#fbc2eb)',
    'linear-gradient(135deg,#fccb90,#d57eeb)',
    'linear-gradient(135deg,#e0c3fc,#8ec5fc)',
];
function grad(n){let h=0;for(let i=0;i<n.length;i++)h=n.charCodeAt(i)+((h<<5)-h);return GRADS[Math.abs(h)%GRADS.length]}
function initials(n){return n.split(/[\s\-]+/).slice(0,2).map(w=>w[0]).join('').toUpperCase()||'📻'}

// ---- Category Emojis ----
const catEmoji = {
    "Все":"🎵","Поп-музыка":"🎤","Рок-музыка":"🎸","Шансон и народная музыка":"🪗",
    "Классическая музыка":"🎻","Джаз и блюз":"🎷","Электронная музыка":"💿",
    "Ретро и ностальгия":"📻","Новости и Политика":"📰","Детские":"🧸",
    "Религиозные":"⛪","Региональные":"🗺️","Зарубежные":"🌍","Разговорные":"🎙️",
    "Москва и Московская область":"🏙️","Санкт-Петербург":"🌉","Сибирь":"🌲",
    "Урал":"⛰️","Юг России":"☀️","Развлекательные":"🎭","Образовательные":"📚",
    "Музыкальные":"🎼","Европа":"🇪🇺","Северная Америка":"🗽","Азия":"🏯"
};

// ============================================================
//  RADIO STATIONS  (all http → https)
// ============================================================
const radioStations = {
    "Поп-музыка": [
        {name:"Русское Радио",url:"https://rusradio.hostingradio.ru/rusradio96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["поп","хиты"]},
        {name:"Европа Плюс",url:"https://ep128.hostingradio.ru:8030/ep128",bitrate:"128 kbps",codec:"MP3",tags:["поп","хиты"]},
        {name:"Love Radio",url:"https://lovefm.hostingradio.ru/lovelive",bitrate:"128 kbps",codec:"MP3",tags:["поп","любовные песни"]},
        {name:"Радио Energy",url:"https://pub0302.101.ru:8443/stream/air/aac/64/99",bitrate:"64 kbps",codec:"AAC",tags:["поп","танцевальная"]},
        {name:"DFM",url:"https://dfm.hostingradio.ru/dfm96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["поп","танцевальная"]},
        {name:"Хит FM",url:"https://hitfm.hostingradio.ru/hitfm96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["поп","хиты"]},
        {name:"Радио Maximum",url:"https://maximum.hostingradio.ru/maximum96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["поп","рок"]},
        {name:"Like FM",url:"https://likefm.hostingradio.ru:8015/likefm128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["поп","хиты"]},
        {name:"Новое Радио",url:"https://icecast-newradio.cdnvideo.ru/newradio3",bitrate:"128 kbps",codec:"MP3",tags:["поп","новые хиты"]},
        {name:"Радио Дача",url:"https://stream.radiodacha.ru/14_dacha_24",bitrate:"128 kbps",codec:"MP3",tags:["поп","ретро"]}
    ],
    "Рок-музыка": [
        {name:"Наше Радио",url:"https://nashe.hostingradio.ru/nashe-128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["рок","русский рок"]},
        {name:"Ultra",url:"https://ultramp3.hostingradio.ru:8443/ultra320.mp3",bitrate:"320 kbps",codec:"MP3",tags:["рок","альтернатива"]},
        {name:"Rock FM",url:"https://nashe2.hostingradio.ru/rock-128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["рок","классический рок"]},
        {name:"Радио Maximum",url:"https://maximum.hostingradio.ru/maximum96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["рок","альтернатива"]}
    ],
    "Шансон и народная музыка": [
        {name:"Радио Шансон",url:"https://chanson.hostingradio.ru:8041/chanson128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["шансон"]},
        {name:"Радио Дача",url:"https://stream.radiodacha.ru/14_dacha_24",bitrate:"128 kbps",codec:"MP3",tags:["шансон","ретро"]},
        {name:"Милицейская Волна",url:"https://radiomv.hostingradio.ru/radiomv128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["шансон"]}
    ],
    "Классическая музыка": [
        {name:"Радио Орфей",url:"https://orfeyfm.hostingradio.ru:8034/orfeyfm192.mp3",bitrate:"192 kbps",codec:"MP3",tags:["классика"]},
        {name:"Радио Культура",url:"https://icecast-vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps",bitrate:"192 kbps",codec:"MP3",tags:["классика","культура"]}
    ],
    "Джаз и блюз": [
        {name:"Радио Джаз",url:"https://jazzradio.hostingradio.ru/jazzradio128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["джаз","блюз"]},
        {name:"Серебряный Дождь",url:"https://silver.hostingradio.ru:8035/silver128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["джаз"]}
    ],
    "Электронная музыка": [
        {name:"DFM",url:"https://dfm.hostingradio.ru/dfm96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["электроника","танцевальная"]},
        {name:"Record",url:"https://air.radiorecord.ru:8101/rr_320",bitrate:"320 kbps",codec:"MP3",tags:["электроника","танцевальная"]},
        {name:"KissFM",url:"https://online.kissfm.ua/KissFM",bitrate:"128 kbps",codec:"MP3",tags:["электроника","поп"]},
        {name:"Радио Energy",url:"https://pub0302.101.ru:8443/stream/air/aac/64/99",bitrate:"64 kbps",codec:"AAC",tags:["электроника","поп"]}
    ],
    "Ретро и ностальгия": [
        {name:"Ретро FM",url:"https://retro.hostingradio.ru/retro256.mp3",bitrate:"256 kbps",codec:"MP3",tags:["ретро","ностальгия"]},
        {name:"Радио Дача",url:"https://stream.radiodacha.ru/14_dacha_24",bitrate:"128 kbps",codec:"MP3",tags:["ретро","народная"]},
        {name:"Радио 7 на семи холмах",url:"https://radio7.hostingradio.ru:8040/radio7128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["ретро","ностальгия"]},
        {name:"Милицейская Волна",url:"https://radiomv.hostingradio.ru/radiomv128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["ретро","шансон"]}
    ],
    "Новости и Политика": [
        {name:"Вести FM",url:"https://icecast-vgtrk.cdnvideo.ru/vestifm_mp3_192kbps",bitrate:"192 kbps",codec:"MP3",tags:["новости","политика"]},
        {name:"Комсомольская Правда",url:"https://kpradio.hostingradio.ru:8000/128",bitrate:"128 kbps",codec:"MP3",tags:["новости"]},
        {name:"Радио Маяк",url:"https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_192kbps",bitrate:"192 kbps",codec:"MP3",tags:["новости"]},
        {name:"Бизнес FM",url:"https://bfm.hostingradio.ru:8004/fm",bitrate:"128 kbps",codec:"MP3",tags:["новости","бизнес"]}
    ],
    "Детские": [
        {name:"Детское радио",url:"https://radio-children.hostingradio.ru/children96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["детское"]}
    ],
    "Развлекательные": [
        {name:"Юмор FM",url:"https://humor128.hostingradio.ru:8016/humor128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["юмор","комедия"]},
        {name:"Авторадио",url:"https://pub0302.101.ru:8443/stream/air/aac/64/100",bitrate:"64 kbps",codec:"AAC",tags:["поп","хиты"]}
    ],
    "Образовательные": [
        {name:"Радио Культура",url:"https://icecast-vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps",bitrate:"192 kbps",codec:"MP3",tags:["культура"]},
        {name:"Радио Маяк",url:"https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_192kbps",bitrate:"192 kbps",codec:"MP3",tags:["образовательное"]}
    ],
    "Музыкальные": [
        {name:"Record",url:"https://air.radiorecord.ru:8101/rr_320",bitrate:"320 kbps",codec:"MP3",tags:["электроника","танцевальная"]},
        {name:"Русское Радио",url:"https://rusradio.hostingradio.ru/rusradio96.aacp",bitrate:"96 kbps",codec:"AAC+",tags:["поп","хиты"]},
        {name:"Наше Радио",url:"https://nashe.hostingradio.ru/nashe-128.mp3",bitrate:"128 kbps",codec:"MP3",tags:["рок"]}
    ]
};

// ============================================================
//  DOM REFS
// ============================================================
const $ = id => document.getElementById(id);
const miniPlayer = $('mini-player');
const mpName     = $('mp-name');
const mpStatus   = $('mp-status');
const mpArt      = $('mp-art');
const mpInitials = $('mp-initials');
const mpPlayBtn  = $('mp-play');
const fpEl       = $('full-player');
const fpName     = $('fp-name');
const fpMeta     = $('fp-meta');
const fpArt      = $('fp-art');
const fpInitials = $('fp-initials');
const fpWaves    = $('fp-waves');
const fpPlayBtn  = $('fp-play');
const fpFavBtn   = $('fp-fav');
const fpPrev     = $('fp-prev');
const fpNext     = $('fp-next');
const fpMuteBtn  = $('fp-mute');
const fpVol      = $('fp-vol');
const gridEl     = $('radio-list');
const catsEl     = $('categories');
const catsWrap   = $('cats-wrap');
const secTitle   = $('section-title');
const secHdr     = $('section-hdr');
const searchIn   = $('search-input');
const searchCl   = $('search-clear');
const loadingEl  = $('loading');
const notifEl    = $('notif');

// ============================================================
//  INIT
// ============================================================
function init() {
    applyTgTheme();
    loadFavorites();
    setupAudio();
    setupSearch();
    setupMiniPlayer();
    setupFullPlayer();
    setupCategories();
    filterStations('Все');
    // online / offline
    window.addEventListener('online',  () => notify('Соединение восстановлено','success'));
    window.addEventListener('offline', () => notify('Нет интернет-соединения','error'));
}

// ---- Telegram theme ----
function applyTgTheme() {
    if (!tg?.themeParams) return;
    const tp = tg.themeParams;
    const r = document.documentElement.style;
    if (tp.bg_color)            r.setProperty('--bg', tp.bg_color);
    if (tp.secondary_bg_color)  r.setProperty('--bg2', tp.secondary_bg_color);
    if (tp.text_color)          r.setProperty('--t1', tp.text_color);
    if (tp.hint_color)          r.setProperty('--t2', tp.hint_color);
    if (tp.button_color)        r.setProperty('--accent', tp.button_color);
}

// ============================================================
//  CATEGORIES
// ============================================================
function setupCategories() {
    catsEl.innerHTML = '';
    const cats = ['Все', ...Object.keys(radioStations)];
    // add Favorites if any
    if (favorites.length) cats.splice(1, 0, '❤️ Избранное');
    cats.forEach(c => {
        const b = document.createElement('button');
        b.className = 'cat-btn' + (c === currentCategory ? ' active' : '');
        b.textContent = (catEmoji[c] || '') + ' ' + c;
        b.addEventListener('click', () => filterStations(c));
        catsEl.appendChild(b);
    });
}

function filterStations(cat) {
    currentCategory = cat;
    // update active button
    catsEl.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.toggle('active', b.textContent.includes(cat));
    });
    let stations;
    if (cat === 'Все') {
        stations = dedupe(Object.values(radioStations).flat());
    } else if (cat === '❤️ Избранное') {
        stations = favorites.slice();
    } else {
        stations = radioStations[cat] || [];
    }
    secTitle.textContent = cat === 'Все' ? 'Все станции' : cat;
    stationList = stations;
    updateStationIdx();
    displayStations(stations);
}

function dedupe(arr) {
    const seen = new Set();
    return arr.filter(s => {
        if (seen.has(s.url)) return false;
        seen.add(s.url);
        return true;
    });
}

// ============================================================
//  DISPLAY STATIONS
// ============================================================
function displayStations(stations) {
    gridEl.innerHTML = '';
    if (!stations.length) {
        gridEl.innerHTML = '<div class="no-results">Ничего не найдено</div>';
        return;
    }
    const frag = document.createDocumentFragment();
    stations.forEach((s, i) => frag.appendChild(createCard(s, i)));
    gridEl.appendChild(frag);
}

function createCard(station, idx) {
    const card = document.createElement('div');
    card.className = 'st-card';
    if (currentStation && currentStation.url === station.url && isPlaying) card.classList.add('playing');
    card.dataset.url = station.url;

    const isFav = favorites.some(f => f.url === station.url);

    card.innerHTML = `
        <div class="card-art" style="background:${grad(station.name)}">
            <span class="card-init">${initials(station.name)}</span>
            <button class="card-fav${isFav ? ' active' : ''}" data-idx="${idx}">
                ${isFav ? '♥' : '♡'}
            </button>
            <button class="card-play-btn" data-idx="${idx}">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <div class="card-overlay">
                <div class="card-eq"><span></span><span></span><span></span></div>
            </div>
        </div>
        <div class="card-info">
            <div class="card-name">${station.name}</div>
            <div class="card-meta">${station.bitrate} · ${station.codec}</div>
        </div>`;

    // play
    card.querySelector('.card-play-btn').addEventListener('click', e => {
        e.stopPropagation();
        stationIdx = idx;
        playStation(station);
    });
    card.addEventListener('click', () => {
        stationIdx = idx;
        playStation(station);
    });
    // fav
    card.querySelector('.card-fav').addEventListener('click', e => {
        e.stopPropagation();
        toggleFav(station);
    });
    return card;
}

// ============================================================
//  SEARCH
// ============================================================
function setupSearch() {
    searchIn.addEventListener('input', () => {
        const q = searchIn.value.trim();
        searchCl.classList.toggle('hidden', !q);
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            if (!q) {
                catsWrap.classList.remove('hidden');
                secHdr.classList.remove('hidden');
                filterStations(currentCategory);
                return;
            }
            catsWrap.classList.add('hidden');
            secHdr.classList.add('hidden');
            const low = q.toLowerCase();
            const all = dedupe(Object.values(radioStations).flat());
            const res = all.filter(s =>
                s.name.toLowerCase().includes(low) ||
                (s.tags && s.tags.some(t => t.toLowerCase().includes(low)))
            );
            stationList = res;
            updateStationIdx();
            displayStations(res);
        }, 300);
    });
    searchCl.addEventListener('click', () => {
        searchIn.value = '';
        searchCl.classList.add('hidden');
        catsWrap.classList.remove('hidden');
        secHdr.classList.remove('hidden');
        filterStations(currentCategory);
    });
}

// ============================================================
//  PLAY / STOP / TOGGLE
// ============================================================
function playStation(station) {
    if (!station || !station.url) return;
    if (!navigator.onLine) { notify('Нет интернет-соединения','error'); return; }

    // same station playing → toggle
    if (currentStation && currentStation.url === station.url) {
        togglePlay();
        return;
    }

    // stop current
    stopAudio();
    retryCount = 0;
    currentStation = station;
    updateStationIdx();

    // show mini player & UI
    miniPlayer.classList.remove('hidden');
    updateUI();

    // start
    attemptPlay();
}

function attemptPlay() {
    if (!currentStation) return;
    showLoading();

    audio.src = currentStation.url;
    audio.volume = volume;
    audio.muted = isMuted;
    audio.load();

    clearTimeout(loadTimer);
    loadTimer = setTimeout(() => {
        if (!isPlaying) {
            hideLoading();
            if (retryCount < 3) {
                retryCount++;
                notify(`Повтор загрузки (${retryCount}/3)...`, 'info');
                attemptPlay();
            } else {
                notify('Станция недоступна', 'error');
                stopAudio();
            }
        }
    }, 12000);

    audio.play().then(() => {
        clearTimeout(loadTimer);
        hideLoading();
        isPlaying = true;
        retryCount = 0;
        updateUI();
        notify('▶ ' + currentStation.name, 'success');
    }).catch(err => {
        clearTimeout(loadTimer);
        hideLoading();
        if (retryCount < 3) {
            retryCount++;
            notify(`Повтор загрузки (${retryCount}/3)...`, 'info');
            setTimeout(attemptPlay, 2000);
        } else {
            notify('Ошибка воспроизведения', 'error');
            stopAudio();
        }
    });
}

function stopAudio() {
    clearTimeout(loadTimer);
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    isPlaying = false;
    hideLoading();
}

function togglePlay() {
    if (!currentStation) { notify('Выберите станцию', 'info'); return; }
    if (isPlaying) {
        stopAudio();
        updateUI();
        notify('Остановлено', 'info');
    } else {
        retryCount = 0;
        attemptPlay();
    }
}

function prevStation() {
    if (!stationList.length) return;
    stationIdx = (stationIdx - 1 + stationList.length) % stationList.length;
    playStation(stationList[stationIdx]);
}
function nextStation() {
    if (!stationList.length) return;
    stationIdx = (stationIdx + 1) % stationList.length;
    playStation(stationList[stationIdx]);
}

function updateStationIdx() {
    if (!currentStation) { stationIdx = -1; return; }
    const i = stationList.findIndex(s => s.url === currentStation.url);
    if (i !== -1) stationIdx = i;
}

// ============================================================
//  AUDIO EVENTS (once)
// ============================================================
function setupAudio() {
    audio.addEventListener('playing', () => {
        isPlaying = true;
        hideLoading();
        updateUI();
    });
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updateUI();
    });
    audio.addEventListener('waiting', showLoading);
    audio.addEventListener('canplay', hideLoading);
    audio.addEventListener('stalled', showLoading);
    audio.addEventListener('error', e => {
        hideLoading();
        isPlaying = false;
        updateUI();
    });
}

// ============================================================
//  UI UPDATE
// ============================================================
function updateUI() {
    const s = currentStation;
    const g = s ? grad(s.name) : 'linear-gradient(135deg,#333,#222)';
    const ini = s ? initials(s.name) : '📻';
    const name = s ? s.name : 'Выберите станцию';

    // mini player
    mpName.textContent = name;
    mpStatus.textContent = isPlaying ? 'В эфире' : (s ? 'Пауза' : '');
    mpArt.style.background = g;
    mpInitials.textContent = ini;
    miniPlayer.classList.toggle('playing', isPlaying);
    togglePlayIcon(mpPlayBtn, isPlaying);

    // full player
    fpName.textContent = name;
    fpMeta.textContent = s ? `${s.bitrate} · ${s.codec}` : '—';
    fpArt.style.background = g;
    fpInitials.textContent = ini;
    fpWaves.classList.toggle('paused', !isPlaying);
    togglePlayIcon(fpPlayBtn, isPlaying);

    // fav button in full player
    if (s) {
        const isFav = favorites.some(f => f.url === s.url);
        fpFavBtn.classList.toggle('active', isFav);
        fpFavBtn.querySelector('svg path').setAttribute('d',
            isFav
            ? 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
            : 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'
        );
    }

    // cards
    gridEl.querySelectorAll('.st-card').forEach(c => {
        c.classList.toggle('playing', s && c.dataset.url === s.url && isPlaying);
    });
}

function togglePlayIcon(btn, playing) {
    const pl = btn.querySelector('.icon-play');
    const pa = btn.querySelector('.icon-pause');
    if (pl) pl.classList.toggle('hidden', playing);
    if (pa) pa.classList.toggle('hidden', !playing);
}

// ============================================================
//  MINI PLAYER
// ============================================================
function setupMiniPlayer() {
    $('mp-open').addEventListener('click', openFullPlayer);
    mpPlayBtn.addEventListener('click', e => { e.stopPropagation(); togglePlay(); });
}

// ============================================================
//  FULL PLAYER
// ============================================================
function openFullPlayer() {
    fpEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeFullPlayer() {
    fpEl.classList.add('hidden');
    document.body.style.overflow = '';
}

function setupFullPlayer() {
    $('fp-close').addEventListener('click', closeFullPlayer);
    fpPlayBtn.addEventListener('click', togglePlay);
    fpPrev.addEventListener('click', prevStation);
    fpNext.addEventListener('click', nextStation);
    fpFavBtn.addEventListener('click', () => { if (currentStation) toggleFav(currentStation); });
    fpMuteBtn.addEventListener('click', toggleMute);
    fpVol.addEventListener('input', e => {
        volume = e.target.value / 100;
        audio.volume = volume;
        if (volume > 0) { isMuted = false; audio.muted = false; }
        updateMuteIcon();
    });
    // swipe down to close
    let startY = 0;
    fpEl.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
    fpEl.addEventListener('touchend', e => {
        const dy = e.changedTouches[0].clientY - startY;
        if (dy > 100) closeFullPlayer();
    }, {passive:true});
}

function toggleMute() {
    isMuted = !isMuted;
    audio.muted = isMuted;
    updateMuteIcon();
}

function updateMuteIcon() {
    const vol = fpMuteBtn.querySelector('.icon-vol');
    const mut = fpMuteBtn.querySelector('.icon-mute');
    vol.classList.toggle('hidden', isMuted);
    mut.classList.toggle('hidden', !isMuted);
}

// ============================================================
//  FAVORITES
// ============================================================
function loadFavorites() {
    try { favorites = JSON.parse(localStorage.getItem('radioFavorites') || '[]'); } catch { favorites = []; }
}
function saveFavorites() {
    localStorage.setItem('radioFavorites', JSON.stringify(favorites));
}
function toggleFav(station) {
    const idx = favorites.findIndex(f => f.url === station.url);
    if (idx !== -1) {
        favorites.splice(idx, 1);
        notify('Удалено из избранного', 'info');
    } else {
        favorites.push(station);
        notify('Добавлено в избранное ❤️', 'success');
    }
    saveFavorites();
    setupCategories();
    if (currentCategory === '❤️ Избранное') filterStations('❤️ Избранное');
    updateUI();
    // update cards fav buttons
    gridEl.querySelectorAll('.card-fav').forEach(btn => {
        const i = parseInt(btn.dataset.idx);
        if (i >= 0 && i < stationList.length) {
            const isFav = favorites.some(f => f.url === stationList[i].url);
            btn.classList.toggle('active', isFav);
            btn.textContent = isFav ? '♥' : '♡';
        }
    });
}

// ============================================================
//  UTILS
// ============================================================
function showLoading() { loadingEl.classList.remove('hidden'); }
function hideLoading() { loadingEl.classList.add('hidden'); }

let notifTimer = null;
function notify(msg, type = 'info') {
    clearTimeout(notifTimer);
    notifEl.textContent = msg;
    notifEl.className = 'notif ' + type + ' show';
    notifTimer = setTimeout(() => notifEl.classList.remove('show'), 2500);
}

// ---- Start ----
document.addEventListener('DOMContentLoaded', init);
