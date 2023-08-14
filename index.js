
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
loadSong(currentSong);

function playSong() {
    audioPlayer.play();
}

function pauseSong() {
    audioPlayer.pause();
}

const songnext=document.getElementById(forwardButton)
function playNextSong() {
    console.log("nextSong")
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playSong();
    // currentSong.play();
}

const songprev=document.getElementById(prevButton)
function prevSong() {
    console.log("prevSong")
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    playSong();
}

//function created
const playsong = document.getElementById(playButton)
function togglePlayPause() {
    if (audioPlayer.paused || audioPlayer.currentTime <= 0) {
        audioPlayer.play();
        // console.log("playing")
        playButton.innerHTML = '<i class="fa-solid fa-pause fa-2xl"></i>';
    } else {
        audioPlayer.pause();
        // console.log("paused");
        playButton.innerHTML = '<i class="fa-solid fa-play fa-2xl"></i>';
    }
}

//function called
playButton.addEventListener("click", () => {
    togglePlayPause(playButton)
})
prevButton.addEventListener("click", ()=>{
    prevSong(prevButton);
    togglePlayPause(playButton);
});
forwardButton.addEventListener("click", ()=>{
    playNextSong(forwardButton)
    togglePlayPause(playButton)
});

audioPlayer.addEventListener("ended", () => {
    playNextSong();
})

audioPlayer.addEventListener("timeupdate",()=>{
    const currentTime=audioPlayer.currentTime;
    const duration=audioPlayer.duration;
    const progressPercent=(currentTime/duration)*100;
    progress.value=progressPercent;
    console.log(progressPercent.getTime())
})




