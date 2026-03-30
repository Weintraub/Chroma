const startScreen   = document.getElementById('start-screen');
const gameScreen    = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const flash         = document.getElementById('flash');

function showScreen(name) {
  startScreen.classList.toggle('hidden', name !== 'start');
  gameScreen.classList.toggle('hidden', name !== 'game');
  resultsScreen.classList.toggle('hidden', name !== 'results');
}

function startGame() {
  initState();
  showScreen('game');
  document.getElementById('stop-btn').classList.toggle('hidden', config.rounds !== 0);
  nextRound();
}

function endGame() {
  computeResults();
  renderResults();
  showScreen('results');
}

document.getElementById('play-again-btn').addEventListener('click', () => showScreen('start'));
