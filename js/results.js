function renderResults() {
  const r = state.results;
  document.getElementById('archetype-name').textContent = r.archetype.name;
  document.getElementById('archetype-desc').textContent = r.archetype.desc;

  const row = document.getElementById('palette-row');
  row.innerHTML = '';
  r.top5.forEach(c => {
    const hex = hslToHex(c.h, c.s, c.l);
    const div = document.createElement('div');
    div.className = 'palette-swatch';
    div.style.cssText = `background: hsl(${c.h},${c.s}%,${c.l}%); height: 80px;`;
    div.setAttribute('data-hex', hex.toUpperCase());
    row.appendChild(div);
  });

  document.getElementById('thumb-h').style.left = (r.avgH / 360 * 100) + '%';
  document.getElementById('thumb-s').style.left = r.avgS + '%';
  document.getElementById('thumb-l').style.left = r.avgL + '%';
  document.getElementById('val-h').textContent = hueLabel(r.avgH);
  document.getElementById('val-s').textContent = satLabel(r.avgS);
  document.getElementById('val-l').textContent = lightLabel(r.avgL);
}
