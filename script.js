// Audio player instance
const audio = new Audio();
let currentStation = null;
let isPlaying = false;
let volume = 1;
let isMuted = false;

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
        { name: "Европа Плюс", url: "http://europaplus.hostingradio.ru:8014/europaplus320.mp3", bitrate: "320 kbps" },
        { name: "Русское Радио", url: "https://rusradio.hostingradio.ru/rusradio96.aacp", bitrate: "96 kbps" },
        { name: "Новое Радио", url: "https://icecast-newradio.cdnvideo.ru/newradio3", bitrate: "128 kbps" },
        { name: "Love Radio", url: "http://stream.loveradio.ru/12_love_28?type=.aac", bitrate: "128 kbps" },
        { name: "Хит FM", url: "http://hitfm.hostingradio.ru/hitfm128.mp3", bitrate: "128 kbps" },
        { name: "DFM", url: "https://dfm.hostingradio.ru/dfm96.aacp", bitrate: "96 kbps" },
        { name: "Радио ENERGY", url: "https://pub0301.101.ru:8443/stream/air/mp3/256/99", bitrate: "256 kbps" },
        { name: "Зайцев FM Pop", url: "https://zaycev.fm:9002/pop128.mp3", bitrate: "128 kbps" },
        { name: "Радио Maximum", url: "https://maximum.hostingradio.ru/maximum128.mp3", bitrate: "128 kbps" },
        { name: "Радио Monte Carlo", url: "https://montecarlo.hostingradio.ru/montecarlo128.mp3", bitrate: "128 kbps" }
    ],
    "Танцевальная": [
        { name: "Радио Рекорд", url: "https://air.radiorecord.ru:805/rr_320", bitrate: "320 kbps" },
        { name: "DFM Dance", url: "https://dfm-dance.hostingradio.ru/dance96.aacp", bitrate: "96 kbps" },
        { name: "Record Deep", url: "https://air.radiorecord.ru:805/deep_320", bitrate: "320 kbps" },
        { name: "Record Trance", url: "https://air.radiorecord.ru:805/trance_320", bitrate: "320 kbps" },
        { name: "Garage FM", url: "https://garagefm.ru:8000/garagefm", bitrate: "128 kbps" },
        { name: "Revolution Radio", url: "https://revolutionradio.ru:8000/live", bitrate: "128 kbps" },
        { name: "Q-Dance", url: "https://stream.q-dance.com/hardstyle", bitrate: "128 kbps" },
        { name: "Record Goa/Psy Trance", url: "https://air.radiorecord.ru:805/goa_320", bitrate: "320 kbps" },
        { name: "Soundpark Deep", url: "https://soundpark.hostingradio.ru/soundpark128.mp3", bitrate: "128 kbps" },
        { name: "Pirate Station", url: "https://air.radiorecord.ru:805/ps_320", bitrate: "320 kbps" }
    ],
    "Рок": [
        { name: "Наше Радио", url: "https://nashe1.hostingradio.ru/nashe-256", bitrate: "256 kbps" },
        { name: "Rock FM", url: "https://rockfm.hostingradio.ru/rockfm128.mp3", bitrate: "128 kbps" },
        { name: "Радио Maximum", url: "https://maximum.hostingradio.ru/maximum128.mp3", bitrate: "128 kbps" },
        { name: "Легенды Рока", url: "https://rocklegends.ru:8000/rock", bitrate: "128 kbps" },
        { name: "DKFM Shoegaze Radio", url: "https://stream.dkfm.rocks:8000/shoegaze", bitrate: "128 kbps" },
        { name: "Radio ROKS", url: "https://online-radio.roks.ua/RadioROKS_320", bitrate: "320 kbps" },
        { name: "KXRY (XRAY.fm)", url: "https://stream.xray.fm/stream", bitrate: "128 kbps" },
        { name: "NTS Radio Rock", url: "https://stream-1a.ntslive.net/stream", bitrate: "128 kbps" },
        { name: "Ария FM", url: "https://ariafm.ru:8000/aria", bitrate: "128 kbps" },
        { name: "New New World Radio", url: "https://nnwradio.com:8000/stream", bitrate: "128 kbps" }
    ],
    "Ретро": [
        { name: "Ретро FM", url: "https://retro.hostingradio.ru:8014/retro320.mp3", bitrate: "320 kbps" },
        { name: "Радио Дача", url: "https://radiodacha.hostingradio.ru/radiodacha128.mp3", bitrate: "128 kbps" },
        { name: "Авторадио", url: "https://pub0301.101.ru:8443/stream/air/mp3/256/100", bitrate: "256 kbps" },
        { name: "Радио 7", url: "https://radio7.hostingradio.ru/radio7128.mp3", bitrate: "128 kbps" },
        { name: "Monte Carlo Nights", url: "https://montecarlo.hostingradio.ru/nights128.mp3", bitrate: "128 kbps" },
        { name: "Золотые Хиты", url: "https://goldenhits.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Радио Шторм", url: "https://shtorm.fm:8000/radio", bitrate: "128 kbps" },
        { name: "MJoy Greatest Songs", url: "https://mjoy.ua:8000/greatest", bitrate: "128 kbps" },
        { name: "Радио Сектор", url: "https://sectorradio.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Relax FM Retro", url: "https://pub0301.101.ru:8443/stream/air/mp3/256/200", bitrate: "256 kbps" }
    ],
    "Джаз, Блюз, Соул": [
        { name: "Радио Jazz", url: "https://radiojazz.hostingradio.ru/radiojazz128.mp3", bitrate: "128 kbps" },
        { name: "Jazz FM", url: "https://listen.jazzfm.com/jazzfm", bitrate: "128 kbps" },
        { name: "SomaFM Blues", url: "https://somafm.com/blues.pls", bitrate: "128 kbps" },
        { name: "FIP Jazz", url: "https://stream.radiofrance.fr/fipjazz/fipjazz.m3u8", bitrate: "128 kbps" },
        { name: "Радио Соул", url: "https://soulradio.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Smooth Jazz", url: "https://smoothjazz.com:8000/stream", bitrate: "128 kbps" },
        { name: "Blues Radio", url: "https://bluesradio.gr:8000/stream", bitrate: "128 kbps" },
        { name: "TSF Jazz", url: "https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3", bitrate: "128 kbps" },
        { name: "Jazz24", url: "https://live.wastreaming.net/jazz24-128mp3", bitrate: "128 kbps" },
        { name: "Soul Cafe Radio", url: "https://soulcaferadio.com:8000/stream", bitrate: "128 kbps" }
    ],
    "Релакс и Легкая музыка": [
        { name: "Relax FM", url: "https://pub0301.101.ru:8443/stream/air/mp3/256/200", bitrate: "256 kbps" },
        { name: "Lounge FM Chill-Out", url: "https://loungefm.com.ua:8000/chill", bitrate: "128 kbps" },
        { name: "Enigmatic Immersion", url: "https://enigmatic.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Радио Атмосфера", url: "https://atmosfera.fm:8000/stream", bitrate: "128 kbps" },
        { name: "Chillout Zone", url: "https://chillout.zone:8000/stream", bitrate: "128 kbps" },
        { name: "SomaFM Groove Salad", url: "https://somafm.com/groovesalad.pls", bitrate: "128 kbps" },
        { name: "Yoga Radio", url: "https://yogaradio.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Spa Radio", url: "https://sparadio.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Ambient Sleeping Pill", url: "https://ambientsleepingpill.com/stream.pls", bitrate: "128 kbps" },
        { name: "Радио Оазис", url: "https://oasisradio.ru:8000/stream", bitrate: "128 kbps" }
    ],
    "Хип-хоп, Рэп, R&B": [
        { name: "Зайцев FM RNB", url: "https://zaycev.fm:9002/rnb128.mp3", bitrate: "128 kbps" },
        { name: "Rap FM", url: "https://rapfm.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Hot 108 Jamz", url: "https://stream.hot108.com:8000/hot108", bitrate: "128 kbps" },
        { name: "Power 106", url: "https://live.power106.com/power106", bitrate: "128 kbps" },
        { name: "SomaFM Underground 80s", url: "https://somafm.com/u80s.pls", bitrate: "128 kbps" },
        { name: "Streetz Radio", url: "https://streetzradio.com:8000/stream", bitrate: "128 kbps" },
        { name: "RNB Hits", url: "https://rnbradio.com:8000/stream", bitrate: "128 kbps" },
        { name: "Hip Hop Nation", url: "https://hiphopnation.com:8000/stream", bitrate: "128 kbps" },
        { name: "Boom Bap Radio", url: "https://boombapradio.com:8000/stream", bitrate: "128 kbps" },
        { name: "Urban FM", url: "https://urbanfm.ru:8000/stream", bitrate: "128 kbps" }
    ],
    "Классическая музыка": [
        { name: "Радио Орфей", url: "https://orfey.hostingradio.ru/orfey128.mp3", bitrate: "128 kbps" },
        { name: "Classical FM", url: "https://classicalfm.co.uk:8000/stream", bitrate: "128 kbps" },
        { name: "BBC Radio 3", url: "https://stream.live.bbc.co.uk/bbc_radio_three", bitrate: "128 kbps" },
        { name: "Радио Культура", url: "https://kultura.hostingradio.ru/kultura128.mp3", bitrate: "128 kbps" },
        { name: "Classic FM", url: "https://classicfm.co.uk:8000/stream", bitrate: "128 kbps" },
        { name: "Venice Classic Radio", url: "https://veniceclassicradio.eu:8000/stream", bitrate: "128 kbps" },
        { name: "Symphony Radio", url: "https://symphonyradio.com:8000/stream", bitrate: "128 kbps" },
        { name: "Baroque Radio", url: "https://baroqueradio.com:8000/stream", bitrate: "128 kbps" },
        { name: "Classical WETA", url: "https://weta.org:8000/classical", bitrate: "128 kbps" },
        { name: "Радио Шедевр", url: "https://shedevr.fm:8000/stream", bitrate: "128 kbps" }
    ],
    "Разговорные и Новости": [
        { name: "Радио Sputnik", url: "https://sputnik.hostingradio.ru/sputnik128.mp3", bitrate: "128 kbps" },
        { name: "Вести FM", url: "https://vesti.hostingradio.ru/vesti128.mp3", bitrate: "128 kbps" },
        { name: "Эхо Москвы", url: "https://echo.msk.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Радио КП", url: "https://radiokp.hostingradio.ru/radiokp128.mp3", bitrate: "128 kbps" },
        { name: "Business FM", url: "https://bfm.hostingradio.ru/bfm128.mp3", bitrate: "128 kbps" },
        { name: "Радио Маяк", url: "https://mayak.hostingradio.ru/mayak128.mp3", bitrate: "128 kbps" },
        { name: "Соловьёв Лайф ФМ", url: "https://soloviev.live:8000/stream", bitrate: "128 kbps" },
        { name: "Радио Патриот", url: "https://patriot.fm:8000/stream", bitrate: "128 kbps" },
        { name: "BBC World Service", url: "https://stream.live.bbc.co.uk/bbc_world_service", bitrate: "128 kbps" },
        { name: "NPR Radio", url: "https://npr.org:8000/stream", bitrate: "128 kbps" }
    ],
    "Шансон и Народная музыка": [
        { name: "Радио Шансон", url: "https://chanson.hostingradio.ru:8041/chanson256.mp3", bitrate: "256 kbps" },
        { name: "Калина Красная", url: "https://kalina.hostingradio.ru/kalina128.mp3", bitrate: "128 kbps" },
        { name: "Радио Родных Дорог", url: "https://rodnyedorogi.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Русский Шансон", url: "https://russianshanson.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Folk Radio", url: "https://folkradio.co.uk:8000/stream", bitrate: "128 kbps" },
        { name: "Шансон 24", url: "https://shanson24.ru:8000/stream", bitrate: "128 kbps" },
        { name: "Радио Вера", url: "https://radiovera.hostingradio.ru/radiovera128.mp3", bitrate: "128 kbps" },
        { name: "Блатняк FM", url: "https://blatnyak.fm:8000/stream", bitrate: "128 kbps" },
        { name: "FIP Ethnic", url: "https://stream.radiofrance.fr/fipethnic/fipethnic.m3u8", bitrate: "128 kbps" },
        { name: "Радио Станица", url: "https://stanitsa.fm:8000/stream", bitrate: "128 kbps" }
    ]
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
    playPauseButton.addEventListener('click', togglePlayPause);
    
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

