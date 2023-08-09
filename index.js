        const audioPlayer = document.getElementById("audioPlayer");
        const pauseButton = document.getElementById("pauseButton");
        const playButton = document.getElementById("playButton");
        const prevButton=document.getElementById("prevButton");
        const forwardButton=document.getElementById("forwardButton");
        const progressBar=document.getElementById("progressBar");
        const playlist=document.getElementById("playlist").getElementsByTagName("li");

        let currentSong=0;

        function loadSong(index){
            audioPlayer.src=playlist[index].getAttribute("data-src")
            audioPlayer.load();
        }

        function playSong(){
            audioPlayer.play();
        }

        function pauseSong(){
            audioPlayer.pause();
        }

        function playNextSong(){
            currentSong=(currentSong+1)%playlist.length;
            loadSong(currentSong);
            playSong();
        }

        function prevSong(){
            currentSong=(currentSong-1 + playlist.length)%playlist.length;
            loadSong(currentSong);
            playSong();
        }
        loadSong(currentSong);

        playButton.addEventListener("click",playSong);
        pauseButton.addEventListener("click",pauseSong);
        prevButton.addEventListener("click",prevSong);
        forwardButton.addEventListener("click",playNextSong);

        audioPlayer.addEventListener("timeupdate",()=>{
            const currentTime=audioPlayer.currentTime;
            const duration=audioPlayer.duration;
            const progressPercent=(currentTime/duration)*100;
            progressBar.value=progressPercent;
        })

        audioPlayer.addEventListener("ended",()=>{
            playNextSong();
        })