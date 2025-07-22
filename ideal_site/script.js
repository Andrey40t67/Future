const playBtn = document.getElementById('play-btn');
const audio = document.getElementById('audio');

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = 'Пауза';
  } else {
    audio.pause();
    playBtn.textContent = 'Воспроизвести музыку';
  }
});
