// Song data
let songs = [  
  {
    songName: "Warriyo - Mortals",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  },
  {
    songName: "DEAF KEV - Invincible",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  },
  {
    songName: "Different Heaven - Nekozilla",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  },
  {
    songName: "Janji - Heroes Tonight",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  },
  {
    songName: "Alan Walker - Fade",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  },
  {
    songName: "Different Heaven - Nekozilla",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  }, 
  {
    songName: "Alan Walker - Fade",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  },
  {
    songName: "Alan Walker - Fade",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  },
   {
    songName: "Different Heaven - Nekozilla",
    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverPath: "https://th.bing.com/th/id/OIP.08JvBQf9ucVwPuRScPa1rwHaEY?w=317&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  }, 

];

// Elements
let songItems = Array.from(document.getElementsByClassName("songItem"));
let progressBar = document.getElementById("myProgreeessBar");
let masterPlay = document.querySelector(".bottom .fa-play-circle");
let songInfo = document.querySelector(".songinfo");
let audioElement = new Audio(songs[0].filePath);
let currentSong = 0;

// Load song data into UI
songItems.forEach((element, index) => {
  if (songs[index]) {
    element.getElementsByTagName("img")[0].src = songs[index].coverPath;
    element.getElementsByClassName("is")[0].innerText = songs[index].songName;
  }
});

// Play/pause from bottom control
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    updateSongInfo(currentSong);
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  progressBar.value = progress;
});

// Seek
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Utility to reset all play icons
function resetAllPlays() {
  document.querySelectorAll(".songlistplay i").forEach((el) => {
    el.classList.remove("fa-pause-circle");
    el.classList.add("fa-play-circle");
  });
}

// Play from individual song list
document.querySelectorAll(".songlistplay").forEach((playBtn, index) => {
  playBtn.addEventListener("click", () => {
    if (currentSong !== index) {
      currentSong = index;
      audioElement.src = songs[index].filePath;
    }

    if (audioElement.paused || audioElement.currentTime <= 0) {
      resetAllPlays();
      playBtn.querySelector("i").classList.remove("fa-play-circle");
      playBtn.querySelector("i").classList.add("fa-pause-circle");
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      updateSongInfo(index);
    } else {
      audioElement.pause();
      resetAllPlays();
      playBtn.querySelector("i").classList.remove("fa-pause-circle");
      playBtn.querySelector("i").classList.add("fa-play-circle");
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
    }
  });
});

// Show song info in bottom
function updateSongInfo(index) {
  songInfo.innerHTML = `
    <img src="${songs[index].coverPath}" width="42px"> ${songs[index].songName}
  `;
}