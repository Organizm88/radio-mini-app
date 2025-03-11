const radioStations = {
"Радио Рекорд": "https://air2.radiorecord.ru:805/rr_320",
"Европа Плюс": "https://europaplus.hostingradio.ru:8014/europaplus320.mp3",
"DFM": "https://dfm.hostingradio.ru/dfm96.aacp",
"Наше Радио": "https://nashe1.hostingradio.ru/nashe-256",
"Радио Energy": "https://energyfm.hostingradio.ru/energyfm128.mp3",
"Радио Maximum": "https://maximum.hostingradio.ru/maximum128.mp3",
"Радио Дача": "https://stream.n340.com/13_dacha_64_128",
"Авторадио": "https://pub0302.101.ru:8443/stream/air/aac/64/100",
"Радио Шансон": "https://chanson.hostingradio.ru:8041/chanson128.mp3",
"Love Radio": "https://pub0302.101.ru:8443/stream/air/aac/64/106",
"Ретро FM": "https://emgregion.hostingradio.ru:8064/moscow.retro.mp3",
"Русское Радио": "https://rusradio.hostingradio.ru/rusradio96.aacp",
"Хит FM": "https://hitfm.hostingradio.ru/hitfm96.aacp",
"Радио 7 на семи холмах": "https://radio7.hostingradio.ru:8040/radio796.mp3",
"Comedy Radio": "https://pub0302.101.ru:8443/stream/air/aac/64/202",
"Радио Звезда": "https://radiosound.fm:8000/zvezda",
"Радио Вести FM": "https://icecast-vgtrk.cdnvideo.ru/vestifm_mp3_192kbps",
"Business FM": "https://bfm.hostingradio.ru:8004/fm",
"Детское Радио": "https://pub0202.101.ru:8443/stream/air/aac/64/199",
"Relax FM": "https://pub0202.101.ru:8443/stream/air/aac/64/200",
"Радио Jazz": "https://jazz.hostingradio.ru:8041/jazz128.mp3",
"ROCK FM": "https://nashe1.hostingradio.ru/rock-128.mp3",
"Серебряный Дождь": "https://silverrain.hostingradio.ru/silver128.mp3",
"Маяк": "https://icecast-vgtrk.cdnvideo.ru/mayakfm_mp3_128kbps",
"Радио Культура": "https://icecast-vgtrk.cdnvideo.ru/kulturafm_mp3_192kbps",
"Радио России": "https://icecast-vgtrk.cdnvideo.ru/rrzonam_mp3_192kbps",
"Радио Комсомольская правда": "https://kpradio.hostingradio.ru:8000/128",
"Дорожное Радио": "https://dorognoe.hostingradio.ru/radio",
"Юмор FM": "https://pub0202.101.ru:8443/stream/air/aac/64/102",
"Monte Carlo": "https://montecarlo.hostingradio.ru/montecarlo96.aacp",
"Новое Радио": "https://s.newradio.ru/32/nov_64",
"Такси FM": "https://stream2.n340.com:18000/8",
"Радио Спутник": "https://icecast-rian.cdnvideo.ru/voicerus",
"Радио Romantika": "https://pub0302.101.ru:8443/stream/air/aac/64/101",
"Жара FM": "https://zaycevfm.cdnvideo.ru/ZaycevFM_pop_256.mp3",
"Like FM": "https://pub0202.101.ru:8443/stream/air/aac/64/219",
"Studio 21": "https://stream.studio21.ru/studio2196.aacp",
"Power Hit Radio": "https://powerhit.hostingradio.ru/powerhit96.aacp",
"Питер FM": "https://piterfm.hostingradio.ru/piterfm96.aacp",
"Русский Хит": "https://ruhit.hostingradio.ru/rukhit128.mp3",
"Радио Ваня": "https://icecast-radiovanya.cdnvideo.ru/radiovanya",
"Восток FM": "https://emgspb.hostingradio.ru/vostokspb128.mp3",
"Атмосфера": "https://emgspb.hostingradio.ru/atmo128.mp3",
"Радио для двоих": "https://listen.vdfm.ru:8000/radiofortwo",
"Радио МИР": "https://icecast-mirtv.cdnvideo.ru/radio_mir128",
"Радио Дисней": "https://disney.hostingradio.ru:8010/disney",
"Радио Ultra": "https://ultra.hostingradio.ru:8443/ultra128.mp3",
"Радио Зенит": "https://stream.radiozenit.ru:8443/zenit",
"Классическое Радио": "https://stream.classicalmusicradio.ru:8443/classical.mp3",
"Радио Искатель": "https://iskatel.hostingradio.ru:8015/iskatel-128.mp3",
"Радио Книга": "https://bookradio.hostingradio.ru:8069/fm",
"Пилот FM": "https://online.pilotfm.ru:8134/pilot",
"Радио Орфей": "https://orfeyfm.hostingradio.ru:8034/orfeyfm128.mp3",
"Христианское радио Новая Жизнь": "https://radionl.ru:8002/live",
"Радио Карнавал": "https://stream2.n340.com:18000/8",
"Радио Мелодия": "https://stream2.n340.com/12_melodia_64?type=.mp3",
"Радио Metro": "https://metrocast.podradio.ru:4042"
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