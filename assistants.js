const ASSISTANTS = {
  flower: {
    label:  'Flower',
    desc:   '+1 nearby traps',
    emoji:  '🌸',
    cost:   20,
    type:   'flower',
    radius: 130,  // buff radius (px) — traps within this get +1 uses & +1 hold
  },
  carpet: {
    label:  'Carpet',
    desc:   '+1 escape limit',
    emoji:  '🪩',
    cost:   30,
    type:   'carpet',
  },
  camera: {
    label:  'Camera',
    desc:   'Traps reverse dogs',
    emoji:  '📷',
    cost:   25,
    type:   'camera',
    radius: 130,  // buff radius (px) — traps within this make caught dogs turn around when released
  },
};
