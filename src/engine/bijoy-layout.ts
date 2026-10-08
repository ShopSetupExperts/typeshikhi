export type FingerType =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export interface KeyDef {
  code: string;
  normal: string;
  shift: string;
  labelEn: string;
  finger: FingerType;
  hand: 'left' | 'right';
  row: number; // 0: Number, 1: Top, 2: Home, 3: Bottom, 4: Space
  width?: string;
}

export const BIJOY_KEYMAP: Record<string, KeyDef> = {
  // Row 0 - Numbers
  Backquote: { code: 'Backquote', normal: '`', shift: '~', labelEn: '`', finger: 'left-pinky', hand: 'left', row: 0 },
  Digit1: { code: 'Digit1', normal: '১', shift: '!', labelEn: '1', finger: 'left-pinky', hand: 'left', row: 0 },
  Digit2: { code: 'Digit2', normal: '২', shift: '@', labelEn: '2', finger: 'left-ring', hand: 'left', row: 0 },
  Digit3: { code: 'Digit3', normal: '৩', shift: '#', labelEn: '3', finger: 'left-middle', hand: 'left', row: 0 },
  Digit4: { code: 'Digit4', normal: '৪', shift: '$', labelEn: '4', finger: 'left-index', hand: 'left', row: 0 },
  Digit5: { code: 'Digit5', normal: '৫', shift: '%', labelEn: '5', finger: 'left-index', hand: 'left', row: 0 },
  Digit6: { code: 'Digit6', normal: '৬', shift: '^', labelEn: '6', finger: 'right-index', hand: 'right', row: 0 },
  Digit7: { code: 'Digit7', normal: '৭', shift: 'ঁ', labelEn: '7', finger: 'right-index', hand: 'right', row: 0 },
  Digit8: { code: 'Digit8', normal: '৮', shift: '*', labelEn: '8', finger: 'right-middle', hand: 'right', row: 0 },
  Digit9: { code: 'Digit9', normal: '৯', shift: '(', labelEn: '9', finger: 'right-ring', hand: 'right', row: 0 },
  Digit0: { code: 'Digit0', normal: '০', shift: ')', labelEn: '0', finger: 'right-pinky', hand: 'right', row: 0 },
  Minus: { code: 'Minus', normal: '-', shift: '_', labelEn: '-', finger: 'right-pinky', hand: 'right', row: 0 },
  Equal: { code: 'Equal', normal: '=', shift: '+', labelEn: '=', finger: 'right-pinky', hand: 'right', row: 0 },

  // Row 1 - Top Row
  KeyQ: { code: 'KeyQ', normal: 'ঙ', shift: 'ং', labelEn: 'Q', finger: 'left-pinky', hand: 'left', row: 1 },
  KeyW: { code: 'KeyW', normal: 'য', shift: 'য়', labelEn: 'W', finger: 'left-ring', hand: 'left', row: 1 },
  KeyE: { code: 'KeyE', normal: 'ড', shift: 'ঢ', labelEn: 'E', finger: 'left-middle', hand: 'left', row: 1 },
  KeyR: { code: 'KeyR', normal: 'প', shift: 'ফ', labelEn: 'R', finger: 'left-index', hand: 'left', row: 1 },
  KeyT: { code: 'KeyT', normal: 'ট', shift: 'ঠ', labelEn: 'T', finger: 'left-index', hand: 'left', row: 1 },
  KeyY: { code: 'KeyY', normal: 'চ', shift: 'ছ', labelEn: 'Y', finger: 'right-index', hand: 'right', row: 1 },
  KeyU: { code: 'KeyU', normal: 'জ', shift: 'ঝ', labelEn: 'U', finger: 'right-index', hand: 'right', row: 1 },
  KeyI: { code: 'KeyI', normal: 'হ', shift: 'ঞ', labelEn: 'I', finger: 'right-middle', hand: 'right', row: 1 },
  KeyO: { code: 'KeyO', normal: 'গ', shift: 'ঘ', labelEn: 'O', finger: 'right-ring', hand: 'right', row: 1 },
  KeyP: { code: 'KeyP', normal: 'ড়', shift: 'ঢ়', labelEn: 'P', finger: 'right-pinky', hand: 'right', row: 1 },
  BracketLeft: { code: 'BracketLeft', normal: '[', shift: '{', labelEn: '[', finger: 'right-pinky', hand: 'right', row: 1 },
  BracketRight: { code: 'BracketRight', normal: ']', shift: '}', labelEn: ']', finger: 'right-pinky', hand: 'right', row: 1 },
  Backslash: { code: 'Backslash', normal: '\\', shift: '|', labelEn: '\\', finger: 'right-pinky', hand: 'right', row: 1 },

  // Row 2 - Home Row
  KeyA: { code: 'KeyA', normal: 'ৃ', shift: 'র্', labelEn: 'A', finger: 'left-pinky', hand: 'left', row: 2 },
  KeyS: { code: 'KeyS', normal: 'ু', shift: 'ূ', labelEn: 'S', finger: 'left-ring', hand: 'left', row: 2 },
  KeyD: { code: 'KeyD', normal: 'ি', shift: 'ী', labelEn: 'D', finger: 'left-middle', hand: 'left', row: 2 },
  KeyF: { code: 'KeyF', normal: 'া', shift: 'অ', labelEn: 'F', finger: 'left-index', hand: 'left', row: 2 },
  KeyG: { code: 'KeyG', normal: '্', shift: '।', labelEn: 'G', finger: 'left-index', hand: 'left', row: 2 },
  KeyH: { code: 'KeyH', normal: 'ব', shift: 'ভ', labelEn: 'H', finger: 'right-index', hand: 'right', row: 2 },
  KeyJ: { code: 'KeyJ', normal: 'ক', shift: 'খ', labelEn: 'J', finger: 'right-index', hand: 'right', row: 2 },
  KeyK: { code: 'KeyK', normal: 'ত', shift: 'থ', labelEn: 'K', finger: 'right-middle', hand: 'right', row: 2 },
  KeyL: { code: 'KeyL', normal: 'দ', shift: 'ধ', labelEn: 'L', finger: 'right-ring', hand: 'right', row: 2 },
  Semicolon: { code: 'Semicolon', normal: ';', shift: ':', labelEn: ';', finger: 'right-pinky', hand: 'right', row: 2 },
  Quote: { code: 'Quote', normal: '\'', shift: '"', labelEn: '\'', finger: 'right-pinky', hand: 'right', row: 2 },

  // Row 3 - Bottom Row
  KeyZ: { code: 'KeyZ', normal: '্র', shift: '্য', labelEn: 'Z', finger: 'left-pinky', hand: 'left', row: 3 },
  KeyX: { code: 'KeyX', normal: 'ও', shift: 'ৗ', labelEn: 'X', finger: 'left-ring', hand: 'left', row: 3 },
  KeyC: { code: 'KeyC', normal: 'ে', shift: 'ৈ', labelEn: 'C', finger: 'left-middle', hand: 'left', row: 3 },
  KeyV: { code: 'KeyV', normal: 'র', shift: 'ল', labelEn: 'V', finger: 'left-index', hand: 'left', row: 3 },
  KeyB: { code: 'KeyB', normal: 'ন', shift: 'ণ', labelEn: 'B', finger: 'left-index', hand: 'left', row: 3 },
  KeyN: { code: 'KeyN', normal: 'স', shift: 'ষ', labelEn: 'N', finger: 'right-index', hand: 'right', row: 3 },
  KeyM: { code: 'KeyM', normal: 'ম', shift: 'শ', labelEn: 'M', finger: 'right-index', hand: 'right', row: 3 },
  Comma: { code: 'Comma', normal: ',', shift: '<', labelEn: ',', finger: 'right-middle', hand: 'right', row: 3 },
  Period: { code: 'Period', normal: '.', shift: '>', labelEn: '.', finger: 'right-ring', hand: 'right', row: 3 },
  Slash: { code: 'Slash', normal: 'ঃ', shift: 'ৎ', labelEn: '/', finger: 'right-pinky', hand: 'right', row: 3 },

  // Row 4 - Space
  Space: { code: 'Space', normal: ' ', shift: ' ', labelEn: 'Space', finger: 'thumb', hand: 'left', row: 4 }
};

