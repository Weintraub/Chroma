function nextRound() {
  if (state.maxRounds > 0 && state.round >= state.maxRounds) { endGame(); return; }
  const [a, b] = pickPair();
  state.left = a; state.right = b;
  document.getElementById('swatch-left').style.background  = `hsl(${a.h},${a.s}%,${a.l}%)`;
  document.getElementById('swatch-right').style.background = `hsl(${b.h},${b.s}%,${b.l}%)`;
  const pct = state.maxRounds > 0 ? (state.round / state.maxRounds) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('round-counter').textContent = state.maxRounds > 0 ? `${state.round + 1} / ${state.maxRounds}` : `Round ${state.round + 1}`;
}

function choose(winner, loser) {
  eloUpdate(winner, loser);
  state.round++;
  flash.classList.add('active');
  setTimeout(() => { flash.classList.remove('active'); nextRound(); }, 120);
}

document.getElementById('swatch-left').addEventListener('click',  () => choose(state.left, state.right));
document.getElementById('swatch-right').addEventListener('click', () => choose(state.right, state.left));
document.getElementById('stop-btn').addEventListener('click', endGame);

document.addEventListener('keydown', e => {
  if (!gameScreen.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft')  choose(state.left, state.right);
    if (e.key === 'ArrowRight') choose(state.right, state.left);
  }
});