// Play station with improved error handling and loading states
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
    
    // If clicking the same station
    if (currentStation && currentStation.url === station.url) {
        togglePlayPause();
        return;
    }
    
    // Start loading
    showLoading();
    
    // Set loading timeout
    const loadingTimeout = setTimeout(() => {
        if (!isPlaying) {
            handlePlaybackError(new Error('Loading timeout'));
        }
    }, 10000); // 10 seconds timeout
    
    try {
        // Stop current playback if any
        if (audio.src) {
            audio.pause();
            audio.src = '';
        }
        
        currentStation = station;
        audio.src = station.url;
        
        // Update UI before attempting to play
        currentStationElement.textContent = station.name;
        updatePlayPauseButton();
        
        // Attempt to play
        audio.play()
            .then(() => {
                clearTimeout(loadingTimeout);
                hideLoading();
                showNotification(`Playing: ${station.name}`, 'info');
            })
            .catch(error => {
                clearTimeout(loadingTimeout);
                handlePlaybackError(error);
            });
    } catch (error) {
        clearTimeout(loadingTimeout);
        handlePlaybackError(error);
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (!currentStation) return;
    
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play().catch(handlePlaybackError);
    }
}

// Update play/pause button
function updatePlayPauseButton() {
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

// Enhanced error handling
function handlePlaybackError(error) {
    console.error('Playback error:', error);
    hideLoading();
    
    let message = 'Error playing station';
    
    // Specific error messages based on error type
    if (!navigator.onLine) {
        message = 'No internet connection';
    } else if (error.name === 'NotSupportedError') {
        message = 'Audio format not supported';
    } else if (error.name === 'NotAllowedError') {
        message = 'Playback not allowed';
    } else if (error.message === 'Loading timeout') {
        message = 'Station loading timeout';
    }
    
    showNotification(message, 'error');
    
    // Reset player state
    if (currentStation) {
        currentStation = null;
        currentStationElement.textContent = 'Select a station';
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

// Setup audio event listeners
function setupAudioEvents() {
    audio.addEventListener('ended', () => {
        handlePlaybackError(new Error('Stream ended'));
    });
    
    audio.addEventListener('error', (e) => {
        handlePlaybackError(e.error || new Error('Audio error'));
    });
    
    audio.addEventListener('waiting', showLoading);
    audio.addEventListener('canplay', hideLoading);
    
    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            // Save state when page is hidden
            audio.dataset.wasPlaying = 'true';
        } else if (!document.hidden && audio.dataset.wasPlaying === 'true') {
            // Restore playback when page is visible again
            delete audio.dataset.wasPlaying;
            audio.play().catch(handlePlaybackError);
        }
    });
    
    // Handle online/offline events
    window.addEventListener('online', () => {
        if (currentStation && !isPlaying) {
            playStation(currentStation);
        }
    });
    
    window.addEventListener('offline', () => {
        if (isPlaying) {
            handlePlaybackError(new Error('Lost internet connection'));
        }
    });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
