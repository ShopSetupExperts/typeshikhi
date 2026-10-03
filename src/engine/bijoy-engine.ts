import { BIJOY_KEYMAP } from './bijoy-layout';

export interface KeyStep {
  code: string;
  shift: boolean;
  char: string;
  label: string;
  description?: string;
}

export interface GraphemeMatch {
  char: string;
  typed: string;
  status: 'pending' | 'correct' | 'incorrect' | 'current';
  expectedKeys: KeyStep[];
}

export interface TypingMetrics {
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  elapsedSeconds: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  errorKeystrokes: number;
  backspaceCount: number;
  weakKeys: Record<string, { attempts: number; errors: number }>;
}

export class BijoyEngine {
  private buffer: string = '';
  private pendingKar: string | null = null; // 'ি', 'ে', 'ৈ'
  private pendingReph: boolean = false; // 'র্'
  private pendingLinker: boolean = false; // '্' (for swaroborno at start)
  private hasantActive: boolean = false; // active conjunct joiner
  private keyHistory: Array<{ code: string; shift: boolean; output: string }> = [];

  constructor() {
    this.reset();
  }

  public isHasantActive(): boolean {
    return this.hasantActive;
  }


  public reset(): void {
    this.buffer = '';
    this.pendingKar = null;
    this.pendingReph = false;
    this.pendingLinker = false;
    this.hasantActive = false;
    this.keyHistory = [];
  }

  public getBuffer(): string {
    return this.buffer;
  }

  public setBuffer(text: string): void {
    this.buffer = text;
  }

  public getPendingState(): { kar: string | null; reph: boolean; linker: boolean } {
    return {
      kar: this.pendingKar,
      reph: this.pendingReph,
      linker: this.pendingLinker
    };
  }

