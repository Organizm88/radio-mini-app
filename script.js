// Audio player instance
const audio = new Audio();
let currentStation = null;
let isPlaying = false;
let volume = 1;
let isMuted = false;
let stations = [];
let filteredStations = [];

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
const searchInput = document.getElementById('search-input');
const genreSelect = document.getElementById('genre-select');
const sortControls = document.querySelectorAll('input[name="sort"]');
const refreshButton = document.getElementById('refresh-button');
const statusElement = document.getElementById('status');

// Radio Browser API endpoint
const API_BASE = 'http://all.api.radio-browser.info/json/stations/search';

// Initialize the application
async function init() {
    setupPlayerControls();
    setupVolumeControls();
    setupAudioEvents();
    setupSearchAndFilters();
    
    // Load stations from localStorage or fetch new ones
    const savedStations = loadFromLocalStorage();
    if (savedStations && savedStations.length > 0) {
        stations = savedStations;
        updateStatusMessage('Загружены сохраненные станции');
        filterAndDisplayStations();
    } else {
        await fetchAndDisplayStations();
    }
}

// Setup search and filters
function setupSearchAndFilters() {
    searchInput.addEventListener('input', debounce(() => {
        filterAndDisplayStations();
    }, 300));

    genreSelect.addEventListener('change', () => {
        filterAndDisplayStations();
    });

    sortControls.forEach(control => {
        control.addEventListener('change', () => {
            filterAndDisplayStations();
        });
    });

    refreshButton.addEventListener('click', () => {
        fetchAndDisplayStations();
    });
}

// Функция для парсинга станций с RadioBrowser
async function fetchStations() {
    const url = API_BASE;
    const params = {
        tag: genreSelect.value !== 'all' ? genreSelect.value : '',
        lastcheckok: "1",
        limit: "100",
        order: "clickcount",
        reverse: "true"
    };

    try {
        showLoading();
        updateStatusMessage('Загрузка станций...');
        
        console.log('Запрос к API:', `${url}?${new URLSearchParams(params)}`);
        const response = await fetch(`${url}?${new URLSearchParams(params)}`);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const stationsData = await response.json();
        console.log('Получено станций:', stationsData.length);
        console.log('Пример станции:', stationsData[0]);

        stations = stationsData.map(station => ({
            name: station.name,
            url_resolved: station.url_resolved,
            tags: station.tags,
            country: station.country,
            votes: station.clickcount || 0
        }));

        console.log('Обработано станций:', stations.length);
        console.log('Пример обработанной станции:', stations[0]);

        hideLoading();
        saveToLocalStorage();
        updateStatusMessage(`Загружено ${stations.length} станций`);
        return stations;
    } catch (error) {
        console.error("Ошибка при парсинге станций:", error);
        hideLoading();
        showNotification('Ошибка загрузки станций', 'error');
        updateStatusMessage('Ошибка загрузки станций');
        return loadFromLocalStorage() || [];
    }
}

// Filter and sort stations
function filterAndDisplayStations() {
    const searchTerm = searchInput.value.toLowerCase();
    const genre = genreSelect.value;
    const sortBy = document.querySelector('input[name="sort"]:checked').value;
    
    console.log('Параметры фильтрации:', {
        searchTerm,
        genre,
        sortBy,
        totalStations: stations.length
    });
    
    filteredStations = stations.filter(station => {
        const matchesSearch = station.name.toLowerCase().includes(searchTerm);
        const matchesGenre = genre === 'all' || 
            (station.tags && station.tags.toLowerCase().includes(genre));
        return matchesSearch && matchesGenre;
    });
    
    console.log('Отфильтровано станций:', filteredStations.length);
    
    filteredStations.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return b.votes - a.votes;
        }
    });
    
    displayStations(filteredStations);
    updateStatusMessage(`Найдено ${filteredStations.length} станций`);
}

// Save stations to localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('radioStations', JSON.stringify(stations));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Load stations from localStorage
function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('radioStations');
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

// Update status message
function updateStatusMessage(message) {
    statusElement.textContent = message;
    statusElement.classList.add('show');
}

