// ============================================================
//  RadioTotBot — Telegram Mini App
//  Data: Radio Browser API (radio-browser.info)
//  30,000+ stations worldwide, auto health-checked
// ============================================================

const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// ---- API ----
const API_SERVERS = [
    'https://de1.api.radio-browser.info/json',
    'https://nl1.api.radio-browser.info/json',
    'https://at1.api.radio-browser.info/json'
];
let apiBase = API_SERVERS[0];

async function apiFetch(path, signal) {
    for (const srv of API_SERVERS) {
        try {
            const res = await fetch(srv + path, { signal });
            if (res.ok) { apiBase = srv; return res.json(); }
        } catch (e) {
            if (e.name === 'AbortError') throw e;
        }
    }
    throw new Error('Все серверы недоступны');
}

// ---- State ----
const audio = new Audio();
audio.preload = 'none';
let currentStation = null;
let isPlaying = false;
let isMuted = false;
let volume = 1;
let favorites = [];
let stationList = [];
let stationIdx = -1;
let selectedCountry = '';
let selectedGenre = '';
let searchQuery = '';
let offset = 0;
const LIMIT = 50;
let hasMore = true;
let isFetching = false;
let retryCount = 0;
let loadTimer = null;
let searchTimer = null;
let fetchController = null;

let currentTab = 'all'; // 'all', 'fav', 'top'

// ---- Genres ----
const GENRES = [
    { label:'🎵 Все жанры',     tag:'' },
    { label:'🎤 Поп-музыка',    tag:'pop' },
    { label:'🎸 Рок',           tag:'rock' },
    { label:'🎷 Джаз',          tag:'jazz' },
    { label:'🎻 Классика',      tag:'classical' },
    { label:'💿 Электроника',   tag:'electronic' },
    { label:'📰 Новости',       tag:'news' },
    { label:'🎙️ Разговорное',   tag:'talk' },
    { label:'🪩 Танцевальная',  tag:'dance' },
    { label:'🎧 Хип-хоп',      tag:'hip-hop' },
    { label:'⚡ Метал',         tag:'metal' },
    { label:'🤠 Кантри',        tag:'country' },
    { label:'🪕 Фолк',          tag:'folk' },
    { label:'✨ R&B',           tag:'rnb' },
    { label:'🎺 Блюз',          tag:'blues' },
    { label:'🌴 Регги',         tag:'reggae' },
    { label:'🎸 Инди',          tag:'indie' },
    { label:'🌌 Эмбиент',       tag:'ambient' },
    { label:'⛪ Христианское',  tag:'christian' },
    { label:'⚽ Спорт',         tag:'sport' },
    { label:'🪗 Шансон',        tag:'chanson' },
    { label:'📻 Ретро',         tag:'retro' }
];

