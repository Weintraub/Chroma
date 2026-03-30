const ARCHETYPES = [
  { name: "OCEANIC DEPTH",    desc: "You're drawn to the cool quiet of deep water — blues and teals that feel like looking up from below the surface.",  h: [170,240], s: [40,100], l: [25,55] },
  { name: "DUSTY TERRACOTTA", desc: "Warm earth, sun-bleached clay. Your palette lives in the comfortable space between rust and sand.",                  h: [10,40],   s: [30,70],  l: [35,65] },
  { name: "SOFT LINEN",       desc: "Quiet, considered, barely there. You favour tones that feel like first light through undyed cloth.",                 h: [25,60],   s: [5,30],   l: [70,90] },
  { name: "NEON MODERNIST",   desc: "High saturation, no apology. You trust colour to do the heavy lifting.",                                            h: [0,360],   s: [80,100], l: [45,65] },
  { name: "MOODY DUSK",       desc: "The hour when colours lose their certainty. Deep purples, slated mauves, bruised blues.",                           h: [240,300], s: [20,60],  l: [15,45] },
  { name: "FOREST FLOOR",     desc: "Mossy, dark, grounded. Greens that feel wet rather than bright.",                                                   h: [90,160],  s: [25,65],  l: [20,50] },
  { name: "GOLDEN HOUR",      desc: "Every amber, honey, and warm ochre that exists in the fifteen minutes before sunset.",                              h: [30,55],   s: [60,100], l: [45,70] },
  { name: "PALE NORDIC",      desc: "Desaturated, cool-leaning, effortlessly composed. The palette of concrete and fog.",                                h: [190,250], s: [5,30],   l: [60,85] },
  { name: "VERDANT",          desc: "Not the green of logos — the green of things that grow. Sage, fern, celadon.",                                      h: [90,150],  s: [20,55],  l: [45,75] },
  { name: "DEEP LACQUER",     desc: "Saturated darks — burgundy, ink, oxblood. Colours that feel lacquered rather than painted.",                        h: [330,30],  s: [50,90],  l: [12,35] },
  { name: "MINERAL GREY",     desc: "Precise, architectural neutrals. You find richness in the spaces between colours.",                                  h: [0,360],   s: [0,15],   l: [20,70] },
  { name: "ROSE DUSK",        desc: "Blush, dusty pinks and warm mauves — romantic but never saccharine.",                                               h: [320,360], s: [20,65],  l: [50,80] },
];

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return '#' + f(0) + f(8) + f(4);
}

function matchArchetype(h, s, l) {
  for (const a of ARCHETYPES) {
    const hMatch = a.h[0] <= a.h[1]
      ? (h >= a.h[0] && h <= a.h[1])
      : (h >= a.h[0] || h <= a.h[1]);
    const sMatch = s >= a.s[0] && s <= a.s[1];
    const lMatch = l >= a.l[0] && l <= a.l[1];
    if (hMatch && sMatch && lMatch) return a;
  }
  return ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
}

function hueLabel(h) {
  const names = [[15,'Red'],[45,'Orange'],[75,'Yellow'],[105,'Chartreuse'],[135,'Green'],[165,'Teal'],[195,'Cyan'],[225,'Azure'],[255,'Blue'],[285,'Violet'],[315,'Magenta'],[345,'Rose'],[361,'Red']];
  for (const [max, name] of names) if (h < max) return name;
  return 'Red';
}
function satLabel(s)   { return s < 20 ? 'Muted' : s < 50 ? 'Soft' : s < 75 ? 'Rich' : 'Vivid'; }
function lightLabel(l) { return l < 30 ? 'Dark'  : l < 50 ? 'Deep' : l < 65 ? 'Mid'  : 'Light'; }