// Debounce helper function
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

// Display stations in the grid
function displayStations(stations) {
    console.log('Отображение станций:', stations.length);
    
    const fragment = document.createDocumentFragment();
    
    if (stations.length === 0) {
        const message = document.createElement('div');
        message.className = 'no-stations';
        message.textContent = 'No stations found';
        fragment.appendChild(message);
    } else {
        // Create table header
        const table = document.createElement('table');
        table.className = 'stations-table';
        
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Station Name</th>
                <th>Genre</th>
                <th>Country</th>
                <th>Controls</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        let validStations = 0;
        stations.forEach(station => {
            if (station.url_resolved) {
                const row = createStationRow(station);
                tbody.appendChild(row);
                validStations++;
            }
        });
        
        console.log('Станций с валидным URL:', validStations);
        
        table.appendChild(tbody);
        fragment.appendChild(table);
    }
    
    // Add refresh button
    const refreshButton = document.createElement('button');
    refreshButton.className = 'refresh-button';
    refreshButton.textContent = '🔄 Refresh Stations';
    refreshButton.addEventListener('click', fetchAndDisplayStations);
    
    radioList.innerHTML = '';
    radioList.appendChild(refreshButton);
    radioList.appendChild(fragment);
}

// Create station row
function createStationRow(station) {
    const row = document.createElement('tr');
    row.className = 'station-row';
    
    row.innerHTML = `
        <td class="station-name">${station.name || 'Unknown Station'}</td>
        <td class="station-genre">${station.tags || 'Unknown Genre'}</td>
        <td class="station-country">${station.country || 'Unknown Country'}</td>
        <td class="station-controls">
            <button class="play-button">▶</button>
        </td>
    `;
    
    const playButton = row.querySelector('.play-button');
    playButton.addEventListener('click', () => playStation({
        name: station.name,
        url: station.url_resolved
    }));
    
    return row;
}

// Setup player controls
function setupPlayerControls() {
    if (!playPauseButton) return;
    
    // Add click event listener to play/pause button
    playPauseButton.addEventListener('click', () => {
        if (!currentStation) {
            showNotification('Please select a station first', 'info');
            return;
        }
        togglePlayPause();
    });
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
async function playStation(station) {
    console.log('Воспроизведение станции:', station);
    
    if (!station || !station.url_resolved) {
        showNotification('Неверные данные станции', 'error');
        return;
    }
    
    if (!navigator.onLine) {
        showNotification('Нет подключения к интернету', 'error');
        return;
    }
    
    if (currentStation && currentStation.url_resolved === station.url_resolved) {
        togglePlayPause();
        return;
    }
    
    try {
        showLoading();
        
        if (audio.src) {
            audio.pause();
            isPlaying = false;
            updatePlayPauseButton();
        }
        
        currentStation = station;
        currentStationElement.textContent = station.name;
        audio.src = station.url_resolved;
        
        await audio.play();
        isPlaying = true;
        updatePlayPauseButton();
        hideLoading();
        showNotification(`Играет: ${station.name}`, 'info');
    } catch (error) {
        console.error('Ошибка воспроизведения:', error);
        handlePlaybackError(error);
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (!currentStation) {
        showNotification('Please select a station first', 'info');
        return;
    }
    
    if (isPlaying) {
        audio.pause();
    } else {
        if (audio.src) {
            audio.play().catch(handlePlaybackError);
        } else {
            playStation(currentStation);
        }
    }
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

// Setup audio events
function setupAudioEvents() {
    // Play event
    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });
    
    // Pause event
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
    
    // Error event
    audio.addEventListener('error', (e) => {
        handlePlaybackError(e.error || new Error('Audio error'));
    });
    
    // Loading events
    audio.addEventListener('waiting', showLoading);
    audio.addEventListener('canplay', hideLoading);
    
    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            audio.dataset.wasPlaying = 'true';
        } else if (!document.hidden && audio.dataset.wasPlaying === 'true') {
            delete audio.dataset.wasPlaying;
            audio.play().catch(handlePlaybackError);
        }
    });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