  /**
   * Processes a physical key press and updates internal buffer.
   * Returns the updated full text and the newly produced characters if any.
   */
  public processKey(code: string, shift: boolean): { fullText: string; emitted: string; action: string } {
    const keyDef = BIJOY_KEYMAP[code];
    if (!keyDef) {
      if (code === 'Backspace') {
        return this.handleBackspace();
      }
      if (code === 'Space') {
        return this.handleSpace();
      }
      return { fullText: this.buffer, emitted: '', action: 'ignored' };
    }

    const rawChar = shift ? keyDef.shift : keyDef.normal;
    this.keyHistory.push({ code, shift, output: rawChar });

    // Handle spacebar
    if (code === 'Space') {
      return this.handleSpace();
    }

    // 1. Swaroborno construction via Linker (G / '্')
    if (this.pendingLinker) {
      this.pendingLinker = false;
      const swaroMap: Record<string, string> = {
        'া': 'আ',
        'ি': 'ই',
        'ী': 'ঈ',
        'ু': 'উ',
        'ূ': 'ঊ',
        'ৃ': 'ঋ',
        'ে': 'এ',
        'ৈ': 'ঐ',
        'ৗ': 'ঔ',
        'ও': 'ও',
        'অ': 'অ'
      };

      if (swaroMap[rawChar]) {
        const vowel = swaroMap[rawChar];
        // If we had detached a pre-kar when G was pressed, restore it before appending the vowel
        if (this.pendingKar) {
          // Remove the trailing '্' that was added when G was pressed
          if (this.buffer.endsWith('্')) {
            this.buffer = this.buffer.slice(0, -1);
          }
          this.buffer += this.pendingKar;
          this.pendingKar = null;
        } else if (this.buffer.endsWith('্')) {
          this.buffer = this.buffer.slice(0, -1);
        }
        this.buffer += vowel;
        return { fullText: this.buffer, emitted: vowel, action: 'swaroborno' };
      }
    }

    // If 'G' (্) is pressed
    if (code === 'KeyG' && !shift) {
      this.pendingLinker = true;
      this.hasantActive = true;

      // Check if buffer ends with a pre-kar attached to a consonant (ি, ে, ৈ)
      const lastChar = this.buffer.slice(-1);
      if (lastChar === 'ি' || lastChar === 'ে' || lastChar === 'ৈ') {
        // Detach pre-kar temporarily
        this.pendingKar = lastChar;
        this.buffer = this.buffer.slice(0, -1) + '্';
        return { fullText: this.buffer, emitted: '্', action: 'conjunct_prekar_hasant' };
      }

      // If buffer is empty or ends with whitespace/punctuation
      if (this.buffer.length === 0 || /[\s।,\.;:!?\-\(\)\[\]]/.test(this.buffer.slice(-1))) {
        return { fullText: this.buffer, emitted: '', action: 'linker_pending' };
      }

      // Standard hasant (্)
      this.buffer += '্';
      return { fullText: this.buffer, emitted: '্', action: 'hasant' };
    }



    // 2. Pre-kar capture: ি (D), ে (C), ৈ (Shift+C)
    if ((code === 'KeyD' && !shift) || (code === 'KeyC' && !shift) || (code === 'KeyC' && shift)) {
      this.pendingKar = rawChar;
      return { fullText: this.buffer, emitted: '', action: 'prekar_pending' };
    }

    // 3. Reph capture: র্ (Shift+KeyZ)
    if (code === 'KeyZ' && shift) {
      this.pendingReph = true;
      return { fullText: this.buffer, emitted: '', action: 'reph_pending' };
    }

    // 4. Ro-fola: ্র (KeyZ normal)
    if (code === 'KeyZ' && !shift) {
      // Append ro-fola (্ + র)
      const roFola = '্র'; // or '্' + 'র'
      this.buffer += '্' + 'র';
      return { fullText: this.buffer, emitted: roFola, action: 'rofola' };
    }

    // 5. Composite vowel check: if buffer ends with consonant + ে and user presses া (F) -> ো
    if (code === 'KeyF' && !shift) {
      if (this.buffer.endsWith('ে')) {
        // Replace previous ে with ো
        this.buffer = this.buffer.slice(0, -1) + 'ো';
        return { fullText: this.buffer, emitted: 'ো', action: 'composite_o' };
      }
    }

    // 6. Composite vowel check: if buffer ends with consonant + ে and user presses ৗ (Shift+X) -> ৌ
    if (code === 'KeyX' && shift) {
      if (this.buffer.endsWith('ে')) {
        this.buffer = this.buffer.slice(0, -1) + 'ৌ';
        return { fullText: this.buffer, emitted: 'ৌ', action: 'composite_ou' };
      }
    }

    // 7. Standard Consonant / Vowel / Symbol handling
    let toEmit = rawChar;

    // Apply pending Reph if any
    if (this.pendingReph) {
      toEmit = 'র' + '্' + toEmit;
      this.pendingReph = false;
    }

    // Apply pending Pre-Kar if any
    if (this.pendingKar) {
      toEmit = toEmit + this.pendingKar;
      this.pendingKar = null;
    }

    this.hasantActive = false;
    this.buffer += toEmit;
    this.buffer = this.buffer.normalize('NFC');

    return { fullText: this.buffer, emitted: toEmit, action: 'char' };
  }

  public handleBackspace(): { fullText: string; emitted: string; action: string } {
    if (this.pendingKar) {
      this.pendingKar = null;
      return { fullText: this.buffer, emitted: '', action: 'cancel_prekar' };
    }
    if (this.pendingReph) {
      this.pendingReph = false;
      return { fullText: this.buffer, emitted: '', action: 'cancel_reph' };
    }
    if (this.pendingLinker) {
      this.pendingLinker = false;
      return { fullText: this.buffer, emitted: '', action: 'cancel_linker' };
    }

    if (this.buffer.length > 0) {
      const graphemes = BijoyEngine.splitGraphemes(this.buffer);
      if (graphemes.length > 0) {
        graphemes.pop();
        this.buffer = graphemes.join('');
      }
    }
    return { fullText: this.buffer, emitted: '', action: 'backspace' };
  }

