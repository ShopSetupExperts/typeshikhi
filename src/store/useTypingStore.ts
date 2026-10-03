import type { Lesson } from '../data/curriculum';
import { CURRICULUM } from '../data/curriculum';
import type { SoundType } from '../engine/sound-synthesizer';


export interface UserBadge {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  icon: string;
  unlockedAt: string | null;
}

export interface UserCertificate {
  id: string;
  userName: string;
  wpm: number;
  accuracy: number;
  date: string;
  durationMinutes: number;
  testTitle: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  totalKeystrokes: number;
  totalWords: number;
  totalTimeMinutes: number;
}

const BADGES_LIST: UserBadge[] = [
  {
    id: 'first-step',
    titleEn: 'First Steps',
    titleBn: 'প্রথম পদক্ষেপ',
    descEn: 'Complete your very first typing lesson',
    descBn: 'প্রথম টাইপিং লেসন সফলভাবে সম্পন্ন করুন',
    icon: 'Footprints',
    unlockedAt: null
  },
  {
    id: 'speed-15',
    titleEn: '15 WPM Achiever',
    titleBn: '১৫ WPM গতি',
    descEn: 'Reach 15 WPM speed in any lesson or test',
    descBn: 'যেকোনো লেসনে ১৫ WPM গতি অর্জন করুন',
    icon: 'Zap',
    unlockedAt: null
  },
  {
    id: 'speed-25',
    titleEn: '25 WPM Pro Typist',
    titleBn: '২৫ WPM প্রফেশনাল',
    descEn: 'Reach 25 WPM speed with 90%+ accuracy',
    descBn: '৯০% নির্ভুলতায় ২৫ WPM গতি স্পর্শ করুন',
    icon: 'Flame',
    unlockedAt: null
  },
  {
    id: 'speed-40',
    titleEn: '40 WPM Speed Demon',
    titleBn: '৪০ WPM গতি সম্রাট',
    descEn: 'Reach lightning-fast 40+ WPM speed',
    descBn: '৪০+ WPM গতি দিয়ে চমকে দিন',
    icon: 'Rocket',
    unlockedAt: null
  },
  {
    id: 'sniper-accuracy',
    titleEn: 'Sniper Accuracy',
    titleBn: 'শতভাগ নির্ভুলতা',
    descEn: 'Complete a lesson with 100% accuracy',
    descBn: '১০০% নির্ভুলতায় কোনো লেসন শেষ করুন',
    icon: 'Target',
    unlockedAt: null
  },
  {
    id: 'conjunct-master',
    titleEn: 'Juktakkhor Master',
    titleBn: 'যুক্তাক্ষর বিশারদ',
    descEn: 'Complete Level 8 (Conjuncts) with 3 stars',
    descBn: 'লেভেল ৮ (যুক্তাক্ষর) ৩ স্টারসহ সম্পন্ন করুন',
    icon: 'Award',
    unlockedAt: null
  },
  {
    id: 'streak-3',
    titleEn: '3-Day Streak',
    titleBn: '৩ দিনের ধারাবাহিকতা',
    descEn: 'Practice 3 consecutive days in a row',
    descBn: 'টানা ৩ দিন নিয়মিত প্র্যাকটিস করুন',
    icon: 'Calendar',
    unlockedAt: null
  },
  {
    id: 'govt-ready',
    titleEn: 'Govt Exam Certified',
    titleBn: 'সরকারি পরীক্ষার সনদপ্রাপ্ত',
    descEn: 'Complete the graduation exam test',
    descBn: 'গ্র্যাজুয়েশন এক্সাম সফলভাবে পাস করুন',
    icon: 'ShieldCheck',
    unlockedAt: null
  }
];

const STORAGE_KEY = 'typeshikhi_user_state_v1';

export interface AppState {
  currentView: 'dashboard' | 'curriculum' | 'lesson' | 'speed-test' | 'weak-keys' | 'custom-practice' | 'cheat-sheet' | 'profile';
  activeLesson: Lesson | null;
  unlockedLevels: number[];
  completedLessons: Record<string, { stars: number; bestWpm: number; bestAccuracy: number; attempts: number }>;
  weakKeys: Record<string, { attempts: number; errors: number }>;
  profile: UserProfile;
  badges: UserBadge[];
  certificates: UserCertificate[];
  settings: {
    language: 'bn' | 'en';
    theme: 'dark' | 'emerald' | 'cyber' | 'sepia';
    fontFamily: string;
    fontSize: 'normal' | 'large' | 'xlarge';
    soundType: SoundType;
    soundVolume: number;
    showHandsGuide: boolean;
    showKeyHints: boolean;
    keyboardSize: 'compact' | 'standard' | 'large';
  };
}

const DEFAULT_STATE: AppState = {
  currentView: 'dashboard',
  activeLesson: CURRICULUM[0].lessons[0],
  unlockedLevels: [0, 1], // Level 0 and 1 unlocked by default
  completedLessons: {},
  weakKeys: {},
  profile: {
    name: 'শিক্ষার্থী (Learner)',
    avatar: '🎯',
    xp: 0,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalKeystrokes: 0,
    totalWords: 0,
    totalTimeMinutes: 0
  },
  badges: BADGES_LIST,
  certificates: [],
  settings: {
    language: 'bn',
    theme: 'dark',
    fontFamily: 'Noto Sans Bengali',
    fontSize: 'normal',
    soundType: 'mechanical',
    soundVolume: 0.6,
    showHandsGuide: true,
    showKeyHints: true,
    keyboardSize: 'standard'
  }
};

export function loadSavedState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
      badges: BADGES_LIST.map(b => {
        const found = parsed.badges?.find((pb: UserBadge) => pb.id === b.id);
        return found ? { ...b, unlockedAt: found.unlockedAt } : b;
      })
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveStateToStorage(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save app state:', err);
  }
}
