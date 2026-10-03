import { BijoyEngine } from './bijoy-engine';

export function runEngineTests(): { passed: number; failed: number; results: Array<{ name: string; success: boolean; expected: string; actual: string }> } {
  const engine = new BijoyEngine();
  const testCases: Array<{ name: string; keys: Array<{ code: string; shift?: boolean }>; expected: string }> = [
    {
      name: 'Single consonant Ka (ক)',
      keys: [{ code: 'KeyJ' }],
      expected: 'ক'
    },
    {
      name: 'Shifted consonant Kha (খ)',
      keys: [{ code: 'KeyJ', shift: true }],
      expected: 'খ'
    },
    {
      name: 'Direct vowel Shor-O (অ)',
      keys: [{ code: 'KeyF', shift: true }],
      expected: 'অ'
    },
    {
      name: 'Constructed vowel Shor-Aa (আ)',
      keys: [{ code: 'KeyG' }, { code: 'KeyF' }],
      expected: 'আ'
    },
    {
      name: 'Constructed vowel Shor-I (ই)',
      keys: [{ code: 'KeyG' }, { code: 'KeyD' }],
      expected: 'ই'
    },
    {
      name: 'Constructed vowel Shor-Ee (ঈ)',
      keys: [{ code: 'KeyG' }, { code: 'KeyD', shift: true }],
      expected: 'ঈ'
    },
    {
      name: 'Constructed vowel Shor-U (উ)',
      keys: [{ code: 'KeyG' }, { code: 'KeyS' }],
      expected: 'উ'
    },
    {
      name: 'Constructed vowel Shor-Uu (ঊ)',
      keys: [{ code: 'KeyG' }, { code: 'KeyS', shift: true }],
      expected: 'ঊ'
    },
    {
      name: 'Constructed vowel Shor-E (এ)',
      keys: [{ code: 'KeyG' }, { code: 'KeyC' }],
      expected: 'এ'
    },
    {
      name: 'Constructed vowel Shor-Oi (ঐ)',
      keys: [{ code: 'KeyG' }, { code: 'KeyC', shift: true }],
      expected: 'ঐ'
    },
    {
      name: 'Direct vowel Shor-O (ও)',
      keys: [{ code: 'KeyX' }],
      expected: 'ও'
    },
    {
      name: 'Constructed vowel Shor-Ou (ঔ)',
      keys: [{ code: 'KeyG' }, { code: 'KeyX', shift: true }],
      expected: 'ঔ'
    },
    {
      name: 'Post-kar: Ka + Aa-kar (কা)',
      keys: [{ code: 'KeyJ' }, { code: 'KeyF' }],
      expected: 'কা'
    },
    {
      name: 'Pre-kar: I-kar + Ka (কি)',
      keys: [{ code: 'KeyD' }, { code: 'KeyJ' }],
      expected: 'কি'
    },
    {
      name: 'Pre-kar: E-kar + Ka (কে)',
      keys: [{ code: 'KeyC' }, { code: 'KeyJ' }],
      expected: 'কে'
    },
    {
      name: 'Pre-kar: Oi-kar + Ka (কৈ)',
      keys: [{ code: 'KeyC', shift: true }, { code: 'KeyJ' }],
      expected: 'কৈ'
    },
    {
      name: 'Composite O-kar: E-kar + Ka + Aa-kar (কো)',
      keys: [{ code: 'KeyC' }, { code: 'KeyJ' }, { code: 'KeyF' }],
      expected: 'কো'
    },
    {
      name: 'Composite Ou-kar: E-kar + Ka + Ou-marker (কৌ)',
      keys: [{ code: 'KeyC' }, { code: 'KeyJ' }, { code: 'KeyX', shift: true }],
      expected: 'কৌ'
    },
    {
      name: 'Conjunct Kkho (ক্ষ = ক + ্ + ষ)',
      keys: [{ code: 'KeyJ' }, { code: 'KeyG' }, { code: 'KeyN', shift: true }],
      expected: 'ক্ষ'
    },
    {
      name: 'Conjunct Ggo (জ্ঞ = জ + ্ + ঞ)',
      keys: [{ code: 'KeyU' }, { code: 'KeyG' }, { code: 'KeyI', shift: true }],
      expected: 'জ্ঞ'
    },
    {
      name: 'Conjunct Nto (ন্ত = ন + ্ + ত)',
      keys: [{ code: 'KeyB' }, { code: 'KeyG' }, { code: 'KeyK' }],
      expected: 'ন্ত'
    },
    {
      name: 'Ro-fola: Kro (ক্র = ক + ্র)',
      keys: [{ code: 'KeyJ' }, { code: 'KeyZ' }],
      expected: 'ক্র'
    },
    {
      name: 'Reph: Rko (র্ক = র্ + ক)',
      keys: [{ code: 'KeyZ', shift: true }, { code: 'KeyJ' }],
      expected: 'র্ক'
    },
    {
      name: 'Reph with Pre-kar: Rki (র্কি = র্ + ি + ক)',
      keys: [{ code: 'KeyZ', shift: true }, { code: 'KeyD' }, { code: 'KeyJ' }],
      expected: 'র্কি'
    },
    {
      name: 'Full Word: বাংলাদেশ (Bangladesh)',
      keys: [
        { code: 'KeyH' }, // ব
        { code: 'KeyF' }, // া
        { code: 'KeyQ', shift: true }, // ং
        { code: 'KeyV', shift: true }, // ল
        { code: 'KeyF' }, // া
        { code: 'KeyC' }, // ে
        { code: 'KeyL' }, // দ
        { code: 'KeyM', shift: true } // শ
      ],
      expected: 'বাংলাদেশ'
    },
    {
      name: 'Full Word: বৃষ্টি (Rain)',
      keys: [
        { code: 'KeyH' }, // ব
        { code: 'KeyA' }, // ৃ
        { code: 'KeyD' }, // ি
        { code: 'KeyN', shift: true }, // ষ
        { code: 'KeyG' }, // ্
        { code: 'KeyT' } // ট
      ],
      expected: 'বৃষ্টি'
    },
    {
      name: 'Swaroborno Word: আইন (Law)',
      keys: [
        { code: 'KeyG' }, { code: 'KeyF' }, // আ
        { code: 'KeyG' }, { code: 'KeyD' }, // ই
        { code: 'KeyB' } // ন
      ],
      expected: 'আইন'
    },
    {
      name: 'Swaroborno Word: অমর (Immortal)',
      keys: [
        { code: 'KeyF', shift: true }, // অ
        { code: 'KeyM' }, // ম
        { code: 'KeyV' } // র
      ],
      expected: 'অমর'
    },
    {
      name: 'Swaroborno Word: ইতিহাস (History)',
      keys: [
        { code: 'KeyG' }, { code: 'KeyD' }, // ই
        { code: 'KeyD' }, { code: 'KeyK' }, // তি
        { code: 'KeyI' }, { code: 'KeyF' }, // হা
        { code: 'KeyN' } // স
      ],
      expected: 'ইতিহাস'
    },
    {
      name: 'Swaroborno Word: ঋতু (Season)',
      keys: [
        { code: 'KeyA', shift: true }, // ঋ
        { code: 'KeyK' }, { code: 'KeyS' } // তু
      ],
      expected: 'ঋতু'
    },
    {
      name: 'Swaroborno Word: একতা (Unity)',
      keys: [
        { code: 'KeyG' }, { code: 'KeyC' }, // এ
        { code: 'KeyJ' }, // ক
        { code: 'KeyK' }, { code: 'KeyF' } // তা
      ],
      expected: 'একতা'
    },
    {
      name: 'Swaroborno Word: ঐক্য (Solidarity)',
      keys: [
        { code: 'KeyG' }, { code: 'KeyC', shift: true }, // ঐ
        { code: 'KeyJ' }, { code: 'KeyG' }, { code: 'KeyW' } // ক্য
      ],
      expected: 'ঐক্য'
    },
    {
      name: 'Swaroborno Word: ঔষধ (Medicine)',
      keys: [
        { code: 'KeyG' }, { code: 'KeyX', shift: true }, // ঔ
        { code: 'KeyN', shift: true }, // ষ
        { code: 'KeyL', shift: true } // ধ
      ],
      expected: 'ঔষধ'
    },
    {
      name: 'Full Syllable Set: কা কি কু কৃ কে কৈ কো কৌ',
      keys: [
        { code: 'KeyJ' }, { code: 'KeyF' }, { code: 'Space' }, // কা
        { code: 'KeyD' }, { code: 'KeyJ' }, { code: 'Space' }, // কি
        { code: 'KeyJ' }, { code: 'KeyS' }, { code: 'Space' }, // কু
        { code: 'KeyJ' }, { code: 'KeyA' }, { code: 'Space' }, // কৃ
        { code: 'KeyC' }, { code: 'KeyJ' }, { code: 'Space' }, // কে
        { code: 'KeyC', shift: true }, { code: 'KeyJ' }, { code: 'Space' }, // কৈ
        { code: 'KeyC' }, { code: 'KeyJ' }, { code: 'KeyF' }, { code: 'Space' }, // কো
        { code: 'KeyC' }, { code: 'KeyJ' }, { code: 'KeyX', shift: true } // কৌ
      ],
      expected: 'কা কি কু কৃ কে কৈ কো কৌ'
    }
  ];

  let passed = 0;
  let failed = 0;
  const results: Array<{ name: string; success: boolean; expected: string; actual: string }> = [];

  for (const tc of testCases) {
    engine.reset();
    for (const k of tc.keys) {
      engine.processKey(k.code, !!k.shift);
    }
    const actual = engine.getBuffer().normalize('NFC');
    const expected = tc.expected.normalize('NFC');
    const success = actual === expected;
    if (success) {
      passed++;
    } else {
      failed++;
    }
    results.push({
      name: tc.name,
      success,
      expected,
      actual
    });
  }

  return { passed, failed, results };
}
