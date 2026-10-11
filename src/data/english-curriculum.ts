import { BIJOY_KEYMAP } from '../engine/bijoy-layout';
import type { KeyStep } from '../engine/bijoy-engine';

export interface EnglishDrill {
  id: string;
  category: 'home-row' | 'top-row' | 'bottom-row' | 'pangram' | 'common-words' | 'advanced-words' | 'symbols';
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  targetText: string;
  targetWpm: number;
}

export interface EnglishPassage {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'tech' | 'business' | 'literature' | 'quotes' | 'exam';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordCount: number;
  text: string;
}

// 1. Curated English Drills for Touch Typing Muscle Memory
export const ENGLISH_DRILLS: EnglishDrill[] = [
  {
    id: 'e-home-1',
    category: 'home-row',
    titleEn: 'Home Row Foundation (ASDF JKL;)',
    titleBn: 'হোম রো বেসিক ড্রিল (ASDF JKL;)',
    descEn: 'Keep index fingers on F and J bumps. Practice natural home row resting position.',
    descBn: 'তর্জনী দুইটি F ও J কীতে রাখুন। হোম রো দিয়ে টাইপিংয়ের মূল ভিত্তি তৈরি করুন।',
    targetText: 'asdf jkl; asdf jkl; a s d f j k l ; f d s a j k l ; asdf jkl; asdf jkl;',
    targetWpm: 20
  },
  {
    id: 'e-home-2',
    category: 'home-row',
    titleEn: 'Home Row Words & Fluency',
    titleBn: 'হোম রো শব্দ অনুশীলন',
    descEn: 'Form real English words using only the home row keys.',
    descBn: 'শুধুমাত্র হোম রো কী ব্যবহার করে সাধারণ ইংরেজি শব্দ টাইপ করুন।',
    targetText: 'sad ask fall glad flash half salad flask dash lads fall ask salad dad all',
    targetWpm: 25
  },
  {
    id: 'e-top-1',
    category: 'top-row',
    titleEn: 'Top Row Reach (QWERTY UIOP)',
    titleBn: 'টপ রো ড্রিল (QWERTY UIOP)',
    descEn: 'Reach up from home row to top row keys and return immediately.',
    descBn: 'হোম রো থেকে উপরের সারিতে আঙুল প্রসারিত করুন এবং দ্রুত হোম রোতে ফিরে আসুন।',
    targetText: 'qwer uiop qwer uiop quite write tree water power open your people pure wire',
    targetWpm: 25
  },
  {
    id: 'e-top-2',
    category: 'top-row',
    titleEn: 'Top & Home Row Combination',
    titleBn: 'টপ ও হোম রো সমন্বিত শব্দ',
    descEn: 'Smoothly transition between home row and top row letters.',
    descBn: 'টপ এবং হোম রোর সমন্বয়ে বিভিন্ন সাধারণ ইংরেজি শব্দ অনুশীলন।',
    targetText: 'the they their there were water write report paper route quiet trust future',
    targetWpm: 30
  },
  {
    id: 'e-bottom-1',
    category: 'bottom-row',
    titleEn: 'Bottom Row Reach (ZXCV BNM,.)',
    titleBn: 'বটম রো ড্রিল (ZXCV BNM,.)',
    descEn: 'Reach down accurately with each finger to master bottom row characters.',
    descBn: 'নিচের সারির অক্ষরগুলোতে নির্ভুল স্পর্শ নিশ্চিত করুন।',
    targetText: 'zxcv bnm zxcv bnm box van man come next back zoom move cover calm bank',
    targetWpm: 25
  },
  {
    id: 'e-pangram-1',
    category: 'pangram',
    titleEn: 'Classic Pangram (All 26 Letters)',
    titleBn: 'প্যানগ্রাম ড্রিল (সবগুলো ২৬টি বর্ণ)',
    descEn: 'Sentences containing every single letter of the English alphabet.',
    descBn: 'ইংরেজি বর্ণমালার প্রতিটি বর্ণ সমৃদ্ধ বিখ্যাত বাক্যসমূহ।',
    targetText: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!',
    targetWpm: 35
  },
  {
    id: 'e-common-100',
    category: 'common-words',
    titleEn: 'Top 100 Most Common Words',
    titleBn: 'টপ ১০০ অতিপ্রয়োজনীয় শব্দ',
    descEn: 'These 100 words represent over 50% of all written English. Speed here multiplies overall WPM.',
    descBn: 'এই ১০০টি শব্দ ইংরেজি লেখার ৫০% দখল করে। এগুলো দ্রুত লিখতে পারলে টাইপিং গতি বহুগুণ বাড়ে।',
    targetText: 'the of and a to in is you that it he was for on are as with his they at be this have from or one had by word but not what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been call who now find long down day did get come made may part',
    targetWpm: 40
  },
  {
    id: 'e-advanced-200',
    category: 'advanced-words',
    titleEn: 'Business & Tech Fluency Burst',
    titleBn: 'বিজনেস ও টেক ভোকাবুলারি ড্রিল',
    descEn: 'High-frequency professional English words for programming, emails, and office documents.',
    descBn: 'দাপ্তরিক ও আইটি ক্ষেত্রে ব্যবহৃত গুরুত্বপূর্ণ ইংরেজি শব্দগুলোর দ্রুত টাইপিং অনুশীলন।',
    targetText: 'software system engineer digital network process project account security market global service develop client revenue standard logic memory function browser database performance agile framework server deployment update',
    targetWpm: 45
  },
  {
    id: 'e-symbols-1',
    category: 'symbols',
    titleEn: 'Numbers & Punctuations Mastery',
    titleBn: 'সংখ্যা ও যতিচিহ্ন ড্রিল',
    descEn: 'Master numbers (1-9, 0) and symbols (!, @, #, $, %, &, *, ?, ", :).',
    descBn: 'কীবোর্ডের উপরের সংখ্যা ও বিশেষ চিহ্নগুলোর দক্ষ ব্যবহার।',
    targetText: 'Order #1024 costs $75.50 (20% off)! Call +880 1711-000000; visit https://example.com for 24/7 support & updates.',
    targetWpm: 30
  }
];

