// Список радиостанций с категориями
const radioStations = {
    // Танцевальные / EDM / House / Techno
    "Radio Record": { 
        url: "https://air.radiorecord.ru:8102/rr_320", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Energy FM": { 
        url: "https://ic7.101.ru:8000/v1_1", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "DFM": { 
        url: "https://dfm.hostingradio.ru/dfm128.mp3", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Megapolis FM": { 
        url: "https://stream.megapolis.fm:8080/megapolis", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Trancemission": { 
        url: "https://radio.tm-media.audio/trancemission", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Record Deep": { 
        url: "https://air.radiorecord.ru:8102/deep_320", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Q-dance": { 
        url: "https://q-dance.stream.live", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Пиратская Станция": { 
        url: "https://piratestation.ru:8000/stream", 
        category: "Танцевальные",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Рок / Метал / Альтернатива
    "Наше Радио": { 
        url: "https://nashe1.hostingradio.ru/nashe20.mp3", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "Rock FM": { 
        url: "https://air.radiorecord.ru:8102/rock_320", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "320kbps"
    },
    "Ultra": { 
        url: "https://strm112.1.fm/ultra_mobile_mp3", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "Hard Rock FM": { 
        url: "https://air.radiorecord.ru:8102/hard_320", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "320kbps"
    },
    "A-One": { 
        url: "https://aone.radioliga.com:8000/aone128", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },
    "BBC Radio 1 Rock": { 
        url: "https://stream.live.vc.bbcmedia.co.uk/bbcradio1", 
        category: "Рок",
        icon: "fa-guitar",
        bitrate: "128kbps"
    },

    // Хип-Хоп / R&B / Rap
    "The Beat": { 
        url: "https://air.radiorecord.ru:8102/beat_320", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Rap Radio": { 
        url: "https://air.radiorecord.ru:8102/rap_320", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Black Rap": { 
        url: "https://radio.blackrap.com:8000/stream", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Boom FM": { 
        url: "https://boomfm.ru:8000/boom128", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Hot 97": { 
        url: "https://stream.hot97.com/hot97", 
        category: "Хип-Хоп",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Джаз / Блюз / Соул
    "Радио Джаз": { 
        url: "https://jazz.hostingradio.ru:8020/jazz128.mp3", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Jazz Radio": { 
        url: "https://jazz.streamr.ru/jazz-64.mp3", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "64kbps"
    },
    "Blues Radio": { 
        url: "https://air.radiorecord.ru:8102/blues_320", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "320kbps"
    },
    "Smooth Jazz Global": { 
        url: "https://stream.smoothjazzglobal.com/sjg", 
        category: "Джаз",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Классика / Академическая музыка
    "Classic FM": { 
        url: "https://strm112.1.fm/classical_mobile_mp3", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Орфей": { 
        url: "https://orpheus.hostingradio.ru:8000/orpheus128", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Radio Mozart": { 
        url: "https://mozart.streamr.ru:8000/mozart", 
        category: "Классика",
        icon: "fa-music",
        bitrate: "128kbps"
    },

    // Поп / Шансон / Ретро
    "Европа Плюс": { 
        url: "https://ep128.hostingradio.ru:8030/ep128", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Love Radio": { 
        url: "https://stream.loveradio.ru:8000/loveradio1", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Русское Радио": { 
        url: "https://rusradio.hostingradio.ru:8000/rusradio128.mp3", 
        category: "Поп",
        icon: "fa-music",
        bitrate: "128kbps"
    },
    "Радио Шансон": { 
        url: "https://chanson.hostingradio.ru:8041/chanson256.mp3", 
        category: "Шансон",
        icon: "fa-music",
        bitrate: "256kbps"
    },
    "Retro FM": { 
        url: "https://retroserver.streamr.ru:8043/retro256.mp3", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "256kbps"
    },
    "Супердискотека 90-х": { 
        url: "https://retro.radiorecord.ru:8102/sd90_320", 
        category: "Ретро",
        icon: "fa-clock",
        bitrate: "320kbps"
    },

    // Международные радиостанции
    "BBC Radio 1": { 
        url: "https://stream.live.vc.bbcmedia.co.uk/bbcradio1", 
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

    // Новости / Разговорное радио
    "Эхо Москвы": { 
        url: "https://emgspb.hostingradio.ru:8000/emgspb128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Коммерсантъ FM": { 
        url: "https://kommersant77.hostingradio.ru:8016/kommersant128.mp3", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "128kbps"
    },
    "Вести FM": { 
        url: "https://icecast.vgtrk.cdnvideo.ru:8000/vestifm_mp3_192kbps", 
        category: "Новости",
        icon: "fa-newspaper",
        bitrate: "192kbps"
    },

    // Экспериментальные / Нишевые
    "SomaFM": { 
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

// Функция для скрытия приветственного экрана
function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.classList.add('fade-out');
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 500);
}

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
    // Запускаем анимацию котика
    const catAnimation = animateCat();
    
    // Скрываем приветственный экран через 3 секунды
    setTimeout(() => {
        clearInterval(catAnimation);
        hideWelcomeScreen();
        
        // Инициализируем основное приложение
        loadFavorites();
        loadLastStation();
        loadVolume();
        createCategories();
        displayRadioStations(activeCategory);
        setupKeyboardShortcuts();
        setupVolumeControl();
        setupTelegramTheme();
    }, 3000);
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

// Функция проверки доступности потока
async function checkStreamAvailability(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Ошибка проверки потока:', error);
        return false;
    }
}

// Обновляем функцию воспроизведения для проверки доступности
async function playStation(name, url) {
    loadingIndicator.classList.remove("hidden");
    
    // Проверяем доступность потока
    const isAvailable = await checkStreamAvailability(url);
    if (!isAvailable) {
        loadingIndicator.classList.add("hidden");
        showNotification("Станция временно недоступна. Попробуйте позже.", "error");
        return;
    }
    
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

// Настройка управления громкостью
function setupVolumeControl() {
    const volumeSlider = document.querySelector(".volume-slider");
    const volumeControl = document.querySelector(".volume-control");
    const volumeIcon = document.querySelector(".volume-control i");
    let isVolumeVisible = false;
    
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
            player.pause();
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
