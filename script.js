// Список радиостанций с категориями
const radioStations = {
    "Радио Рекорд": { 
        url: "https://air2.radiorecord.ru:805/rr_320", 
        category: "Танцевальная музыка",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Европа Плюс": { 
        url: "https://europaplus.hostingradio.ru:8014/europaplus320.mp3", 
        category: "Поп музыка",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "DFM": { 
        url: "https://dfm.hostingradio.ru/dfm96.aacp", 
        category: "Танцевальная музыка",
        icon: "fa-music",
        bitrate: "96kbps"
    },
    "Наше Радио": { 
        url: "https://nashe1.hostingradio.ru/nashe-256", 
        category: "Рок музыка",
        icon: "fa-guitar",
        bitrate: "256kbps"
    },
    "Радио Energy": { 
        url: "https://energyfm.hostingradio.ru/energyfm128.mp3", 
        category: "Поп музыка",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Maximum": { 
        url: "https://maximum.hostingradio.ru/maximum128.mp3", 
        category: "Рок музыка",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "Ретро FM": { 
        url: "http://retro.radiorecord.ru:8102/sd90_320", 
        category: "Шансон и Ретро",
        icon: "fa-clock",
        bitrate: "320kbps"
    },
    "Comedy Radio": { 
        url: "https://pub0302.101.ru:8443/stream/air/aac/64/202", 
        category: "Разговорные",
        icon: "fa-microphone",
        bitrate: "64kbps"
    },
    "Business FM": { 
        url: "https://bfm.hostingradio.ru:8004/fm", 
        category: "Информационные",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Relax FM": { 
        url: "https://pub0202.101.ru:8443/stream/air/aac/64/200", 
        category: "Релакс",
        icon: "fa-spa",
        bitrate: "64kbps"
    },
    "ROCK FM": { 
        url: "https://nashe1.hostingradio.ru/rock-128.mp3", 
        category: "Рок музыка",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "Маяк": { 
        url: "https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_128kbps", 
        category: "Разговорные",
        icon: "fa-microphone",
        bitrate: "128kbps"
    },
    "Радио Культура": { 
        url: "https://icecast-vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps", 
        category: "Разговорные",
        icon: "fa-microphone",
        bitrate: "192kbps"
    },
    "Радио Зенит": { 
        url: "https://stream.radiozenit.ru:8443/zenit", 
        category: "Спорт",
        icon: "fa-futbol",
        bitrate: "128kbps"
    },
    "BBC Radio 1": { 
        url: "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p", 
        category: "Международные",
        icon: "fa-globe",
        bitrate: "128kbps"
    },
    "KEXP": { 
        url: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3", 
        category: "Международные",
        icon: "fa-globe",
        bitrate: "128kbps"
    },
    "Radio Paradise": { 
        url: "https://stream.radioparadise.com/flacm", 
        category: "Международные",
        icon: "fa-globe",
        bitrate: "FLAC"
    },
    "Эхо Москвы": { 
        url: "http://emgspb.hostingradio.ru:8000/emgspb128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Коммерсантъ FM": { 
        url: "http://kommersant77.hostingradio.ru:8016/kommersant128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Вести FM": { 
        url: "http://icecast.vgtrk.cdnvideo.ru:8000/vestifm_mp3_192kbps", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "192kbps"
    },
    "SomaFM Dronezone": { 
        url: "https://somafm.com/dronezone.pls", 
        category: "Экспериментальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "NTS Radio": { 
        url: "https://stream-relay-geo.ntslive.net/stream", 
        category: "Экспериментальные",
        icon: "fa-music",
        bitrate: "128kbps"
    }
};

// DOM-элементы
const radioList = document.getElementById("radio-list");
const player = document.getElementById("player");
const searchInput = document.getElementById("search-input");
const categoriesTabs = document.getElementById("categories-tabs");
const currentStationEl = document.getElementById("current-station");
const loadingIndicator = document.getElementById("loading");
const favoriteButton = document.getElementById("favorite-button");
const animationContainer = document.getElementById("animation-container");
const sleepTimerInput = document.getElementById("sleep-timer");
const randomButton = document.getElementById("random-button");

// Переменные состояния
let currentStation = "";
let favorites = [];
let activeCategory = "Все";
let sleepTimeout = null;
let lastVolume = 1;
let isMuted = false;
let retryCount = 0;
const MAX_RETRIES = 3;

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
    loadLastStation();
    loadVolume();
    createCategories();
    displayRadioStations(activeCategory);
    setupKeyboardShortcuts();
    setupVolumeControl();
    setupTelegramTheme();
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

// Загрузка громкости
function loadVolume() {
    const savedVolume = localStorage.getItem("lastVolume");
    if (savedVolume) {
        player.volume = parseFloat(savedVolume);
        lastVolume = player.volume;
        updateVolumeIcon(player.volume);
    }
}

// Сохранение громкости
function saveVolume() {
    localStorage.setItem("lastVolume", player.volume);
}

// Создание категорий
function createCategories() {
    const categories = new Set(Object.values(radioStations).map(station => station.category));
    const sortedCategories = ["Все", "Избранное", ...Array.from(categories).sort()];
    
    categoriesTabs.innerHTML = "";
    sortedCategories.forEach(category => {
        const tab = document.createElement("div");
        tab.className = "category-tab";
        if (category === activeCategory) tab.classList.add("active");
        
        const icon = document.createElement("i");
        icon.className = "fas " + getCategoryIcon(category);
        
        const text = document.createElement("span");
        text.textContent = category;
        
        tab.appendChild(icon);
        tab.appendChild(text);
        tab.setAttribute("data-category", category);
        
        tab.addEventListener("click", () => {
            document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            activeCategory = category;
            displayRadioStations(category);
        });
        
        categoriesTabs.appendChild(tab);
    });
}

// Получение иконки для категории
function getCategoryIcon(category) {
    const icons = {
        "Все": "fa-globe",
        "Избранное": "fa-heart",
        "Танцевальная музыка": "fa-music",
        "Поп музыка": "fa-music",
        "Рок музыка": "fa-guitar",
        "Шансон и Ретро": "fa-clock",
        "Разговорные": "fa-microphone",
        "Информационные": "fa-newspaper",
        "Релакс": "fa-spa",
        "Спорт": "fa-futbol",
        "Международные": "fa-globe",
        "Новости": "fa-newspaper",
        "Экспериментальные": "fa-music"
    };
    return icons[category] || "fa-music";
}

// Отображение радиостанций
function displayRadioStations(category = "Все") {
    radioList.innerHTML = "";
    
    let stationsToDisplay = Object.entries(radioStations);
    if (category === "Избранное") {
        stationsToDisplay = stationsToDisplay.filter(([name]) => favorites.includes(name));
    } else if (category !== "Все") {
        stationsToDisplay = stationsToDisplay.filter(([_, station]) => station.category === category);
    }

    if (stationsToDisplay.length === 0) {
        radioList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Станции не найдены</p>
            </div>
        `;
        return;
    }

    stationsToDisplay.forEach(([name, station]) => createRadioCard(name, station));
}

// Создание карточки радиостанции
function createRadioCard(name, station) {
    const card = document.createElement("div");
    card.className = "radio-card";
    if (name === currentStation) card.classList.add("active");

    const stationInfo = document.createElement("div");
    stationInfo.className = "station-info";

    const stationName = document.createElement("p");
    stationName.className = "radio-name";
    stationName.textContent = name;

    const stationDetails = document.createElement("p");
    stationDetails.className = "station-details";
    stationDetails.innerHTML = `
        <i class="fas ${station.icon}"></i>
        <span>${station.category}</span>
        <i class="fas fa-circle"></i>
        <span>${station.bitrate}</span>
    `;

    const controls = document.createElement("div");
    controls.className = "station-controls";

    const playButton = document.createElement("button");
    playButton.className = "play-button";
    playButton.innerHTML = name === currentStation ? 
        '<i class="fas fa-pause"></i>' : 
        '<i class="fas fa-play"></i>';
    playButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (name === currentStation) {
            togglePlayPause();
        } else {
            playStation(name, station.url);
        }
    });

    const favoriteButton = document.createElement("button");
    favoriteButton.className = "favorite-button";
    favoriteButton.innerHTML = favorites.includes(name) ? 
        '<i class="fas fa-heart"></i>' : 
        '<i class="far fa-heart"></i>';
    favoriteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(name, favoriteButton);
    });

    controls.appendChild(playButton);
    controls.appendChild(favoriteButton);
    stationInfo.appendChild(stationName);
    stationInfo.appendChild(stationDetails);
    card.appendChild(stationInfo);
    card.appendChild(controls);
    radioList.appendChild(card);
}

// Переключение воспроизведения
function togglePlayPause() {
    if (player.paused) {
        player.play();
        document.querySelector(".play-button i").className = "fas fa-pause";
    } else {
        player.pause();
        document.querySelector(".play-button i").className = "fas fa-play";
    }
}

// Переключение избранного
function toggleFavorite(name, button) {
    const index = favorites.indexOf(name);
    if (index === -1) {
        favorites.push(name);
        button.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        favorites.splice(index, 1);
        button.innerHTML = '<i class="far fa-heart"></i>';
    }
    saveFavorites();
    if (activeCategory === "Избранное") {
        displayRadioStations("Избранное");
    }
}

// Воспроизведение радиостанции с анимацией
function playStation(name, url) {
    loadingIndicator.classList.remove("hidden");
    player.src = url;
    retryCount = 0;
    
    // Добавляем обработчик ошибок
    player.onerror = (e) => {
        loadingIndicator.classList.add("hidden");
        console.error("Ошибка воспроизведения:", e);
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            showNotification(`Ошибка воспроизведения. Попытка ${retryCount} из ${MAX_RETRIES}...`);
            setTimeout(() => {
                player.src = url;
                player.play().catch(error => {
                    console.error("Ошибка при повторной попытке:", error);
                    showNotification("Не удалось воспроизвести станцию. Попробуйте позже.", "error");
                });
            }, 3000);
        } else {
            showNotification("Не удалось воспроизвести станцию. Попробуйте позже.", "error");
        }
    };

    player.play().then(() => {
        currentStation = name;
        updateCurrentStationDisplay();
        saveLastStation();
        animationContainer.classList.add("active");
        showNotification(`Сейчас играет: ${name}`);

        // Анимация смены станции
        document.querySelectorAll(".radio-card").forEach(card => card.classList.remove("active"));
        document.querySelectorAll(".radio-card").forEach(card => {
            if (card.querySelector(".radio-name").textContent === name) {
                card.classList.add("active");
                card.querySelector(".play-button i").className = "fas fa-pause";
            }
        });

        loadingIndicator.classList.add("hidden");
    }).catch((error) => {
        console.error("Ошибка воспроизведения:", error);
        loadingIndicator.classList.add("hidden");
        showNotification("Ошибка воспроизведения станции", "error");
    });
}

// Обновление отображения текущей станции
function updateCurrentStationDisplay() {
    currentStationEl.textContent = `Сейчас играет: ${currentStation || "не выбрано"}`;
}

// Добавляем обработчик для таймера сна
document.getElementById("sleep-timer").addEventListener("change", (e) => {
    const minutes = parseInt(e.target.value);
    if (minutes > 0 && minutes <= 120) {
        setSleepTimer(minutes);
    }
});

// Улучшаем функцию таймера сна
function setSleepTimer(minutes) {
    if (sleepTimeout) {
        clearTimeout(sleepTimeout);
        showNotification("Таймер сна отменен");
    }
    
    if (minutes > 0) {
        sleepTimeout = setTimeout(() => {
            player.pause();
            showNotification("Таймер сна: воспроизведение остановлено");
            document.getElementById("sleep-timer").value = "";
        }, minutes * 60000);
        showNotification(`Таймер сна установлен на ${minutes} минут`);
    }
}

// Настройка управления громкостью
function setupVolumeControl() {
    const volumeSlider = document.querySelector(".volume-slider");
    const volumeIcon = document.querySelector(".volume-control i");
    
    // Установка начального значения громкости
    volumeSlider.value = player.volume;
    updateVolumeIcon(player.volume);
    
    // Обработчик изменения громкости
    volumeSlider.addEventListener("input", (e) => {
        const volume = parseFloat(e.target.value);
        player.volume = volume;
        lastVolume = volume;
        updateVolumeIcon(volume);
        saveVolume();
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
    isMuted = !isMuted;
    
    if (isMuted) {
        lastVolume = player.volume;
        player.volume = 0;
        volumeSlider.value = 0;
    } else {
        player.volume = lastVolume;
        volumeSlider.value = lastVolume;
    }
    
    updateVolumeIcon(player.volume);
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
            case "KeyM":
                toggleMute();
                break;
            case "ArrowUp":
                e.preventDefault();
                player.volume = Math.min(1, player.volume + 0.1);
                updateVolumeIcon(player.volume);
                saveVolume();
                break;
            case "ArrowDown":
                e.preventDefault();
                player.volume = Math.max(0, player.volume - 0.1);
                updateVolumeIcon(player.volume);
                saveVolume();
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
    playStation(randomName, randomStation.url);
}

// Поиск станций
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const stations = Object.entries(radioStations);
    
    const filteredStations = stations.filter(([name, station]) => 
        name.toLowerCase().includes(searchTerm) || 
        station.category.toLowerCase().includes(searchTerm)
    );
    
    displayFilteredStations(filteredStations);
});

// Отображение отфильтрованных станций
function displayFilteredStations(stations) {
    radioList.innerHTML = "";
    
    if (stations.length === 0) {
        radioList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Станции не найдены</p>
            </div>
        `;
        return;
    }
    
    stations.forEach(([name, station]) => createRadioCard(name, station));
}
