
const audioPlayer = document.getElementById("audioPlayer");
const pauseButton = document.getElementById("pauseButton");
const playButton = document.getElementById("playButton");
const prevButton = document.getElementById("prevButton");
const forwardButton = document.getElementById("forwardButton");
const progressBar = document.getElementById("progressBar");
const playlist = document.getElementById("playlist").getElementsByTagName("li");

let currentSong = 0;

function loadSong(index) {
    audioPlayer.src = playlist[index].getAttribute("data-src")
    audioPlayer.load();
}

function playSong() {
    audioPlayer.play();
}

function pauseSong() {
    audioPlayer.pause();
}

function playNextSong() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playSong();
}

function prevSong() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    playSong();
}
loadSong(currentSong);

playButton.addEventListener("click", playSong);
pauseButton.addEventListener("click", pauseSong);
prevButton.addEventListener("click", prevSong);
forwardButton.addEventListener("click", playNextSong);

audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
})

audioPlayer.addEventListener("ended", () => {
    playNextSong();
})

// const playPauseIcon = document.getElementById("playPauseIcon")
// function togglePlayPause() {
//     if (audioPlayer.paused) {
//         audioPlayer.play();
//         playPauseIcon.classList.remove("fa-solid fa-play fa-2xl")
//         playPauseIcon.classList.add("fa-solid fa-pause fa-2xl");
//         console.log("playing")
//     }
//     else {
//         audioPlayer.pause();
//         playPauseIcon.classList.remove("fa-solid fa-pause fa-2xl")
//         playPauseIcon.classList.add("fa-solid fa-play fa-2xl");
//         console.log("paused")

//     }
// }

// playButton.addEventListener("click", togglePlayPause);

// pauseButton.addEventListener("click", () => {
//     audioPlayer.pause();
//     playPauseIcon.classList.remove("fa-solid fa-pause fa-2xl")
//     playPauseIcon.classList.add("fa-solid fa-play fa-2xl")
// })

const playsong=document.getElementById(playButton)
function togglePlayPause(icons){
    if(audioPlayer.paused || audioPlayer.currentTime<=0){
        audioPlayer.play();
        console.log("playing")
    }else{
        audioPlayer.pause();
        console.log("paused");
    }
}

playButton.addEventListener("click",()=>{
    togglePlayPause(playButton);
})

