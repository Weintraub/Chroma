let config = { rounds: 25, mode: 'favourite' };
let state = {};

function initState() {
  state = { round: 0, maxRounds: config.rounds, mode: config.mode, colors: [], left: null, right: null, results: null };

  if (config.mode === 'favourite') {
    const hues = [0, 60, 120, 180, 240, 300];
    const sats = [25, 55, 85];
    const lights = [30, 50, 70];
    for (const h of hues) for (const s of sats) for (const l of lights)
      state.colors.push({ h, s, l, elo: 1000, wins: 0, seen: 0 });
  } else {
    const hues = Array.from({ length: 12 }, (_, i) => i * 30);
    const sats = [15, 35, 55, 75, 95];
    const lights = [25, 40, 55, 70];
    for (const h of hues) for (const s of sats) for (const l of lights)
      state.colors.push({ h, s, l, elo: 1000, wins: 0, seen: 0 });
  }
}

function pickPair() {
  const c = state.colors;
  const progress = state.round / Math.max(state.maxRounds, 1);

  if (state.mode === 'favourite') {
    if (progress < 0.4) {
      const unseen = c.filter(x => x.seen === 0);
      const pool = unseen.length >= 2 ? unseen : c;
      const a = pool[Math.floor(Math.random() * pool.length)];
      let b; do { b = pool[Math.floor(Math.random() * pool.length)]; } while (b === a);
      return [a, b];
    } else {
      const sorted = [...c].sort((a, b) => b.elo - a.elo);
      const pool = sorted.slice(0, Math.max(Math.floor(sorted.length * 0.5), 8));
      const a = pool[Math.floor(Math.random() * pool.length)];
      let b; do { b = pool[Math.floor(Math.random() * pool.length)]; } while (b === a);
      return [a, b];
    }
  } else {
    const sorted = [...c].sort((a, b) => b.elo - a.elo);
    const pool = Math.random() < 0.3 ? c : sorted.slice(0, Math.max(Math.floor(sorted.length * 0.4), 10));
    const a = pool[Math.floor(Math.random() * pool.length)];
    let b; do { b = pool[Math.floor(Math.random() * pool.length)]; } while (b === a);
    return [a, b];
  }
}

function eloUpdate(winner, loser) {
  const K = 32;
  const expW = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
  winner.elo += K * (1 - expW);
  loser.elo  += K * (0 - (1 - expW));
  winner.wins++;
  winner.seen++;
  loser.seen++;
}

function computeResults() {
  const sorted = [...state.colors].sort((a, b) => b.elo - a.elo);
  const top5 = sorted.slice(0, 5);
  const totalElo = top5.reduce((s, c) => s + c.elo, 0);
  let avgH_x = 0, avgH_y = 0, avgS = 0, avgL = 0;
  for (const c of top5) {
    const w = c.elo / totalElo;
    avgH_x += w * Math.cos(c.h * Math.PI / 180);
    avgH_y += w * Math.sin(c.h * Math.PI / 180);
    avgS += w * c.s;
    avgL += w * c.l;
  }
  const avgH = ((Math.atan2(avgH_y, avgH_x) * 180 / Math.PI) + 360) % 360;
  state.results = { top5, avgH: Math.round(avgH), avgS: Math.round(avgS), avgL: Math.round(avgL), archetype: matchArchetype(Math.round(avgH), Math.round(avgS), Math.round(avgL)) };
}