// ---- Gradients for fallback ----
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
const grad = n => { let h=0; for(let i=0;i<n.length;i++) h=n.charCodeAt(i)+((h<<5)-h); return GRADS[Math.abs(h)%GRADS.length]; };
const initials = n => n.split(/[\s\-&|,]+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase()||'♪';
const flag = code => {
    if (!code || code.length !== 2) return '';
    return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};
const regionNames = (() => { try { return new Intl.DisplayNames(['ru'],{type:'region'}); } catch { return null; } })();
const countryName = code => { try { return regionNames?.of(code) || code; } catch { return code; } };
// Страница открывается по HTTPS, поэтому http-потоки и логотипы блокируются как mixed content
const toHttps = u => (u && u.indexOf('http://') === 0) ? 'https://' + u.slice(7) : (u || '');
// Разрешаем для ссылок только http/https
const safeHref = u => /^https?:\/\//i.test(u || '') ? u : '';

// ---- Иконки избранного (без дублирования путей) ----
const ICON_HEART_FILLED  = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
const ICON_HEART_OUTLINE = 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z';

// ---- DOM ----
const $ = id => document.getElementById(id);
const miniPlayer  = $('mini-player');
const mpArt       = $('mp-art');
const mpLogo      = $('mp-logo');
const mpInitials  = $('mp-initials');
const mpEq        = $('mp-eq');
const mpName      = $('mp-name');
const mpStatus    = $('mp-status');
const mpPlayBtn   = $('mp-play');
const fpEl        = $('full-player');
const fpArt       = $('fp-art');
const fpLogo      = $('fp-logo');
const fpInitials  = $('fp-initials');
const fpWaves     = $('fp-waves');
const fpName      = $('fp-name');
const fpSub       = $('fp-sub');
const fpFavBtn    = $('fp-fav');
const fpFavPath   = $('fp-fav-path');
const fpPlayBtn   = $('fp-play');
const fpPrev      = $('fp-prev');
const fpNext      = $('fp-next');
const fpVol       = $('fp-vol');
const fpMute      = $('fp-mute');
const fpHome      = $('fp-home');
const listEl      = $('stations-list');
const genreSel    = $('genre-sel');
const countrySel  = $('country-sel');
const searchIn    = $('search-input');
const searchCl    = $('search-clear');
const secTitle    = $('section-title');
const countBadge  = $('station-count-small');
const loadingEl   = $('loading');
const notifEl     = $('notif');
const loadMoreWrap = $('load-more-wrap');
const loadMoreBtn  = $('load-more-btn');

// ============================================================
//  INIT
// ============================================================
async function init() {
    applyTgTheme();
    loadFavorites();
    loadSettings();
    setupAudio();
    setupSearch();
    setupMiniPlayer();
    setupFullPlayer();
    setupGenres();
    setupTabs();
    loadMoreBtn.addEventListener('click', () => fetchStations(false));
    $('btn-refresh').addEventListener('click', () => fetchStations(true));
    window.addEventListener('online',  () => notify('Соединение восстановлено','success'));
    window.addEventListener('offline', () => notify('Нет интернет-соединения','error'));
    // Load countries async (don't block)
    loadCountries();
    // Restore last played station (paused) and load stations
    restoreLastStation();
    fetchStations(true);
}

// ---- Telegram Theme ----
function applyTgTheme() {
    if (!tg?.themeParams) return;
    const tp = tg.themeParams;
    const r = document.documentElement.style;
    const light = tg.colorScheme === 'light';
    if (tp.bg_color)           r.setProperty('--bg', tp.bg_color);
    if (tp.secondary_bg_color) r.setProperty('--bg2', tp.secondary_bg_color);
    if (tp.text_color)         r.setProperty('--t1', tp.text_color);
    if (tp.hint_color)         r.setProperty('--t2', tp.hint_color);
    if (tp.button_color)       r.setProperty('--accent', tp.button_color);
    // Полупрозрачные подложки читаются и в светлой, и в тёмной теме
    r.setProperty('--bg3', light ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.07)');
    r.setProperty('--bg4', light ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.15)');
    r.setProperty('--t3',  light ? 'rgba(0,0,0,.45)' : '#535353');
    document.documentElement.classList.toggle('theme-light', light);
}

// ============================================================
//  COUNTRIES
// ============================================================
async function loadCountries() {
    try {
        const data = await apiFetch('/countrycodes?order=stationcount&reverse=true&limit=120');
        // Build options
        const frag = document.createDocumentFragment();
        data
            .filter(c => c.name && c.name.length === 2 && c.stationcount > 5)
            .forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.name;
                opt.textContent = flag(c.name) + ' ' + countryName(c.name) + ' (' + c.stationcount + ')';
                frag.appendChild(opt);
            });
        countrySel.appendChild(frag);
    } catch { /* silently fail */ }

    countrySel.addEventListener('change', () => {
        selectedCountry = countrySel.value;
        if (currentTab === 'fav') switchTab('all');   // выбор страны не работает во вкладке «Избранное»
        else fetchStations(true);
    });
}

