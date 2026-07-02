// The star registry — the existing community of lights on the Wall.
// Shared by the client sky engine and the server-rendered /star/[id] pages,
// so placement uses a seeded PRNG instead of Math.random: both sides must
// agree on where every star lives and what it says.
// Production: this module becomes the read model over the stars table.

export const CX = 1600;
export const CY = 1100;

export const TIER = {
  spark: { amt: 5, label: 'Spark', size: 9 },
  star: { amt: 15, label: 'Guiding Star', size: 17 },
  beacon: { amt: 50, label: 'Beacon', size: 34 },
  constellation: { amt: 150, label: 'Constellation', size: 26 },
};

// what each tier keeps lit — placeholder equivalences, to be replaced with
// figures the charity can stand over (see Open Questions in the handoff)
export const IMPACT = {
  spark: 'a week of Kids Club for one child',
  star: 'a month of choir for one young voice',
  beacon: 'a seat in a psychologist-led workshop',
  constellation: 'a teen’s full 12 weeks of Be The Light',
};

// the sky is mapped: six skies named for the places of Ballymun
export const REGIONS = [
  { a: -90, name: 'Poppintree' },
  { a: -30, name: 'Santry' },
  { a: 30, name: 'Coultry' },
  { a: 90, name: 'Shangan' },
  { a: 150, name: 'Sillogue' },
  { a: -150, name: 'Balcurris' },
];

const seedRaw = [
  ['For my nana, who loved to sing.', 'Mary', 'Poppintree', '2024-02-11', 'Nana Rose'],
  ['Keep shining, Ballymun.', 'Declan', 'Santry', '2024-03-02'],
  ['For the choir that gave me a home.', 'Aoife', 'Coultry', '2024-03-19'],
  ['To my dad. We still sing your songs.', 'Liam', 'Ballymun', '2024-04-06', 'Dad'],
  ['For everyone finding their voice.', 'Sinead', 'Glasnevin', '2024-04-22'],
  ['Be the light. Class of 2024.', 'The Be The Light teens', 'Ballymun', '2024-05-04'],
  ['For my sister, my best friend.', 'Niamh', 'Finglas', '2024-05-18', 'Orla'],
  ['Thank you for minding our young ones.', 'The Byrne family', 'Coultry', '2024-06-01'],
  ['For brighter days ahead.', 'Tom', 'Santry', '2024-06-15'],
  ['In memory of John. Forever loved.', 'The Kelly family', 'Ballymun', '2024-07-03', 'John'],
  ['For the nanas of Poppintree.', 'Grace', 'Poppintree', '2024-07-20'],
  ['We sang until the night felt small.', 'Youth Choir', 'Ballymun', '2024-08-09'],
  ['For my mam, the strongest woman I know.', 'Jack', 'Glasnevin', '2024-08-24', 'Mam'],
  ['Hope is a window left open.', 'Teens Poetry Club', 'Ballymun', '2024-09-07'],
  ['For new beginnings.', 'Rachel', 'Finglas', '2024-09-21'],
  ['To everyone who felt alone. You are not.', 'A friend', 'Santry', '2024-10-05'],
  ['For our wonderful volunteers.', 'Caoimhe', 'Ballymun', '2024-10-19'],
  ['Lit by a local business who believes.', 'A neighbour', 'Ballymun', '2024-11-02'],
  ['For my grandad and his ballads.', 'Conor', 'Coultry', '2024-11-16', 'Grandad Joe'],
  ['Light for the long winter nights.', 'Orla', 'Poppintree', '2024-12-01'],
  ['Nollaig shona. For all the family.', 'The Doyles', 'Ballymun', '2024-12-21'],
  ['A fresh start for the new year.', 'Mark', 'Glasnevin', '2025-01-04'],
  ['For my best pal. Get well soon.', 'Emma', 'Santry', '2025-01-19', 'Katie'],
  ['For the kids who just need someone.', 'A teacher', 'Ballymun', '2025-02-02'],
  ['Solas do Bhaile Munna.', 'Padraig', 'Ballymun', '2025-02-16'],
  ['For my wife, who never stopped believing.', 'Gerry', 'Finglas', '2025-03-01', 'Breda'],
  ['Keep the light on for us.', 'The Walsh family', 'Coultry', '2025-03-15'],
  ['For everyone learning to lead.', 'Be The Light', 'Ballymun', '2025-03-29'],
  ['Shine bright, little one.', 'New mam Aoibhinn', 'Poppintree', '2025-04-12', 'Fiadh'],
  ['For the friends I made here.', 'David', 'Santry', '2025-04-27'],
  ['In loving memory of Granny May.', 'The Murphys', 'Ballymun', '2025-05-10', 'Granny May'],
  ['For hope, for healing, for home.', 'Saoirse', 'Glasnevin', '2025-05-24'],
  ['Proud of my daughter, our poet.', 'A proud dad', 'Ballymun', '2025-06-07', 'Robyn'],
  ['For brighter days for Ballymun.', 'A wellwisher', 'Finglas', '2025-06-19'],
];

