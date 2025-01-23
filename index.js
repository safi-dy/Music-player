const list_song_area = document.querySelector(".list-songs");
const audio_area = document.querySelector(".audio");
let duration = 0,
  currentTime = 0,
  indexCurrentSong = 0;
const progressBar = document.querySelector(".inpRange");
const progressBarVolume = document.querySelector(".audioRange");
const inpSearch = document.querySelector(".inpSearch");
const pauseBtn = document.querySelector(".pauseBtn");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const favorisBtn = document.querySelector(".favBtn");
const favorisIcon = document.querySelector(".favIcon");
const favorisIconImage = document.querySelector(".favIconImg");
const morceauxBtn = document.querySelector(".morcBtn");
const imgMainSong = document.querySelector(".imgMainSong");
const muteBtn = document.querySelector(".muteVolume");
const tabImgSong = [
  "img/oliverImg.jpeg",
  "img/ceisImg.jpeg",
  "img/wakeImg.jpeg",
  "img/youcanImg.jpeg",
];

let tabMorceaux = [];
let tabFavoris = [];

const chansons = ["oliver.mp3", "ceis.mp3", "wake.mp4", "you_can.mp4"];
const chansonsTitle = [
  "Oliver Tree - With you",
  "Ceis - Lost",
  "Wake - The feeling",
  " You can",
];

const AddLikeIfFav = () => {
  //Add like if song is Favoris
  if (tabFavoris.indexOf(tabMorceaux[indexCurrentSong]) == -1)
    favorisIconImage.src = "img/favoris.png";
  else favorisIconImage.src = "img/favoris_red.png";
};

const ChangeImgSongIf = () => {
  imgMainSong.src = tabImgSong[indexCurrentSong];
};

//Permet d'afficher tous les chansons disponibles
morceauxBtn.addEventListener("click", () => {
  list_song_area.innerHTML = "";
  tabMorceaux.forEach((el) => {
    list_song_area.appendChild(el);
  });
});

//Permet d'afficher la liste des chansons favoris
favorisBtn.addEventListener("click", () => {
  list_song_area.innerHTML = "";
  tabFavoris.forEach((el) => {
    list_song_area.appendChild(el);
  });
});

//Permet d'ajouter une chanson au liste des favoris
favorisIcon.addEventListener("click", () => {
  indexCurrentSong = chansons.indexOf(audio_area.getAttribute("src"));
  if (tabFavoris.indexOf(tabMorceaux[indexCurrentSong]) == -1)
    tabFavoris.push(tabMorceaux[indexCurrentSong]);
  else alert("deja favoris");
  AddLikeIfFav();
});

//Mettre a jour la liste des chansons selon la saisie
inpSearch.addEventListener("input", () => {
  list_song_area.innerHTML = "";
  tabMorceaux.forEach((el, i) => {
    if (
      chansonsTitle[i].toUpperCase().includes(inpSearch.value.toUpperCase())
    ) {
      list_song_area.appendChild(el);
    }
  });
});

//Boutton de pause de la chanson
pauseBtn.addEventListener("click", () => {
  if (audio_area.paused) audio_area.play();
  else audio_area.pause();
  if (pauseBtn.getAttribute("src") == "img/pause.png")
    pauseBtn.src = "img/play.png";
  else pauseBtn.src = "img/pause.png";
});

prevBtn.addEventListener("click", () => {
  indexCurrentSong = chansons.indexOf(audio_area.getAttribute("src"));
  indexCurrentSong--;
  indexCurrentSong =
    indexCurrentSong == -1 ? chansons.length - 1 : indexCurrentSong;
  audio_area.src = chansons[indexCurrentSong];
  audio_area.play();
  document.querySelector(".songTitle").innerHTML = `
    ${chansonsTitle[indexCurrentSong]}
  `;
  AddLikeIfFav();
  ChangeImgSongIf();
});

nextBtn.addEventListener("click", () => {
  indexCurrentSong = chansons.indexOf(audio_area.getAttribute("src"));
  indexCurrentSong++;
  indexCurrentSong =
    indexCurrentSong === chansons.length ? 0 : indexCurrentSong;
  audio_area.src = chansons[indexCurrentSong];
  audio_area.play();
  document.querySelector(".songTitle").innerHTML = `
    ${chansonsTitle[indexCurrentSong]}
  `;
  AddLikeIfFav();
  ChangeImgSongIf();
});

chansons.forEach((chanson, i) => {
  const li = document.createElement("li");
  li.className = `bg-yellow-600/80 font-semibold text-white flex items-center gap-3 rounded-lg p-2`;
  li.addEventListener("click", () => {
    if (audio_area.getAttribute("src") == chanson) {
      if (audio_area.paused) audio_area.play();
      else audio_area.pause();
    } else {
      audio_area.src = chanson;
      audio_area.play();
    }
    indexCurrentSong = chansons.indexOf(audio_area.getAttribute("src"));
    document.querySelector(".songTitle").innerHTML = `
      ${chansonsTitle[indexCurrentSong]}
  `;
    AddLikeIfFav();
    ChangeImgSongIf();
  });
  li.innerHTML = `
  <span>
    <img class="w-8" src="img/disque.png"/> 
  </span> 
  <span>${chansonsTitle[i]}</span>`;
  list_song_area.appendChild(li);
  tabMorceaux.push(li);
});

//Titre de la chanson initial
document.querySelector(".songTitle").innerHTML = `
        ${chansonsTitle[chansons.indexOf(audio_area.getAttribute("src"))]}
      `;

//Permet de savoir la durée écoulé depuis le début de la chanson
audio_area.addEventListener("timeupdate", () => {
  duration = audio_area.duration;
  currentTime = audio_area.currentTime;
  if (duration > 0) {
    progressBar.value = (currentTime / duration) * 100;
  }
  document.querySelector(".currentTime").innerHTML = toMinute(
    parseInt(currentTime)
  );
});

const toMinute = (seconde) => {
  let sec0 = seconde % 60 < 10 ? "0" : "";
  return `0${parseInt(seconde / 60)}:${sec0}${parseInt(seconde % 60)}`;
};

//Met a jour la chanson en cas de modification de la progressBar de la chanson
progressBar.addEventListener("input", () => {
  audio_area.play();
  const duration = audio_area.duration;
  const newTime = (progressBar.value / 100) * duration;
  audio_area.currentTime = newTime;
});

//Met a jour le volume de la chanson
progressBarVolume.addEventListener("input", () => {
  audio_area.volume = 1;
  audio_area.volume = (progressBarVolume.value / 100).toFixed(1);
});

muteBtn.addEventListener("click", () => {
  if (parseInt(audio_area.volume) > 0) {
    audio_area.volume = 0;
    muteBtn.src = "img/volume0.png";
  } else {
    audio_area.volume = 1;
    muteBtn.src = "img/volume.png";
  }
});
