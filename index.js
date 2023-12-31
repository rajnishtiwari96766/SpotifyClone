
const audioPlayer = document.getElementById("audioPlayer");
const pauseButton = document.getElementById("pauseButton");
const playButton = document.getElementById("playButton");
const prevButton = document.getElementById("prevButton");
const forwardButton = document.getElementById("forwardButton");
const progressBar = document.getElementById("progress");
const playlist = document.getElementById("playlist").getElementsByTagName("li");
const startTime = document.getElementById("startTime")
const endTime = document.getElementById("endTime")
const volumeSlider = document.getElementById("myRange")
const volumeIcon = document.getElementById("volumeIcon")

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

const songnext = document.getElementById(forwardButton)
function playNextSong() {
    console.log("nextSong")
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playSong();
    // currentSong.play();
}

const songprev = document.getElementById(prevButton)
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
        playButton.innerHTML = '<i class="fa-solid fa-circle-play fa-2xl"></i>';
    }
}

const start = document.getElementById(startTime)
function begin() {
    if (!audioPlayer.paused) {
        const currentTime = audioPlayer.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        startTime.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function audio_duration(){
    const duration=audioPlayer.duration;
    if(!isNaN(duration) && isFinite(duration)){
        const minutes=Math.floor(duration/60);
        const seconds=Math.floor(duration%60);
        endTime.innerHTML=`${minutes}:${seconds <10 ? '0':''}${seconds}`;
    }else{
        endTime.innerHTML='00:00'
    }
}

let currentVolume_value = audioPlayer.volume;
function audioControl() {
    if (audioPlayer.volume !== 0) {
        audioPlayer.volume = 0;
        myRange.value = 0;
        volumeIcon.classList.add("fa-volume-mute")
        volumeIcon.classList.remove("fa-volume-high")
    } else {
        audioPlayer.volume = currentVolume_value
        myRange.value = currentVolume_value.volume;

        volumeIcon.classList.add("fa-volume-high")
        volumeIcon.classList.remove("fa-volume-mute")
    }
}

const songsInList = document.querySelectorAll("#playlist li")
const handleSongClick = (event) => {
    const clickedIndex = Array.from(songsInList).indexOf(event.currentTarget);

    if(audioPlayer.paused){
        if (clickedIndex !== -1) {
            currentSong = clickedIndex;  // Update the currentSong index
            loadSong(currentSong);  // Load the clicked song
            playSong();  // Play the clicked song
            playButton.innerHTML = '<i class="fa-solid fa-pause fa-2xl"></i>';  // Update the play button icon
        }
    }
    else {
        pauseSong()
        playButton.innerHTML = '<i class="fa-solid fa-circle-play fa-2xl"></i>';
    }
};

//function called
playButton.addEventListener("click", () => {
    togglePlayPause()
})
prevButton.addEventListener("click", () => {
    prevSong(prevButton);
    togglePlayPause(playButton);
});
forwardButton.addEventListener("click", () => {
    playNextSong(forwardButton)
    togglePlayPause(playButton)
});

audioPlayer.addEventListener("ended", () => {
    playNextSong();
})

audioPlayer.addEventListener("timeupdate", () => {
    begin()
    audio_duration()
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
})

myRange.addEventListener("input", () => {
    audioPlayer.volume = myRange.value / 100
})

volumeIcon.addEventListener("click", () => {
    audioControl()
})

songsInList.forEach((items) => {
    items.addEventListener('click', handleSongClick)
})

progressBar.addEventListener('click',(event)=>{
    const clickedPos=(event.offsetX/progressBar.offsetWidth)*audioPlayer.duration;
    audioPlayer.currentTime=clickedPos;
})