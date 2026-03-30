document.querySelectorAll('[data-rounds]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-rounds]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    config.rounds = parseInt(btn.dataset.rounds);
  });
});

document.querySelectorAll('[data-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    config.mode = btn.dataset.mode;
  });
});

document.getElementById('begin-btn').addEventListener('click', startGame);