// 2. Curated Timed English Speed Passages
export const ENGLISH_SPEED_PASSAGES: EnglishPassage[] = [
  {
    id: 'p-tech-1',
    titleEn: 'Artificial Intelligence & Modern Web',
    titleBn: 'কৃত্রিম বুদ্ধিমত্তা ও আধুনিক ওয়েব',
    category: 'tech',
    difficulty: 'intermediate',
    wordCount: 88,
    text: 'Modern web applications have evolved far beyond simple static pages. Today, responsive design, cloud deployments, and intelligent systems empower millions of users worldwide to learn, collaborate, and build remarkable digital products. Developing fast typing skills enables creators to communicate thoughts at the speed of imagination. When your fingers move effortlessly across the home row and top row, technical barriers disappear and creative flow takes over.'
  },
  {
    id: 'p-business-1',
    titleEn: 'Professional Workplace Communication',
    titleBn: 'কর্মক্ষেত্রে পেশাদার যোগাযোগ',
    category: 'business',
    difficulty: 'intermediate',
    wordCount: 82,
    text: 'Effective written communication is the backbone of modern global commerce. Whether drafting an official proposal, replying to international clients, or documenting software architectures, clarity and speed matter immensely. Typists who reach fifty words per minute with ninety-five percent accuracy save hours every single week. Consistent practice turns deliberate keystrokes into automatic muscle memory, creating confidence in every email and report.'
  },
  {
    id: 'p-quotes-1',
    titleEn: 'Inspiring Thoughts & Determination',
    titleBn: 'অনুপ্রেরণামূলক চিন্তাভাবনা ও সংকল্প',
    category: 'quotes',
    difficulty: 'beginner',
    wordCount: 76,
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts. The secret of getting ahead is getting started. Every expert was once a beginner who refused to quit. Small daily improvements over time lead to stunning results. Focus on accuracy first, maintain good posture, and speed will follow naturally.'
  },
  {
    id: 'p-literature-1',
    titleEn: 'The Wonder of Reading & Knowledge',
    titleBn: 'জ্ঞান ও সাহিত্যের মোহময় জগৎ',
    category: 'literature',
    difficulty: 'advanced',
    wordCount: 85,
    text: 'Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers. To learn how to read is to light a fire; every syllable that is spelled out is a spark. Through literature, we travel through different centuries, explore distant lands, and understand diverse perspectives that broaden our human empathy and wisdom.'
  },
  {
    id: 'p-exam-1',
    titleEn: 'Official Typing Speed Certification Test',
    titleBn: 'অফিসিয়াল সরকারি ও নিয়োগ পরীক্ষা ড্রিল',
    category: 'exam',
    difficulty: 'advanced',
    wordCount: 95,
    text: 'Candidates appearing for official competitive examinations and administrative positions must demonstrate proficiency in computer typing. The benchmark standard requires a minimum typing speed of thirty to forty words per minute with high accuracy. Proper hand positioning, rhythm, and steady concentration are vital. Do not rush into making errors; rhythm and precision will guarantee a qualifying score and a certified passing result.'
  }
];

