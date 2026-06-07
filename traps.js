const TRAPS = {
  bone: {
    label: 'Bone',
    desc:  'Holds 5s · 1 use',
    emoji: '🦴',
    cost:  10,
    hold:  5,
    uses:  1,
    type:  'static',
  },
  net: {
    label: 'Trap',
    desc:  'Holds 10s · 1 use',
    emoji: '🪤',
    cost:  25,
    hold:  10,
    uses:  1,
    type:  'static',
  },
  cage: {
    label: 'Cage',
    desc:  'Holds 8s · 3 uses',
    emoji: '🔒',
    cost:  30,
    hold:  8,
    uses:  3,
    type:  'static',
  },
  bunny: {
    label: 'Bunny',
    desc:  'Hunts column · 5 uses',
    emoji: '🐰',
    cost:  35,
    hold:  5,
    uses:  5,
    type:  'bunny',
    range: 55,   // column detection half-width (px)
    speed: 280,  // vertical chase speed (px/s)
  },
  hydrant: {
    label:         'Hydrant',
    desc:          'AoE spray · 1 use',
    emoji:         '⛲',
    cost:          60,
    hold:          5,
    uses:          1,
    type:          'hydrant',
    radius:        160,   // AoE radius (px)
    sprayDuration: 3500,  // how long the spray lasts (ms)
  },
};