// ============================================================
//  GENRES & TABS
// ============================================================
function setupGenres() {
    genreSel.innerHTML = '';
    const frag = document.createDocumentFragment();
    GENRES.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.tag;
        opt.textContent = g.label;
        frag.appendChild(opt);
    });
    genreSel.appendChild(frag);

    genreSel.addEventListener('change', () => {
        selectedGenre = genreSel.value;
        if (currentTab === 'fav') switchTab('all');
        else fetchStations(true);
    });
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    if (tab === 'fav') {
        showFavorites();
    } else {
        fetchStations(true);
    }
}

function showFavorites() {
    loadFavorites();
    stationList = [...favorites];
    secTitle.textContent = '❤️ Избранное';
    countBadge.textContent = favorites.length ? `${favorites.length}` : '0';
    $('station-count').textContent = favorites.length ? favorites.length + ' станций' : '';
    loadMoreWrap.style.display = 'none';
    if (!favorites.length) {
        listEl.innerHTML = '<div class="no-results">Пока нет избранных станций.<br>Нажмите ❤️ у любой станции, чтобы добавить её сюда.</div>';
        return;
    }
    renderList(favorites, true);
    updateStationIdx();
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
            searchQuery = q;
            if (currentTab === 'fav') switchTab('all');   // поиск не работает во вкладке «Избранное»
            else fetchStations(true);
        }, 400);
    });
    searchCl.addEventListener('click', () => {
        searchIn.value = '';
        searchCl.classList.add('hidden');
        searchQuery = '';
        if (currentTab === 'fav') showFavorites();
        else fetchStations(true);
    });
}

// ============================================================
//  FETCH STATIONS
// ============================================================
async function fetchStations(reset = false) {
    if (currentTab === 'fav') return;
    if (isFetching && !reset) return;
    // Cancel previous request if resetting
    if (reset && fetchController) fetchController.abort();
    fetchController = new AbortController();

    if (reset) { offset = 0; stationList = []; hasMore = true; showSkeleton(); }
    if (!hasMore) return;

    isFetching = true;

    let order = 'clickcount';
    if (searchQuery) order = 'name';
    else if (currentTab === 'top') order = 'votes';

    const params = new URLSearchParams({
        hidebroken: 'true',
        order: order,
        reverse: 'true',
        limit: LIMIT,
        offset
    });
    if (selectedCountry) params.set('countrycode', selectedCountry);
    if (selectedGenre)   params.set('tag', selectedGenre);
    if (searchQuery)     params.set('name', searchQuery);

    try {
        const data = await apiFetch('/stations/search?' + params, fetchController.signal);

        if (data.length < LIMIT) hasMore = false;
        offset += data.length;

        if (reset) {
            stationList = data;
            renderList(data, true);
        } else {
            // offset + меняющаяся сортировка даёт повторы — пропускаем уже загруженные станции
            const seen = new Set(stationList.map(s => s.stationuuid));
            const fresh = data.filter(s => !seen.has(s.stationuuid));
            stationList = [...stationList, ...fresh];
            renderList(fresh, false);
        }

        // Update section title
        const genre = GENRES.find(g => g.tag === selectedGenre);
        const parts = [];
        if (currentTab === 'top') parts.push('🔥 Топ 100');
        if (genre && genre.tag) parts.push(genre.label);
        if (selectedCountry) parts.push(flag(selectedCountry) + ' ' + countryName(selectedCountry));
        if (searchQuery) parts.push(`«${searchQuery}»`);
        secTitle.textContent = parts.join(' · ') || (currentTab === 'top' ? '🔥 Топ 100' : 'Популярные');
        countBadge.textContent = stationList.length ? stationList.length + '+' : '';
        $('station-count').textContent = stationList.length ? stationList.length + ' станций' : '';

        loadMoreWrap.style.display = (hasMore && stationList.length) ? 'flex' : 'none';
        updateStationIdx();
    } catch (e) {
        if (e.name !== 'AbortError') {
            if (reset) listEl.innerHTML = '<div class="no-results">Не удалось загрузить станции.<br>Проверьте подключение к интернету.</div>';
            notify('Ошибка загрузки', 'error');
        }
    } finally {
        isFetching = false;
    }
}

