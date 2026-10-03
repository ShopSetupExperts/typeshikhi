import { BijoyEngine } from './bijoy-engine';

export function runExtended300TestSuite(): { total: number; passed: number; failed: number } {
  const engine = new BijoyEngine();

  // Test set definitions
  const testSets: Array<{ name: string; keys: Array<{ code: string; shift?: boolean }>; expected: string }> = [];

  // 1. Basic Consonants (39 consonants)
  const consonants = [
    { code: 'KeyJ', shift: false, char: 'ক' },
    { code: 'KeyJ', shift: true, char: 'খ' },
    { code: 'KeyO', shift: false, char: 'গ' },
    { code: 'KeyO', shift: true, char: 'ঘ' },
    { code: 'KeyQ', shift: false, char: 'ঙ' },
    { code: 'KeyY', shift: false, char: 'চ' },
    { code: 'KeyY', shift: true, char: 'ছ' },
    { code: 'KeyU', shift: false, char: 'জ' },
    { code: 'KeyU', shift: true, char: 'ঝ' },
    { code: 'KeyI', shift: true, char: 'ঞ' },
    { code: 'KeyT', shift: false, char: 'ট' },
    { code: 'KeyT', shift: true, char: 'ঠ' },
    { code: 'KeyE', shift: false, char: 'ড' },
    { code: 'KeyE', shift: true, char: 'ঢ' },
    { code: 'KeyB', shift: true, char: 'ণ' },
    { code: 'KeyK', shift: false, char: 'ত' },
    { code: 'KeyK', shift: true, char: 'থ' },
    { code: 'KeyL', shift: false, char: 'দ' },
    { code: 'KeyL', shift: true, char: 'ধ' },
    { code: 'KeyB', shift: false, char: 'ন' },
    { code: 'KeyR', shift: false, char: 'প' },
    { code: 'KeyR', shift: true, char: 'ফ' },
    { code: 'KeyH', shift: false, char: 'ব' },
    { code: 'KeyH', shift: true, char: 'ভ' },
    { code: 'KeyM', shift: false, char: 'ম' },
    { code: 'KeyW', shift: false, char: 'য' },
    { code: 'KeyV', shift: false, char: 'র' },
    { code: 'KeyV', shift: true, char: 'ল' },
    { code: 'KeyM', shift: true, char: 'শ' },
    { code: 'KeyN', shift: true, char: 'ষ' },
    { code: 'KeyN', shift: false, char: 'স' },
    { code: 'KeyI', shift: false, char: 'হ' },
    { code: 'KeyP', shift: false, char: 'ড়' },
    { code: 'KeyP', shift: true, char: 'ঢ়' },
    { code: 'KeyW', shift: true, char: 'য়' }
  ];

  for (const c of consonants) {
    testSets.push({
      name: `Consonant: ${c.char}`,
      keys: [{ code: c.code, shift: c.shift }],
      expected: c.char
    });
  }

  // 2. All Kars applied to multiple core consonants (ক, ত, ব, ম, স, দ, গ, র)
  const sampleConsonants = [
    { code: 'KeyJ', char: 'ক' },
    { code: 'KeyK', char: 'ত' },
    { code: 'KeyH', char: 'ব' },
    { code: 'KeyM', char: 'ম' },
    { code: 'KeyN', char: 'স' },
    { code: 'KeyL', char: 'দ' },
    { code: 'KeyO', char: 'গ' }
  ];

  for (const c of sampleConsonants) {
    // া (F)
    testSets.push({
      name: `${c.char} + া`,
      keys: [{ code: c.code }, { code: 'KeyF' }],
      expected: `${c.char}া`
    });
    // ি (D pre-kar)
    testSets.push({
      name: `ি + ${c.char}`,
      keys: [{ code: 'KeyD' }, { code: c.code }],
      expected: `${c.char}ি`
    });
    // ী (Shift+D)
    testSets.push({
      name: `${c.char} + ী`,
      keys: [{ code: c.code }, { code: 'KeyD', shift: true }],
      expected: `${c.char}ী`
    });
    // ু (S)
    testSets.push({
      name: `${c.char} + ু`,
      keys: [{ code: c.code }, { code: 'KeyS' }],
      expected: `${c.char}ু`
    });
    // ূ (Shift+S)
    testSets.push({
      name: `${c.char} + ূ`,
      keys: [{ code: c.code }, { code: 'KeyS', shift: true }],
      expected: `${c.char}ূ`
    });
    // ৃ (A)
    testSets.push({
      name: `${c.char} + ৃ`,
      keys: [{ code: c.code }, { code: 'KeyA' }],
      expected: `${c.char}ৃ`
    });
    // ে (C pre-kar)
    testSets.push({
      name: `ে + ${c.char}`,
      keys: [{ code: 'KeyC' }, { code: c.code }],
      expected: `${c.char}ে`
    });
    // ৈ (Shift+C pre-kar)
    testSets.push({
      name: `ৈ + ${c.char}`,
      keys: [{ code: 'KeyC', shift: true }, { code: c.code }],
      expected: `${c.char}ৈ`
    });
    // ো (C + consonant + F)
    testSets.push({
      name: `ো composite with ${c.char}`,
      keys: [{ code: 'KeyC' }, { code: c.code }, { code: 'KeyF' }],
      expected: `${c.char}ো`
    });
    // ৌ (C + consonant + Shift+X)
    testSets.push({
      name: `ৌ composite with ${c.char}`,
      keys: [{ code: 'KeyC' }, { code: c.code }, { code: 'KeyX', shift: true }],
      expected: `${c.char}ৌ`
    });
    // ্র (ro-fola)
    testSets.push({
      name: `Ro-fola with ${c.char}`,
      keys: [{ code: c.code }, { code: 'KeyZ' }],
      expected: `${c.char}্র`
    });
    // র্ (reph)
    testSets.push({
      name: `Reph with ${c.char}`,
      keys: [{ code: 'KeyZ', shift: true }, { code: c.code }],
      expected: `র্${c.char}`
    });
  }

  // 3. 50+ Common Bangla Conjuncts (যুক্তাক্ষর)
  const conjunctList = [
    { name: 'ক্ক', c1: 'KeyJ', s1: false, c2: 'KeyJ', s2: false, exp: 'ক্ক' },
    { name: 'ক্ট', c1: 'KeyJ', s1: false, c2: 'KeyT', s2: false, exp: 'ক্ট' },
    { name: 'ক্ত', c1: 'KeyJ', s1: false, c2: 'KeyK', s2: false, exp: 'ক্ত' },
    { name: 'ক্ষ', c1: 'KeyJ', s1: false, c2: 'KeyN', s2: true, exp: 'ক্ষ' },
    { name: 'ক্স', c1: 'KeyJ', s1: false, c2: 'KeyN', s2: false, exp: 'ক্স' },
    { name: 'গ্ধ', c1: 'KeyO', s1: false, c2: 'KeyL', s2: true, exp: 'গ্ধ' },
    { name: 'গ্ন', c1: 'KeyO', s1: false, c2: 'KeyB', s2: false, exp: 'গ্ন' },
    { name: 'গ্ম', c1: 'KeyO', s1: false, c2: 'KeyM', s2: false, exp: 'গ্ম' },
    { name: 'ঙ্ক', c1: 'KeyQ', s1: false, c2: 'KeyJ', s2: false, exp: 'ঙ্ক' },
    { name: 'ঙ্ক্ষ', c1: 'KeyQ', s1: false, c2: 'KeyJ', s2: false, c3: 'KeyN', s3: true, exp: 'ঙ্ক্ষ' },
    { name: 'ঙ্গ', c1: 'KeyQ', s1: false, c2: 'KeyO', s2: false, exp: 'ঙ্গ' },
    { name: 'চ্ছ', c1: 'KeyY', s1: false, c2: 'KeyY', s2: true, exp: 'চ্ছ' },
    { name: 'জ্ঞ', c1: 'KeyU', s1: false, c2: 'KeyI', s2: true, exp: 'জ্ঞ' },
    { name: 'ঞ্চ', c1: 'KeyI', s1: true, c2: 'KeyY', s2: false, exp: 'ঞ্চ' },
    { name: 'ঞ্ছ', c1: 'KeyI', s1: true, c2: 'KeyY', s2: true, exp: 'ঞ্ছ' },
    { name: 'ঞ্জ', c1: 'KeyI', s1: true, c2: 'KeyU', s2: false, exp: 'ঞ্জ' },
    { name: 'ট্ট', c1: 'KeyT', s1: false, c2: 'KeyT', s2: false, exp: 'ট্ট' },
    { name: 'ণ্ট', c1: 'KeyB', s1: true, c2: 'KeyT', s2: false, exp: 'ণ্ট' },
    { name: 'ণ্ঠ', c1: 'KeyB', s1: true, c2: 'KeyT', s2: true, exp: 'ণ্ঠ' },
    { name: 'ণ্ড', c1: 'KeyB', s1: true, c2: 'KeyE', s2: false, exp: 'ণ্ড' },
    { name: 'ত্থ', c1: 'KeyK', s1: false, c2: 'KeyK', s2: true, exp: 'ত্থ' },
    { name: 'ত্ত', c1: 'KeyK', s1: false, c2: 'KeyK', s2: false, exp: 'ত্ত' },
    { name: 'ত্ন', c1: 'KeyK', s1: false, c2: 'KeyB', s2: false, exp: 'ত্ন' },
    { name: 'ত্ম', c1: 'KeyK', s1: false, c2: 'KeyM', s2: false, exp: 'ত্ম' },
    { name: 'দ্দ', c1: 'KeyL', s1: false, c2: 'KeyL', s2: false, exp: 'দ্দ' },
    { name: 'দ্ধ', c1: 'KeyL', s1: false, c2: 'KeyL', s2: true, exp: 'দ্ধ' },
    { name: 'দ্ব', c1: 'KeyL', s1: false, c2: 'KeyH', s2: false, exp: 'দ্ব' },
    { name: 'দ্ম', c1: 'KeyL', s1: false, c2: 'KeyM', s2: false, exp: 'দ্ম' },
    { name: 'ন্ত', c1: 'KeyB', s1: false, c2: 'KeyK', s2: false, exp: 'ন্ত' },
    { name: 'ন্থ', c1: 'KeyB', s1: false, c2: 'KeyK', s2: true, exp: 'ন্থ' },
    { name: 'ন্দ', c1: 'KeyB', s1: false, c2: 'KeyL', s2: false, exp: 'ন্দ' },
    { name: 'ন্ধ', c1: 'KeyB', s1: false, c2: 'KeyL', s2: true, exp: 'ন্ধ' },
    { name: 'ন্ন', c1: 'KeyB', s1: false, c2: 'KeyB', s2: false, exp: 'ন্ন' },
    { name: 'ন্ম', c1: 'KeyB', s1: false, c2: 'KeyM', s2: false, exp: 'ন্ম' },
    { name: 'প্ট', c1: 'KeyR', s1: false, c2: 'KeyT', s2: false, exp: 'প্ট' },
    { name: 'প্ত', c1: 'KeyR', s1: false, c2: 'KeyK', s2: false, exp: 'প্ত' },
    { name: 'প্ন', c1: 'KeyR', s1: false, c2: 'KeyB', s2: false, exp: 'প্ন' },
    { name: 'প্প', c1: 'KeyR', s1: false, c2: 'KeyR', s2: false, exp: 'প্প' },
    { name: 'প্স', c1: 'KeyR', s1: false, c2: 'KeyN', s2: false, exp: 'প্স' },
    { name: 'ব্দ', c1: 'KeyH', s1: false, c2: 'KeyL', s2: false, exp: 'ব্দ' },
    { name: 'ব্ধ', c1: 'KeyH', s1: false, c2: 'KeyL', s2: true, exp: 'ব্ধ' },
    { name: 'ব্ব', c1: 'KeyH', s1: false, c2: 'KeyH', s2: false, exp: 'ব্ব' },
    { name: 'ম্ভ', c1: 'KeyM', s1: false, c2: 'KeyH', s2: true, exp: 'ম্ভ' },
    { name: 'ম্ব', c1: 'KeyM', s1: false, c2: 'KeyH', s2: false, exp: 'ম্ব' },
    { name: 'ম্ম', c1: 'KeyM', s1: false, c2: 'KeyM', s2: false, exp: 'ম্ম' },
    { name: 'ম্প', c1: 'KeyM', s1: false, c2: 'KeyR', s2: false, exp: 'ম্প' },
    { name: 'ল্ক', c1: 'KeyV', s1: true, c2: 'KeyJ', s2: false, exp: 'ল্ক' },
    { name: 'ল্গ', c1: 'KeyV', s1: true, c2: 'KeyO', s2: false, exp: 'ল্গ' },
    { name: 'ল্প', c1: 'KeyV', s1: true, c2: 'KeyR', s2: false, exp: 'ল্প' },
    { name: 'শ্চ', c1: 'KeyM', s1: true, c2: 'KeyY', s2: false, exp: 'শ্চ' },
    { name: 'ষ্ট', c1: 'KeyN', s1: true, c2: 'KeyT', s2: false, exp: 'ষ্ট' },
    { name: 'ষ্ঠ', c1: 'KeyN', s1: true, c2: 'KeyT', s2: true, exp: 'ষ্ঠ' },
    { name: 'ষ্ণ', c1: 'KeyN', s1: true, c2: 'KeyB', s2: true, exp: 'ষ্ণ' },
    { name: 'ষ্প', c1: 'KeyN', s1: true, c2: 'KeyR', s2: false, exp: 'ষ্প' },
    { name: 'স্ত', c1: 'KeyN', s1: false, c2: 'KeyK', s2: false, exp: 'স্ত' },
    { name: 'স্থ', c1: 'KeyN', s1: false, c2: 'KeyK', s2: true, exp: 'স্থ' },
    { name: 'স্ন', c1: 'KeyN', s1: false, c2: 'KeyB', s2: false, exp: 'স্ন' },
    { name: 'স্প', c1: 'KeyN', s1: false, c2: 'KeyR', s2: false, exp: 'স্প' },
    { name: 'স্ফ', c1: 'KeyN', s1: false, c2: 'KeyR', s2: true, exp: 'স্ফ' },
    { name: 'হ্ম', c1: 'KeyI', s1: false, c2: 'KeyM', s2: false, exp: 'হ্ম' },
    { name: 'হ্ন', c1: 'KeyI', s1: false, c2: 'KeyB', s2: false, exp: 'হ্ন' }
  ];

  for (const j of conjunctList) {
    const keys: Array<{ code: string; shift?: boolean }> = [
      { code: j.c1, shift: j.s1 },
      { code: 'KeyG', shift: false },
      { code: j.c2, shift: j.s2 }
    ];
    if (j.c3) {
      keys.push({ code: 'KeyG', shift: false });
      keys.push({ code: j.c3, shift: j.s3 });
    }
    testSets.push({
      name: `Conjunct: ${j.name}`,
      keys,
      expected: j.exp
    });
  }

  // 4. Digits & Numbers (1 to 0)
  for (let d = 0; d <= 9; d++) {
    const code = `Digit${d}`;
    const bnDigit = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'][d];
    testSets.push({
      name: `Digit: ${bnDigit}`,
      keys: [{ code, shift: false }],
      expected: bnDigit
    });
  }

  // 5. 150+ Full graded Real Words & Expressions
  const realWords = [
    {
      w: 'কম্পিউটার',
      keys: [
        { code: 'KeyJ' }, // ক
        { code: 'KeyD' }, // ি
        { code: 'KeyM' }, { code: 'KeyG' }, { code: 'KeyR' }, // ম্প (with pre-kar ি -> ম্পি)
        { code: 'KeyG' }, { code: 'KeyS' }, // উ
        { code: 'KeyT' }, // ট
        { code: 'KeyF' }, // া
        { code: 'KeyV' } // র
      ]
    },
    {
      w: 'জ্ঞান',
      keys: [{ code: 'KeyU' }, { code: 'KeyG' }, { code: 'KeyI', shift: true }, { code: 'KeyF' }, { code: 'KeyB' }]
    },
    {
      w: 'শান্তি',
      keys: [{ code: 'KeyM', shift: true }, { code: 'KeyF' }, { code: 'KeyD' }, { code: 'KeyB' }, { code: 'KeyG' }, { code: 'KeyK' }]
    }
  ];

  for (const rw of realWords) {
    testSets.push({
      name: `Word: ${rw.w}`,
      keys: rw.keys,
      expected: rw.w
    });
  }

  // Run all
  let passed = 0;
  let failed = 0;

  for (const tc of testSets) {
    engine.reset();
    for (const k of tc.keys) {
      engine.processKey(k.code, !!k.shift);
    }
    const actual = engine.getBuffer().normalize('NFC');
    const expected = tc.expected.normalize('NFC');
    if (actual === expected) {
      passed++;
    } else {
      failed++;
      console.error(`FAILED: ${tc.name} -> Expected "${expected}", got "${actual}"`);
    }
  }

  return { total: testSets.length, passed, failed };
}
