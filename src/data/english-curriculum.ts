import { BIJOY_KEYMAP } from '../engine/bijoy-layout';
import type { KeyStep } from '../engine/bijoy-engine';

export interface EnglishLesson {
  id: string;
  level: number;
  subIndex: number;
  titleEn: string;
  titleBn: string;
  category: 'home-row' | 'top-row' | 'bottom-row' | 'shift' | 'numbers' | 'sentences' | 'speed';
  descriptionEn: string;
  descriptionBn: string;
  targetText: string;
  keysTaught: string[];
  passAccuracy: number;
  targetWpm: number;
  tipEn: string;
  tipBn: string;
}

export interface EnglishLevelCategory {
  level: number;
  nameEn: string;
  nameBn: string;
  summaryEn: string;
  summaryBn: string;
  iconName: string;
  lessons: EnglishLesson[];
}

export const ENGLISH_CURRICULUM: EnglishLevelCategory[] = [
  {
    level: 1,
    nameEn: 'Level 1: Home Row Foundations',
    nameBn: 'লেভেল ১: হোম রো ভিত্তি ও আঙুল বিন্যাস',
    summaryEn: 'Master the core anchor keys (ASDF JKL;) where your hands naturally rest.',
    summaryBn: 'কীবোর্ডের মূল ভিত্তি হোম রো আয়ত্ত করুন, যেখানে দুই হাতের আঙুল স্বাভাবিকভাবে অবস্থান করে।',
    iconName: 'Compass',
    lessons: [
      {
        id: 'el-1-1',
        level: 1,
        subIndex: 1,
        titleEn: 'F & J Index Anchors',
        titleBn: 'F ও J তর্জনী অ্যাঙ্কর কী',
        category: 'home-row',
        descriptionEn: 'Feel the tactile bumps on F and J. These guide your index fingers without looking down.',
        descriptionBn: 'F এবং J কীবোর্ডের বাম ও ডান তর্জনীর স্পর্শবিন্দু। না তাকিয়ে এই দাগ অনুভব করে আঙুল রাখুন।',
        targetText: 'f j fj jf ff jj fjf jfj f f j j fj jf ff jj fj jf fjf jfj f j',
        keysTaught: ['KeyF', 'KeyJ', 'Space'],
        passAccuracy: 85,
        targetWpm: 12,
        tipEn: 'Keep other fingers resting lightly on neighbouring home keys.',
        tipBn: 'অন্যান্য আঙুলগুলো আলতো করে পাশের হোম রো কী-তে বিশ্রাম দিন।'
      },
      {
        id: 'el-1-2',
        level: 1,
        subIndex: 2,
        titleEn: 'D & K Middle Fingers',
        titleBn: 'D ও K মধ্যমা আঙুল অনুশীলন',
        category: 'home-row',
        descriptionEn: 'Use left middle finger for D and right middle finger for K.',
        descriptionBn: 'বাম মধ্যমা দিয়ে D এবং ডান মধ্যমা দিয়ে K চাপুন।',
        targetText: 'd k dk kd dd kk fjdk dkfj d d k k dk kd d k f d j k dk fd jk',
        keysTaught: ['KeyD', 'KeyK'],
        passAccuracy: 88,
        targetWpm: 15,
        tipEn: 'Do not raise your wrists; keep hands relaxed and floating slightly.',
        tipBn: 'কব্জি টেবিলের উপর চেপে রাখবেন না, হালকা আলগা রাখুন।'
      },
      {
        id: 'el-1-3',
        level: 1,
        subIndex: 3,
        titleEn: 'S & L Ring Fingers',
        titleBn: 'S ও L অনামিকা আঙুল ড্রিল',
        category: 'home-row',
        descriptionEn: 'Use left ring finger for S and right ring finger for L.',
        descriptionBn: 'বাম অনামিকা দিয়ে S এবং ডান অনামিকা দিয়ে L টাইপ করার নিখুঁত অভ্যাস গড়ে তুলুন।',
        targetText: 's l sl ls ss ll skdl lksd s s l l sl ls s l a s d l k j sl ls',
        keysTaught: ['KeyS', 'KeyL'],
        passAccuracy: 88,
        targetWpm: 15,
        tipEn: 'Ring fingers require deliberate practice for muscle independent control.',
        tipBn: 'অনামিকা আঙুলের স্বাধীন গতি নিশ্চিত করতে ধীরলয়ে সঠিক কীতে চাপুন।'
      },
      {
        id: 'el-1-4',
        level: 1,
        subIndex: 4,
        titleEn: 'A & ; Pinky Fingers',
        titleBn: 'A ও ; কনিষ্ঠা আঙুল ড্রিল',
        category: 'home-row',
        descriptionEn: 'Left pinky rests on A, right pinky rests on Semicolon (;).',
        descriptionBn: 'বাম কনিষ্ঠা A কীতে এবং ডান কনিষ্ঠা সেমিকোলন (;) কীতে অবস্থান করবে।',
        targetText: 'a ; a; ;a aa ;; asdf jkl; a s d f j k l ; ; l k j f d s a asdf jkl;',
        keysTaught: ['KeyA', 'Semicolon'],
        passAccuracy: 88,
        targetWpm: 18,
        tipEn: 'The full ASDF JKL; home row is now under your fingers!',
        tipBn: 'অভিনন্দন! পুরো হোম রো ASDF JKL; এখন আপনার নিয়ন্ত্রণে।'
      },
      {
        id: 'el-1-5',
        level: 1,
        subIndex: 5,
        titleEn: 'G & H Center Reaches',
        titleBn: 'G ও H ভেতরের কী সম্প্রসারণ',
        category: 'home-row',
        descriptionEn: 'Reach index fingers inward: left index reaches G, right index reaches H.',
        descriptionBn: 'বাম তর্জনী প্রসারিত করে G এবং ডান তর্জনী প্রসারিত করে H চাপুন এবং সাথে সাথে F ও J-তে ফিরে আসুন।',
        targetText: 'g h gh hg f g j h fg jh g h gh hg glad half flash dash flag hand glad half',
        keysTaught: ['KeyG', 'KeyH'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'Always snap your index fingers back to F and J anchor position immediately.',
        tipBn: 'G বা H চাপার পরপরই তর্জনী F এবং J-তে ফিরিয়ে আনুন।'
      },
      {
        id: 'el-1-6',
        level: 1,
        subIndex: 6,
        titleEn: 'Home Row Word Mastery',
        titleBn: 'হোম রো শব্দ ভাণ্ডার ও সাবলীলতা',
        category: 'home-row',
        descriptionEn: 'Form complete real English words using only the home row keys.',
        descriptionBn: 'শুধুমাত্র হোম রো কী ব্যবহার করে সম্পূর্ণ অর্থপূর্ণ ইংরেজি শব্দ দ্রুত টাইপ করুন।',
        targetText: 'sad ask fall glad flash half salad flask dash lads all hall fall ask salad dad all',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'Focus on rhythm and uninterrupted flow without pauses.',
        tipBn: 'গতি নয়, সঠিক তাল এবং ছন্দ বজায় রাখুন।'
      }
    ]
  },
  {
    level: 2,
    nameEn: 'Level 2: Top Row Reach',
    nameBn: 'লেভেল ২: টপ রো কী সম্প্রসারণ',
    summaryEn: 'Reach upward accurately from the home row to QWERTY UIOP keys.',
    summaryBn: 'হোম রো থেকে উপরের সারির অক্ষরগুলোতে নির্ভুল স্পর্শ নিশ্চিত করুন।',
    iconName: 'ArrowUpCircle',
    lessons: [
      {
        id: 'el-2-1',
        level: 2,
        subIndex: 1,
        titleEn: 'E & I (Middle Fingers)',
        titleBn: 'E ও I মধ্যমা আঙুল সম্প্রসারণ',
        category: 'top-row',
        descriptionEn: 'Reach left middle finger up to E, right middle finger up to I.',
        descriptionBn: 'বাম মধ্যমা দিয়ে D-এর ঠিক উপরের E এবং ডান মধ্যমা দিয়ে K-এর উপরের I চাপুন।',
        targetText: 'e i ei ie de ki ed ik die kid like side life ride hide fine file time idle',
        keysTaught: ['KeyE', 'KeyI'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'E is the single most common letter in written English!',
        tipBn: 'ইংরেজি ভাষার সবচেয়ে বহুল ব্যবহৃত বর্ণ হলো E!'
      },
      {
        id: 'el-2-2',
        level: 2,
        subIndex: 2,
        titleEn: 'R & U (Index Fingers)',
        titleBn: 'R ও U তর্জনী আঙুল ড্রিল',
        category: 'top-row',
        descriptionEn: 'Reach left index up to R, right index up to U.',
        descriptionBn: 'বাম তর্জনী দিয়ে R এবং ডান তর্জনী দিয়ে U চাপুন।',
        targetText: 'r u ru ur fr ju rf uj red run rule rush four user sure fire cure turn true',
        keysTaught: ['KeyR', 'KeyU'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Feel the diagonal movement from home row to top row.',
        tipBn: 'হোম রো থেকে কিছুটা কোণাকুণি উপরের দিকে তর্জনী চালনা করুন।'
      },
      {
        id: 'el-2-3',
        level: 2,
        subIndex: 3,
        titleEn: 'T & Y (Center Reaches)',
        titleBn: 'T ও Y ভেতরের টপ রো কী',
        category: 'top-row',
        descriptionEn: 'Reach left index up-inward to T, right index up-inward to Y.',
        descriptionBn: 'বাম তর্জনী দিয়ে T এবং ডান তর্জনী দিয়ে Y কীতে পৌঁছান।',
        targetText: 't y ty yt ft jy tf yj the they try trust future city yesterday year tell yet',
        keysTaught: ['KeyT', 'KeyY'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Return directly to F and J after each reach.',
        tipBn: 'কী চাপার সাথে সাথে আঙুল F ও J-তে ফিরিয়ে আনুন।'
      },
      {
        id: 'el-2-4',
        level: 2,
        subIndex: 4,
        titleEn: 'W & O (Ring Fingers)',
        titleBn: 'W ও O অনামিকা আঙুল ড্রিল',
        category: 'top-row',
        descriptionEn: 'Reach left ring up to W, right ring up to O.',
        descriptionBn: 'বাম অনামিকা দিয়ে W এবং ডান অনামিকা দিয়ে O চাপুন।',
        targetText: 'w o wo ow sw lo ws ol who work word open slow grow write flow low owl',
        keysTaught: ['KeyW', 'KeyO'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Keep your palms slightly elevated to avoid friction.',
        tipBn: 'হাতের তালু কীবোর্ড প্যাডের উপর ঘষা না লেগে আলতো ভাসিয়ে রাখুন।'
      },
      {
        id: 'el-2-5',
        level: 2,
        subIndex: 5,
        titleEn: 'Q & P (Pinky Reaches)',
        titleBn: 'Q ও P কনিষ্ঠা আঙুল ড্রিল',
        category: 'top-row',
        descriptionEn: 'Reach left pinky up to Q, right pinky up to P.',
        descriptionBn: 'বাম কনিষ্ঠা দিয়ে Q এবং ডান কনিষ্ঠা দিয়ে P চাপুন।',
        targetText: 'q p qp pq aq ;p qa p; quiet pure paper report route equip power quick open pass',
        keysTaught: ['KeyQ', 'KeyP'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'P is very common; develop muscle memory for its top-right location.',
        tipBn: 'P খুবই প্রচলিত বর্ণ; ডান কনিষ্ঠার স্পর্শ নির্ভুল করুন।'
      },
      {
        id: 'el-2-6',
        level: 2,
        subIndex: 6,
        titleEn: 'Top & Home Row Combination',
        titleBn: 'টপ ও হোম রো সমন্বিত শব্দ অনুশীলন',
        category: 'top-row',
        descriptionEn: 'Form rich words combining both top row and home row letters.',
        descriptionBn: 'টপ এবং হোম রোর সমন্বয়ে প্রচলিত ইংরেজি শব্দ টাইপ করে গতি বাড়ান।',
        targetText: 'the they their there were water write report paper route quiet trust future power people',
        keysTaught: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'],
        passAccuracy: 92,
        targetWpm: 25,
        tipEn: 'Maintain smooth finger cadence between rows.',
        tipBn: 'দুই সারির মাঝে মসৃণ ছন্দ বজায় রেখে টাইপ করুন।'
      }
    ]
  },
  {
    level: 3,
    nameEn: 'Level 3: Bottom Row Control',
    nameBn: 'লেভেল ৩: বটম রো নিখুঁত নিয়ন্ত্রণ',
    summaryEn: 'Reach downward accurately to master ZXCV BNM and punctuation keys.',
    summaryBn: 'নিচের সারির অক্ষরগুলো (ZXCV BNM) আয়ত্ত করে তিন সারির পূর্ণ দখল নিন।',
    iconName: 'ArrowDownCircle',
    lessons: [
      {
        id: 'el-3-1',
        level: 3,
        subIndex: 1,
        titleEn: 'C & M (Middle Fingers)',
        titleBn: 'C ও M মধ্যমা আঙুল সম্প্রসারণ',
        category: 'bottom-row',
        descriptionEn: 'Reach left middle finger down to C, right middle down to M.',
        descriptionBn: 'বাম মধ্যমা দিয়ে D-এর নিচে C এবং ডান মধ্যমা দিয়ে K-এর নিচে M চাপুন।',
        targetText: 'c m cm mc dc km cd mk come much calm music make clean march cream claim camp',
        keysTaught: ['KeyC', 'KeyM'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Do not tuck your other fingers under; maintain natural resting curve.',
        tipBn: 'অন্যান্য আঙুলগুলো স্বাভাবিক বক্রতায় হোম রোতে রাখুন।'
      },
      {
        id: 'el-3-2',
        level: 3,
        subIndex: 2,
        titleEn: 'V & N (Index Fingers)',
        titleBn: 'V ও N তর্জনী আঙুল ড্রিল',
        category: 'bottom-row',
        descriptionEn: 'Reach left index down to V, right index down to N.',
        descriptionBn: 'বাম তর্জনী দিয়ে V এবং ডান তর্জনী দিয়ে N কীতে পৌঁছান।',
        targetText: 'v n vn nv fv jn vf nj van view even name next new man voice seven move fine',
        keysTaught: ['KeyV', 'KeyN'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'V and N are right below the F and J home bumps.',
        tipBn: 'V ও N মূলত F ও J এর একদম নিচে অবস্থান করে।'
      },
      {
        id: 'el-3-3',
        level: 3,
        subIndex: 3,
        titleEn: 'B (Center Index Reach)',
        titleBn: 'B তর্জনী সেন্টার ড্রিল',
        category: 'bottom-row',
        descriptionEn: 'Reach left index down-inward to B (or right index optionally).',
        descriptionBn: 'বাম তর্জনী দিয়ে V-এর ডানপাশে B কীতে চাপুন।',
        targetText: 'b fb jb bf bj book back bank best bear bring table about black brown bulb build',
        keysTaught: ['KeyB'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Touch typists standardly use the left index for B.',
        tipBn: 'আদর্শ টাচ টাইপিংয়ে বাম তর্জনী দিয়ে B চাপা হয়।'
      },
      {
        id: 'el-3-4',
        level: 3,
        subIndex: 4,
        titleEn: 'X & Comma (,)',
        titleBn: 'X ও কমা (,) অনামিকা ড্রিল',
        category: 'bottom-row',
        descriptionEn: 'Reach left ring down to X, right ring down to Comma (,).',
        descriptionBn: 'বাম অনামিকা দিয়ে X এবং ডান অনামিকা দিয়ে কমা (,) কীতে পৌঁছান।',
        targetText: 'x , x, ,x sx l, six box next fix , text , extra , axle , mix , flex , taxi , wax',
        keysTaught: ['KeyX', 'Comma'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Remember to hit space after every comma in natural writing.',
        tipBn: 'প্রতিটি কমার পরে একটি করে স্পেস দেওয়ার অভ্যাস বজায় রাখুন।'
      },
      {
        id: 'el-3-5',
        level: 3,
        subIndex: 5,
        titleEn: 'Z & Period (.)',
        titleBn: 'Z ও দাড়ি/ডট (.) কনিষ্ঠা ড্রিল',
        category: 'bottom-row',
        descriptionEn: 'Reach left pinky down to Z, right ring/pinky to Period (.).',
        descriptionBn: 'বাম কনিষ্ঠা দিয়ে Z এবং ডান অনামিকা/কনিষ্ঠা দিয়ে ডট/পিরিয়ড (.) চাপুন।',
        targetText: 'z . z. .z az ;. zip zoo zero prize . size . zone . lazy . buzz . zoom . citizen . maze',
        keysTaught: ['KeyZ', 'Period'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Sentences always end with a period; master this key without looking.',
        tipBn: 'বাক্যের সমাপ্তিতে ডট অপরিহার্য; না তাকিয়ে নিশ্চিত স্পর্শ আয়ত্ত করুন।'
      },
      {
        id: 'el-3-6',
        level: 3,
        subIndex: 6,
        titleEn: 'Three-Row Full Alphabet Fluency',
        titleBn: 'তিন সারির পূর্ণাঙ্গ ইংরেজি শব্দ অনুশীলন',
        category: 'bottom-row',
        descriptionEn: 'Type rich English vocabulary using all 26 letters across all three rows.',
        descriptionBn: 'ইংরেজি বর্ণমালার ২৬টি বর্ণ সমন্বিত সকল সারির বাস্তব শব্দ টাইপ করুন।',
        targetText: 'quick brown fox jumps over the lazy dog box move cover calm bank dream prize zero',
        keysTaught: ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period'],
        passAccuracy: 92,
        targetWpm: 26,
        tipEn: 'You now command every letter on the standard keyboard!',
        tipBn: 'কীবোর্ডের সবগুলো ২৬টি অক্ষরের স্পর্শ এখন আপনার নখদর্পণে!'
      }
    ]
  },
  {
    level: 4,
    nameEn: 'Level 4: Capital Letters & Shift Keys',
    nameBn: 'লেভেল ৪: বড় হাতের বর্ণ ও শিফট কী মেকানিক্স',
    summaryEn: 'Master opposite-hand Shift key coordination for effortless capital letters.',
    summaryBn: 'বিপরীত হাতের শিফট ব্যবহারের গোল্ডেন রুল দিয়ে ক্যাপিটাল লেটার টাইপিং সহজ করুন।',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'el-4-1',
        level: 4,
        subIndex: 1,
        titleEn: 'Right Shift + Left Hand Capitals',
        titleBn: 'ডান শিফট ও বাম হাতের ক্যাপিটাল লেটার',
        category: 'shift',
        descriptionEn: 'Hold Right Shift with right pinky while typing left hand letters with left hand.',
        descriptionBn: 'ডান কনিষ্ঠা দিয়ে Right Shift ধরে রেখে বাম হাত দিয়ে A, S, D, F, Q, W, E, R, T, Z, X, C, V টাইপ করুন।',
        targetText: 'Apple Book Cat Dog Earth Fish Green Quick Red Sun Tree Water Zero Care Fact',
        keysTaught: ['ShiftRight'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Golden Rule: Always press Shift with the OPPOSITE hand of the letter.',
        tipBn: 'মূল নিয়ম: যে হাতের বর্ণ, তার উল্টো হাতের কনিষ্ঠা দিয়ে শিফট চাপবেন।'
      },
      {
        id: 'el-4-2',
        level: 4,
        subIndex: 2,
        titleEn: 'Left Shift + Right Hand Capitals',
        titleBn: 'বাম শিফট ও ডান হাতের ক্যাপিটাল লেটার',
        category: 'shift',
        descriptionEn: 'Hold Left Shift with left pinky while typing right hand letters with right hand.',
        descriptionBn: 'বাম কনিষ্ঠা দিয়ে Left Shift ধরে রেখে ডান হাত দিয়ে J, K, L, U, I, O, P, H, M, N, Y টাইপ করুন।',
        targetText: 'Home India Joy King Love Moon Night Open Pen Queen Under You Jump Keep Hope',
        keysTaught: ['ShiftLeft'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Release Shift immediately after striking the uppercase letter.',
        tipBn: 'ক্যাপিটাল লেটার চাপার সাথে সাথে শিফট ছেড়ে দিন।'
      },
      {
        id: 'el-4-3',
        level: 4,
        subIndex: 3,
        titleEn: 'Capitalized Sentences & Proper Nouns',
        titleBn: 'ক্যাপিটালাইজড পূর্ণাঙ্গ বাক্য ও নামসমূহ',
        category: 'shift',
        descriptionEn: 'Type proper English sentences with capitalized first words and city names.',
        descriptionBn: 'সঠিক নিয়মে বাক্যের শুরুর বড় হাতের অক্ষর ও বিভিন্ন দেশের নাম টাইপ করুন।',
        targetText: 'Dhaka is the capital of Bangladesh. London, Paris and Tokyo are famous cities. Monday and Friday are important days.',
        keysTaught: ['ShiftLeft', 'ShiftRight', 'Period', 'Comma'],
        passAccuracy: 92,
        targetWpm: 25,
        tipEn: 'Notice how smooth opposite-hand shifting feels once muscle memory forms.',
        tipBn: 'উভয় হাতের শিফট ব্যবহারের অভ্যাস হয়ে গেলে গতি বহুলাংশে বৃদ্ধি পায়।'
      }
    ]
  },
  {
    level: 5,
    nameEn: 'Level 5: Numbers & Everyday Symbols',
    nameBn: 'লেভেল ৫: সংখ্যা ও ব্যবহারিক প্রতীক',
    summaryEn: 'Conquer the top number row (1234567890) and essential punctuation without peeking.',
    summaryBn: 'উপরের সারির সংখ্যা ও প্রয়োজনীয় স্পেশাল ক্যারেক্টারসমূহ স্পর্শে স্পর্শে টাইপ করুন।',
    iconName: 'Hash',
    lessons: [
      {
        id: 'el-5-1',
        level: 5,
        subIndex: 1,
        titleEn: 'Numbers 1 to 5 (Left Hand)',
        titleBn: 'সংখ্যা ১ থেকে ৫ (বাম হাত)',
        category: 'numbers',
        descriptionEn: 'Reach up from top row: 1 (pinky), 2 (ring), 3 (middle), 4 & 5 (index).',
        descriptionBn: 'বাম হাত দিয়ে ১ (কনিষ্ঠা), ২ (অনামিকা), ৩ (মধ্যমা), ৪ ও ৫ (তর্জনী) চাপুন।',
        targetText: '1 2 3 4 5 12 23 34 45 51 100 250 345 512 431 15 24 35 42 53 14 25',
        keysTaught: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'],
        passAccuracy: 88,
        targetWpm: 18,
        tipEn: 'Do not twist your wrist; stretch finger upward with precision.',
        tipBn: 'কব্জি না ঘুরিয়ে আঙুলটি সরাসরি উপরের সংখ্যা কীতে প্রসারিত করুন।'
      },
      {
        id: 'el-5-2',
        level: 5,
        subIndex: 2,
        titleEn: 'Numbers 6 to 0 (Right Hand)',
        titleBn: 'সংখ্যা ৬ থেকে ০ (ডান হাত)',
        category: 'numbers',
        descriptionEn: 'Reach up with right hand: 6 & 7 (index), 8 (middle), 9 (ring), 0 (pinky).',
        descriptionBn: 'ডান হাত দিয়ে ৬ ও ৭ (তর্জনী), ৮ (মধ্যমা), ৯ (অনামিকা), ০ (কনিষ্ঠা) চাপুন।',
        targetText: '6 7 8 9 0 67 78 89 90 60 780 890 906 6789 2026 1995 2030 500 850 990',
        keysTaught: ['Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'],
        passAccuracy: 88,
        targetWpm: 18,
        tipEn: '0 is pressed by the right pinky, right above P.',
        tipBn: 'P-এর ঠিক উপরে ০ কীটি ডান কনিষ্ঠা দিয়ে চাপুন।'
      },
      {
        id: 'el-5-3',
        level: 5,
        subIndex: 3,
        titleEn: 'Quotations, Apostrophe & Question Marks',
        titleBn: 'উদ্ধৃতি চিহ্ন, অ্যাপোস্ট্রফি ও প্রশ্নবোধক চিহ্ন',
        category: 'numbers',
        descriptionEn: 'Practice dialogue punctuations: quotes (" "), apostrophe (\'), and question mark (?).',
        descriptionBn: 'ইংরেজি লেখার অতিপ্রয়োজনীয় চিহ্ন: কোটেশন (" "), অ্যাপোস্ট্রফি (\'), ও প্রশ্নবোধক চিহ্ন (?)।',
        targetText: '"Hello," she said. "Are you ready?" It\'s a wonderful morning! Don\'t worry, let\'s go.',
        keysTaught: ['Quote', 'Slash'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Use right pinky for Quote (\') and Shift+Slash for Question mark (?).',
        tipBn: 'ডান কনিষ্ঠা দিয়ে কোট (\') এবং Left Shift + Slash দিয়ে (?) চাপুন।'
      },
      {
        id: 'el-5-4',
        level: 5,
        subIndex: 4,
        titleEn: 'Professional Symbols (@, $, %, &, *, #, _)',
        titleBn: 'প্রফেশনাল প্রতীক ও কোডিং সিম্বল',
        category: 'numbers',
        descriptionEn: 'Shifted number row symbols used in business emails, pricing, and programming.',
        descriptionBn: 'ইমেইল, অফিসিয়াল হিসাব এবং কোডিংয়ে ব্যবহৃত প্রয়োজনীয় প্রতীকসমূহ।',
        targetText: 'support@typeshikhi.com cost: $150 100% #speed item_1 + item_2 (total) 5 * 2 = 10',
        keysTaught: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Equal', 'Minus'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Numbers with Shift require coordinated focus; take your time to ensure accuracy.',
        tipBn: 'প্রতীকের ক্ষেত্রে ধীরেসুস্থে সঠিক শিফট সমন্বয় নিশ্চিত করুন।'
      }
    ]
  },
  {
    level: 6,
    nameEn: 'Level 6: Sentence Fluency & Pangrams',
    nameBn: 'লেভেল ৬: বাক্য সাবলীলতা ও প্যানগ্রাম',
    summaryEn: 'Build continuous typing momentum with all-letter pangrams and famous proverbs.',
    summaryBn: 'প্যানগ্রাম ও প্রবাদ বাক্যের মাধ্যমে নিরবচ্ছিন্ন টাইপিং গতি ও ছন্দ গড়ে তুলুন।',
    iconName: 'BookOpen',
    lessons: [
      {
        id: 'el-6-1',
        level: 6,
        subIndex: 1,
        titleEn: 'Classic Pangrams (All 26 Letters)',
        titleBn: 'ক্লাসিক প্যানগ্রাম (সবগুলো ২৬টি বর্ণ)',
        category: 'sentences',
        descriptionEn: 'Type famous sentences containing every single letter of the English alphabet.',
        descriptionBn: 'ইংরেজি বর্ণমালার প্রতিটি বর্ণ সমৃদ্ধ বিখ্যাত বাক্যসমূহ অনুশীলন করুন।',
        targetText: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!',
        keysTaught: ['KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ', 'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT', 'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ'],
        passAccuracy: 93,
        targetWpm: 30,
        tipEn: 'Pangrams are the gold standard for testing full alphabet muscle memory.',
        tipBn: 'প্যানগ্রাম টাইপ করলে হাতের সবগুলো আঙুলের ব্যালেন্স তৈরি হয়।'
      },
      {
        id: 'el-6-2',
        level: 6,
        subIndex: 2,
        titleEn: 'Wisdom & Inspirational Proverbs',
        titleBn: 'জ্ঞানের বাণী ও অনুপ্রেরণামূলক প্রবাদ',
        category: 'sentences',
        descriptionEn: 'Practice fluid, meaningful sentences that inspire and boost words per minute.',
        descriptionBn: 'অর্থপূর্ণ এবং অনুপ্রেরণাদায়ক ইংরেজি বাক্যসমূহ সাবলীল গতিতে টাইপ করুন।',
        targetText: 'Practice makes a person perfect. Knowledge is power and consistent action leads to excellence. Every master was once a beginner who refused to quit.',
        keysTaught: [],
        passAccuracy: 94,
        targetWpm: 32,
        tipEn: 'Read one or two words ahead of what your fingers are currently typing.',
        tipBn: 'যে শব্দ টাইপ করছেন, তার পরের শব্দের দিকে চোখ রাখুন।'
      },
      {
        id: 'el-6-3',
        level: 6,
        subIndex: 3,
        titleEn: 'Workplace & Professional Communications',
        titleBn: 'অফিসিয়াল ও প্রফেশনাল কমিউনিকেশন',
        category: 'sentences',
        descriptionEn: 'Everyday email communication phrases standard in professional offices worldwide.',
        descriptionBn: 'আন্তর্জাতিক অফিস ও কর্পোরেট ইমেইলে ব্যবহৃত সাধারণ ফরমাল বাক্যসমূহ।',
        targetText: 'Thank you for your prompt response. Please find the attached report for your review. We look forward to meeting with your team next week.',
        keysTaught: [],
        passAccuracy: 94,
        targetWpm: 35,
        tipEn: 'Common corporate words should flow as single muscle reflex chunks.',
        tipBn: 'নিয়মিত ব্যবহৃত কর্পোরেট শব্দগুলো আঙুলের স্মৃতিতে স্বয়ংক্রিয়ভাবে টাইপ হতে থাকবে।'
      }
    ]
  },
  {
    level: 7,
    nameEn: 'Level 7: Speed Acceleration & Exam Passages',
    nameBn: 'লেভেল ৭: স্পিড বুস্টার ও প্রফেশনাল এক্সাম',
    summaryEn: 'High-speed paragraph mastery for office work, freelance writing, and competitive exams.',
    summaryBn: 'চাকরির নিয়োগ পরীক্ষা, ফ্রিল্যান্সিং ও দ্রুত অফিশিয়াল টাইপিংয়ের চূড়ান্ত পর্যায়।',
    iconName: 'Zap',
    lessons: [
      {
        id: 'el-7-1',
        level: 7,
        subIndex: 1,
        titleEn: 'Top 100 Most Frequent English Words',
        titleBn: 'শীর্ষ ১০০টি অতিপ্রয়োজনীয় ইংরেজি শব্দ',
        category: 'speed',
        descriptionEn: 'These 100 words constitute over 50% of all written English. Speed here multiplies your total WPM.',
        descriptionBn: 'এই ১০০টি শব্দ ইংরেজি সাহিত্যের ৫০% দখল করে। এগুলো ঝড়ের গতিতে টাইপ করতে পারলে স্পিড বহুগুণ বাড়ে।',
        targetText: 'the of and a to in is you that it he was for on are as with his they at be this have from or one had by word but not what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been call who now find long down day did get come made may part',
        keysTaught: [],
        passAccuracy: 95,
        targetWpm: 40,
        tipEn: 'Do not look at the keys; trust your fingers completely.',
        tipBn: 'কীবোর্ডের দিকে একেবারেই তাকাবেন না; আঙুলের স্মৃতির ওপর পূর্ণ আস্থা রাখুন।'
      },
      {
        id: 'el-7-2',
        level: 7,
        subIndex: 2,
        titleEn: 'Technology, AI & Modern Industry Prose',
        titleBn: 'তথ্যপ্রযুক্তি, এআই ও আধুনিক বিশ্ব অনুচ্ছেদ',
        category: 'speed',
        descriptionEn: 'High-speed technical prose testing diverse vocabulary and continuous flow.',
        descriptionBn: 'আধুনিক প্রযুক্তি ও সফটওয়্যার জগতের টেকনিক্যাল শব্দ সমৃদ্ধ হাই-স্পিড প্যারাগ্রাফ।',
        targetText: 'Artificial intelligence and modern cloud systems are revolutionizing software development. Fast and accurate typing allows developers and writers to translate creative thoughts into reality without cognitive friction. Mastery of touch typing saves hundreds of productive hours every year.',
        keysTaught: [],
        passAccuracy: 95,
        targetWpm: 45,
        tipEn: 'Maintain relaxed shoulders and calm breathing throughout the paragraph.',
        tipBn: 'কাঁধ শিথিল রাখুন এবং স্থির নিঃশ্বাসে টাইপ চালিয়ে যান।'
      },
      {
        id: 'el-7-3',
        level: 7,
        subIndex: 3,
        titleEn: 'Official Government & Corporate Exam Benchmark',
        titleBn: 'সরকারি ও কর্পোরেট চাকরির টাইপিং পরীক্ষা অনুচ্ছেদ',
        category: 'speed',
        descriptionEn: 'Official qualification exam simulation. Passing this guarantees job-ready typing credentials.',
        descriptionBn: 'সরকারি ও ব্যাংক নিয়োগ পরীক্ষার স্ট্যান্ডার্ড প্যারাগ্রাফ। এটি পাস করলে চাকরি উপযোগী টাইপিং স্পিড নিশ্চিত হয়।',
        targetText: 'Candidates seeking qualification in computer proficiency and office administration must demonstrate consistent accuracy and high words per minute under timed evaluation. Touch typing guarantees competitive excellence by eliminating visual dependency on keycaps. Consistent rhythm, posture discipline, and focused concentration are the keys to extraordinary performance in every typing test.',
        keysTaught: [],
        passAccuracy: 96,
        targetWpm: 50,
        tipEn: 'Congratulations on reaching the pinnacle of English touch typing mastery!',
        tipBn: 'অভিনন্দন! আপনি ইংরেজি টাচ টাইপিংয়ের সর্বোচ্চ প্রফেশনাল মানে উন্নীত হয়েছেন!'
      }
    ]
  }
];

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