  public handleSpace(): { fullText: string; emitted: string; action: string } {
    // flush any pending state
    if (this.pendingKar) {
      this.buffer += this.pendingKar;
      this.pendingKar = null;
    }
    this.pendingReph = false;
    this.pendingLinker = false;
    this.hasantActive = false;
    this.buffer += ' ';
    return { fullText: this.buffer, emitted: ' ', action: 'space' };
  }

  /**
   * Splits Bangla text into grapheme clusters using Intl.Segmenter with fallback.
   */
  public static splitGraphemes(text: string): string[] {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const SegmenterClass = (Intl as unknown as { Segmenter: new (loc: string, opt: { granularity: string }) => { segment: (t: string) => Iterable<{ segment: string }> } }).Segmenter;
      const segmenter = new SegmenterClass('bn', { granularity: 'grapheme' });
      const segments = Array.from(segmenter.segment(text), (s: { segment: string }) => s.segment);
      return segments;
    }

    // Comprehensive fallback for Bangla regex-based grapheme clustering
    const regex = /[\u0980-\u09FF][\u09BC]?([\u09CD][\u0980-\u09FF][\u09BC]?)*[\u09BE-\u09CC\u09D7]?[\u0981-\u0983]?|[^\u0980-\u09FF]/g;
    const matches = text.match(regex);
    return matches || Array.from(text);
  }

  /**
   * Solves the exact physical Bijoy keystroke steps needed to type a given Bangla grapheme cluster.
   */
  public static solveKeystrokesForGrapheme(grapheme: string): KeyStep[] {
    const steps: KeyStep[] = [];

    // Common full Swaroborno mappings
    const swaroSolves: Record<string, KeyStep[]> = {
      'অ': [{ code: 'KeyF', shift: true, char: 'অ', label: 'Shift + F', description: 'অ' }],
      'আ': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyF', shift: false, char: 'া', label: 'F', description: 'া-কার' }
      ],
      'ই': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyD', shift: false, char: 'ি', label: 'D', description: 'ি-কার' }
      ],
      'ঈ': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyD', shift: true, char: 'ী', label: 'Shift + D', description: 'ী-কার' }
      ],
      'উ': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyS', shift: false, char: 'ু', label: 'S', description: 'ু-কার' }
      ],
      'ঊ': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyS', shift: true, char: 'ূ', label: 'Shift + S', description: 'ূ-কার' }
      ],
      'ঋ': [{ code: 'KeyA', shift: true, char: 'ঋ', label: 'Shift + A', description: 'ঋ' }],
      'এ': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyC', shift: false, char: 'ে', label: 'C', description: 'ে-কার' }
      ],
      'ঐ': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyC', shift: true, char: 'ৈ', label: 'Shift + C', description: 'ৈ-কার' }
      ],
      'ও': [{ code: 'KeyX', shift: false, char: 'ও', label: 'X', description: 'ও' }],
      'ঔ': [
        { code: 'KeyG', shift: false, char: '্', label: 'G', description: 'লিংকার' },
        { code: 'KeyX', shift: true, char: 'ৗ', label: 'Shift + X', description: 'ৗ-কার' }
      ]
    };

    if (swaroSolves[grapheme]) {
      return swaroSolves[grapheme];
    }

    // Special standalone kar/signs
    const standaloneMap: Record<string, KeyStep> = {
      'া': { code: 'KeyF', shift: false, char: 'া', label: 'F' },
      'ি': { code: 'KeyD', shift: false, char: 'ি', label: 'D' },
      'ী': { code: 'KeyD', shift: true, char: 'ী', label: 'Shift + D' },
      'ু': { code: 'KeyS', shift: false, char: 'ু', label: 'S' },
      'ূ': { code: 'KeyS', shift: true, char: 'ূ', label: 'Shift + S' },
      'ৃ': { code: 'KeyA', shift: false, char: 'ৃ', label: 'A' },
      'ে': { code: 'KeyC', shift: false, char: 'ে', label: 'C' },
      'ৈ': { code: 'KeyC', shift: true, char: 'ৈ', label: 'Shift + C' },
      'ো': { code: 'KeyX', shift: false, char: 'ো', label: 'X' },
      'ৌ': { code: 'KeyX', shift: true, char: 'ৗ', label: 'Shift + X' },
      '্': { code: 'KeyG', shift: false, char: '্', label: 'G' },
      '।': { code: 'KeyG', shift: true, char: '।', label: 'Shift + G' },
      'ং': { code: 'KeyQ', shift: true, char: 'ং', label: 'Shift + Q' },
      'ঃ': { code: 'Quote', shift: false, char: 'ঃ', label: '\'' },
      'ঁ': { code: 'Digit7', shift: true, char: 'ঁ', label: 'Shift + 7' },
      ' ': { code: 'Space', shift: false, char: ' ', label: 'Space' }
    };

    if (standaloneMap[grapheme]) {
      return [standaloneMap[grapheme]];
    }

    // Parse complex grapheme cluster into parts: [Reph?] + [Pre-kar?] + BaseConsonants + [Virama + Consonant]* + [Post-kar?] + [Modifier?]
    const hasReph = grapheme.startsWith('র্') || (grapheme.startsWith('র') && grapheme.length > 1 && grapheme[1] === '্');
    let working = hasReph ? grapheme.slice(2) : grapheme;

    // Check for pre-kar in cluster: ি (U+09BF), ে (U+09C7), ৈ (U+09C8)
    const hasIkar = working.includes('ি');
    const hasEkar = working.includes('ে');
    const hasOikar = working.includes('ৈ');
    const hasOkar = working.includes('ো');
    const hasOukar = working.includes('ৌ');

    // 1. If Reph exists, Bijoy types Reph first (Shift + Z)
    if (hasReph) {
      steps.push({ code: 'KeyZ', shift: true, char: 'র্', label: 'Shift + Z', description: 'রেফ' });
    }

    // 2. If Pre-kar exists (or composite O/OU that starts with E-kar), Bijoy types the Pre-kar first!
    if (hasIkar) {
      steps.push({ code: 'KeyD', shift: false, char: 'ি', label: 'D', description: 'ি-কার' });
    } else if (hasEkar || hasOkar || hasOukar) {
      steps.push({ code: 'KeyC', shift: false, char: 'ে', label: 'C', description: 'ে-কার' });
    } else if (hasOikar) {
      steps.push({ code: 'KeyC', shift: true, char: 'ৈ', label: 'Shift + C', description: 'ৈ-কার' });
    }

    // Remove pre-kar and composite markers from working to find the consonants
    working = working.replace(/[িেৈোৌ]/g, '');

    // Extract other kars (post-kars): া, ী, ু, ূ, ৃ
    let postKar: string | null = null;
    if (working.includes('া')) { postKar = 'া'; working = working.replace('া', ''); }
    else if (working.includes('ী')) { postKar = 'ী'; working = working.replace('ী', ''); }
    else if (working.includes('ু')) { postKar = 'ু'; working = working.replace('ু', ''); }
    else if (working.includes('ূ')) { postKar = 'ূ'; working = working.replace('ূ', ''); }
    else if (working.includes('ৃ')) { postKar = 'ৃ'; working = working.replace('ৃ', ''); }

    // Extract modifiers: ঁ, ং, ঃ
    let modifier: string | null = null;
    if (working.includes('ঁ')) { modifier = 'ঁ'; working = working.replace('ঁ', ''); }
    if (working.includes('ং')) { modifier = 'ং'; working = working.replace('ং', ''); }
    if (working.includes('ঃ')) { modifier = 'ঃ'; working = working.replace('ঃ', ''); }

    // 3. Process remaining consonant sequence (including conjuncts like ক্ষ, জ্ঞ, etc.)
    const codeUnits = Array.from(working);
    let i = 0;
    while (i < codeUnits.length) {
      const char = codeUnits[i];
      if (char === '্') {
        // Hasant joiner
        steps.push({ code: 'KeyG', shift: false, char: '্', label: 'G', description: 'হসন্ত' });
        i++;
        continue;
      }

      // Check if this is a Ro-fola: if prev was '্' and this is 'র', user could also press 'Z'
      const keyStep = BijoyEngine.findKeyForChar(char);
      if (keyStep) {
        steps.push(keyStep);
      }
      i++;
    }

    // 4. If composite O-kar, type া (F) after consonant
    if (hasOkar) {
      steps.push({ code: 'KeyF', shift: false, char: 'া', label: 'F', description: 'া-কার (ও-কার পূর্ণ)' });
    }
    // If composite OU-kar, type ৗ (Shift + X) after consonant
    if (hasOukar) {
      steps.push({ code: 'KeyX', shift: true, char: 'ৗ', label: 'Shift + X', description: 'ৗ-কার (ঔ-কার পূর্ণ)' });
    }

    // 5. Post-kars
    if (postKar) {
      const karStep = BijoyEngine.findKeyForChar(postKar);
      if (karStep) steps.push(karStep);
    }

    // 6. Modifier (ঁ, ং, ঃ)
    if (modifier) {
      const modStep = BijoyEngine.findKeyForChar(modifier);
      if (modStep) steps.push(modStep);
    }

    return steps.length > 0 ? steps : [{ code: 'Space', shift: false, char: grapheme, label: grapheme }];
  }

  public static findKeyForChar(char: string): KeyStep | null {
    for (const [code, key] of Object.entries(BIJOY_KEYMAP)) {
      if (key.normal === char) {
        return { code, shift: false, char, label: key.labelEn };
      }
      if (key.shift === char) {
        return { code, shift: true, char, label: `Shift + ${key.labelEn}` };
      }
    }
    return null;
  }

  /**
   * Calculates real-time typing metrics.
   */
  public static calculateMetrics(
    targetText: string,
    typedText: string,
    elapsedSeconds: number,
    totalKeystrokes: number,
    backspaceCount: number,
    weakKeys: Record<string, { attempts: number; errors: number }>
  ): TypingMetrics {
    const minutes = Math.max(elapsedSeconds / 60, 0.01);
    const grossWpm = Math.round((totalKeystrokes / 5) / minutes);

    // Calculate accuracy using grapheme clusters
    const targetGraphemes = BijoyEngine.splitGraphemes(targetText);
    const typedGraphemes = BijoyEngine.splitGraphemes(typedText);

    let correctGraphemes = 0;
    let errorGraphemes = 0;

    for (let i = 0; i < typedGraphemes.length; i++) {
      if (i < targetGraphemes.length && typedGraphemes[i] === targetGraphemes[i]) {
        correctGraphemes++;
      } else {
        errorGraphemes++;
      }
    }

    const accuracy = typedGraphemes.length === 0
      ? 100
      : Math.max(0, Math.min(100, Math.round((correctGraphemes / typedGraphemes.length) * 100)));

    // Net Bangla Word WPM (space-separated correct words)
    const targetWords = targetText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);
    let correctWords = 0;
    for (let i = 0; i < typedWords.length; i++) {
      if (i < targetWords.length && typedWords[i] === targetWords[i]) {
        correctWords++;
      }
    }
    const netWpm = Math.round(correctWords / minutes);

    return {
      grossWpm,
      netWpm,
      accuracy,
      elapsedSeconds,
      totalKeystrokes,
      correctKeystrokes: correctGraphemes * 2, // normalized
      errorKeystrokes: errorGraphemes,
      backspaceCount,
      weakKeys
    };
  }
}