// 3. Mapping from English character to QWERTY Physical KeyStep
const CHAR_TO_KEY: Record<string, { code: string; shift: boolean }> = {
  // Letters
  a: { code: 'KeyA', shift: false },
  A: { code: 'KeyA', shift: true },
  b: { code: 'KeyB', shift: false },
  B: { code: 'KeyB', shift: true },
  c: { code: 'KeyC', shift: false },
  C: { code: 'KeyC', shift: true },
  d: { code: 'KeyD', shift: false },
  D: { code: 'KeyD', shift: true },
  e: { code: 'KeyE', shift: false },
  E: { code: 'KeyE', shift: true },
  f: { code: 'KeyF', shift: false },
  F: { code: 'KeyF', shift: true },
  g: { code: 'KeyG', shift: false },
  G: { code: 'KeyG', shift: true },
  h: { code: 'KeyH', shift: false },
  H: { code: 'KeyH', shift: true },
  i: { code: 'KeyI', shift: false },
  I: { code: 'KeyI', shift: true },
  j: { code: 'KeyJ', shift: false },
  J: { code: 'KeyJ', shift: true },
  k: { code: 'KeyK', shift: false },
  K: { code: 'KeyK', shift: true },
  l: { code: 'KeyL', shift: false },
  L: { code: 'KeyL', shift: true },
  m: { code: 'KeyM', shift: false },
  M: { code: 'KeyM', shift: true },
  n: { code: 'KeyN', shift: false },
  N: { code: 'KeyN', shift: true },
  o: { code: 'KeyO', shift: false },
  O: { code: 'KeyO', shift: true },
  p: { code: 'KeyP', shift: false },
  P: { code: 'KeyP', shift: true },
  q: { code: 'KeyQ', shift: false },
  Q: { code: 'KeyQ', shift: true },
  r: { code: 'KeyR', shift: false },
  R: { code: 'KeyR', shift: true },
  s: { code: 'KeyS', shift: false },
  S: { code: 'KeyS', shift: true },
  t: { code: 'KeyT', shift: false },
  T: { code: 'KeyT', shift: true },
  u: { code: 'KeyU', shift: false },
  U: { code: 'KeyU', shift: true },
  v: { code: 'KeyV', shift: false },
  V: { code: 'KeyV', shift: true },
  w: { code: 'KeyW', shift: false },
  W: { code: 'KeyW', shift: true },
  x: { code: 'KeyX', shift: false },
  X: { code: 'KeyX', shift: true },
  y: { code: 'KeyY', shift: false },
  Y: { code: 'KeyY', shift: true },
  z: { code: 'KeyZ', shift: false },
  Z: { code: 'KeyZ', shift: true },

  // Numbers & symbols
  '0': { code: 'Digit0', shift: false },
  ')': { code: 'Digit0', shift: true },
  '1': { code: 'Digit1', shift: false },
  '!': { code: 'Digit1', shift: true },
  '2': { code: 'Digit2', shift: false },
  '@': { code: 'Digit2', shift: true },
  '3': { code: 'Digit3', shift: false },
  '#': { code: 'Digit3', shift: true },
  '4': { code: 'Digit4', shift: false },
  '$': { code: 'Digit4', shift: true },
  '5': { code: 'Digit5', shift: false },
  '%': { code: 'Digit5', shift: true },
  '6': { code: 'Digit6', shift: false },
  '^': { code: 'Digit6', shift: true },
  '7': { code: 'Digit7', shift: false },
  '&': { code: 'Digit7', shift: true },
  '8': { code: 'Digit8', shift: false },
  '*': { code: 'Digit8', shift: true },
  '9': { code: 'Digit9', shift: false },
  '(': { code: 'Digit9', shift: true },

  // Punctuations
  ' ': { code: 'Space', shift: false },
  '.': { code: 'Period', shift: false },
  '>': { code: 'Period', shift: true },
  ',': { code: 'Comma', shift: false },
  '<': { code: 'Comma', shift: true },
  ';': { code: 'Semicolon', shift: false },
  ':': { code: 'Semicolon', shift: true },
  "'": { code: 'Quote', shift: false },
  '"': { code: 'Quote', shift: true },
  '/': { code: 'Slash', shift: false },
  '?': { code: 'Slash', shift: true },
  '-': { code: 'Minus', shift: false },
  '_': { code: 'Minus', shift: true },
  '=': { code: 'Equal', shift: false },
  '+': { code: 'Equal', shift: true },
  '[': { code: 'BracketLeft', shift: false },
  '{': { code: 'BracketLeft', shift: true },
  ']': { code: 'BracketRight', shift: false },
  '}': { code: 'BracketRight', shift: true },
  '\\': { code: 'Backslash', shift: false },
  '|': { code: 'Backslash', shift: true },
  '`': { code: 'Backquote', shift: false },
  '~': { code: 'Backquote', shift: true }
};

export function getEnglishKeyStep(char: string): KeyStep {
  const mapping = CHAR_TO_KEY[char];
  if (mapping) {
    const keyDef = BIJOY_KEYMAP[mapping.code];
    return {
      code: mapping.code,
      shift: mapping.shift,
      char,
      label: mapping.shift ? `Shift + ${keyDef?.labelEn || char}` : (keyDef?.labelEn || char),
      description: char === ' ' ? 'Spacebar' : undefined
    };
  }
  return { code: 'Space', shift: false, char, label: char };
}