// ============================================================
//  RENDER LIST
// ============================================================
function showSkeleton() {
    listEl.innerHTML = Array(6).fill(0).map(() => `
        <div class="sk-item">
            <div class="sk-logo skeleton"></div>
            <div class="sk-lines">
                <div class="sk-l1 skeleton"></div>
                <div class="sk-l2 skeleton"></div>
            </div>
        </div>`).join('');
}

function renderList(stations, replace) {
    if (replace) listEl.innerHTML = '';

    if (!stations.length && replace) {
        listEl.innerHTML = '<div class="no-results">Станции не найдены.<br>Попробуйте другой фильтр или запрос.</div>';
        return;
    }

    const frag = document.createDocumentFragment();
    stations.forEach((s, i) => {
        const globalIdx = replace ? i : stationList.length - stations.length + i;
        frag.appendChild(createItem(s, globalIdx));
    });
    listEl.appendChild(frag);
}

function createItem(station, idx) {
    const item = document.createElement('div');
    item.className = 'st-item' + (currentStation?.stationuuid === station.stationuuid && isPlaying ? ' playing' : '');
    item.dataset.uuid = station.stationuuid;

    const isFav = favorites.some(f => f.stationuuid === station.stationuuid);
    const favPath = isFav ? ICON_HEART_FILLED : ICON_HEART_OUTLINE;

    const g = grad(station.name);
    const ini = initials(station.name);
    const countryCode = station.countrycode || '';
    const favicon = toHttps(station.favicon);
    const countryLabel = countryName(countryCode) || station.country || '';
    const tags = (station.tags || '').split(',').slice(0,2).join(', ');
    const metaParts = [
        (flag(countryCode) + ' ' + escHtml(countryLabel)).trim(),
        escHtml(tags),
        station.bitrate ? station.bitrate + ' kbps' : ''
    ].filter(Boolean);

    item.innerHTML = `
        <div class="si-logo-wrap" style="background:${g}">
            <img class="si-logo ${favicon ? '' : 'hidden'}" data-src="${escHtml(favicon)}" alt="">
            <span class="si-init ${favicon ? 'hidden' : ''}">${escHtml(ini)}</span>
            <div class="si-eq"><span></span><span></span><span></span></div>
        </div>
        <div class="si-info">
            <div class="si-name">${escHtml(station.name)}</div>
            <div class="si-meta">${metaParts.join(' · ')}</div>
        </div>
        <div class="si-btns">
            <button class="si-btn si-fav ${isFav ? 'active' : ''}" title="Избранное">
                <svg viewBox="0 0 24 24"><path d="${favPath}"/></svg>
            </button>
            <button class="si-btn si-play" title="Слушать">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
        </div>`;

    // Lazy-load logo
    const img = item.querySelector('.si-logo');
    const initEl = item.querySelector('.si-init');
    if (favicon && img) {
        img.addEventListener('error', () => { img.classList.add('hidden'); initEl.classList.remove('hidden'); });
        img.addEventListener('load',  () => { img.classList.remove('hidden'); initEl.classList.add('hidden'); });
        img.src = favicon;
    }

    // Play
    item.querySelector('.si-play').addEventListener('click', e => { e.stopPropagation(); stationIdx = idx; playStation(station); });
    item.addEventListener('click', () => { stationIdx = idx; playStation(station); });

    // Fav
    item.querySelector('.si-fav').addEventListener('click', e => { e.stopPropagation(); toggleFav(station); });

    return item;
}

