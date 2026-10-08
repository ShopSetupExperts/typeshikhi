export interface Lesson {
  id: string;
  level: number;
  subIndex: number;
  titleEn: string;
  titleBn: string;
  category: 'intro' | 'drill' | 'words' | 'sentences' | 'speed' | 'exam';
  descriptionEn: string;
  descriptionBn: string;
  targetText: string;
  keysTaught: string[];
  passAccuracy: number; // e.g., 90
  targetWpm?: number;
  tipEn?: string;
  tipBn?: string;
}

export interface LevelCategory {
  level: number;
  nameEn: string;
  nameBn: string;
  summaryEn: string;
  summaryBn: string;
  iconName: string;
  lessons: Lesson[];
}

export const CURRICULUM: LevelCategory[] = [
  {
    level: 0,
    nameEn: 'Orientation & Posture',
    nameBn: 'পরিচিতি ও আঙুল বিন্যাস',
    summaryEn: 'Learn ergonomic posture, home row finger rest, and how Bijoy mapping works.',
    summaryBn: 'সঠিক আঙুল স্থাপন, হোম রো অবস্থান এবং বিজয় লেআউটের মূল নিয়মাবলী।',
    iconName: 'Compass',
    lessons: [
      {
        id: 'l0-1',
        level: 0,
        subIndex: 1,
        titleEn: 'Home Row Finger Placement',
        titleBn: 'হোম রো আঙুল পরিচিতি',
        category: 'intro',
        descriptionEn: 'Place your left fingers on A S D F and right fingers on J K L ; with thumbs on Space.',
        descriptionBn: 'বাম হাতের আঙুল A S D F এবং ডান হাতের আঙুল J K L ; এর উপর রাখুন। থাম্ব স্পেসবারে রাখুন।',
        targetText: 'ক ত দ ব কা কি কু কৃ বা বি বু বৃ',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'],
        passAccuracy: 85,
        tipEn: 'Feel the bumps on F and J keys to align your index fingers without looking down.',
        tipBn: 'কীবোর্ডের F এবং J কী-এর উপর থাকা দাগ অনুভব করে হাত সেট করুন।'
      },
      {
        id: 'l0-2',
        level: 0,
        subIndex: 2,
        titleEn: 'Space and Backspace Control',
        titleBn: 'স্পেস ও ব্যাকস্পেস নিয়ন্ত্রণ',
        category: 'intro',
        descriptionEn: 'Practice rhythm with spacebar between characters.',
        descriptionBn: 'অক্ষরের মাঝে বৃদ্ধাঙ্গুলি দিয়ে স্বাভাবিক গতিতে স্পেস চাপুন।',
        targetText: 'ক ক ক ত ত ত দ দ দ ব ব ব',
        keysTaught: ['KeyJ', 'KeyK', 'KeyL', 'KeyH', 'Space'],
        passAccuracy: 90,
        tipEn: 'Keep hands floating gently over the keyboard.',
        tipBn: 'কবজি টেবিলের ওপর বেশি চেপে রাখবেন না, হালকা ভাসিয়ে রাখুন।'
      }
    ]
  },
  {
    level: 1,
    nameEn: 'Swaroborno (Vowels)',
    nameBn: 'স্বরবর্ণ',
    summaryEn: 'Learn how to type standalone Bengali vowels (অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ).',
    summaryBn: 'স্বাধীন স্বরবর্ণসমূহ (অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ) টাইপ করার নিয়ম শিখুন।',
    iconName: 'BookOpen',
    lessons: [
      {
        id: 'l1-1',
        level: 1,
        subIndex: 1,
        titleEn: 'Basic Swaroborno',
        titleBn: 'প্রাথমিক স্বরবর্ণ',
        category: 'drill',
        descriptionEn: 'Learn to type অ, আ, ই, ঈ, উ, ঊ.',
        descriptionBn: 'অ (Shift+F), আ (G+F), ই (G+D), ঈ (G+Shift+D), উ (G+S), ঊ (G+Shift+S)।',
        targetText: 'অ আ ই ঈ উ ঊ অ আ ই ঈ উ ঊ অ আ ই ঈ',
        keysTaught: ['KeyF', 'KeyG', 'KeyD', 'KeyS'],
        passAccuracy: 90,
        tipEn: 'Use the G key (Linker) followed by the Kar sign to type standalone vowels (except অ, ও, ঔ).',
        tipBn: 'অ ছাড়া অন্যান্য স্বরবর্ণ লিখতে প্রথমে G (লিংকার) চেপে তারপর সংশ্লিষ্ট কার চিহ্ন চাপতে হয়।'
      },
      {
        id: 'l1-2',
        level: 1,
        subIndex: 2,
        titleEn: 'Advanced Swaroborno',
        titleBn: 'উচ্চতর স্বরবর্ণ',
        category: 'drill',
        descriptionEn: 'Learn to type ঋ, এ, ঐ, ও, ঔ.',
        descriptionBn: 'ঋ (G+A), এ (G+C), ঐ (G+Shift+C), ও (X), ঔ (G+Shift+X)।',
        targetText: 'ঋ এ ঐ ও ঔ ঋ এ ঐ ও ঔ ঋ এ ঐ ও ঔ',
        keysTaught: ['KeyG', 'KeyA', 'KeyC', 'KeyX'],
        passAccuracy: 90,
        tipEn: 'ও is typed directly with X. The rest (ঋ, এ, ঐ, ঔ) use G + Kar. ঋ is G + A.',
        tipBn: 'ও লিখতে সরাসরি X চাপুন। বাকি সবগুলো স্বরবর্ণে (ঋ, এ, ঐ, ঔ) প্রথমে G ব্যবহার করুন। ঋ লিখতে G+A চাপুন।'
      }
    ]
  },
  {
    level: 2,
    nameEn: 'Byanjonborno (Consonants)',
    nameBn: 'ব্যঞ্জনবর্ণ',
    summaryEn: 'Learn all the consonants from Ka to Chandrabindu.',
    summaryBn: 'ক থেকে চন্দ্রবিন্দু পর্যন্ত সকল ব্যঞ্জনবর্ণের অবস্থান শিখুন।',
    iconName: 'Keyboard',
    lessons: [
      {
        id: 'l2-1',
        level: 2,
        subIndex: 1,
        titleEn: 'Ka-Barga (ক-বর্গ)',
        titleBn: 'ক-বর্গ (ক খ গ ঘ ঙ)',
        category: 'drill',
        descriptionEn: 'Type ক (J), খ (Shift+J), গ (O), ঘ (Shift+O), ঙ (Q).',
        descriptionBn: 'ক (J), খ (Shift+J), গ (O), ঘ (Shift+O), ঙ (Q) অনুশীলন করুন।',
        targetText: 'ক খ গ ঘ ঙ ক খ গ ঘ ঙ ক খ গ ঘ ঙ',
        keysTaught: ['KeyJ', 'KeyO', 'KeyQ'],
        passAccuracy: 90,
        tipEn: 'Press Shift for the aspirated versions (খ, ঘ).',
        tipBn: 'মহাপ্রাণ বর্ণ (খ, ঘ) টাইপ করতে Shift ব্যবহার করুন।'
      },
      {
        id: 'l2-2',
        level: 2,
        subIndex: 2,
        titleEn: 'Cha & Ta-Barga',
        titleBn: 'চ এবং ট-বর্গ',
        category: 'drill',
        descriptionEn: 'Type চ ছ জ ঝ ঞ and ট ঠ ড ঢ ণ.',
        descriptionBn: 'চ ছ জ ঝ ঞ এবং ট ঠ ড ঢ ণ অনুশীলন করুন।',
        targetText: 'চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ',
        keysTaught: ['KeyY', 'KeyU', 'KeyI', 'KeyT', 'KeyE', 'KeyB'],
        passAccuracy: 90,
        tipEn: 'ঞ is Shift+I. ণ is Shift+B.',
        tipBn: 'ঞ (Shift+I) এবং ণ (Shift+B) এর অবস্থান মনে রাখুন।'
      },
      {
        id: 'l2-3',
        level: 2,
        subIndex: 3,
        titleEn: 'Ta & Pa-Barga',
        titleBn: 'ত এবং প-বর্গ',
        category: 'drill',
        descriptionEn: 'Type ত থ দ ধ ন and প ফ ব ভ ম.',
        descriptionBn: 'ত থ দ ধ ন এবং প ফ ব ভ ম অনুশীলন করুন।',
        targetText: 'ত থ দ ধ ন প ফ ব ভ ম ত থ দ ধ ন প ফ ব ভ ম',
        keysTaught: ['KeyK', 'KeyL', 'KeyB', 'KeyR', 'KeyH', 'KeyM'],
        passAccuracy: 90,
        tipEn: 'ন is B. ম is M.',
        tipBn: 'ন (B) এবং ম (M) এর অবস্থান মনে রাখুন।'
      },
      {
        id: 'l2-4',
        level: 2,
        subIndex: 4,
        titleEn: 'Remaining Consonants',
        titleBn: 'অবশিষ্ট ব্যঞ্জনবর্ণ',
        category: 'drill',
        descriptionEn: 'Type য র ল শ ষ স হ ড় ঢ় য় ৎ ং ঃ ঁ.',
        descriptionBn: 'য র ল শ ষ স হ ড় ঢ় য় ৎ ং ঃ ঁ অনুশীলন করুন।',
        targetText: 'য র ল শ ষ স হ ড় ঢ় য় ৎ ং ঃ ঁ',
        keysTaught: ['KeyW', 'KeyV', 'KeyM', 'KeyN', 'KeyI', 'KeyP', 'Slash', 'KeyQ', 'Digit7'],
        passAccuracy: 90,
        tipEn: 'ল is Shift+V. শ is Shift+M. ষ is Shift+N. ঃ is Slash (/), ৎ is Shift+Slash (?).',
        tipBn: 'ল (Shift+V), শ (Shift+M), ষ (Shift+N), ঃ (/) এবং ৎ (Shift+/) এর অবস্থান মনে রাখুন।'
      }
    ]
  },
  {
    level: 3,
    nameEn: 'Home Row Foundation',
    nameBn: 'হোম রো মূল বর্ণমালা',
    summaryEn: 'Master the core home row keys: A S D F G H J K L ;',
    summaryBn: 'হোম রো-এর মূল বর্ণগুলো আয়ত্ত করুন: ৃ ু ি া ্ ব ক ত দ',
    iconName: 'Keyboard',
    lessons: [
      {
        id: 'l3-1',
        level: 3,
        subIndex: 1,
        titleEn: 'Right Hand Home Keys (ক ত দ ব)',
        titleBn: 'ডান হাতের হোম কী (ক ত দ ব)',
        category: 'drill',
        descriptionEn: 'Practice Ka (J), Ta (K), Da (L), Ba (H) with your right index, middle and ring fingers.',
        descriptionBn: 'ডান হাতের আঙুল দিয়ে ক (J), ত (K), দ (L), ব (H) অনুশীলন করুন।',
        targetText: 'ক ত দ ব ক ত দ ব কক তত দদ বব কদ তব বক কত',
        keysTaught: ['KeyJ', 'KeyK', 'KeyL', 'KeyH'],
        passAccuracy: 90,
        tipEn: 'Do not look at the keyboard. Focus on the screen highlight.',
        tipBn: 'কীবোর্ডের দিকে না তাকিয়ে স্ক্রিনের কি-গাইড দেখে টাইপ করুন।'
      },
      {
        id: 'l3-2',
        level: 3,
        subIndex: 2,
        titleEn: 'Left Hand Home Kar Keys (কা কি কু কৃ)',
        titleBn: 'বাম হাতের কার চিহ্ন (কা কি কু কৃ)',
        category: 'drill',
        descriptionEn: 'Practice Aa-kar (F), I-kar (D), U-kar (S), Ri-kar (A) attached to consonants.',
        descriptionBn: 'বাম হাতের কার চিহ্ন া (F), ি (D), ু (S), ৃ (A) ক, ত, ব, দ-এর সাথে অনুশীলন করুন।',
        targetText: 'কা কি কু কৃ তা তি তু তৃ বা বি বু বৃ দা দি দু দৃ',
        keysTaught: ['KeyF', 'KeyD', 'KeyS', 'KeyA'],
        passAccuracy: 90,
        tipEn: 'Remember: In Bijoy, type ি (D) before the letter (e.g. D then J makes কি)!',
        tipBn: 'মনে রাখবেন: বিজয়ে হ্রস্ব-ই কার (ি) বর্ণের আগে চাপতে হয় (D চেপে J চাপলে কি হয়)।'
      },
      {
        id: 'l3-3',
        level: 3,
        subIndex: 3,
        titleEn: 'Home Row Full Drill (ক ত দ ব া ি ু ৃ)',
        titleBn: 'হোম রো পূর্ণাঙ্গ ড্রিল',
        category: 'drill',
        descriptionEn: 'Combining left hand vowels with right hand consonants.',
        descriptionBn: 'বাম ও ডান হাতের সমন্বয়ে হোম রো-এর সব বর্ণের অনুশীলন।',
        targetText: 'বা কা তা দা কি তি দি বি কু তু দু বু কৃ তৃ দৃ বৃ',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'],
        passAccuracy: 90,
        tipEn: 'Maintain a steady rhythm like a ticking metronome.',
        tipBn: 'টাইপিংয়ের ছন্দ বজায় রাখুন, অতিরিক্ত তাড়াহুড়ো না করে নিখুঁত করার চেষ্টা করুন।'
      }
    ]
  },
  {
    level: 4,
    nameEn: 'Home Row Words',
    nameBn: 'হোম রো সহজ শব্দ',
    summaryEn: 'Form 2 to 4 letter real Bangla words using home row keys only.',
    summaryBn: 'শুধুমাত্র হোম রো ব্যবহার করে বাস্তব বাংলা শব্দ তৈরি করুন।',
    iconName: 'BookOpen',
    lessons: [
      {
        id: 'l4-1',
        level: 4,
        subIndex: 1,
        titleEn: '2-Letter Home Words',
        titleBn: '২ অক্ষরের হোম শব্দ',
        category: 'words',
        descriptionEn: 'Type short common words using home row characters.',
        descriptionBn: 'হোম রো বর্ণ দিয়ে তৈরি অতি পরিচিত ছোট শব্দ।',
        targetText: 'কত কব বক তব কত বক তব কত বক তব কত কব বক তব',
        keysTaught: ['KeyJ', 'KeyK', 'KeyL', 'KeyH'],
        passAccuracy: 90,
        tipEn: 'Type entire words in a single continuous hand flow.',
        tipBn: 'শব্দগুলো সাবলীলভাবে এক টানে টাইপ করার অভ্যাস করুন।'
      },
      {
        id: 'l4-2',
        level: 4,
        subIndex: 2,
        titleEn: 'Words with Kar Signs',
        titleBn: 'কার যুক্ত হোম শব্দ',
        category: 'words',
        descriptionEn: 'Practice words with Aa-kar, I-kar, U-kar and Ri-kar.',
        descriptionBn: 'আ-কার, ই-কার, উ-কার ও ঋ-কার দিয়ে গঠিত শব্দসমূহ।',
        targetText: 'কাদা বাদা বাতা দাত বাকি বাতি কবি কৃতি কাকা তাতা বাবা দাদা',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'],
        passAccuracy: 90,
        tipEn: 'For বাকি: Press D (ি), then J (ক), then F (া), then L (দ)... Notice pre-kar flow!',
        tipBn: 'বাকি টাইপ করতে: H (ব) -> F (া) -> D (ি) -> J (ক)।'
      },
      {
        id: 'l4-3',
        level: 4,
        subIndex: 3,
        titleEn: 'Home Row Phrases & Dari',
        titleBn: 'ছোট বাক্য ও দাঁড়ি অনুশীলন',
        category: 'words',
        descriptionEn: 'Type short home row phrases ending with Dari (Shift+G).',
        descriptionBn: 'দাঁড়ি (Shift+G) সহ ছোট বাক্য তৈরি করুন।',
        targetText: 'কাক ডাকে। বক থাকে। বাবা ডাকে। দাদা আসে। বাতি জ্বলে।',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'],
        passAccuracy: 92,
        tipEn: 'Dari is Shift + G. Use left pinky on Shift and left index on G.',
        tipBn: 'দাঁড়ির জন্য বাম কনিষ্ঠা দিয়ে Shift এবং বাম তর্জনী দিয়ে G চাপুন।'
      }
    ]
  },
  {
    level: 5,
    nameEn: 'Top Row Keys',
    nameBn: 'টপ রো বর্ণমালা',
    summaryEn: 'Master top row keys: Q W E R T Y U I O P (ঙ য ড প ট চ জ হ গ ড়)',
    summaryBn: 'উপরের সারির বর্ণসমূহ আয়ত্ত করুন: ঙ য ড প ট চ জ হ গ ড়',
    iconName: 'ArrowUpCircle',
    lessons: [
      {
        id: 'l5-1',
        level: 5,
        subIndex: 1,
        titleEn: 'Left Top Row (ঙ য ড প ট)',
        titleBn: 'বাম হাত টপ রো (ঙ য ড প ট)',
        category: 'drill',
        descriptionEn: 'Learn Q (ঙ), W (য), E (ড), R (প), T (ট) reachable by left hand.',
        descriptionBn: 'বাম হাতের আঙুল দিয়ে Q (ঙ), W (য), E (ড), R (প), T (ট) টাইপ করুন।',
        targetText: 'ট প ড য ঙ টপ ডয টপটপ ডযডয পট পট ডাল পাগল ডাক',
        keysTaught: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT'],
        passAccuracy: 90,
        tipEn: 'Return your fingers to Home Row (ASDF) after reaching up for top keys.',
        tipBn: 'টপ রো কি চেপে আঙুল আবার সাথে সাথে হোম রো-তে ফিরিয়ে আনুন।'
      },
      {
        id: 'l5-2',
        level: 5,
        subIndex: 2,
        titleEn: 'Right Top Row (চ জ হ গ ড়)',
        titleBn: 'ডান হাত টপ রো (চ জ হ গ ড়)',
        category: 'drill',
        descriptionEn: 'Learn Y (চ), U (জ), I (হ), O (গ), P (ড়) reachable by right hand.',
        descriptionBn: 'ডান হাতের আঙুল দিয়ে Y (চ), U (জ), I (হ), O (গ), P (ড়) টাইপ করুন।',
        targetText: 'চ জ হ গ ড় চজ হগ চড় গজ গাছ ঝড় জল হাত গান গাড়ি',
        keysTaught: ['KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'],
        passAccuracy: 90,
        tipEn: 'G is O, Ha is I, Ja is U, Cha is Y, Ra is P.',
        tipBn: 'গ = O, হ = I, জ = U, চ = Y, ড় = P।'
      },
      {
        id: 'l5-3',
        level: 5,
        subIndex: 3,
        titleEn: 'Top & Home Row Word Drill',
        titleBn: 'টপ ও হোম রো সমন্বিত শব্দ',
        category: 'words',
        descriptionEn: 'Combining top row consonants with home row vowels.',
        descriptionBn: 'টপ ও হোম রো-এর বর্ণ ও কার সমন্বয়ে শব্দ গঠন।',
        targetText: 'পাগল গোলাপ কাগজ বাতাস চকচক জগজগ হাট বাজার জাদুঘর',
        keysTaught: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'],
        passAccuracy: 92,
        tipEn: 'Notice how fast you can type when touch-typing top row accurately.',
        tipBn: 'আঙুলের পজিশন মুখস্থ থাকলে চোখ বন্ধ করেই টাইপ করা যায়।'
      }
    ]
  },
  {
    level: 6,
    nameEn: 'Bottom Row Keys',
    nameBn: 'বটম রো বর্ণমালা',
    summaryEn: 'Master bottom row keys: Z X C V B N M (্র ও ে র ন স ম)',
    summaryBn: 'নিচের সারির বর্ণসমূহ আয়ত্ত করুন: ্র ও ে র ন স ম',
    iconName: 'ArrowDownCircle',
    lessons: [
      {
        id: 'l6-1',
        level: 6,
        subIndex: 1,
        titleEn: 'Left Bottom Row (্র ও ে র)',
        titleBn: 'বাম হাত বটম রো (্র ও ে র)',
        category: 'drill',
        descriptionEn: 'Learn Z (্র ro-fola), X (ও vowel), C (ে E-kar), V (র Ra).',
        descriptionBn: 'বাম হাত দিয়ে Z (্র), X (ও), C (ে), V (র) অনুশীলন করুন।',
        targetText: 'রে রো রর ওও রাত রাম রোগ গ্রাম প্রেম বেশ তেল ওল ওষুধ',
        keysTaught: ['KeyZ', 'KeyX', 'KeyC', 'KeyV'],
        passAccuracy: 90,
        tipEn: 'C is E-kar (ে). It is typed BEFORE the consonant in Bijoy (e.g. C then J = কে)!',
        tipBn: 'C হলো এ-কার (ে)। বিজয়ে বর্ণের আগে C চাপতে হয়।'
      },
      {
        id: 'l6-2',
        level: 6,
        subIndex: 2,
        titleEn: 'Right Bottom Row (ন স ম)',
        titleBn: 'ডান হাত বটম রো (ন স ম)',
        category: 'drill',
        descriptionEn: 'Learn B (ন Na), N (স Sa), M (ম Ma).',
        descriptionBn: 'ডান হাত দিয়ে B (ন), N (স), M (ম) অনুশীলন করুন।',
        targetText: 'ন স ম নন সস মম মন নাম নদী সাগর সময় সকাল মামা সোনামণি',
        keysTaught: ['KeyB', 'KeyN', 'KeyM'],
        passAccuracy: 90,
        tipEn: 'B is Na (ন), N is Sa (স), M is Ma (ম). Very frequent letters in Bangla!',
        tipBn: 'ন = B, স = N, ম = M। বাংলায় এই বর্ণগুলো খুব বেশি ব্যবহৃত হয়।'
      },
      {
        id: 'l6-3',
        level: 6,
        subIndex: 3,
        titleEn: 'All Rows Combined Drills',
        titleBn: 'তিন সারির সমন্বিত বাক্য',
        category: 'sentences',
        descriptionEn: 'Sentences using all unshifted keys across all 3 rows.',
        descriptionBn: 'কীবোর্ডের তিনটি সারির বর্ণ ব্যবহার করে পূর্ণাঙ্গ বাক্য।',
        targetText: 'সকাল বেলা সূর্য ওঠে। নদীর পানি কলকল করে বয়। মন দিয়ে পড়ালেখা করো।',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'],
        passAccuracy: 92,
        tipEn: 'Remember to hit space cleanly with your thumb after each word.',
        tipBn: 'প্রতিটি শব্দের পর থাম্ব দিয়ে নির্ভুলভাবে স্পেস দিন।'
      }
    ]
  },
  {
    level: 7,
    nameEn: 'Shift Layer Mastery',
    nameBn: 'শিফট লেয়ারের যুক্তবর্ণ ও বর্ণ',
    summaryEn: 'Master shifted characters: অ ভ খ থ ধ ঢ ঠ ছ ঝ ঞ ঘ ফ ণ ষ শ ং ঃ ঁ ঔ ৈ ূ ী',
    summaryBn: 'শিফট কী চেপে টাইপ করার কৌশল: অ ভ খ থ ধ ঢ ঠ ছ ঝ ঞ ঘ ফ ণ ষ শ ং ঃ ঁ',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'l7-1',
        level: 7,
        subIndex: 1,
        titleEn: 'Shifted Home Row (অ ভ খ থ ধ)',
        titleBn: 'শিফটেড হোম রো (অ ভ খ থ ধ)',
        category: 'drill',
        descriptionEn: 'Learn Shift + F/H/J/K/L combinations on the Home Row.',
        descriptionBn: 'Shift চেপে হোম রো-এর বর্ণসমূহ (অ ভ খ থ ধ ী ূ) অনুশীলন করুন।',
        targetText: 'অ ভ খ থ ধ অ ভ খ থ ধ অমর ভূত দীপ ভালো খবর থানা ধান আধিপত্য',
        keysTaught: ['KeyF', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyD', 'KeyS'],
        passAccuracy: 90,
        tipEn: 'অ is Shift+F. ী is Shift+D. ূ is Shift+S. খ is Shift+J. ভ is Shift+H. ধ is Shift+L.',
        tipBn: 'অ = Shift+F, ী = Shift+D, ূ = Shift+S, খ = Shift+J, ভ = Shift+H, ধ = Shift+L।'
      },
      {
        id: 'l7-2',
        level: 7,
        subIndex: 2,
        titleEn: 'Shifted Sibilants & Nasals (শ ষ ণ)',
        titleBn: 'শ ষ ণ ও অনুনাসিক বর্ণ',
        category: 'drill',
        descriptionEn: 'Master Talobyo-Sha (Shift+M), Murdhonyo-Sha (Shift+N), Nna (Shift+B), Anusvara (Shift+Q), Candrabindu (Shift+7).',
        descriptionBn: 'তালব্য-শ (Shift+M), মূর্ধন্য-ষ (Shift+N), ণ (Shift+B), ং (Shift+Q), ঁ (Shift+7)।',
        targetText: 'শ ষ ণ শান্ত ভাষা কারণ সিংহ চাঁদ হাঁস বাঁশি রংধনু অংশ কিংবা',
        keysTaught: ['KeyM', 'KeyN', 'KeyB', 'KeyQ', 'Digit7'],
        passAccuracy: 90,
        tipEn: 'Talobyo Sha (শ) is Shift+M. Murdhonyo Sha (ষ) is Shift+N. Anusvara (ং) is Shift+Q.',
        tipBn: 'শ = Shift+M, ষ = Shift+N, ণ = Shift+B, ং = Shift+Q, ঁ = Shift+7।'
      },
      {
        id: 'l7-3',
        level: 7,
        subIndex: 3,
        titleEn: 'Shifted Aspirated Consonants (ঘ ছ ঝ ঢ ঠ ফ)',
        titleBn: 'মহাপ্রাণ বর্ণসমূহ (ঘ ছ ঝ ঢ ঠ ফ)',
        category: 'words',
        descriptionEn: 'Learn Shift + O (ঘ), Y (ছ), U (ঝ), E (ঢ), T (ঠ), R (ফ).',
        descriptionBn: 'Shift চেপে ঘ, ছ, ঝ, ঢ, ঠ, ফ যুক্ত বাস্তব শব্দ টাইপ করুন।',
        targetText: 'ঘর ছাতা ঝড় ঢাকা টাকা ফল ফুল মেঘ ছবি পাখি চিঠি',
        keysTaught: ['KeyO', 'KeyY', 'KeyU', 'KeyE', 'KeyT', 'KeyR'],
        passAccuracy: 92,
        tipEn: 'Shift+O = ঘ, Shift+Y = ছ, Shift+U = ঝ, Shift+E = ঢ, Shift+T = ঠ, Shift+R = ফ.',
        tipBn: 'ঘ = Shift+O, ছ = Shift+Y, ঝ = Shift+U, ঢ = Shift+E, ঠ = Shift+T, ফ = Shift+R।'
      }
    ]
  },
  {
    level: 8,
    nameEn: 'Numbers & Punctuation',
    nameBn: 'সংখ্যা ও যতিচিহ্ন',
    summaryEn: 'Master Bangla numerals (১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০) and symbols (, ; : ? ! " " ( ) ৳)',
    summaryBn: 'বাংলা সংখ্যা ও কমার্শিয়াল চিহ্নসমূহ: ১ থেকে ০ এবং ৳, ?, !, comma, colon',
    iconName: 'Hash',
    lessons: [
      {
        id: 'l8-1',
        level: 8,
        subIndex: 1,
        titleEn: 'Bangla Digits (১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০)',
        titleBn: 'বাংলা সংখ্যা গণনা (১-০)',
        category: 'drill',
        descriptionEn: 'Type Bangla digits located on the standard number row.',
        descriptionBn: 'কীবোর্ডের উপরের সারিতে থাকা বাংলা সংখ্যাসমূহ টাইপ করুন।',
        targetText: '১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০ ১২৩৪ ৫৬৭৮ ৯০ ১২ ৫০ ১০০ ৫০০ ২০২৬',
        keysTaught: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'],
        passAccuracy: 92,
        tipEn: 'Number keys directly map to ১, ২, ৩, ৪, ৫, ৬, ৭, ৮, ৯, ০.',
        tipBn: 'সাধারণভাবে ১ ২ ৩ ৪ চাপলেই বাংলা ডিজিট তৈরি হয়।'
      },
      {
        id: 'l8-2',
        level: 8,
        subIndex: 2,
        titleEn: 'Punctuation & Sentences with Numbers',
        titleBn: 'যতিচিহ্ন ও সংখ্যামূলক বাক্য',
        category: 'sentences',
        descriptionEn: 'Combine dates, currency (৳), question mark (?), exclamation (!) and Dari (।).',
        descriptionBn: 'তারিখ, টাকা, প্রশ্নবোধক এবং আশ্চর্যবোধক চিহ্ন সহ বাক্য।',
        targetText: 'দাম কত? মাত্র ৫০ টাকা! আজ ২ অক্টোবর, ২০২৬ সাল। তুমি কি যাবে?',
        keysTaught: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Slash', 'Digit1', 'KeyG', 'Comma'],
        passAccuracy: 92,
        tipEn: 'Dari is Shift+G. Comma is Comma. Question mark is Shift+Slash.',
        tipBn: 'দাঁড়ি = Shift+G, কমা = Comma, প্রশ্নবোধক = Shift+Slash।'
      }
    ]
  },
  {
    level: 9,
    nameEn: 'Kar & Fola Mastery',
    nameBn: 'কার ও ফলা স্পেশাল রুলস',
    summaryEn: 'Master all 10 Kar signs + Pre-kar typing order + Ro-fola, Ya-fola, Reph & Ba-fola.',
    summaryBn: 'সকল কার ও ফলার পূর্ণাঙ্গ নিয়ম: প্রি-কার, র-ফলা, য-ফলা, রেফ ও ব-ফলা।',
    iconName: 'Layers',
    lessons: [
      {
        id: 'l9-1',
        level: 9,
        subIndex: 1,
        titleEn: 'Pre-Kar Mastery (ি, ে, ৈ)',
        titleBn: 'প্রি-কার নিয়ম (ি, ে, ৈ)',
        category: 'drill',
        descriptionEn: 'Drill typing the pre-kar BEFORE the consonant: D (ি), C (ে), Shift+C (ৈ).',
        descriptionBn: 'কার আগে চেপে বর্ণ টাইপ করার নিয়ম: দিন (D L B), দেশ (C L Shift+M), কৈশোর (Shift+C J ...)',
        targetText: 'দিন দিন দেশ সেবা কৈশোর মেলা চৈত্র রবি কবি চিঠি বিজ্ঞান নদী',
        keysTaught: ['KeyD', 'KeyC'],
        passAccuracy: 92,
        tipEn: 'Always type ি (D) or ে (C) FIRST, then type the consonant!',
        tipBn: 'সর্বদা মনে রাখবেন: ি (D) বা ে (C) বর্ণের আগে চাপতে হবে!'
      },
      {
        id: 'l9-2',
        level: 9,
        subIndex: 2,
        titleEn: 'Composite O-Kar & OU-Kar (ো, ৌ)',
        titleBn: 'যৌগিক ও-কার এবং ঔ-কার (ো, ৌ)',
        category: 'drill',
        descriptionEn: 'Type C (ে) + consonant + F (া) to make ো, and C + consonant + Shift+X (ৗ) to make ৌ.',
        descriptionBn: 'কো = C + J + F, গৌতম = C + O + Shift+X + K + M।',
        targetText: 'কোকিল গোলাপ নৌকা মৌমাছি গৌতম সৌরভ ছোট লোক বোন শোক',
        keysTaught: ['KeyC', 'KeyF', 'KeyX'],
        passAccuracy: 92,
        tipEn: 'For গোলাপ: Type C (ে) -> O (গ) -> F (া) -> Shift+V (ল) -> F (া) -> R (প).',
        tipBn: 'গোলাপ: C (ে) -> O (গ) -> F (া) -> Shift+V (ল) -> F (া) -> R (প)।'
      },
      {
        id: 'l9-3',
        level: 9,
        subIndex: 3,
        titleEn: 'Fola: Ro-fola (্র), Ya-fola (্য) & Reph (র্)',
        titleBn: 'ফলা: র-ফলা (্র), য-ফলা (্য) ও রেফ (র্)',
        category: 'words',
        descriptionEn: 'Practice Ro-fola (Z), Ya-fola (Shift+Z or G+W), and Reph (Shift+A before consonant).',
        descriptionBn: 'র-ফলা (Z), য-ফলা (Shift+Z বা G+W) এবং রেফ (Shift+A বর্ণের পূর্বে)।',
        targetText: 'গ্রাম প্রথম ছাত্র বর্ণ সূর্য কর্ম খ্যাতি ব্যাকরণ বাক্য ব্যক্তিত্ব',
        keysTaught: ['KeyZ', 'KeyA', 'KeyW'],
        passAccuracy: 92,
        tipEn: 'For বর্ণ: H (ব) -> Shift+A (র্) -> Shift+B (ণ). For গ্রাম: O (গ) -> Z (্র) -> F (া) -> M (ম).',
        tipBn: 'রেফ বর্ণের আগে টাইপ করতে হয় (Shift+A), র-ফলা বর্ণের পরে (Z), এবং য-ফলা বর্ণের পরে (Shift+Z)।'
      }
    ]
  },
  {
    level: 10,
    nameEn: 'Conjuncts (যুক্তাক্ষর)',
    nameBn: 'যুক্তাক্ষর নিপুণতা',
    summaryEn: 'Learn 50+ essential conjuncts: ক্ষ, জ্ঞ, ঞ্চ, ঞ্জ, ঙ্গ, ঙ্ক, ন্ত, স্ত, ণ্ড, ত্র, দ্ব, দ্ধ, ভ্র, ক্র...',
    summaryBn: 'সকল গুরুত্বপূর্ণ যুক্তবর্ণ তৈরিতে হসন্ত (G) ব্যবহারের চূড়ান্ত কৌশল।',
    iconName: 'Zap',
    lessons: [
      {
        id: 'l10-1',
        level: 10,
        subIndex: 1,
        titleEn: 'Essential Juktakkhor (ক্ষ, জ্ঞ, ঙ্ক, ঙ্গ)',
        titleBn: 'প্রাথমিক যুক্তাক্ষর (ক্ষ, জ্ঞ, ঙ্ক, ঙ্গ)',
        category: 'drill',
        descriptionEn: 'ক্ষ (J+G+Shift+N), জ্ঞ (U+G+Shift+I), ঙ্ক (Q+G+J), ঙ্গ (Q+G+O).',
        descriptionBn: 'ক্ষ = ক+্+ষ, জ্ঞ = জ+্+ঞ, ঙ্ক = ঙ+্+ক, ঙ্গ = ঙ+্+গ।',
        targetText: 'শিক্ষা ক্ষমা বিজ্ঞান অজ্ঞ অঙ্ক গঙ্গা অঙ্গ বঙ্গ শিক্ষক পরীক্ষা জ্ঞান',
        keysTaught: ['KeyJ', 'KeyG', 'KeyN', 'KeyU', 'KeyI', 'KeyQ', 'KeyO'],
        passAccuracy: 92,
        tipEn: 'ক্ষ = ক (J) + ্ (G) + ষ (Shift+N). Practice this signature Bangla conjunct!',
        tipBn: 'ক্ষ টাইপ করতে: J -> G -> Shift+N।'
      },
      {
        id: 'l10-2',
        level: 10,
        subIndex: 2,
        titleEn: 'Ta & Sa Conjuncts (ন্ত, স্ত, ত্ত, ণ্ড, ষ্ট)',
        titleBn: 'ত, স ও ট-বর্গীয় যুক্তাক্ষর',
        category: 'words',
        descriptionEn: 'ন্ত (B+G+K), স্ত (N+G+K), ত্ত (K+G+K), ণ্ড (Shift+B+G+E), ষ্ট (Shift+N+G+T).',
        descriptionBn: 'শান্তি, পুস্তক, উত্তর, কাণ্ড, কষ্ট, বৃষ্টি, মিষ্টি, রাষ্ট্র।',
        targetText: 'শান্তি অনন্ত পুস্তক রাস্তা উত্তর কাণ্ড বৃষ্টি মিষ্টি কষ্ট রাষ্ট্র দৃষ্টান্ত',
        keysTaught: ['KeyB', 'KeyG', 'KeyK', 'KeyN', 'KeyE', 'KeyT'],
        passAccuracy: 92,
        tipEn: 'For বৃষ্টি: ব (H) + ৃ (A) + ি (D) + ষ (Shift+N) + ্ (G) + ট (T).',
        tipBn: 'বৃষ্টি: H -> A -> D -> Shift+N -> G -> T।'
      },
      {
        id: 'l10-3',
        level: 10,
        subIndex: 3,
        titleEn: 'Da, Dha & Ha Conjuncts (দ্ব, দ্ধ, হ্ম, হ্ন, ঞ্চ)',
        titleBn: 'দ্ব, দ্ধ, হ্ম, হ্ন ও ঞ্চ যুক্তাক্ষর',
        category: 'words',
        descriptionEn: 'দ্ব (L+G+H), দ্ধ (L+G+Shift+L), হ্ম (I+G+M), ঞ্চ (Shift+I+G+Y).',
        descriptionBn: 'দ্বিতীয়, যুদ্ধ, ব্রাহ্মণ, চিহ্ন, পঞ্চম, চঞ্চল, অঞ্জলি।',
        targetText: 'দ্বিতীয় যুদ্ধ সমৃদ্ধি ব্রাহ্মণ চিহ্ন পঞ্চম চঞ্চল অঞ্জলি শ্রদ্ধা বিশ্বস্ত',
        keysTaught: ['KeyL', 'KeyH', 'KeyI', 'KeyM', 'KeyY'],
        passAccuracy: 92,
        tipEn: 'হ্ম = হ (I) + ্ (G) + ম (M). দ্ধ = দ (L) + ্ (G) + ধ (Shift+L).',
        tipBn: 'ব্রাহ্মণ: ব (H) -> র-ফলা (Z) -> া (F) -> হ (I) -> ্ (G) -> ম (M) -> ণ (Shift+B)।'
      }
    ]
  },
  {
    level: 11,
    nameEn: 'Word Practice (Graded Sets)',
    nameBn: 'শব্দ সম্ভার ও দ্রুত টাইপিং',
    summaryEn: 'Frequency-ranked real Bangla words to build muscle memory and high accuracy.',
    summaryBn: 'বহুল ব্যবহৃত বাংলা শব্দের মাধ্যমে পেশাদার টাইপিং রিফ্লেক্স তৈরি।',
    iconName: 'FileText',
    lessons: [
      {
        id: 'l11-1',
        level: 11,
        subIndex: 1,
        titleEn: 'Core Office & Daily Words',
        titleBn: 'দৈনন্দিন ও অফিসিয়াল শব্দ',
        category: 'words',
        descriptionEn: 'High frequency words used in everyday communication and offices.',
        descriptionBn: 'অফিস ও দাপ্তরিক কাজে নিত্যপ্রয়োজনীয় শব্দসমূহ।',
        targetText: 'বাংলাদেশ ঢাকা উন্নয়ন সরকার প্রশাসন সমাজ পরিবর্তন অর্থনীতি শিক্ষা স্বাস্থ্য বাণিজ্য',
        keysTaught: [],
        passAccuracy: 93,
        tipEn: 'Type with a smooth rhythmic tempo across word boundaries.',
        tipBn: 'প্রতিটি শব্দ নির্ভুলভাবে সম্পূর্ণ টাইপ করে স্পেস চাপুন।'
      },
      {
        id: 'l11-2',
        level: 11,
        subIndex: 2,
        titleEn: 'Professional & Technical Terms',
        titleBn: 'প্রফেশনাল ও প্রযুক্তি শব্দমালা',
        category: 'words',
        descriptionEn: 'Computer, internet, technology and scientific terminology.',
        descriptionBn: 'কম্পিউটার, ইন্টারনেট ও আধুনিক বিজ্ঞানের পরিভাষা।',
        targetText: 'কম্পিউটার সফটওয়্যার ইন্টারনেট প্রযুক্তি যোগাযোগ প্রোগ্রামিং নেটওয়ার্ক অ্যাপ্লিকেশন তথ্যপ্রযুক্তি ডিজিটাল',
        keysTaught: [],
        passAccuracy: 93,
        tipEn: 'For সফটওয়্যার: C -> N -> R -> T -> G -> W -> Shift+W -> F -> Shift+W -> F -> V.',
        tipBn: 'দীর্ঘ শব্দগুলো ছোট ছোট সিলেবলে ভাগ করে টাইপ করুন।'
      }
    ]
  },
  {
    level: 12,
    nameEn: 'Sentence Practice & Literature',
    nameBn: 'বাক্য ও সাহিত্য চর্চা',
    summaryEn: 'Short to long literary prose, poetry lines, proverbs, and news sentences.',
    summaryBn: 'রবীন্দ্রনাথ, নজরুল, বাংলা প্রবাদ ও জাতীয় সাহিত্যের নির্বাচিত অংশ।',
    iconName: 'Feather',
    lessons: [
      {
        id: 'l12-1',
        level: 12,
        subIndex: 1,
        titleEn: 'Bangla Proverbs & Wisdom',
        titleBn: 'চিরন্তন বাংলা প্রবাদ বাক্য',
        category: 'sentences',
        descriptionEn: 'Famous Bangla proverbs with punctuation.',
        descriptionBn: 'জ্ঞানগর্ভ বাংলা প্রবাদ ও শিক্ষণীয় বাক্যমালা।',
        targetText: 'পরিশ্রমই সৌভাগ্যের প্রসূতি। সময়ের এক ফোঁড়, অসময়ের দশ ফোঁড়। যেখানে দেখিবে ছাই উড়াইয়া দেখ তাই পাইলেও পাইতে পার অমূল্য রতন।',
        keysTaught: [],
        passAccuracy: 94,
        tipEn: 'Keep an eye on the comma and punctuation spacing.',
        tipBn: 'কমা এবং দাঁড়ি দেওয়ার সময় স্পেসের নিয়ম খেয়াল রাখুন।'
      },
      {
        id: 'l12-2',
        level: 12,
        subIndex: 2,
        titleEn: 'Bangladesh Heritage & Liberation War',
        titleBn: 'বাংলাদেশের ঐতিহ্য ও মুক্তিযুদ্ধ',
        category: 'sentences',
        descriptionEn: 'Historic sentences about 1971 and national pride.',
        descriptionBn: '১৯৭১ সালের মহান মুক্তিযুদ্ধ ও স্বাধীন বাংলাদেশ বিষয়ক বাক্য।',
        targetText: 'একাত্তরের মহান মুক্তিযুদ্ধে লাখো শহীদের রক্তে অর্জিত আমাদের প্রিয় মাতৃভূমি বাংলাদেশ। এই দেশের প্রতিটি ধূলিকণা আমাদের অহংকার।',
        keysTaught: [],
        passAccuracy: 94,
        tipEn: 'Notice the rhythm in long sentences. Breathe naturally.',
        tipBn: 'দীর্ঘ বাক্যে একটানা টাইপ করার সময় স্বাচ্ছন্দ্য বজায় রাখুন।'
      }
    ]
  },
  {
    level: 13,
    nameEn: 'Speed Building Drills',
    nameBn: 'গতি বৃদ্ধির চ্যালেঞ্জ (WPM Drills)',
    summaryEn: 'Targeted drills to push your typing speed to 20, 25, 30, and 40+ WPM.',
    summaryBn: '২০, ২৫, ৩০ এবং ৪০+ WPM গতি অর্জনের জন্য বিশেষ টাইমিং ড্রিল।',
    iconName: 'Gauge',
    lessons: [
      {
        id: 'l13-1',
        level: 13,
        subIndex: 1,
        titleEn: '20 WPM Foundation Drill',
        titleBn: '২০ WPM মৌলিক স্পিড ড্রিল',
        category: 'speed',
        descriptionEn: 'Reach 20 WPM speed with minimum 92% accuracy.',
        descriptionBn: 'কমপক্ষে ৯২% নির্ভুলতা বজায় রেখে ২০ WPM গতি অর্জন করুন।',
        targetText: 'বাংলা আমাদের প্রাণের ভাষা। আমরা বাংলায় কথা বলি, বাংলায় স্বপ্ন দেখি। একুশের চেতনা আমাদের এগিয়ে চলার প্রেরণা যোগায়।',
        keysTaught: [],
        passAccuracy: 92,
        targetWpm: 20,
        tipEn: 'Speed comes automatically from accuracy. Never sacrifice accuracy for speed!',
        tipBn: 'গতি বাড়ানোর গোপন রহস্য হলো নির্ভুলতা। নির্ভুল হলে গতি নিজে থেকেই বাড়বে!'
      },
      {
        id: 'l13-2',
        level: 13,
        subIndex: 2,
        titleEn: '30 WPM Advanced Sprint',
        titleBn: '৩০ WPM অ্যাডভান্সড স্প্রিন্ট',
        category: 'speed',
        descriptionEn: 'Push towards professional data-entry benchmark speed.',
        descriptionBn: 'পেশাদার ডাটা এন্ট্রি স্পিড অর্জনের লক্ষ্যমাত্রা ড্রিল।',
        targetText: 'জ্ঞানের আলো ছড়িয়ে দিতে বই পড়ার কোনো বিকল্প নেই। নিয়মিত অনুশীলনের মাধ্যমে যে কোনো কঠিন কাজ সহজ হয়ে যায়। আত্মবিশ্বাসই সাফল্যের মূল চাবিকাঠি।',
        keysTaught: [],
        passAccuracy: 94,
        targetWpm: 30,
        tipEn: 'Scan 2-3 words ahead while typing.',
        tipBn: 'টাইপ করার সময় বর্তমান শব্দের পাশাপাশি পরবর্তী দুই-তিনটি শব্দের দিকে চোখ রাখুন।'
      }
    ]
  },
  {
    level: 14,
    nameEn: 'Real-World & Govt Exam Test',
    nameBn: 'সরকারি ও ব্যাংক চাকরির প্র্যাকটিস',
    summaryEn: 'Official ministry circulars, public bank exam paragraphs, and certified test mode.',
    summaryBn: 'বাংলাদেশ সরকারি কর্মকমিশন (BPSC) ও ব্যাংকের টাইপিং পরীক্ষার বাস্তবসম্মত অনুচ্ছেদ।',
    iconName: 'Award',
    lessons: [
      {
        id: 'l14-1',
        level: 14,
        subIndex: 1,
        titleEn: 'Govt Office Circular Style',
        titleBn: 'সরকারি প্রজ্ঞাপন ও অফিস নোটিশ',
        category: 'exam',
        descriptionEn: 'Simulated official govt circular formatting test.',
        descriptionBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের দাপ্তরিক পত্রের আদলে রচিত অনুচ্ছেদ।',
        targetText: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার। সংস্থাপন মন্ত্রণালয়, বাংলাদেশ সচিবালয়, ঢাকা। এতদ্বারা সংশ্লিষ্ট সকলের অবগতির জন্য জানানো যাইতেছে যে, আগামী রবিবার হইতে সকল কার্যক্রম ডিজিটাল পদ্ধতিতে পরিচালিত হইবে। আদেশক্রমে যথাযথ কর্তৃপক্ষের অনুমোদন সাপেক্ষে ইহা কার্যকর করা হইল।',
        keysTaught: [],
        passAccuracy: 95,
        targetWpm: 25,
        tipEn: 'Official exams deduct heavy marks for punctuation and spelling errors.',
        tipBn: 'সরকারি পরীক্ষায় বানান বা যতিচিহ্নের ভুলে নেগেটিভ মার্ক থাকে, অত্যন্ত সতর্ক থাকুন।'
      },
      {
        id: 'l14-2',
        level: 14,
        subIndex: 2,
        titleEn: 'Graduation Exam: Certified Typist',
        titleBn: 'চূড়ান্ত সনদ পরীক্ষা (সার্টিফিকেট টেস্ট)',
        category: 'exam',
        descriptionEn: 'The final comprehensive test covering all aspects of Bijoy typing.',
        descriptionBn: 'টাইপশিখি গ্র্যাজুয়েশন পরীক্ষা। সফল হলে ভেরিফাইড সার্টিফিকেট আনলক হবে।',
        targetText: 'ডিজিটাল বাংলাদেশের সফল বাস্তবায়নের পর আমরা এখন স্মার্ট বাংলাদেশের পথে এগিয়ে যাচ্ছি। তথ্য ও যোগাযোগ প্রযুক্তির অভূতপূর্ব উন্নয়ন দেশের মানুষের জীবনযাত্রাকে সহজ ও গতিশীল করেছে। কর্মসংস্থান সৃষ্টি, শিক্ষা ও স্বাস্থ্যসেবার আধুনিকায়ন এবং তরুণ প্রজন্মের দক্ষতা বৃদ্ধিতে প্রযুক্তি আজ এক অপরিহার্য চালিকাশক্তি। সততা, নিষ্ঠা ও কঠোর শ্রমের মাধ্যমে একটি সমৃদ্ধ জাতি গড়ে তোলাই আমাদের অঙ্গীকার।',
        keysTaught: [],
        passAccuracy: 95,
        targetWpm: 28,
        tipEn: 'Congratulations on reaching the final test! Stay calm and maintain steady flow.',
        tipBn: 'অভিনন্দন! আপনি চূড়ান্ত ধাপে পৌঁছেছেন। স্থির চিত্তে টাইপ করুন।'
      }
    ]
  }
];

