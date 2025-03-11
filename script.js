const radioStations = {
    "Радио Рекорд": "http://air.radiorecord.ru:805/rr_320",
    "Европа Плюс": "http://ep256.streamr.ru",
    "DFM": "http://dfm128.streamr.ru"
};
const radioList = document.getElementById("radio-list");
const player = document.getElementById("player");
Object.keys(radioStations).forEach(station => {
    const button = document.createElement("button");
    button.textContent = station;
    button.onclick = () => playRadio(station);
    radioList.appendChild(button);
});
function playRadio(station) {
    player.src = radioStations[station];
    player.play();
}
window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();