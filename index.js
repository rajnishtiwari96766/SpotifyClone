const audioPlayer=document.getElementById("audioPayer");
const pauseButton=document.getElementById("pauseButton");
const playButton=document.getElementById("playButton");

playButton.addEventListener("click",()=>{
    audioPlayer.play();
})

pauseButton.addEventListener("click",()=>{
    audioPlayer.pause();
})