// small deterministic PRNG (mulberry32)
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// place stars in a centered galaxy cluster (golden-angle phyllotaxis) so the
// opening view lands on a dense, beautiful group of lights — never empty space
export function placeStar(i, rnd) {
  rnd = rnd || Math.random;
  const r = 78 * Math.sqrt(i + 1);
  const a = (i + 1) * 2.399963;
  return {
    x: CX + r * Math.cos(a) + (rnd() * 30 - 15),
    y: CY + r * Math.sin(a) * 0.66 + (rnd() * 26 - 13),
  };
}

export function skyRegion(x, y) {
  const ang = (Math.atan2(y - CY, x - CX) * 180) / Math.PI;
  let best = REGIONS[0];
  let bd = 1e9;
  REGIONS.forEach(function (r) {
    const d = Math.abs(((((ang - r.a) % 360) + 540) % 360) - 180);
    if (d < bd) { bd = d; best = r; }
  });
  return best.name;
}

export function regionPhrase(l) { return 'the ' + (l.region || 'Ballymun') + ' sky'; }
export function starName(l) { return l.forName || l.label || null; }
export function displayName(l) { return starName(l) || l.name; }

// satellite slots for a constellation's member stars (pure geometry, no randomness)
export function memberSlots(members) {
  const names = members && members.length ? members : ['', '', '', '', '', ''];
  const n = names.length;
  const sat = [];
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2 + 0.4;
    const rr = 56 + (k % 3) * 16;
    sat.push({ dx: Math.cos(a) * rr, dy: Math.sin(a) * rr * 0.82, name: names[k] });
  }
  return sat;
}

/** The seeded community of lights, deterministic across server and client. */
export function buildSeedLights() {
  const lights = seedRaw.map(function (r, idx) {
    return { msg: r[0], name: r[1], place: r[2], date: r[3], forName: r[4] || null, mine: false, id: 'l' + idx };
  });
  // give the seeded community a mix of tiers (most loved = Guiding Star)
  lights.forEach(function (l, i) {
    l.tier = i % 7 === 3 ? 'beacon' : i % 3 === 0 ? 'spark' : 'star';
  });
  // one seeded constellation so the wall shows the feature
  lights[8].tier = 'constellation';
  lights[8].label = 'The Be The Light Class';
  lights[8].members = ['Aoife', 'Jack', 'Saoirse', 'Cian', 'Niamh', 'Daniel'];
  lights.forEach(function (l, i) {
    const p = placeStar(i, mulberry32(0x1f0b + i * 97));
    l.x = p.x;
    l.y = p.y;
    l.no = 7 + i * 11;
    l.region = skyRegion(p.x, p.y);
  });
  return lights;
}

export const SEED_COUNT = 412;

/**
 * Server-side lookup for /star/[id]: resolves seed stars ('l8') and their
 * constellation members ('l8-m2'). Freshly minted ids ('mine0') live only in
 * the buyer's session until a real backend stores them.
 */
export function getStarById(id) {
  const lights = buildSeedLights();
  const m = /^(l\d+)-m(\d+)$/.exec(id || '');
  if (m) {
    const parent = lights.find(function (l) { return l.id === m[1]; });
    if (!parent || parent.tier !== 'constellation') return null;
    const sat = memberSlots(parent.members)[+m[2]];
    if (!sat) return null;
    return {
      msg: parent.msg, name: parent.name, date: parent.date, mine: false, gift: true,
      tier: 'member', forName: sat.name || null, no: parent.no, region: parent.region,
      constellation: parent.label || parent.forName || parent.name,
      id: id, x: parent.x + sat.dx, y: parent.y + sat.dy,
    };
  }
  return lights.find(function (l) { return l.id === id; }) || null;
}
