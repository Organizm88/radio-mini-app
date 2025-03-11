const radioStations = {
    "Радио Рекорд": "https://air2.radiorecord.ru:805/rr_320",
    "Европа Плюс": "https://europaplus.hostingradio.ru:8014/europaplus320.mp3",
    "DFM": "https://dfm.hostingradio.ru/dfm96.aacp"
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