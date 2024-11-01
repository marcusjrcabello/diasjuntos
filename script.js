// script.js

// Fecha y hora de inicio de la relación
const startDate = new Date("2024-09-23T16:53:00"); // Formato: Año-Mes-DíaTHH:MM:SS

// Formatea la fecha en Día/Mes/Año
function formatStartDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Formatea la hora en HH:MM
function formatStartTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Función para calcular el tiempo juntos en tiempo real
function updateTimeTogether() {
  const now = new Date();
  const timeDifference = now - startDate;

  // Cálculos para días, horas, minutos y segundos
  const daysTogether = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursTogether = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutesTogether = Math.floor((timeDifference / (1000 * 60)) % 60);
  const secondsTogether = Math.floor((timeDifference / 1000) % 60);

  // Actualizar el contador en el HTML
  document.getElementById("days-count").textContent = daysTogether;
  document.getElementById("hours-count").textContent = hoursTogether;
  document.getElementById("minutes-count").textContent = minutesTogether;
  document.getElementById("seconds-count").textContent = secondsTogether;

  // Actualizar la fecha y hora de inicio una sola vez
  document.getElementById("start-date").textContent = formatStartDate(startDate);
  document.getElementById("start-time").textContent = formatStartTime(startDate);
}

// Llamar a la función cada segundo
setInterval(updateTimeTogether, 1000);


// Lista de canciones y control de audio
const songs = [
    { title: "SOMETHING ABOUT YOU", src: "EYEDRESS - SOMETHING ABOUT YOU  Traducida al Español  she looks just like a dream.mp3" },
    { title: "Die With A Smile", src: "Die With A Smile.mp3" },
    { title: "My Love Mine All Mine 3", src: "Mitski - My Love Mine All Mine (Español  Lyrics).mp3" },
  ];
  
  
  let currentSongIndex = 0;
  let firstPlay = true;
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play-music");
  const prevButton = document.getElementById("prev-song");
  const nextButton = document.getElementById("next-song");
  const songTitle = document.getElementById("song-title");
  const volumeControl = document.getElementById("volume");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeSpan = document.getElementById("current-time");
  const totalTimeSpan = document.getElementById("total-time");
  const loopButton = document.getElementById("loop");
  
  // Cargar y reproducir canción
  function loadAndPlaySong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    audio.play();
    playButton.textContent = "🎶 Pausar Música 🎶";
  }
  
  // Botón de reproducción/pausa
  playButton.addEventListener("click", () => {
    if (firstPlay) {
      loadAndPlaySong(currentSongIndex);
      firstPlay = false;
    } else if (audio.paused) {
      audio.play();
      playButton.textContent = "🎶 Pausar Música 🎶";
    } else {
      audio.pause();
      playButton.textContent = "🎶 Reproducir Música 🎶";
    }
  });
  
  // Botones de siguiente y anterior
  prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadAndPlaySong(currentSongIndex);
  });
  
  nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadAndPlaySong(currentSongIndex);
  });
  
  // Control de volumen
  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });
  
  // Barra de progreso y actualización del tiempo
  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    progressBar.value = (currentTime / duration) * 100;
  
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
  
    currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
    totalTimeSpan.textContent = `${totalMinutes}:${totalSeconds}`;
  });
  
  progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });
  
  // Botón de bucle
  loopButton.addEventListener("click", () => {
    audio.loop = !audio.loop;
    loopButton.style.backgroundColor = audio.loop ? "#ff5252" : "#ff6b6b";
  });