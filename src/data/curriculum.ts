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
    nameEn: 'Orientation & Finger Setup',
    nameBn: 'পরিচিতি ও আঙুল বিন্যাস',
    summaryEn: 'Learn ergonomic posture, home row finger rest, and tactile bump guides.',
    summaryBn: 'সঠিক আঙুল স্থাপন, হোম রো অবস্থান এবং কীবোর্ডের স্পর্শবিন্দু অনুভব করে বসা।',
    iconName: 'Compass',
    lessons: [
      {
        id: 'l0-1',
        level: 0,
        subIndex: 1,
        titleEn: 'Home Row Finger Placement',
        titleBn: 'হোম রো আঙুল স্থাপন',
        category: 'intro',
        descriptionEn: 'Place your left fingers on A S D F and right fingers on J K L ; with thumbs on Space.',
        descriptionBn: 'কীবোর্ডের F (বাম তর্জনী) এবং J (ডান তর্জনী) এর উঁচু দাগ অনুভব করে আঙুল রাখুন। থাম্ব স্পেসবারে রাখুন।',
        targetText: 'ক ক ক ব ব ব ত ত ত দ দ দ ক ত দ ব ক ত দ ব',
        keysTaught: ['KeyJ', 'KeyK', 'KeyL', 'KeyH', 'Space'],
        passAccuracy: 85,
        targetWpm: 10,
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
        descriptionEn: 'Practice rhythm with spacebar between characters using your thumbs.',
        descriptionBn: 'অক্ষরের মাঝে বৃদ্ধাঙ্গুলি দিয়ে স্বাভাবিক গতিতে স্পেস চাপুন। ভুল হলে হালকা করে ব্যাকস্পেস দিন।',
        targetText: 'ক ক ক ত ত ত দ দ দ ব ব ব ক ত দ ব ক ক ত ত দ দ ব ব',
        keysTaught: ['KeyJ', 'KeyK', 'KeyL', 'KeyH', 'Space'],
        passAccuracy: 88,
        targetWpm: 12,
        tipEn: 'Keep hands floating gently over the keyboard without resting wrists heavily.',
        tipBn: 'কবজি টেবিলের ওপর বেশি চেপে রাখবেন না, হালকা ভাসিয়ে রাখুন।'
      }
    ]
  },
  {
    level: 1,
    nameEn: 'Home Row Foundation — 2 Letters at a Time',
    nameBn: 'হোম রো ভিত্তি ও ২ বর্ণ অনুশীলন',
    summaryEn: 'Master home row 2 letters at a time: Ka & Ta (J, K) -> Da & Ba (L, H) -> Words -> Kar signs.',
    summaryBn: 'হোম রো-এর মূল বর্ণগুলো ২টা ২টা করে আয়ত্ত করুন এবং ধাপে ধাপে বাস্তব শব্দ তৈরি শিখুন।',
    iconName: 'Keyboard',
    lessons: [
      {
        id: 'l1-1',
        level: 1,
        subIndex: 1,
        titleEn: 'Ka & Ta Keys (ক ও ত)',
        titleBn: 'ক ও ত তর্জনী ও মধ্যমা ড্রিল',
        category: 'drill',
        descriptionEn: 'Learn J (ক Ka - Right index) and K (ত Ta - Right middle). Repeat 2-letter combos & form words.',
        descriptionBn: 'ডান হাতের তর্জনী দিয়ে ক (J) এবং মধ্যমা দিয়ে ত (K) চাপুন। ২ অক্ষরের ছন্দ ও শব্দ তৈরি করুন।',
        targetText: 'ক ত কত তক কক তত ক ত কত কক তত ক কত তক কক তত কত তক ক ক ত ত কত ক ত কত তক',
        keysTaught: ['KeyJ', 'KeyK', 'Space'],
        passAccuracy: 88,
        targetWpm: 14,
        tipEn: 'Use right index finger on J for ক, right middle on K for ত. Notice words: কত, তক!',
        tipBn: 'ক (J) চাপতে ডান তর্জনী এবং ত (K) চাপতে ডান মধ্যমা ব্যবহার করুন। শব্দ: কত, তক।'
      },
      {
        id: 'l1-2',
        level: 1,
        subIndex: 2,
        titleEn: 'Da & Ba Keys (দ ও ব)',
        titleBn: 'দ ও ব অনামিকা ও তর্জনী ড্রিল',
        category: 'drill',
        descriptionEn: 'Learn L (দ Da - Right ring) and H (ব Ba - Right index inward).',
        descriptionBn: 'ডান অনামিকা দিয়ে দ (L) এবং ডান তর্জনী প্রসারিত করে ব (H) চাপুন।',
        targetText: 'দ ব দব বদ দদ বব দ ব বদ দব দদ বব ব দ দ ব বদ দব ব ব দ দ বদ দব ব দ দব বদ',
        keysTaught: ['KeyL', 'KeyH', 'Space'],
        passAccuracy: 88,
        targetWpm: 14,
        tipEn: 'Use right ring finger on L for দ, right index reaching left to H for ব. Words: বদ, দব!',
        tipBn: 'দ (L) ডান অনামিকা এবং ব (H) ডান তর্জনী ভেতরের দিকে প্রসারিত করে চাপুন। শব্দ: বদ, দব।'
      },
      {
        id: 'l1-3',
        level: 1,
        subIndex: 3,
        titleEn: '4 Consonants Combined Words (ক, ত, দ, ব)',
        titleBn: '৪ বর্ণের সমন্বিত হোম শব্দ',
        category: 'words',
        descriptionEn: 'Form rich meaningful words combining Ka, Ta, Da, Ba (কত, কব, বক, তব, বদ, কদ).',
        descriptionBn: 'ক ত দ ব চারটি বর্ণ মিলিয়ে অর্থপূর্ণ শব্দসমূহ সাবলীলভাবে টাইপ করুন।',
        targetText: 'কত কব বক তব বদ কদ কত বক তব বদ কত কব বক তব কত বক তব বদ কদ বক কত কব তব',
        keysTaught: ['KeyJ', 'KeyK', 'KeyL', 'KeyH', 'Space'],
        passAccuracy: 90,
        targetWpm: 16,
        tipEn: 'Type with smooth rhythm. Feel the hand flow between fingers without stopping.',
        tipBn: 'ক ত দ ব এই ৪টি বর্ণ দিয়ে অর্থপূর্ণ ছোট ছোট শব্দ সাবলীল ছন্দে টাইপ করুন।'
      },
      {
        id: 'l1-4',
        level: 1,
        subIndex: 4,
        titleEn: 'Aa-kar & I-kar (া ও ি কার-চিহ্ন)',
        titleBn: 'া ও ি কার-চিহ্ন ও শব্দ',
        category: 'drill',
        descriptionEn: 'Learn Aa-kar (F - Left index) and I-kar (D - Left middle). Pre-kar rule: type D before consonant!',
        descriptionBn: 'বাম তর্জনী দিয়ে া (F) এবং বাম মধ্যমা দিয়ে ি (D) চাপুন। বিজয়ে ি বর্ণের আগে টাইপ করতে হয় (D+J = কি)!',
        targetText: 'কা কি তা তি দা দি বা বি কা কি তা তি কাকি কাকা বাবা দাদা বাতি বাকি দিদি কবি বাদা কাদা',
        keysTaught: ['KeyF', 'KeyD', 'KeyJ', 'KeyK', 'KeyL', 'KeyH'],
        passAccuracy: 90,
        targetWpm: 18,
        tipEn: 'Remember Bijoy order: Type ি (D) FIRST, then consonant (J) for কি! Type consonant then F for কা.',
        tipBn: 'মনে রাখবেন: ি (D) বর্ণের পূর্বে চাপতে হয় (D তারপর J চাপলে কি হয়)। া (F) বর্ণের পরে চাপে।'
      },
      {
        id: 'l1-5',
        level: 1,
        subIndex: 5,
        titleEn: 'U-kar & Ri-kar (ু ও ৃ কার-চিহ্ন)',
        titleBn: 'ু ও ৃ কার-চিহ্ন ও শব্দ',
        category: 'drill',
        descriptionEn: 'Learn U-kar (S - Left ring) and Ri-kar (A - Left pinky). Form words like কুকু, বুবু, কৃতি.',
        descriptionBn: 'বাম অনামিকা দিয়ে ু (S) এবং বাম কনিষ্ঠা দিয়ে ৃ (A) চাপুন। কুকু, বুবু, কৃতি শব্দ অনুশীলন করুন।',
        targetText: 'কু তু দু বু কৃ তৃ দৃ বৃ কু তু দু বু বুবু কুকু কৃতি দুতি কৃত বৃত কাদা বাতি বাদা বাকি',
        keysTaught: ['KeyS', 'KeyA', 'KeyJ', 'KeyK', 'KeyL', 'KeyH'],
        passAccuracy: 90,
        targetWpm: 18,
        tipEn: 'ু (S) and ৃ (A) are typed AFTER the consonant (e.g. J then S makes কু, J then A makes কৃ).',
        tipBn: 'ু (S) বাম অনামিকা এবং ৃ (A) বাম কনিষ্ঠা দিয়ে বর্ণের পরে চাপুন।'
      },
      {
        id: 'l1-6',
        level: 1,
        subIndex: 6,
        titleEn: 'Home Row Complete Words & Phrases',
        titleBn: 'হোম রো সম্পূর্ণ শব্দ ভাণ্ডার ও সাবলীলতা',
        category: 'words',
        descriptionEn: 'Form complete real Bangla words and short phrases using all 8 home row keys.',
        descriptionBn: 'হোম রো-এর সবগুলো বর্ণ ও কার চিহ্ন দিয়ে পূর্ণাঙ্গ শব্দ ও বাক্য সাবলীল ছন্দে টাইপ করুন।',
        targetText: 'কত কব বক তব কাদা বাদা বাতা বাতি বাকি কবি কৃতি কাকা তাতা বাবা দাদা দিদি বুবু কুকু বাতি জ্বলে',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'],
        passAccuracy: 92,
        targetWpm: 20,
        tipEn: 'Congratulations! You have mastered the entire Home Row! Keep typing without looking down.',
        tipBn: 'হোম রো-এর সবগুলো বর্ণ ও কার আয়ত্ত হয়ে গেছে! আঙুল না তুলে ছন্দ ধরে টাইপ করুন।'
      }
    ]
  },
  {
    level: 2,
    nameEn: 'Top Row Reach — 2 Letters at a Time',
    nameBn: 'টপ রো সম্প্রসারণ ও ২ বর্ণ অনুশীলন',
    summaryEn: 'Reach upward accurately 2 keys at a time: Pa & Ja (R, U) -> Da & Ha (E, I) -> Ya & Ga (W, O) -> Words.',
    summaryBn: 'হোম রো থেকে উপরের সারির বর্ণসমূহ ২টা ২টা করে আয়ত্ত করুন এবং নতুন শব্দ তৈরি শিখুন।',
    iconName: 'ArrowUpCircle',
    lessons: [
      {
        id: 'l2-1',
        level: 2,
        subIndex: 1,
        titleEn: 'Pa & Ja Keys (প ও জ)',
        titleBn: 'প ও জ তর্জনী সম্প্রসারণ',
        category: 'drill',
        descriptionEn: 'Reach up: left index to R (প Pa), right index to U (জ Ja). Form words: পদ, জল, পান, পূজা.',
        descriptionBn: 'বাম তর্জনী উপরে তুলে R (প) এবং ডান তর্জনী উপরে তুলে U (জ) চাপুন। শব্দ: পদ, জল, পান, পূজা।',
        targetText: 'প জ পজ जप পপ জজ পট পদ জল পান পূজা পাপা প জ জল পান পদ পাপ জল পুতুল জপ পূজা',
        keysTaught: ['KeyR', 'KeyU'],
        passAccuracy: 90,
        targetWpm: 18,
        tipEn: 'R is Pa (প) and U is Ja (জ). Snap your index fingers back to F and J after each stroke.',
        tipBn: 'বাম তর্জনী উপরে তুলে R (প) এবং ডান তর্জনী উপরে তুলে U (জ) চাপুন।'
      },
      {
        id: 'l2-2',
        level: 2,
        subIndex: 2,
        titleEn: 'Da & Ha Keys (ড ও হ)',
        titleBn: 'ড ও হ মধ্যমা সম্প্রসারণ',
        category: 'drill',
        descriptionEn: 'Reach up: left middle to E (ড Da), right middle to I (হ Ha). Form words: ডাল, হাত, হাট, হার, দেহ.',
        descriptionBn: 'বাম মধ্যমা উপরে তুলে E (ড) এবং ডান মধ্যমা উপরে তুলে I (হ) চাপুন। শব্দ: ডাল, হাত, হাট, হার, দেহ।',
        targetText: 'ড হ ডহ হড ডড হহ ডাল হাত হাট হার ডাহুক দেহ ড হ ডাল হাত দেহ হাট ডাক ডাহা হিত',
        keysTaught: ['KeyE', 'KeyI'],
        passAccuracy: 90,
        targetWpm: 18,
        tipEn: 'E is Da (ড) and I is Ha (হ). Keep other fingers resting gently on home keys.',
        tipBn: 'বাম মধ্যমা উপরে তুলে E (ড) এবং ডান মধ্যমা উপরে তুলে I (হ) চাপুন।'
      },
      {
        id: 'l2-3',
        level: 2,
        subIndex: 3,
        titleEn: 'Ya & Ga Keys (য ও গ)',
        titleBn: 'য ও গ অনামিকা সম্প্রসারণ',
        category: 'drill',
        descriptionEn: 'Reach up: left ring to W (য Ya), right ring to O (গ Ga). Form words: গান, গাল, যায়, যুগ, যোগ, গুরু.',
        descriptionBn: 'বাম অনামিকা উপরে তুলে W (য) এবং ডান অনামিকা উপরে তুলে O (গ) চাপুন। শব্দ: গান, গাল, যায়, যুগ, যোগ, গুরু।',
        targetText: 'য গ যগ গয যয гг গান গাল যায় যুগ যোগ গুরু গান গাল যায় গুরু গা যুগ যোগ গোলাপ গীত',
        keysTaught: ['KeyW', 'KeyO'],
        passAccuracy: 90,
        targetWpm: 18,
        tipEn: 'W is Ya (য) and O is Ga (গ). Ring finger reaches require deliberate control.',
        tipBn: 'বাম অনামিকা উপরে তুলে W (য) এবং ডান অনামিকা উপরে তুলে O (গ) চাপুন।'
      },
      {
        id: 'l2-4',
        level: 2,
        subIndex: 4,
        titleEn: 'Ta & Cha Keys (ট ও চ)',
        titleBn: 'ট ও চ তর্জনী ভিতরের কী',
        category: 'drill',
        descriptionEn: 'Reach index fingers inward-up: T (ট Ta) and Y (চ Cha). Form words: টাকা, চাল, চোখ, চিঠি, টুপি.',
        descriptionBn: 'বাম তর্জনী উপরে-ভেতরে T (ট) এবং ডান তর্জনী উপরে-ভেতরে Y (চ) চাপুন। শব্দ: টাকা, চাল, চিঠি, টুপি।',
        targetText: 'ট চ টচ চট টট চচ টাকা চাল চোখ চিঠি টুপি চক টাকা চাল চোখ চিঠি টুপি চা চাকা চাঁপা',
        keysTaught: ['KeyT', 'KeyY'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'T is Ta (ট) and Y is Cha (চ). Snap fingers back to home anchors immediately.',
        tipBn: 'ট (T) বাম তর্জনী ভিতরের দিকে এবং চ (Y) ডান তর্জনী ভিতরের দিকে উপরে গিয়ে চাপুন।'
      },
      {
        id: 'l2-5',
        level: 2,
        subIndex: 5,
        titleEn: 'Unga & Rra Keys (ঙ ও ড়)',
        titleBn: 'ঙ ও ড় কনিষ্ঠা সম্প্রসারণ',
        category: 'drill',
        descriptionEn: 'Reach pinkies up: Q (ঙ Unga) and P (ড় Rra). Form words: ডাঙা, গাড়ি, বাড়ি, ঘুড়ি, রঙ, রাঙা.',
        descriptionBn: 'বাম কনিষ্ঠা উপরে তুলে Q (ঙ) এবং ডান কনিষ্ঠা উপরে তুলে P (ড়) চাপুন। শব্দ: ডাঙা, গাড়ি, বাড়ি, ঘুড়ি, রঙ।',
        targetText: 'ঙ ড় ঙড় ড়ঙ ঙঙ ড়ড় ডাঙা গাড়ি বাড়ি ঘুড়ি রিং ডাঙা গাড়ি বাড়ি ঘুড়ি রঙ রাঙা বড় জড়া ঘড়ি',
        keysTaught: ['KeyQ', 'KeyP'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'Q is Unga (ঙ) and P is Rra (ড়). Pinkies control the outer columns of the keyboard.',
        tipBn: 'ঙ (Q) বাম কনিষ্ঠা উপরে এবং ড় (P) ডান কনিষ্ঠা উপরে তুলে চাপুন।'
      },
      {
        id: 'l2-6',
        level: 2,
        subIndex: 6,
        titleEn: 'Top Row Complete Words & Sentences',
        titleBn: 'টপ রো সমন্বিত শব্দ ও বাক্য',
        category: 'words',
        descriptionEn: 'Combine all top row consonants with home row vowels to type full real words.',
        descriptionBn: 'টপ রো-এর সকল বর্ণ ও হোম রো-এর কার মিলিয়ে সমৃদ্ধ শব্দ ও বাক্য তৈরি করুন।',
        targetText: 'পাগল গোলাপ কাগজ বাতাস চকচক জগজগ হাট বাজার জাদুঘর চাকা গান ডাল হাত গাড়ি বাড়ি টাকা চিঠি',
        keysTaught: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'Return your fingers to Home Row (ASDF JKL) after each reach to maintain spatial awareness.',
        tipBn: 'টপ রো কি চেপে আঙুল আবার সাথে সাথে হোম রো-তে ফিরিয়ে আনুন।'
      }
    ]
  },
  {
    level: 3,
    nameEn: 'Bottom Row Reach — 2 Letters at a Time',
    nameBn: 'বটম রো সম্প্রসারণ ও ২ বর্ণ অনুশীলন',
    summaryEn: 'Reach downward accurately 2 keys at a time: Ra & Ma (V, M) -> Na & Sa (B, N) -> E-kar & O (C, X).',
    summaryBn: 'নিচের সারির বর্ণসমূহ ২টা ২টা করে আয়ত্ত করে তিন সারির সমন্বিত বাক্য তৈরি শিখুন।',
    iconName: 'ArrowDownCircle',
    lessons: [
      {
        id: 'l3-1',
        level: 3,
        subIndex: 1,
        titleEn: 'Ra & Ma Keys (র ও ম)',
        titleBn: 'র ও ম তর্জনী বটম ড্রিল',
        category: 'drill',
        descriptionEn: 'Reach down: left index to V (র Ra), right index to M (ম Ma). Form words: রাম, রাত, মন, মা, মামা, রবি.',
        descriptionBn: 'বাম তর্জনী নিচে নামিয়ে V (র) এবং ডান তর্জনী নিচে নামিয়ে M (ম) চাপুন। শব্দ: রাম, রাত, মন, মা, মামা, রবি।',
        targetText: 'র ম রম মর রর মম রাম রাত মন মা মামা রবি র ম রাম রাত মন মা মামা রবি মার মালা রমা',
        keysTaught: ['KeyV', 'KeyM'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'V is Ra (র) and M is Ma (ম). Two of the most frequent consonants in Bengali!',
        tipBn: 'বাম তর্জনী নিচে নামিয়ে V (র) এবং ডান তর্জনী নিচে নামিয়ে M (ম) চাপুন।'
      },
      {
        id: 'l3-2',
        level: 3,
        subIndex: 2,
        titleEn: 'Na & Sa Keys (ন ও স)',
        titleBn: 'ন ও স তর্জনী সম্প্রসারণ',
        category: 'drill',
        descriptionEn: 'Reach index fingers inward-down: B (ন Na) and N (স Sa). Form words: নাম, নদী, সাগর, সময়, সকাল, সোনা.',
        descriptionBn: 'বাম তর্জনী দিয়ে B (ন) এবং ডান তর্জনী দিয়ে N (স) চাপুন। শব্দ: নাম, নদী, সাগর, সময়, সকাল, সোনা।',
        targetText: 'ন স সন নস নন সস নাম নদী সাগর সময় সকাল সোনা ন স নাম নদী সাগর সময় সকাল সুর সুনীল নাসিক',
        keysTaught: ['KeyB', 'KeyN'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'B is Na (ন) and N is Sa (স). Notice how frequently these appear in everyday Bengali sentences.',
        tipBn: 'বাম তর্জনী দিয়ে B (ন) এবং ডান তর্জনী দিয়ে N (স) চাপুন। বাংলায় এগুলো বহুল ব্যবহৃত বর্ণ।'
      },
      {
        id: 'l3-3',
        level: 3,
        subIndex: 3,
        titleEn: 'E-kar & O (ে ও ও স্বরধ্বনি ও কার)',
        titleBn: 'ে ও ও স্বরধ্বনি ও কার',
        category: 'drill',
        descriptionEn: 'Learn C (ে E-kar - Pre-kar before consonant) and X (ও O standalone vowel). Form words: বেশ, তেল, ওল, ওষুধ.',
        descriptionBn: 'বাম মধ্যমা দিয়ে C (ে) এবং বাম অনামিকা দিয়ে X (ও) চাপুন। বিজয়ে C বর্ণের পূর্বে চাপতে হয় (C+J = কে)!',
        targetText: 'কে তে দে বে রো গো জো তো বেশ তেল ওল ওষুধ ও কে তে বেশ তেল ওষুধ রোজা দেশ মেলা সেবা',
        keysTaught: ['KeyC', 'KeyX'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'Pre-kar rule: Press C (ে) FIRST, then consonant (e.g. C then J = কে). For ও, press X directly.',
        tipBn: 'C হলো এ-কার (ে)। বিজয়ে বর্ণের আগে C চাপতে হয়। ও লিখতে সরাসরি X চাপুন।'
      },
      {
        id: 'l3-4',
        level: 3,
        subIndex: 4,
        titleEn: 'Ro-fola & Bisarga (্র ও ঃ)',
        titleBn: '্র ফলা ও যতিচিহ্ন অনুশীলন',
        category: 'drill',
        descriptionEn: 'Learn Z (্র Ro-fola) and Slash / (ঃ Bisarga). Form words: গ্রাম, প্রথম, প্রেম, ব্রত, দুঃখ, পুনঃ.',
        descriptionBn: 'বাম কনিষ্ঠা নিচে Z (্র) এবং ডান কনিষ্ঠা নিচে Slash (ঃ) চাপুন। শব্দ: গ্রাম, প্রথম, প্রেম, ব্রত, দুঃখ।',
        targetText: 'গ্রাম প্রথম প্রেম ব্রত দুঃখ পুনঃ গ্রাম প্রথম প্রেম ব্রত দুঃখ পুনঃ অতঃপর ক্রম প্রিয় তীব্র',
        keysTaught: ['KeyZ', 'Slash'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'Z types Ro-fola (্র) attached after a consonant. Slash types Bisarga (ঃ).',
        tipBn: 'Z চাপলে র-ফলা (্র) হয় এবং Slash (/) চাপলে বিসর্গ (ঃ) হয়।'
      },
      {
        id: 'l3-5',
        level: 3,
        subIndex: 5,
        titleEn: 'All 3 Rows Combined Sentences',
        titleBn: 'তিন সারির সমন্বিত বাক্য ভাণ্ডার',
        category: 'sentences',
        descriptionEn: 'Full fluent sentences using unshifted characters across Home, Top and Bottom rows.',
        descriptionBn: 'কীবোর্ডের তিনটি সারির বর্ণ ব্যবহার করে পূর্ণাঙ্গ বাক্য তৈরির চমৎকার অনুশীলন।',
        targetText: 'সকাল বেলা সূর্য ওঠে। নদীর পানি কলকল করে বয়। মন দিয়ে পড়ালেখা করো। বাবা বাজারে যান। মা খাবার দেন।',
        keysTaught: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'Hitting Space cleanly with your thumb after every word establishes steady typing rhythm.',
        tipBn: 'প্রতিটি শব্দের পর থাম্ব দিয়ে নির্ভুলভাবে স্পেস দিন।'
      }
    ]
  },
  {
    level: 4,
    nameEn: 'Swaroborno Mastery (Vowels)',
    nameBn: 'স্বরবর্ণ মালা',
    summaryEn: 'Learn standalone vowels: অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ using G (Linker) and shortcuts.',
    summaryBn: 'স্বাধীন স্বরবর্ণসমূহ (অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ) টাইপ করার পূর্ণাঙ্গ নিয়ম শিখুন।',
    iconName: 'BookOpen',
    lessons: [
      {
        id: 'l4-1',
        level: 4,
        subIndex: 1,
        titleEn: 'Basic Swaroborno (অ আ ই ঈ উ ঊ)',
        titleBn: 'প্রাথমিক স্বরবর্ণ (অ আ ই ঈ উ ঊ)',
        category: 'drill',
        descriptionEn: 'Learn অ (Shift+F), আ (G+F), ই (G+D), ঈ (G+Shift+D), উ (G+S), ঊ (G+Shift+S).',
        descriptionBn: 'অ (Shift+F), আ (G+F), ই (G+D), ঈ (G+Shift+D), উ (G+S), ঊ (G+Shift+S) এবং সংশ্লিষ্ট শব্দ।',
        targetText: 'অ আ ই ঈ উ ঊ অ আ ই ঈ উ ঊ অমর আকাশ ইলিশ ঈগল উট ঊষা অমর আকাশ ইলিশ',
        keysTaught: ['KeyF', 'KeyG', 'KeyD', 'KeyS'],
        passAccuracy: 90,
        targetWpm: 18,
        tipEn: 'G key acts as a Linker for standalone vowels. Except for অ (Shift+F) and ও (X).',
        tipBn: 'অ ছাড়া অন্যান্য স্বরবর্ণে প্রথমে G (লিংকার) চেপে তারপর কার চিহ্ন চাপতে হয়।'
      },
      {
        id: 'l4-2',
        level: 4,
        subIndex: 2,
        titleEn: 'Advanced Swaroborno (ঋ এ ঐ ও ঔ)',
        titleBn: 'উচ্চতর স্বরবর্ণ (ঋ এ ঐ ও ঔ)',
        category: 'drill',
        descriptionEn: 'Learn ঋ (G+A), এ (G+C), ঐ (G+Shift+C), ও (X), ঔ (G+Shift+X).',
        descriptionBn: 'ঋ (G+A), এ (G+C), ঐ (G+Shift+C), ও (X), ঔ (G+Shift+X) এবং তাদের শব্দসমূহ।',
        targetText: 'ঋ এ ঐ ও ঔ ঋ এ ঐ ও ঔ ঋণ একতা ঐক্য ওল ঔষধ ঋষি একা ঐক্য ওজন ঔষধালয়',
        keysTaught: ['KeyG', 'KeyA', 'KeyC', 'KeyX'],
        passAccuracy: 90,
        targetWpm: 18,
        tipEn: 'ও is typed directly with X. ঋ is G+A. এ is G+C. ঐ is G+Shift+C. ঔ is G+Shift+X.',
        tipBn: 'ও লিখতে সরাসরি X। বাকিগুলো: ঋ (G+A), এ (G+C), ঐ (G+Shift+C), ঔ (G+Shift+X)।'
      },
      {
        id: 'l4-3',
        level: 4,
        subIndex: 3,
        titleEn: 'Vowels Sentence Practice',
        titleBn: 'স্বরবর্ণ সমন্বিত পূর্ণাঙ্গ বাক্য',
        category: 'sentences',
        descriptionEn: 'Sentences beginning with and featuring rich Swaroborno words.',
        descriptionBn: 'বাক্যের শুরুতে ও মাঝে স্বরবর্ণের সঠিক ব্যবহারের পূর্ণাঙ্গ বাক্য অনুশীলন।',
        targetText: 'অমর আকাশ দেখতে ভালোবাসে। ইলিশ আমাদের জাতীয় মাছ। উটের পিঠে বোঝা আছে। একতাই বল। ঔষধে রোগ সারে।',
        keysTaught: ['KeyF', 'KeyG', 'KeyD', 'KeyS', 'KeyA', 'KeyC', 'KeyX'],
        passAccuracy: 92,
        targetWpm: 20,
        tipEn: 'Maintain steady speed when transitioning from standalone vowels to regular words.',
        tipBn: 'বাক্যের শুরুতে স্বরবর্ণের সঠিক ব্যবহার অনুশীলন করুন।'
      }
    ]
  },
  {
    level: 5,
    nameEn: 'Shift Layer Mastery',
    nameBn: 'শিফট লেয়ার ও মহাপ্রাণ বর্ণ',
    summaryEn: 'Master shifted characters: খ ঘ ছ ঝ ঠ ঢ থ ধ ফ ভ ণ শ ষ ং ঃ ঁ ঔ ৈ ূ ী',
    summaryBn: 'শিফট কী চেপে টাইপ করার কৌশল: খ ঘ ছ ঝ ঠ ঢ থ ধ ফ ভ ণ শ ষ ং ঃ ঁ',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'l5-1',
        level: 5,
        subIndex: 1,
        titleEn: 'Shifted Home Row (অ ভ খ থ ধ ী ূ)',
        titleBn: 'শিফটেড হোম রো (অ ভ খ থ ধ ী ূ)',
        category: 'drill',
        descriptionEn: 'Learn Shift + F (অ), H (ভ), J (খ), K (থ), L (ধ), D (ী), S (ূ).',
        descriptionBn: 'Shift চেপে হোম রো-এর বর্ণসমূহ (অ ভ খ থ ধ ী ূ) এবং শব্দসমূহ অনুশীলন করুন।',
        targetText: 'অ ভ খ থ ধ অ ভ খ থ ধ অমর ভূত দীপ ভালো খবর থানা ধান আধিপত্য ভানু তীর ধীর নদী',
        keysTaught: ['KeyF', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyD', 'KeyS'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'Shift+J = খ, Shift+H = ভ, Shift+K = থ, Shift+L = ধ, Shift+D = ী, Shift+S = ূ.',
        tipBn: 'খ = Shift+J, ভ = Shift+H, থ = Shift+K, ধ = Shift+L, ী = Shift+D, ূ = Shift+S।'
      },
      {
        id: 'l5-2',
        level: 5,
        subIndex: 2,
        titleEn: 'Shifted Top Row (ঘ ছ ঝ ঢ ঠ ফ)',
        titleBn: 'শিফটেড টপ রো (ঘ ছ ঝ ঢ ঠ ফ)',
        category: 'drill',
        descriptionEn: 'Learn Shift + O (ঘ), Y (ছ), U (ঝ), E (ঢ), T (ঠ), R (ফ).',
        descriptionBn: 'Shift চেপে উপরের সারির মহাপ্রাণ বর্ণসমূহ (ঘ ছ ঝ ঢ ঠ ফ) অনুশীলন করুন।',
        targetText: 'ঘর ছাতা ঝড় ঢাকা টাকা ফল ফুল মেঘ ছবি পাখি চিঠি ঘুড়ি ছলনা ঝাল ঢেউ ঠাঁই ফুটপাত',
        keysTaught: ['KeyO', 'KeyY', 'KeyU', 'KeyE', 'KeyT', 'KeyR'],
        passAccuracy: 90,
        targetWpm: 20,
        tipEn: 'Shift+O = ঘ, Shift+Y = ছ, Shift+U = ঝ, Shift+E = ঢ, Shift+T = ঠ, Shift+R = ফ.',
        tipBn: 'ঘ = Shift+O, ছ = Shift+Y, ঝ = Shift+U, ঢ = Shift+E, ঠ = Shift+T, ফ = Shift+R।'
      },
      {
        id: 'l5-3',
        level: 5,
        subIndex: 3,
        titleEn: 'Shifted Bottom & Special (শ ষ ণ ল ং ঁ ৎ)',
        titleBn: 'শিফটেড বটম ও বিশেষ বর্ণ (শ ষ ণ ল ং ঁ ৎ)',
        category: 'drill',
        descriptionEn: 'Learn Shift + M (শ), N (ষ), B (ণ), V (ল), Q (ং), Digit7 (ঁ), Slash (ৎ).',
        descriptionBn: 'তালব্য-শ, মূর্ধন্য-ষ, ণ, ল, অনুস্বার, চন্দ্রবিন্দু ও খণ্ড-ত এর সঠিক টাইপিং।',
        targetText: 'শ ষ ণ শান্ত ভাষা কারণ সিংহ চাঁদ হাঁস বাঁশি রংধনু অংশ কিংবা হঠাৎ উৎসব লাল বালক লাটিম',
        keysTaught: ['KeyM', 'KeyN', 'KeyB', 'KeyV', 'KeyQ', 'Digit7', 'Slash'],
        passAccuracy: 90,
        targetWpm: 22,
        tipEn: 'শ = Shift+M, ষ = Shift+N, ণ = Shift+B, ল = Shift+V, ং = Shift+Q, ঁ = Shift+7, ৎ = Shift+/.',
        tipBn: 'শ = Shift+M, ষ = Shift+N, ণ = Shift+B, ল = Shift+V, ং = Shift+Q, ঁ = Shift+7, ৎ = Shift+/।'
      }
    ]
  },
  {
    level: 6,
    nameEn: 'Numbers & Punctuation',
    nameBn: 'সংখ্যা ও যতিচিহ্ন',
    summaryEn: 'Master Bangla numerals (১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০) and symbols (, ; : ? ! " " ( ) ৳)',
    summaryBn: 'বাংলা সংখ্যা ও কমার্শিয়াল চিহ্নসমূহ: ১ থেকে ০ এবং ৳, ?, !, comma, colon',
    iconName: 'Hash',
    lessons: [
      {
        id: 'l6-1',
        level: 6,
        subIndex: 1,
        titleEn: 'Bangla Digits (১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০)',
        titleBn: 'বাংলা সংখ্যা গণনা (১-০)',
        category: 'drill',
        descriptionEn: 'Type Bangla digits located on the standard number row.',
        descriptionBn: 'কীবোর্ডের উপরের সারিতে থাকা বাংলা সংখ্যাসমূহ টাইপ করুন।',
        targetText: '১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০ ১২৩৪ ৫৬৭৮ ৯০ ১২ ৫০ ১০০ ৫০০ ২০২৬ ১০২০ ৩০৪০ ৫০৬০ ৭০৮০ ৯০১০০',
        keysTaught: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'Number keys directly produce বাংলা সংখ্যা: ১, ২, ৩, ৪, ৫, ৬, ৭, ৮, ৯, ০.',
        tipBn: 'সাধারণভাবে ১ ২ ৩ ৪ চাপলেই বাংলা ডিজিট তৈরি হয়।'
      },
      {
        id: 'l6-2',
        level: 6,
        subIndex: 2,
        titleEn: 'Punctuation & Sentences with Numbers',
        titleBn: 'যতিচিহ্ন ও সংখ্যামূলক বাক্য',
        category: 'sentences',
        descriptionEn: 'Combine dates, currency (৳), question mark (?), exclamation (!) and Dari (।).',
        descriptionBn: 'তারিখ, টাকা, প্রশ্নবোধক এবং আশ্চর্যবোধক চিহ্ন সহ বাস্তব বাক্য।',
        targetText: 'দাম কত? মাত্র ৫০ টাকা! আজ ২ অক্টোবর, ২০২৬ সাল। তুমি কি যাবে? হাঁ, আমি অবশ্যই আসিব।',
        keysTaught: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Slash', 'KeyG', 'Comma'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'Dari is Shift+G. Comma is Comma. Question mark is Shift+Slash.',
        tipBn: 'দাঁড়ি = Shift+G, কমা = Comma, প্রশ্নবোধক = Shift+Slash।'
      }
    ]
  },
  {
    level: 7,
    nameEn: 'Kar & Fola Special Rules',
    nameBn: 'কার ও ফলা স্পেশাল রুলস',
    summaryEn: 'Master Pre-kar typing order (ি, ে, ৈ) + Composite O/OU-kar + Ro-fola, Ya-fola & Reph.',
    summaryBn: 'সকল কার ও ফলার পূর্ণাঙ্গ নিয়ম: প্রি-কার, যৌগিক ও/ঔ-কার, র-ফলা, য-ফলা ও রেফ।',
    iconName: 'Layers',
    lessons: [
      {
        id: 'l7-1',
        level: 7,
        subIndex: 1,
        titleEn: 'Pre-Kar Mastery (ি, ে, ৈ)',
        titleBn: 'প্রি-কার নিয়ম (ি, ে, ৈ)',
        category: 'drill',
        descriptionEn: 'Drill typing the pre-kar BEFORE the consonant: D (ি), C (ে), Shift+C (ৈ).',
        descriptionBn: 'কার আগে চেপে বর্ণ টাইপ করার নিয়ম: দিন (D L B), দেশ (C L Shift+M), কৈশোর (Shift+C J ...)',
        targetText: 'দিন দিন দেশ সেবা কৈশোর মেলা চৈত্র রবি কবি চিঠি বিজ্ঞান নদী শৈশব সৈকত বৈশাখ দৈনিক',
        keysTaught: ['KeyD', 'KeyC'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'Always type ি (D) or ে (C) FIRST, then type the consonant!',
        tipBn: 'সর্বদা মনে রাখবেন: ি (D) বা ে (C) বর্ণের আগে চাপতে হবে!'
      },
      {
        id: 'l7-2',
        level: 7,
        subIndex: 2,
        titleEn: 'Composite O-Kar & OU-Kar (ো, ৌ)',
        titleBn: 'যৌগিক ও-কার এবং ঔ-কার (ো, ৌ)',
        category: 'drill',
        descriptionEn: 'Type C (ে) + consonant + F (া) to make ো, and C + consonant + Shift+X (ৗ) to make ৌ.',
        descriptionBn: 'কো = C + J + F, গৌতম = C + O + Shift+X + K + M।',
        targetText: 'কোকিল গোলাপ নৌকা মৌমাছি গৌতম সৌরভ ছোট লোক বোন শোক ভোর দৌড় কৌতুক ভৌগোলিক',
        keysTaught: ['KeyC', 'KeyF', 'KeyX'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'For গোলাপ: Type C (ে) -> O (গ) -> F (া) -> Shift+V (ল) -> F (া) -> R (প).',
        tipBn: 'গোলাপ: C (ে) -> O (গ) -> F (া) -> Shift+V (ল) -> F (া) -> R (প)।'
      },
      {
        id: 'l7-3',
        level: 7,
        subIndex: 3,
        titleEn: 'Fola: Ro-fola (্র), Ya-fola (্য) & Reph (র্)',
        titleBn: 'ফলা: র-ফলা (্র), য-ফলা (্য) ও রেফ (র্)',
        category: 'words',
        descriptionEn: 'Practice Ro-fola (Z), Ya-fola (Shift+Z), and Reph (Shift+A before consonant).',
        descriptionBn: 'র-ফলা (Z), য-ফলা (Shift+Z) এবং রেফ (Shift+A বর্ণের পূর্বে)।',
        targetText: 'গ্রাম প্রথম ছাত্র বর্ণ সূর্য কর্ম খ্যাতি ব্যাকরণ বাক্য ব্যক্তিত্ব ধর্ম তর্ক মর্ম আদর্শ মর্যাদা',
        keysTaught: ['KeyZ', 'KeyA', 'KeyW'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'Reph is typed BEFORE the letter (Shift+A). Ro-fola is typed AFTER (Z).',
        tipBn: 'রেফ বর্ণের আগে টাইপ করতে হয় (Shift+A), র-ফলা বর্ণের পরে (Z), এবং য-ফলা বর্ণের পরে (Shift+Z)।'
      }
    ]
  },
  {
    level: 8,
    nameEn: 'Conjuncts Mastery (যুক্তাক্ষর)',
    nameBn: 'যুক্তাক্ষর নিপুণতা',
    summaryEn: 'Master 50+ essential conjuncts using G (Hasanta): ক্ষ, জ্ঞ, ঙ্ক, ঙ্গ, ন্ত, স্ত, ত্ত, ণ্ড, দ্ব, দ্ধ...',
    summaryBn: 'সকল গুরুত্বপূর্ণ যুক্তবর্ণ তৈরিতে হসন্ত (G) ব্যবহারের চূড়ান্ত কৌশল।',
    iconName: 'Zap',
    lessons: [
      {
        id: 'l8-1',
        level: 8,
        subIndex: 1,
        titleEn: 'Essential Conjuncts (ক্ষ, জ্ঞ, ঙ্ক, ঙ্গ)',
        titleBn: 'প্রাথমিক যুক্তাক্ষর (ক্ষ, জ্ঞ, ঙ্ক, ঙ্গ)',
        category: 'drill',
        descriptionEn: 'ক্ষ (J+G+Shift+N), জ্ঞ (U+G+Shift+I), ঙ্ক (Q+G+J), ঙ্গ (Q+G+O).',
        descriptionBn: 'ক্ষ = ক+্+ষ, জ্ঞ = জ+্+ঞ, ঙ্ক = ঙ+্+ক, ঙ্গ = ঙ+্+গ।',
        targetText: 'শিক্ষা ক্ষমা বিজ্ঞান অজ্ঞ অঙ্ক গঙ্গা অঙ্গ বঙ্গ শিক্ষক পরীক্ষা জ্ঞান যজ্ঞ আকাঙ্ক্ষা রঙিন',
        keysTaught: ['KeyJ', 'KeyG', 'KeyN', 'KeyU', 'KeyI', 'KeyQ', 'KeyO'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'ক্ষ = ক (J) + ্ (G) + ষ (Shift+N). Practice this signature Bangla conjunct!',
        tipBn: 'ক্ষ টাইপ করতে: J -> G -> Shift+N।'
      },
      {
        id: 'l8-2',
        level: 8,
        subIndex: 2,
        titleEn: 'Ta & Sa Conjuncts (ন্ত, স্ত, ত্ত, ণ্ড, ষ্ট)',
        titleBn: 'ত, স ও ট-বর্গীয় যুক্তাক্ষর',
        category: 'words',
        descriptionEn: 'ন্ত (B+G+K), স্ত (N+G+K), ত্ত (K+G+K), ণ্ড (Shift+B+G+E), ষ্ট (Shift+N+G+T).',
        descriptionBn: 'শান্তি, পুস্তক, উত্তর, কাণ্ড, কষ্ট, বৃষ্টি, মিষ্টি, রাষ্ট্র।',
        targetText: 'শান্তি অনন্ত পুস্তক রাস্তা উত্তর কাণ্ড বৃষ্টি মিষ্টি কষ্ট রাষ্ট্র দৃষ্টান্ত তিস্তা বস্তি রক্ত ভক্তি',
        keysTaught: ['KeyB', 'KeyG', 'KeyK', 'KeyN', 'KeyE', 'KeyT'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'For বৃষ্টি: ব (H) + ৃ (A) + ি (D) + ষ (Shift+N) + ্ (G) + ট (T).',
        tipBn: 'বৃষ্টি: H -> A -> D -> Shift+N -> G -> T।'
      },
      {
        id: 'l8-3',
        level: 8,
        subIndex: 3,
        titleEn: 'Da, Dha & Ha Conjuncts (দ্ব, দ্ধ, হ্ম, হ্ন, ঞ্চ)',
        titleBn: 'দ্ব, দ্ধ, হ্ম, হ্ন ও ঞ্চ যুক্তাক্ষর',
        category: 'words',
        descriptionEn: 'দ্ব (L+G+H), দ্ধ (L+G+Shift+L), হ্ম (I+G+M), ঞ্চ (Shift+I+G+Y).',
        descriptionBn: 'দ্বিতীয়, যুদ্ধ, ব্রাহ্মণ, চিহ্ন, পঞ্চম, চঞ্চল, অঞ্জলি।',
        targetText: 'দ্বিতীয় যুদ্ধ সমৃদ্ধি ব্রাহ্মণ চিহ্ন পঞ্চম চঞ্চল অঞ্জলি শ্রদ্ধা বিশ্বস্ত বিশ্বাস বন্ধন সন্ধ্যা',
        keysTaught: ['KeyL', 'KeyH', 'KeyI', 'KeyM', 'KeyY'],
        passAccuracy: 92,
        targetWpm: 22,
        tipEn: 'হ্ম = হ (I) + ্ (G) + ম (M). দ্ধ = দ (L) + ্ (G) + ধ (Shift+L).',
        tipBn: 'ব্রাহ্মণ: ব (H) -> র-ফলা (Z) -> া (F) -> হ (I) -> ্ (G) -> ম (M) -> ণ (Shift+B)।'
      }
    ]
  },
  {
    level: 9,
    nameEn: 'Professional Vocabulary',
    nameBn: 'শব্দ সম্ভার ও দ্রুত টাইপিং',
    summaryEn: 'High-frequency administrative, economic, educational, and tech terminology.',
    summaryBn: 'বহুল ব্যবহৃত বাংলা শব্দের মাধ্যমে পেশাদার টাইপিং রিফ্লেক্স তৈরি।',
    iconName: 'FileText',
    lessons: [
      {
        id: 'l9-1',
        level: 9,
        subIndex: 1,
        titleEn: 'Daily & Office Terminology',
        titleBn: 'দৈনন্দিন ও অফিসিয়াল শব্দ',
        category: 'words',
        descriptionEn: 'High frequency words used in everyday communication and offices.',
        descriptionBn: 'অফিস ও দাপ্তরিক কাজে নিত্যপ্রয়োজনীয় শব্দসমূহ।',
        targetText: 'বাংলাদেশ ঢাকা উন্নয়ন সরকার প্রশাসন সমাজ পরিবর্তন অর্থনীতি শিক্ষা স্বাস্থ্য বাণিজ্য যোগাযোগ পরিবেশ',
        keysTaught: [],
        passAccuracy: 93,
        targetWpm: 24,
        tipEn: 'Type with a smooth rhythmic tempo across word boundaries.',
        tipBn: 'প্রতিটি শব্দ নির্ভুলভাবে সম্পূর্ণ টাইপ করে স্পেস চাপুন।'
      },
      {
        id: 'l9-2',
        level: 9,
        subIndex: 2,
        titleEn: 'Tech & Scientific Terms',
        titleBn: 'প্রফেশনাল ও প্রযুক্তি শব্দমালা',
        category: 'words',
        descriptionEn: 'Computer, internet, technology and scientific terminology.',
        descriptionBn: 'কম্পিউটার, ইন্টারনেট ও আধুনিক বিজ্ঞানের পরিভাষা।',
        targetText: 'কম্পিউটার সফটওয়্যার ইন্টারনেট প্রযুক্তি যোগাযোগ প্রোগ্রামিং নেটওয়ার্ক অ্যাপ্লিকেশন তথ্যপ্রযুক্তি ডিজিটাল উদ্ভাবন হার্ডওয়্যার ডেটাবেস',
        keysTaught: [],
        passAccuracy: 93,
        targetWpm: 25,
        tipEn: 'For সফটওয়্যার: C -> N -> R -> T -> G -> W -> Shift+W -> F -> Shift+W -> F -> V.',
        tipBn: 'দীর্ঘ শব্দগুলো ছোট ছোট সিলেবলে ভাগ করে টাইপ করুন।'
      }
    ]
  },
  {
    level: 10,
    nameEn: 'Sentences & Literature',
    nameBn: 'বাক্য ও সাহিত্য চর্চা',
    summaryEn: 'Short to long literary prose, poetry lines, proverbs, and patriotic heritage.',
    summaryBn: 'রবীন্দ্রনাথ, নজরুল, বাংলা প্রবাদ ও জাতীয় সাহিত্যের নির্বাচিত অংশ।',
    iconName: 'Feather',
    lessons: [
      {
        id: 'l10-1',
        level: 10,
        subIndex: 1,
        titleEn: 'Bangla Proverbs & Wisdom',
        titleBn: 'চিরন্তন বাংলা প্রবাদ বাক্য',
        category: 'sentences',
        descriptionEn: 'Famous Bangla proverbs with punctuation.',
        descriptionBn: 'জ্ঞানগর্ভ বাংলা প্রবাদ ও শিক্ষণীয় বাক্যমালা।',
        targetText: 'পরিশ্রমই সৌভাগ্যের প্রসূতি। সময়ের এক ফোঁড়, অসময়ের দশ ফোঁড়। যেখানে দেখিবে ছাই উড়াইয়া দেখ তাই পাইলেও পাইতে পার অমূল্য রতন। বিপদে মোরে রক্ষা কর এ নহে মোর প্রার্থনা।',
        keysTaught: [],
        passAccuracy: 94,
        targetWpm: 25,
        tipEn: 'Keep an eye on the comma and punctuation spacing.',
        tipBn: 'কমা এবং দাঁড়ি দেওয়ার সময় স্পেসের নিয়ম খেয়াল রাখুন।'
      },
      {
        id: 'l10-2',
        level: 10,
        subIndex: 2,
        titleEn: 'Bangladesh Heritage & Liberation War',
        titleBn: 'বাংলাদেশের ঐতিহ্য ও মুক্তিযুদ্ধ',
        category: 'sentences',
        descriptionEn: 'Historic sentences about 1971 and national pride.',
        descriptionBn: '১৯৭১ সালের মহান মুক্তিযুদ্ধ ও স্বাধীন বাংলাদেশ বিষয়ক বাক্য।',
        targetText: 'একাত্তরের মহান মুক্তিযুদ্ধে লাখো শহীদের রক্তে অর্জিত আমাদের প্রিয় মাতৃভূমি বাংলাদেশ। এই দেশের প্রতিটি ধূলিকণা আমাদের অহংকার। আমরা আমাদের দেশকে প্রাণ দিয়ে ভালোবাসি।',
        keysTaught: [],
        passAccuracy: 94,
        targetWpm: 25,
        tipEn: 'Notice the rhythm in long sentences. Breathe naturally.',
        tipBn: 'দীর্ঘ বাক্যে একটানা টাইপ করার সময় স্বাচ্ছন্দ্য বজায় রাখুন।'
      }
    ]
  },
  {
    level: 11,
    nameEn: 'Speed Building Drills',
    nameBn: 'গতি বৃদ্ধির চ্যালেঞ্জ (WPM Drills)',
    summaryEn: 'Targeted drills to push your typing speed to 20, 25, 30, and 40+ WPM.',
    summaryBn: '২০, ২৫, ৩০ এবং ৪০+ WPM গতি অর্জনের জন্য বিশেষ টাইমিং ড্রিল।',
    iconName: 'Gauge',
    lessons: [
      {
        id: 'l11-1',
        level: 11,
        subIndex: 1,
        titleEn: '20 WPM Foundation Drill',
        titleBn: '২০ WPM মৌলিক স্পিড ড্রিল',
        category: 'speed',
        descriptionEn: 'Reach 20 WPM speed with minimum 92% accuracy.',
        descriptionBn: 'কমপক্ষে ৯২% নির্ভুলতা বজায় রেখে ২০ WPM গতি অর্জন করুন।',
        targetText: 'বাংলা আমাদের প্রাণের ভাষা। আমরা বাংলায় কথা বলি, বাংলায় স্বপ্ন দেখি। একুশের চেতনা আমাদের এগিয়ে চলার প্রেরণা যোগায়। সঠিক অনুশীলনই সাফল্যের চাবিকাঠি।',
        keysTaught: [],
        passAccuracy: 92,
        targetWpm: 20,
        tipEn: 'Speed comes automatically from accuracy. Never sacrifice accuracy for speed!',
        tipBn: 'গতি বাড়ানোর গোপন রহস্য হলো নির্ভুলতা। নির্ভুল হলে গতি নিজে থেকেই বাড়বে!'
      },
      {
        id: 'l11-2',
        level: 11,
        subIndex: 2,
        titleEn: '30 WPM Advanced Sprint',
        titleBn: '৩০ WPM অ্যাডভান্সড স্প্রিন্ট',
        category: 'speed',
        descriptionEn: 'Push towards professional data-entry benchmark speed.',
        descriptionBn: 'পেশাদার ডাটা এন্ট্রি স্পিড অর্জনের লক্ষ্যমাত্রা ড্রিল।',
        targetText: 'জ্ঞানের আলো ছড়িয়ে দিতে বই পড়ার কোনো বিকল্প নেই। নিয়মিত অনুশীলনের মাধ্যমে যে কোনো কঠিন কাজ সহজ হয়ে যায়। আত্মবিশ্বাসই সাফল্যের মূল চাবিকাঠি। ধীরস্থিরভাবে সঠিক আঙুল ব্যবহার করুন।',
        keysTaught: [],
        passAccuracy: 94,
        targetWpm: 30,
        tipEn: 'Scan 2-3 words ahead while typing.',
        tipBn: 'টাইপ করার সময় বর্তমান শব্দের পাশাপাশি পরবর্তী দুই-তিনটি শব্দের দিকে চোখ রাখুন।'
      }
    ]
  },
  {
    level: 12,
    nameEn: 'Real-World & Govt Exam Test',
    nameBn: 'সরকারি ও ব্যাংক চাকরির প্র্যাকটিস',
    summaryEn: 'Official ministry circulars, public bank exam paragraphs, and certified test mode.',
    summaryBn: 'বাংলাদেশ সরকারি কর্মকমিশন (BPSC) ও ব্যাংকের টাইপিং পরীক্ষার বাস্তবসম্মত অনুচ্ছেদ।',
    iconName: 'Award',
    lessons: [
      {
        id: 'l12-1',
        level: 12,
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
        id: 'l12-2',
        level: 12,
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