export const FINGER_COLORS: Record<FingerType, { bg: string; text: string; border: string; glow: string; label: string; labelBn: string }> = {
  'left-pinky': {
    bg: 'rgba(239, 68, 68, 0.15)',
    text: '#f87171',
    border: 'rgba(239, 68, 68, 0.4)',
    glow: '0 0 15px rgba(239, 68, 68, 0.5)',
    label: 'Left Pinky',
    labelBn: 'বাম কনিষ্ঠা'
  },
  'left-ring': {
    bg: 'rgba(249, 115, 22, 0.15)',
    text: '#fb923c',
    border: 'rgba(249, 115, 22, 0.4)',
    glow: '0 0 15px rgba(249, 115, 22, 0.5)',
    label: 'Left Ring',
    labelBn: 'বাম অনামিকা'
  },
  'left-middle': {
    bg: 'rgba(234, 179, 8, 0.15)',
    text: '#facc15',
    border: 'rgba(234, 179, 8, 0.4)',
    glow: '0 0 15px rgba(234, 179, 8, 0.5)',
    label: 'Left Middle',
    labelBn: 'বাম মধ্যমা'
  },
  'left-index': {
    bg: 'rgba(34, 197, 94, 0.15)',
    text: '#4ade80',
    border: 'rgba(34, 197, 94, 0.4)',
    glow: '0 0 15px rgba(34, 197, 94, 0.5)',
    label: 'Left Index',
    labelBn: 'বাম তর্জনী'
  },
  'thumb': {
    bg: 'rgba(168, 85, 247, 0.15)',
    text: '#c084fc',
    border: 'rgba(168, 85, 247, 0.4)',
    glow: '0 0 15px rgba(168, 85, 247, 0.5)',
    label: 'Thumb',
    labelBn: 'বৃদ্ধাঙ্গুলি'
  },
  'right-index': {
    bg: 'rgba(6, 182, 212, 0.15)',
    text: '#22d3ee',
    border: 'rgba(6, 182, 212, 0.4)',
    glow: '0 0 15px rgba(6, 182, 212, 0.5)',
    label: 'Right Index',
    labelBn: 'ডান তর্জনী'
  },
  'right-middle': {
    bg: 'rgba(59, 130, 246, 0.15)',
    text: '#60a5fa',
    border: 'rgba(59, 130, 246, 0.4)',
    glow: '0 0 15px rgba(59, 130, 246, 0.5)',
    label: 'Right Middle',
    labelBn: 'ডান মধ্যমা'
  },
  'right-ring': {
    bg: 'rgba(139, 92, 246, 0.15)',
    text: '#a78bfa',
    border: 'rgba(139, 92, 246, 0.4)',
    glow: '0 0 15px rgba(139, 92, 246, 0.5)',
    label: 'Right Ring',
    labelBn: 'ডান অনামিকা'
  },
  'right-pinky': {
    bg: 'rgba(236, 72, 153, 0.15)',
    text: '#f472b6',
    border: 'rgba(236, 72, 153, 0.4)',
    glow: '0 0 15px rgba(236, 72, 153, 0.5)',
    label: 'Right Pinky',
    labelBn: 'ডান কনিষ্ঠা'
  }
};

export const KEYBOARD_ROWS: string[][] = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
  ['Space']
];