export const TIMED_TEST_PASSAGES = [
  {
    id: 'test-1',
    titleEn: 'The Spirit of Mother Language',
    titleBn: 'ভাষার মর্যাদা ও একুশে ফেব্রুয়ারি',
    category: 'culture',
    text: '১৯৫২ সালের ২১শে ফেব্রুয়ারি আমাদের জাতীয় ইতিহাসের এক অবিস্মরণীয় দিন। মায়ের ভাষার মর্যাদা রক্ষার জন্য সেদিন রফিক, সালাম, বরকত, জব্বারসহ নাম না জানা অনেকেই রাজপথে বুকের তাজা রক্ত ঢেলে দিয়েছিলেন। পৃথিবীর ইতিহাসে মাতৃভাষার জন্য জীবন উৎসর্গের এমন দৃষ্টান্ত বিরল। এই আত্মত্যাগের স্বীকৃতিস্বরূপ ইউনেস্কো ১৯৯৯ সালে ২১শে ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে ঘোষণা করে। আজ বিশ্বজুড়ে এই দিনটি যথাযোগ্য মর্যাদায় পালিত হয়।'
  },
  {
    id: 'test-2',
    titleEn: 'Rivers and Heritage of Bangladesh',
    titleBn: 'নদীমাতৃক বাংলাদেশ ও পল্লী প্রকৃতি',
    category: 'nature',
    text: 'বাংলাদেশ নদীমাতৃক দেশ। পদ্মা, মেঘনা, যমুনা, সুরমা ও কর্ণফুলীসহ অসংখ্য নদী জালের মতো সারা দেশে ছড়িয়ে রয়েছে। এই নদীগুলো আমাদের কৃষি, অর্থনীতি ও সংস্কৃতির অবিচ্ছেদ্য অংশ। বর্ষাকালে নদীগুলো যখন দুকূল ছাপিয়ে প্রবাহিত হয়, তখন সৃষ্টি হয় এক মনোরম দৃশ্য। পল্লী বাংলার সবুজ শ্যামল প্রকৃতি, রাখালের বাঁশির সুর আর কৃষকের ফসলের মাঠ আমাদের হৃদয়কে প্রশান্তিতে ভরিয়ে তোলে। প্রকৃতির এই রূপ সত্যিই অতুলনীয়।'
  },
  {
    id: 'test-3',
    titleEn: 'Digital Bangladesh and Smart Future',
    titleBn: 'স্মার্ট বাংলাদেশ ও আধুনিক তথ্যপ্রযুক্তি',
    category: 'tech',
    text: 'বর্তমান যুগ তথ্য ও প্রযুক্তির যুগ। আধুনিক বিশ্বের সাথে তাল মিলিয়ে বাংলাদেশও তথ্যপ্রযুক্তির ক্ষেত্রে অভাবনীয় সাফল্য অর্জন করেছে। দেশের প্রত্যন্ত অঞ্চলেও আজ উচ্চগতির ইন্টারনেট সেবা পৌঁছে গেছে। নাগরিক সেবা প্রাপ্তি, আর্থিক লেনদেন, ই-কমার্স এবং ফ্রিল্যান্সিংয়ে আমাদের তরুণ প্রজন্ম বিশ্ব দরবারে নিজেদের মেধার স্বাক্ষর রাখছে। কৃত্রিম বুদ্ধিমত্তা ও আধুনিক প্রযুক্তির সঠিক ব্যবহারে আমরা গড়ে তুলব এক সমৃদ্ধ অর্থনীতি।'
  },
  {
    id: 'test-4',
    titleEn: 'Official Office Memo & Notice',
    titleBn: 'দাপ্তরিক কার্যবিবরণী ও প্রজ্ঞাপন',
    category: 'exam',
    text: 'উপর্যুক্ত বিষয়ের প্রেক্ষিতে জানানো যাইতেছে যে, বার্ষিক কর্মসম্পাদন চুক্তির আওতায় সকল কর্মকর্তা ও কর্মচারীদের কম্পিউটার টাইপিং দক্ষতা বৃদ্ধি আবশ্যক। আগামী সপ্তাহ হইতে প্রতি কর্মদিবসে আধঘণ্টা করিয়া টাইপিং অনুশীলন কার্যক্রম চালু থাকিবে। যথাযথ কর্তৃপক্ষের অনুমোদনক্রমে এই আদেশ অবিলম্বে কার্যকর হইবে এবং সংশ্লিষ্ট শাখাপ্রধানকে নিয়মিত অগ্রগতি প্রতিবেদন প্রেরণের নির্দেশ প্রদান করা হইল।'
  }
];
