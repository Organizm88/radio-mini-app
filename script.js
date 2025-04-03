// Список радиостанций с категориями
const radioStations = {
    "Радио Рекорд": { url: "https://air2.radiorecord.ru:805/rr_320", category: "Танцевальная музыка" },
    "Европа Плюс": { url: "https://europaplus.hostingradio.ru:8014/europaplus320.mp3", category: "Поп музыка" },
    "DFM": { url: "https://dfm.hostingradio.ru/dfm96.aacp", category: "Танцевальная музыка" },
    "Наше Радио": { url: "https://nashe1.hostingradio.ru/nashe-256", category: "Рок музыка" },
    "Радио Energy": { url: "https://energyfm.hostingradio.ru/energyfm128.mp3", category: "Поп музыка" },
    "Радио Maximum": { url: "https://maximum.hostingradio.ru/maximum128.mp3", category: "Рок музыка" },
    "Ретро FM": { url: "https://emgregion.hostingradio.ru:8064/moscow.retro.mp3", category: "Шансон и Ретро" },
    "Comedy Radio": { url: "https://pub0302.101.ru:8443/stream/air/aac/64/202", category: "Разговорные" },
    "Business FM": { url: "https://bfm.hostingradio.ru:8004/fm", category: "Информационные" },
    "Relax FM": { url: "https://pub0202.101.ru:8443/stream/air/aac/64/200", category: "Релакс" },
    "ROCK FM": { url: "https://nashe1.hostingradio.ru/rock-128.mp3", category: "Рок музыка" },
    "Маяк": { url: "https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_128kbps", category: "Разговорные" },
    "Радио Культура": { url: "https://icecast-vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps", category: "Разговорные" },
    "Радио Зенит": { url: "https://stream.radiozenit.ru:8443/zenit", category: "Спорт" },
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

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
    loadLastStation();
    createCategories();
    displayRadioStations(activeCategory);
    setupKeyboardShortcuts();
    setupVolumeControl();
});

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

// Создание категорий
function createCategories() {
    const categories = new Set(Object.values(radioStations).map(station => station.category));
    const sortedCategories = ["Все", "Избранное", ...Array.from(categories).sort()];
    
    categoriesTabs.innerHTML = "";
    sortedCategories.forEach(category => {
        const tab = document.createElement("div");
        tab.className = "category-tab";
        if (category === activeCategory) tab.classList.add("active");
        tab.textContent = category;
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
        radioList.innerHTML = "<p>Станции не найдены</p>";
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
    stationDetails.textContent = `${station.category} • 128kbps`;

    const controls = document.createElement("div");
    controls.className = "station-controls";

    const playButton = document.createElement("button");
    playButton.className = "play-button";
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    playButton.addEventListener("click", () => playStation(name, station.url));

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
    
    // Добавляем обработчик ошибок
    player.onerror = () => {
        loadingIndicator.classList.add("hidden");
        alert("Ошибка воспроизведения станции. Попробуйте еще раз.");
        setTimeout(() => {
            player.src = url;
            player.play();
        }, 3000);
    };

    player.play().then(() => {
        currentStation = name;
        updateCurrentStationDisplay();
        saveLastStation();
        animationContainer.classList.add("active");

        // Анимация смены станции
        document.querySelectorAll(".radio-card").forEach(card => card.classList.remove("active"));
        document.querySelectorAll(".radio-card").forEach(card => {
            if (card.querySelector(".radio-name").textContent === name) {
                card.classList.add("active");
            }
        });

        loadingIndicator.classList.add("hidden");
    }).catch(() => {
        loadingIndicator.classList.add("hidden");
        alert("Ошибка воспроизведения станции");
    });
}

// Обновление отображения текущей станции
function updateCurrentStationDisplay() {
    currentStationEl.textContent = `Сейчас играет: ${currentStation || "не выбрано"}`;
}

// Таймер сна
function setSleepTimer(minutes) {
    if (sleepTimeout) clearTimeout(sleepTimeout);
    if (minutes > 0) {
        sleepTimeout = setTimeout(() => {
            player.pause();
            alert("Таймер сна: воспроизведение остановлено");
        }, minutes * 60000);
        alert(`Таймер сна установлен на ${minutes} минут`);
    }
}

// Случайная станция
function playRandomStation() {
    const stations = Object.entries(radioStations);
    const [randomName, randomStation] = stations[Math.floor(Math.random() * stations.length)];
    playStation(randomName, randomStation.url);
}

// Настройка управления громкостью
function setupVolumeControl() {
    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.min = "0";
    volumeSlider.max = "1";
    volumeSlider.step = "0.1";
    volumeSlider.value = "1";
    volumeSlider.className = "volume-slider";
    
    const volumeContainer = document.createElement("div");
    volumeContainer.className = "volume-control";
    volumeContainer.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeContainer.appendChild(volumeSlider);
    
    document.querySelector(".player-container").insertBefore(volumeContainer, player);
    
    volumeSlider.addEventListener("input", (e) => {
        player.volume = e.target.value;
        lastVolume = e.target.value;
        updateVolumeIcon(e.target.value);
    });
}

// Обновление иконки громкости
function updateVolumeIcon(volume) {
    const icon = document.querySelector(".volume-control i");
    if (volume == 0) {
        icon.className = "fas fa-volume-mute";
    } else if (volume < 0.5) {
        icon.className = "fas fa-volume-down";
    } else {
        icon.className = "fas fa-volume-up";
    }
}

// Переключение режима без звука
function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        player.volume = 0;
    } else {
        player.volume = lastVolume;
    }
    updateVolumeIcon(player.volume);
}

// Настройка горячих клавиш
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        switch(e.code) {
            case "Space":
                e.preventDefault();
                if (player.paused) player.play();
                else player.pause();
                break;
            case "ArrowRight":
                playRandomStation();
                break;
            case "KeyM":
                toggleMute();
                break;
        }
    });
}

// Обработчики событий
randomButton.addEventListener("click", playRandomStation);
sleepTimerInput.addEventListener("change", () => setSleepTimer(parseInt(sleepTimerInput.value)));