function escHtml(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ============================================================
//  PLAYBACK
// ============================================================
function playStation(station) {
    if (!navigator.onLine) { notify('Нет интернет-соединения','error'); return; }
    if (!station) return;

    // Toggle if same station
    if (currentStation?.stationuuid === station.stationuuid) { togglePlay(); return; }

    stopAudio();
    retryCount = 0;
    currentStation = station;
    updateStationIdx();
    miniPlayer.classList.remove('hidden');
    updateUI();
    attemptPlay();
    haptic('light');
    saveLastStation(station);

    // Register click with Radio Browser (for stats)
    try { fetch(apiBase + '/url/' + station.stationuuid); } catch {}
}

function getStreamUrl(station) {
    // Предпочитаем url_resolved (обычно HTTPS), при необходимости апгрейдим схему
    return toHttps(station.url_resolved || station.url || '');
}

function attemptPlay() {
    if (!currentStation) return;
    showLoading();
    clearTimeout(loadTimer);

    const url = getStreamUrl(currentStation);
    if (!url) { notify('Нет URL потока','error'); hideLoading(); return; }

    audio.src = url;
    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;
    audio.load();

    loadTimer = setTimeout(() => {
        if (!isPlaying) {
            hideLoading();
            if (retryCount < 3) {
                retryCount++;
                notify(`Повтор ${retryCount}/3...`, 'info');
                setTimeout(attemptPlay, 1500);
            } else {
                notify('Станция недоступна', 'error');
                stopAudio();
                updateUI();
            }
        }
    }, 14000);

    audio.play().then(() => {
        clearTimeout(loadTimer);
        hideLoading();
        isPlaying = true;
        retryCount = 0;
        updateUI();
        notify('▶ ' + currentStation.name, 'success');
    }).catch(() => {
        clearTimeout(loadTimer);
        hideLoading();
        if (retryCount < 3) {
            retryCount++;
            notify(`Повтор ${retryCount}/3...`, 'info');
            setTimeout(attemptPlay, 1500);
        } else {
            notify('Ошибка воспроизведения', 'error');
            stopAudio();
            updateUI();
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
    if (!currentStation) { notify('Выберите станцию','info'); return; }
    if (isPlaying) {
        stopAudio();
        updateUI();
        notify('Остановлено','info');
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
    if (!currentStation || !stationList.length) return;
    const i = stationList.findIndex(s => s.stationuuid === currentStation.stationuuid);
    if (i !== -1) stationIdx = i;
}

// ---- Audio events (once) ----
function setupAudio() {
    audio.addEventListener('playing', () => { isPlaying = true; hideLoading(); updateUI(); });
    audio.addEventListener('pause',   () => { isPlaying = false; updateUI(); });
    audio.addEventListener('waiting', showLoading);
    audio.addEventListener('canplay', hideLoading);
    audio.addEventListener('stalled', showLoading);
    audio.addEventListener('error',   () => { hideLoading(); isPlaying = false; updateUI(); });
    setupMediaSession();
}

// ---- Media Session (управление с локскрина и наушников) ----
function setupMediaSession() {
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    const safe = fn => () => { try { fn(); } catch {} };
    try {
        ms.setActionHandler('play',          safe(() => { if (!isPlaying) togglePlay(); }));
        ms.setActionHandler('pause',         safe(() => { if (isPlaying) togglePlay(); }));
        ms.setActionHandler('nexttrack',     safe(nextStation));
        ms.setActionHandler('previoustrack', safe(prevStation));
        ms.setActionHandler('stop',          safe(() => { stopAudio(); updateUI(); }));
    } catch {}
}

function updateMediaSession() {
    if (!('mediaSession' in navigator) || !currentStation) return;
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    try {
        const artwork = toHttps(currentStation.favicon);
        navigator.mediaSession.metadata = new MediaMetadata({
            title:  currentStation.name,
            artist: [countryName(currentStation.countrycode), (currentStation.tags || '').split(',').slice(0, 2).join(', ')].filter(Boolean).join(' · ') || 'Радио',
            album:  'RadioTotBot',
            artwork: artwork ? [{ src: artwork, sizes: '512x512', type: 'image/png' }] : []
        });
    } catch {}
}

// ============================================================
//  UI
// ============================================================
function updateUI() {
    const s = currentStation;
    const g = s ? grad(s.name) : '#1e1e1e';
    const ini = s ? initials(s.name) : '♪';
    const favUrl = toHttps(s?.favicon);

    // --- mini player ---
    mpName.textContent    = s ? s.name : 'Выберите станцию';
    mpStatus.textContent  = s ? (isPlaying ? 'В эфире' : 'Пауза') : '';
    mpArt.style.background = g;
    mpInitials.textContent = ini;
    miniPlayer.classList.toggle('playing', isPlaying);
    // mini logo
    if (favUrl) {
        mpLogo.src = favUrl;
        mpLogo.classList.remove('hidden');
        mpInitials.style.display = 'none';
        mpLogo.onerror = () => { mpLogo.classList.add('hidden'); mpInitials.style.display = ''; };
        mpLogo.onload  = () => { mpLogo.classList.remove('hidden'); mpInitials.style.display = 'none'; };
    } else {
        mpLogo.classList.add('hidden');
        mpInitials.style.display = '';
    }
    mpEq.classList.toggle('hidden', !isPlaying);
    toggleIcons(mpPlayBtn, isPlaying);

    // --- full player ---
    fpName.textContent = s ? s.name : 'Выберите станцию';
    const tags = s ? (s.tags||'').split(',').filter(Boolean).slice(0,3).join(', ') : '';
    const cc   = s ? flag(s.countrycode||'') + ' ' + (countryName(s.countrycode) || s.country || '') : '';
    fpSub.textContent = [cc, tags, s?.bitrate ? s.bitrate+'kbps' : ''].filter(Boolean).join(' · ') || '—';
    fpArt.style.background = g;
    fpInitials.textContent  = ini;
    fpWaves.classList.toggle('paused', !isPlaying);
    // fp logo
    if (favUrl) {
        fpLogo.src = favUrl;
        fpLogo.classList.remove('hidden');
        fpInitials.classList.add('hidden');
        fpLogo.onerror = () => { fpLogo.classList.add('hidden'); fpInitials.classList.remove('hidden'); };
        fpLogo.onload  = () => { fpLogo.classList.remove('hidden'); fpInitials.classList.add('hidden'); };
    } else {
        fpLogo.classList.add('hidden');
        fpInitials.classList.remove('hidden');
    }
    toggleIcons(fpPlayBtn, isPlaying);
    // fav
    const isFav = s ? favorites.some(f => f.stationuuid === s.stationuuid) : false;
    fpFavBtn.classList.toggle('active', isFav);
    fpFavPath.setAttribute('d', isFav ? ICON_HEART_FILLED : ICON_HEART_OUTLINE);
    // mute
    fpMute.classList.toggle('muted', isMuted);
    fpMute.setAttribute('aria-label', isMuted ? 'Включить звук' : 'Выключить звук');
    // homepage
    const home = safeHref(s?.homepage);
    if (home) { fpHome.href = home; fpHome.style.display = ''; }
    else fpHome.style.display = 'none';

    // Cards in list: highlight playing
    listEl.querySelectorAll('.st-item').forEach(el => {
        el.classList.toggle('playing', s && el.dataset.uuid === s.stationuuid && isPlaying);
    });

    updateMediaSession();
}

function toggleIcons(btn, playing) {
    btn.querySelector('.icon-play')?.classList.toggle('hidden', playing);
    btn.querySelector('.icon-pause')?.classList.toggle('hidden', !playing);
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
    try { tg?.BackButton?.show(); } catch {}
}
function closeFullPlayer() {
    fpEl.classList.add('hidden');
    document.body.style.overflow = '';
    try { tg?.BackButton?.hide(); } catch {}
}

function setupFullPlayer() {
    $('fp-close').addEventListener('click', closeFullPlayer);
    fpPlayBtn.addEventListener('click', togglePlay);
    fpPrev.addEventListener('click', prevStation);
    fpNext.addEventListener('click', nextStation);
    fpFavBtn.addEventListener('click', () => { if (currentStation) toggleFav(currentStation); });
    fpMute.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted  = isMuted;
        audio.volume = isMuted ? 0 : volume;
        saveSettings();
        updateUI();
        haptic('light');
    });
    fpVol.addEventListener('input', e => {
        volume = e.target.value / 100;
        if (volume > 0 && isMuted) isMuted = false;
        audio.muted  = isMuted;
        audio.volume = isMuted ? 0 : volume;
        saveSettings();
    });
    // Аппаратная кнопка «Назад» в Telegram закрывает плеер
    try { tg?.BackButton?.onClick(closeFullPlayer); } catch {}
    // Swipe down
    let startY = 0;
    fpEl.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
    fpEl.addEventListener('touchend',   e => { if (e.changedTouches[0].clientY - startY > 80) closeFullPlayer(); }, {passive:true});
}

// ============================================================
//  FAVORITES
// ============================================================
function loadFavorites() {
    try { favorites = JSON.parse(localStorage.getItem('radioFavs_v2') || '[]'); } catch { favorites = []; }
}
function saveFavorites() {
    localStorage.setItem('radioFavs_v2', JSON.stringify(favorites));
}

// ---- Настройки: громкость, mute и последняя станция ----
function loadSettings() {
    const v = Number(localStorage.getItem('radioVol_v1'));
    volume  = (v >= 0 && v <= 1) ? v : 1;
    isMuted = localStorage.getItem('radioMute_v1') === '1';
    fpVol.value = Math.round(volume * 100);
    audio.volume = isMuted ? 0 : volume;
    audio.muted  = isMuted;
}
function saveSettings() {
    try {
        localStorage.setItem('radioVol_v1', String(volume));
        localStorage.setItem('radioMute_v1', isMuted ? '1' : '0');
    } catch {}
}
function saveLastStation(station) {
    try { localStorage.setItem('radioLast_v1', JSON.stringify(station)); } catch {}
}
function restoreLastStation() {
    let last = null;
    try { last = JSON.parse(localStorage.getItem('radioLast_v1') || 'null'); } catch {}
    if (!last?.stationuuid) return;
    currentStation = last;
    miniPlayer.classList.remove('hidden');
    updateUI();
}
function toggleFav(station) {
    const i = favorites.findIndex(f => f.stationuuid === station.stationuuid);
    if (i !== -1) {
        favorites.splice(i, 1);
        notify('Удалено из избранного', 'info');
    } else {
        favorites.push(station);
        notify('Добавлено в избранное ❤️', 'success');
    }
    saveFavorites();
    haptic('light');
    updateUI();
    if (currentTab === 'fav') {
        showFavorites();
        return;
    }
    // Update fav buttons in list
    listEl.querySelectorAll('.st-item').forEach(el => {
        if (el.dataset.uuid !== station.stationuuid) return;
        const isFav = favorites.some(f => f.stationuuid === station.stationuuid);
        const btn = el.querySelector('.si-fav');
        btn.classList.toggle('active', isFav);
        btn.querySelector('path').setAttribute('d', isFav ? ICON_HEART_FILLED : ICON_HEART_OUTLINE);
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
    notifTimer = setTimeout(() => notifEl.classList.remove('show'), 2800);
}

// Тактильная отдача в Telegram (если доступна)
function haptic(style = 'light') {
    try { tg?.HapticFeedback?.impactOccurred(style); } catch {}
}

// ============================================================
//  START
// ============================================================
document.addEventListener('DOMContentLoaded', init);
