import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  BookOpen,
  Zap,
  Gauge,
  Target,
  FileEdit,
  Clock,
  RotateCcw,
  Award,
  ChevronLeft,
  ShieldCheck,
  Printer,
  Keyboard,
  Info,
  Star,
  Lock,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import {
  ENGLISH_CURRICULUM,
  ENGLISH_DRILLS,
  ENGLISH_SPEED_PASSAGES,
  getEnglishKeyStep,
  type EnglishLesson
} from '../data/english-curriculum';
import { BIJOY_KEYMAP } from '../engine/bijoy-layout';
import { soundManager } from '../engine/sound-synthesizer';
import { OnScreenKeyboard } from './OnScreenKeyboard';
import { HandsGuide } from './HandsGuide';
import type { AppState, UserCertificate } from '../store/useTypingStore';
import confetti from 'canvas-confetti';

interface EnglishTypingViewProps {
  state: AppState;
  onBackToDashboard: () => void;
  onUpdateEnglishBestWpm: (wpm: number) => void;
  onSaveCertificate?: (cert: UserCertificate) => void;
  onCompleteEnglishLesson: (
    lessonId: string,
    level: number,
    stars: number,
    wpm: number,
    accuracy: number
  ) => void;
}

type TypingMode = 'learning' | 'speed-test' | 'drills' | 'custom';

export const EnglishTypingView: React.FC<EnglishTypingViewProps> = ({
  state,
  onBackToDashboard,
  onUpdateEnglishBestWpm,
  onSaveCertificate,
  onCompleteEnglishLesson
}) => {
  const isBn = state.settings.language === 'bn';

  // Flatten all lessons for sequential progression
  const allLessons = useMemo(
    () => ENGLISH_CURRICULUM.flatMap((lvl) => lvl.lessons),
    []
  );

  // Mode selection: 'learning' (default) | 'speed-test' | 'drills' | 'custom'
  const [activeMode, setActiveMode] = useState<TypingMode>('learning');

  // 1. Learning Lessons State
  const [activeLesson, setActiveLesson] = useState<EnglishLesson>(
    ENGLISH_CURRICULUM[0].lessons[0]
  );
  const [selectedLevelTab, setSelectedLevelTab] = useState<number>(1);

  // 2. Speed test configurations
  const [testDuration, setTestDuration] = useState<number>(60); // 60, 180, 300
  const [passageIndex, setPassageIndex] = useState<number>(0);
  const activePassage = ENGLISH_SPEED_PASSAGES[passageIndex] || ENGLISH_SPEED_PASSAGES[0];

  // 3. Drills configurations
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const activeDrill = ENGLISH_DRILLS[drillIndex] || ENGLISH_DRILLS[0];

  // 4. Custom text configuration
  const [customInputText, setCustomInputText] = useState<string>(
    'The ability to type quickly and accurately is one of the most valuable computer skills in the modern world. Consistent daily practice on home row muscle memory will dramatically improve your speed.'
  );
  const [isEditingCustom, setIsEditingCustom] = useState<boolean>(false);

  // Active target text based on active mode
  const targetText = useMemo(() => {
    if (activeMode === 'learning') return activeLesson.targetText;
    if (activeMode === 'speed-test') return activePassage.text;
    if (activeMode === 'drills') return activeDrill.targetText;
    return customInputText;
  }, [activeMode, activeLesson, activePassage, activeDrill, customInputText]);

  // Typing session states
  const [charIndex, setCharIndex] = useState<number>(0);
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isKeyError, setIsKeyError] = useState<boolean>(false);
  const errorTimerRef = useRef<number | null>(null);

  // Time tracking
  const [timeLeft, setTimeLeft] = useState<number>(testDuration);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  // Visual aids toggles
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const [showHands, setShowHands] = useState<boolean>(true);

  // Keyboard visualization states
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

  // Certificate / Results
  const [candidateName, setCandidateName] = useState<string>(state.profile.name);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [resultMetrics, setResultMetrics] = useState<{
    grossWpm: number;
    netWpm: number;
    accuracy: number;
    timeTaken: number;
    totalKeystrokes: number;
    mistakes: number;
    rankTitle: string;
    starsEarned: number;
    isPassed: boolean;
  } | null>(null);

  // Refs for auto-scroll and focus
  const textContainerRef = useRef<HTMLDivElement>(null);
  const currentCharSpanRef = useRef<HTMLSpanElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Active target character step
  const targetChar = targetText[charIndex] || '';
  const currentKeyStep = targetChar ? getEnglishKeyStep(targetChar) : undefined;
  const currentKeyDef = currentKeyStep?.code ? BIJOY_KEYMAP[currentKeyStep.code] : undefined;

  // Unlocked levels set
  const unlockedLevels = state.unlockedEnglishLevels || [1];
  const completedLessons = state.completedEnglishLessons || {};

  // Reset current session
  const resetSession = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
    setCharIndex(0);
    setKeystrokeCount(0);
    setMistakeCount(0);
    setIsStarted(false);
    setIsCompleted(false);
    setIsKeyError(false);
    setElapsedSeconds(0);
    setTimeLeft(activeMode === 'speed-test' ? testDuration : 0);
    setResultMetrics(null);
    setShowCertModal(false);
  }, [activeMode, testDuration]);

  // Reset session when mode, lesson, passage, drill or duration changes
  useEffect(() => {
    resetSession();
  }, [activeMode, activeLesson.id, passageIndex, drillIndex, testDuration, resetSession]);

  // Speed rank calculation
  const getSpeedRank = useCallback((wpm: number) => {
    if (wpm >= 80) return isBn ? 'মাস্টার টাইপিস্ট (Master Typist)' : 'Master Typist (80+ WPM)';
    if (wpm >= 60) return isBn ? 'প্রফেশনাল স্পিড (Professional)' : 'Professional Typist (60+ WPM)';
    if (wpm >= 40) return isBn ? 'দ্রুত টাইপিস্ট (Fast Typist)' : 'Fast Typist (40+ WPM)';
    if (wpm >= 25) return isBn ? 'মাঝারি গতি (Intermediate)' : 'Intermediate (25+ WPM)';
    return isBn ? 'শুরুয়াত (Beginner)' : 'Beginner (<25 WPM)';
  }, [isBn]);

  // Complete session & calculate final metrics
  const finishSession = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsCompleted(true);

    const timeSpentSec =
      activeMode === 'speed-test'
        ? testDuration - timeLeft
        : Math.max(1, elapsedSeconds);
    const timeSpentMin = Math.max(0.05, timeSpentSec / 60);

    // Standard Gross WPM = (keystrokes / 5) / minutes
    const grossWpm = Math.round((keystrokeCount / 5) / timeSpentMin);

    // Accuracy
    const totalHits = keystrokeCount + mistakeCount;
    const accuracy =
      totalHits > 0
        ? Math.max(0, Math.min(100, Math.round((keystrokeCount / totalHits) * 100)))
        : 100;

    // Net WPM = Gross WPM - (mistakes / minutes)
    const netWpm = Math.max(0, Math.round(grossWpm - mistakeCount / timeSpentMin));

    const rankTitle = getSpeedRank(grossWpm);

    // Calculate stars and pass status for learning mode
    let starsEarned = 0;
    let isPassed = true;

    if (activeMode === 'learning') {
      isPassed = accuracy >= activeLesson.passAccuracy;
      if (isPassed) {
        starsEarned = 1;
        if (accuracy >= 95 && grossWpm >= activeLesson.targetWpm) starsEarned = 2;
        if (accuracy >= 98 && grossWpm >= activeLesson.targetWpm + 5) starsEarned = 3;

        // Persist lesson progress
        onCompleteEnglishLesson(
          activeLesson.id,
          activeLesson.level,
          starsEarned,
          grossWpm,
          accuracy
        );
      }
    }

    const metrics = {
      grossWpm,
      netWpm,
      accuracy,
      timeTaken: timeSpentSec,
      totalKeystrokes: keystrokeCount,
      mistakes: mistakeCount,
      rankTitle,
      starsEarned,
      isPassed
    };

    setResultMetrics(metrics);

    // Update English best WPM in profile
    if (grossWpm > (state.profile.englishBestWpm || 0)) {
      onUpdateEnglishBestWpm(grossWpm);
    }

    // Play celebration confetti on pass or completion
    if (isPassed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [
    activeMode,
    testDuration,
    timeLeft,
    elapsedSeconds,
    keystrokeCount,
    mistakeCount,
    activeLesson,
    state.profile.englishBestWpm,
    onUpdateEnglishBestWpm,
    onCompleteEnglishLesson,
    getSpeedRank
  ]);

  // Countdown timer for speed-test and count-up for lessons/drills/custom
  useEffect(() => {
    if (!isStarted || isCompleted) return;

    timerIntervalRef.current = window.setInterval(() => {
      if (activeMode === 'speed-test') {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishSession();
            return 0;
          }
          return prev - 1;
        });
      } else {
        setElapsedSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isStarted, isCompleted, activeMode, finishSession]);

  // Keep target char scrolled into view smoothly
  useEffect(() => {
    if (currentCharSpanRef.current && textContainerRef.current) {
      const container = textContainerRef.current;
      const span = currentCharSpanRef.current;
      const spanTop = span.offsetTop - container.offsetTop;
      const targetScroll = spanTop - container.clientHeight / 2 + 30;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [charIndex]);

  // Handle typing keydown
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent | KeyboardEvent) => {
      if (isCompleted || isEditingCustom) return;

      // Ignore modifier keys alone
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) {
        if (e.key === 'Shift') setIsShiftPressed(true);
        return;
      }

      // Track key pressed for visual feedback
      setPressedKeys((prev) => new Set(prev).add(e.code));
      setIsShiftPressed(e.shiftKey);

      // Handle Escape to restart
      if (e.key === 'Escape') {
        resetSession();
        return;
      }

      // Ignore other special functional keys
      if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) {
        return;
      }

      e.preventDefault();

      // Start timer on first keystroke
      if (!isStarted) {
        setIsStarted(true);
      }

      const inputChar = e.key;
      const expectedChar = targetText[charIndex];

      if (inputChar === expectedChar) {
        // Correct key pressed!
        soundManager.playKeyClick();
        setIsKeyError(false);
        const nextIndex = charIndex + 1;
        setCharIndex(nextIndex);
        setKeystrokeCount((prev) => prev + 1);

        // Check if finished passage / drill / lesson
        if (nextIndex >= targetText.length) {
          finishSession();
        }
      } else {
        // Mistake made: trigger error audio and visual indicator without desynchronizing index
        soundManager.playErrorSound();
        setMistakeCount((prev) => prev + 1);
        setIsKeyError(true);

        if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
        errorTimerRef.current = window.setTimeout(() => {
          setIsKeyError(false);
        }, 300);
      }
    },
    [charIndex, targetText, isStarted, isCompleted, isEditingCustom, resetSession, finishSession]
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(e.code);
      return next;
    });
    if (e.key === 'Shift') {
      setIsShiftPressed(false);
    }
  }, []);

  // Global window keyboard listener when focused on typing view
  useEffect(() => {
    const onWindowKeyDown = (e: KeyboardEvent) => {
      if (isEditingCustom) return;
      handleKeyDown(e);
    };
    const onWindowKeyUp = (e: KeyboardEvent) => {
      if (isEditingCustom) return;
      handleKeyUp(e);
    };

    window.addEventListener('keydown', onWindowKeyDown);
    window.addEventListener('keyup', onWindowKeyUp);
    return () => {
      window.removeEventListener('keydown', onWindowKeyDown);
      window.removeEventListener('keyup', onWindowKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, isEditingCustom]);

  // Click on virtual on-screen keyboard key
  const handleVirtualKeyClick = (code: string, shift: boolean) => {
    const charEntry = Object.entries(BIJOY_KEYMAP).find(([c]) => c === code);
    if (!charEntry) return;

    let simulatedChar = '';
    if (code === 'Space') {
      simulatedChar = ' ';
    } else if (code.startsWith('Key')) {
      const letter = charEntry[1].labelEn;
      simulatedChar = shift ? letter.toUpperCase() : letter.toLowerCase();
    } else {
      simulatedChar = shift ? charEntry[1].shift : charEntry[1].labelEn;
    }

    if (simulatedChar) {
      handleKeyDown({
        key: simulatedChar,
        code,
        shiftKey: shift,
        ctrlKey: false,
        altKey: false,
        metaKey: false,
        preventDefault: () => {}
      } as unknown as React.KeyboardEvent);
    }
  };

  // Next and Previous Lesson navigation
  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;
  const prevLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;

  // Real-time live stats calculation
  const currentDurationSec =
    activeMode === 'speed-test'
      ? Math.max(1, testDuration - timeLeft)
      : Math.max(1, elapsedSeconds);
  const currentDurationMin = currentDurationSec / 60;
  const liveGrossWpm =
    isStarted && currentDurationMin > 0.05
      ? Math.round((keystrokeCount / 5) / currentDurationMin)
      : 0;
  const totalKeystrokeHits = keystrokeCount + mistakeCount;
  const liveAccuracy =
    totalKeystrokeHits > 0
      ? Math.max(0, Math.min(100, Math.round((keystrokeCount / totalKeystrokeHits) * 100)))
      : 100;

  // Format MM:SS display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Total stars in English lessons
  const totalEnglishStars = Object.values(completedLessons).reduce(
    (acc, curr) => acc + (curr?.stars || 0),
    0
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center gap-6 animate-fadeIn">
      {/* 1. Header & Navigation Top Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel border border-slate-800 bg-slate-900/60 p-4 rounded-2xl">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-medium"
            title={isBn ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isBn ? 'ইংরেজি টাইপিং একাডেমি' : 'English Typing Academy'}
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                  Learn & Speed
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isBn
                  ? 'হোম রো থেকে শুরু করে ২৮টি ধাপে ইংরেজি টাচ-টাইপিং প্রশিক্ষণ'
                  : 'Zero-to-Hero 28 Graded Lessons with QWERTY finger guide'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* English Stars Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-bold"
            title={isBn ? 'ইংরেজি লেসনে অর্জিত স্টার' : 'Total English lesson stars'}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{totalEnglishStars}</span>
          </div>

          {/* Best WPM Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{isBn ? 'সেরা গতি:' : 'Best:'}</span>
            <span className="font-mono text-sm text-amber-200">
              {state.profile.englishBestWpm || 0} WPM
            </span>
          </div>

          <button
            onClick={resetSession}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isBn ? 'রিস্টার্ট করুন (Esc)' : 'Restart (Esc)'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Mode Selector Tabs */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1 flex-1 min-w-[320px] overflow-x-auto">
          {/* Learning Lessons Tab (Primary) */}
          <button
            onClick={() => {
              setActiveMode('learning');
              setIsEditingCustom(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeMode === 'learning'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isBn ? 'লার্নিং লেসন (২৮টি পাঠ)' : 'Learning Lessons (28)'}</span>
          </button>

          {/* Speed Test Tab */}
          <button
            onClick={() => {
              setActiveMode('speed-test');
              setIsEditingCustom(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeMode === 'speed-test'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>{isBn ? 'স্পিড টেস্ট (টাইমার)' : 'Speed Test'}</span>
          </button>

          {/* Touch Drills Tab */}
          <button
            onClick={() => {
              setActiveMode('drills');
              setIsEditingCustom(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeMode === 'drills'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>{isBn ? 'টাচ ড্রিল' : 'Touch Drills'}</span>
          </button>

          {/* Custom Practice Tab */}
          <button
            onClick={() => {
              setActiveMode('custom');
              setIsEditingCustom(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeMode === 'custom'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>{isBn ? 'কাস্টম' : 'Custom'}</span>
          </button>
        </div>

        {/* Secondary Sub-controls */}
        <div className="flex items-center gap-2">
          {activeMode === 'speed-test' && (
            <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 px-1 font-semibold">
                <Clock className="w-3 h-3 inline mr-1" />
                {isBn ? 'সময়:' : 'Time:'}
              </span>
              {[60, 180, 300].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setTestDuration(duration)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                    testDuration === duration
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {duration / 60}m
                </button>
              ))}
            </div>
          )}

          {/* Toggle Guides */}
          <button
            onClick={() => setShowHands((prev) => !prev)}
            className={`p-2 rounded-xl text-xs border transition-colors flex items-center gap-1 ${
              showHands
                ? 'bg-slate-800 border-cyan-800/80 text-cyan-300'
                : 'border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Hands & Fingers Guide"
          >
            <span className="text-xs">✋</span>
          </button>

          <button
            onClick={() => setShowKeyboard((prev) => !prev)}
            className={`p-2 rounded-xl text-xs border transition-colors flex items-center gap-1 ${
              showKeyboard
                ? 'bg-slate-800 border-cyan-800/80 text-cyan-300'
                : 'border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle On-Screen Keyboard"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Learning Mode: Interactive Curriculum Header & Lesson Selector */}
      {activeMode === 'learning' && (
        <div className="w-full flex flex-col gap-3">
          {/* Level Switcher Ribbon */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {ENGLISH_CURRICULUM.map((cat) => {
              const isUnlocked = unlockedLevels.includes(cat.level);
              const isSelected = selectedLevelTab === cat.level;
              const levelLessons = cat.lessons;
              const completedCount = levelLessons.filter((l) => completedLessons[l.id]?.stars > 0).length;

              return (
                <button
                  key={cat.level}
                  onClick={() => {
                    setSelectedLevelTab(cat.level);
                    // Select first lesson of level if not active
                    const firstOfLevel = cat.lessons[0];
                    if (firstOfLevel && activeLesson.level !== cat.level) {
                      setActiveLesson(firstOfLevel);
                    }
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all border ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10'
                      : isUnlocked
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                  }`}
                >
                  {!isUnlocked ? (
                    <Lock className="w-3 h-3 text-slate-500" />
                  ) : completedCount === levelLessons.length ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : null}
                  <span>L{cat.level}: {isBn ? cat.nameBn.split(':')[1]?.trim() || cat.nameBn : cat.nameEn.split(':')[1]?.trim() || cat.nameEn}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950 text-slate-400 font-mono">
                    {completedCount}/{levelLessons.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Level's Lessons Carousel / Cards */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {ENGLISH_CURRICULUM.find((c) => c.level === selectedLevelTab)?.lessons.map((lesson) => {
              const isCurrent = activeLesson.id === lesson.id;
              const progress = completedLessons[lesson.id];
              const stars = progress?.stars || 0;
              const isUnlocked = unlockedLevels.includes(lesson.level);

              return (
                <button
                  key={lesson.id}
                  disabled={!isUnlocked}
                  onClick={() => setActiveLesson(lesson)}
                  className={`p-2.5 rounded-xl text-left flex flex-col justify-between gap-1.5 transition-all border relative ${
                    isCurrent
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg'
                      : isUnlocked
                      ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-amber-300">
                      L{lesson.level}.{lesson.subIndex}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= stars
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-semibold truncate leading-tight mt-0.5">
                    {isBn ? lesson.titleBn : lesson.titleEn}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Lesson Detail Banner */}
          <div className="w-full p-4 rounded-2xl glass-panel border border-amber-500/30 bg-slate-950/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono">
                  Lesson {activeLesson.level}.{activeLesson.subIndex}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {isBn ? activeLesson.titleBn : activeLesson.titleEn}
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                {isBn ? activeLesson.descriptionBn : activeLesson.descriptionEn}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                <span className="text-slate-400 font-mono">
                  🎯 {isBn ? 'পাস:' : 'Pass:'} {activeLesson.passAccuracy}% Acc | {activeLesson.targetWpm} WPM
                </span>
                <span className="text-amber-400/90 font-mono">
                  💡 {isBn ? activeLesson.tipBn : activeLesson.tipEn}
                </span>
              </div>
            </div>

            {/* Quick Prev / Next Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {prevLesson && (
                <button
                  onClick={() => {
                    setActiveLesson(prevLesson);
                    setSelectedLevelTab(prevLesson.level);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                  title="Previous Lesson"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পূর্ববর্তী' : 'Prev'}</span>
                </button>
              )}
              {nextLesson && (
                <button
                  onClick={() => {
                    setActiveLesson(nextLesson);
                    setSelectedLevelTab(nextLesson.level);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Next Lesson"
                >
                  <span>{isBn ? 'পরবর্তী' : 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Speed Test / Drills / Custom Sub-selectors */}
      {activeMode === 'speed-test' && (
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold shrink-0">
            {isBn ? 'অনুচ্ছেদ:' : 'Passage:'}
          </span>
          {ENGLISH_SPEED_PASSAGES.map((passage, idx) => (
            <button
              key={passage.id}
              onClick={() => setPassageIndex(idx)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all border ${
                passageIndex === idx
                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isBn ? passage.titleBn : passage.titleEn}
            </button>
          ))}
        </div>
      )}

      {activeMode === 'drills' && (
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold shrink-0">
            {isBn ? 'ড্রিল ক্যাটাগরি:' : 'Drill:'}
          </span>
          {ENGLISH_DRILLS.map((drill, idx) => (
            <button
              key={drill.id}
              onClick={() => setDrillIndex(idx)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all border ${
                drillIndex === idx
                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isBn ? drill.titleBn : drill.titleEn}
            </button>
          ))}
        </div>
      )}

      {activeMode === 'custom' && (
        <div className="w-full flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-400">
            {isBn
              ? 'আপনার ইচ্ছেমতো যেকোনো ইংরেজি টেক্সট টাইপ বা পেস্ট করুন:'
              : 'Paste or type any English text to practice:'}
          </span>
          <button
            onClick={() => setIsEditingCustom((prev) => !prev)}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium transition-colors"
          >
            {isEditingCustom ? (isBn ? 'সংরক্ষণ ও শুরু' : 'Save & Start') : (isBn ? 'টেক্সট সম্পাদনা' : 'Edit Text')}
          </button>
        </div>
      )}

      {/* Custom Textarea Editor */}
      {activeMode === 'custom' && isEditingCustom && (
        <div className="w-full p-4 rounded-2xl glass-panel border border-cyan-500/40 bg-slate-900/90 flex flex-col gap-3">
          <label className="text-xs font-semibold text-cyan-400">
            {isBn ? 'ইংরেজি টেক্সট লিখুন বা পেস্ট করুন:' : 'Enter or paste custom text:'}
          </label>
          <textarea
            value={customInputText}
            onChange={(e) => setCustomInputText(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Type or paste your English text here..."
          />
          <button
            onClick={() => {
              setIsEditingCustom(false);
              resetSession();
            }}
            className="self-end px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20"
          >
            {isBn ? 'প্র্যাকটিস শুরু করুন' : 'Start Practice'}
          </button>
        </div>
      )}

      {/* 5. Live Typing HUD Dashboard */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Speed / WPM */}
        <div className="rounded-2xl glass-card border border-slate-800/90 bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {isBn ? 'গতি (Gross WPM)' : 'Speed (Gross WPM)'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-mono">
              {liveGrossWpm}
            </span>
            <span className="text-xs text-slate-500 font-mono">WPM</span>
          </div>
        </div>

        {/* Accuracy % */}
        <div className="rounded-2xl glass-card border border-slate-800/90 bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {isBn ? 'নিখুঁততা (Accuracy)' : 'Accuracy'}
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-3xl sm:text-4xl font-extrabold font-mono ${
                liveAccuracy >= 95
                  ? 'text-emerald-400'
                  : liveAccuracy >= 90
                  ? 'text-cyan-400'
                  : 'text-amber-400'
              }`}
            >
              {liveAccuracy}%
            </span>
          </div>
        </div>

        {/* Time Left or Elapsed */}
        <div className="rounded-2xl glass-card border border-slate-800/90 bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {activeMode === 'speed-test'
                ? isBn
                  ? 'অবশিষ্ট সময়'
                  : 'Time Remaining'
                : isBn
                ? 'ব্যয়িত সময়'
                : 'Elapsed Time'}
            </span>
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
            {activeMode === 'speed-test' ? formatTime(timeLeft) : formatTime(elapsedSeconds)}
          </span>
        </div>

        {/* Keystrokes & Mistakes */}
        <div className="rounded-2xl glass-card border border-slate-800/90 bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {isBn ? 'কীস্ট্রোক ও ভুল' : 'Keys & Errors'}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-200 font-mono">
                {keystrokeCount}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">ক্লিক</span>
            </div>
            <span className="text-slate-600">/</span>
            <div className="flex items-baseline gap-0.5">
              <span
                className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                  mistakeCount > 0 ? 'text-rose-400' : 'text-slate-400'
                }`}
              >
                {mistakeCount}
              </span>
              <span className="text-[10px] text-rose-500 font-mono">ভুল</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Main Target Text Stream Viewport */}
      <div
        ref={textContainerRef}
        onClick={() => hiddenInputRef.current?.focus()}
        className={`w-full max-h-56 sm:max-h-64 overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border transition-all cursor-text relative shadow-2xl ${
          isKeyError
            ? 'border-rose-500/80 bg-rose-950/10 ring-2 ring-rose-500/40 animate-shake'
            : isStarted
            ? 'border-amber-500/60 bg-slate-950/90 shadow-amber-500/5'
            : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
        }`}
      >
        <input
          ref={hiddenInputRef}
          type="text"
          className="opacity-0 absolute -top-10 left-0 w-1 h-1 pointer-events-none"
          aria-hidden="true"
        />

        {/* Start banner prompt */}
        {!isStarted && !isCompleted && (
          <div className="absolute top-2 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium pointer-events-none animate-pulse">
            <Info className="w-3.5 h-3.5" />
            <span>{isBn ? 'যেকোনো কী টাইপ করে শুরু করুন' : 'Press any key to start'}</span>
          </div>
        )}

        {/* Character Stream */}
        <div className="text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose font-mono select-none break-words tracking-wide">
          {targetText.split('').map((char, index) => {
            const isTyped = index < charIndex;
            const isCurrent = index === charIndex;

            if (isCurrent) {
              return (
                <span
                  key={index}
                  ref={currentCharSpanRef}
                  className={`relative px-1 py-0.5 rounded transition-all font-bold ${
                    isKeyError
                      ? 'bg-rose-500/50 text-rose-200 ring-2 ring-rose-400 animate-shake'
                      : 'bg-amber-500/30 text-amber-200 ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                  }`}
                >
                  {char === ' ' ? '␣' : char}
                  <span className="absolute -top-1 -right-0.5 w-0.5 h-7 bg-amber-400 animate-ping" />
                </span>
              );
            }

            if (isTyped) {
              return (
                <span
                  key={index}
                  className="text-emerald-400 opacity-90 transition-colors"
                >
                  {char}
                </span>
              );
            }

            return (
              <span key={index} className="text-slate-500">
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* 7. Physical Touch Typing Ergonomic Guidance */}
      {showHands && currentKeyDef && (
        <HandsGuide activeFinger={currentKeyDef.finger} isBn={isBn} />
      )}

      {/* 8. On-Screen QWERTY Keyboard */}
      {showKeyboard && (
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full max-w-4xl flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
              <span>
                {currentKeyStep?.label
                  ? `${isBn ? 'পরবর্তী কী:' : 'Target Key:'} ${currentKeyStep.label}`
                  : ''}
              </span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {isBn ? 'আন্তর্জাতিক QWERTY লেআউট' : 'QWERTY Touch Typing'}
            </span>
          </div>

          <OnScreenKeyboard
            targetSteps={currentKeyStep ? [currentKeyStep] : []}
            activeStepIndex={0}
            pressedKeys={pressedKeys}
            isShiftPressed={isShiftPressed}
            size="standard"
            onKeyClick={handleVirtualKeyClick}
            showFingerGuide={true}
            layoutMode="english"
          />
        </div>
      )}

      {/* 9. Completion & Scorecard Modal */}
      {isCompleted && resultMetrics && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl rounded-3xl glass-panel border border-slate-700 bg-slate-900 p-6 sm:p-8 flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header Icon / Stars */}
            {activeMode === 'learning' ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 py-2">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-9 h-9 transition-all transform ${
                        s <= resultMetrics.starsEarned
                          ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-bounce'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {resultMetrics.isPassed
                    ? isBn
                      ? 'দারুণ! লেসন সম্পন্ন হয়েছে'
                      : 'Lesson Completed!'
                    : isBn
                    ? 'আরেকটু অনুশীলন প্রয়োজন'
                    : 'Keep Practicing!'}
                </h2>
                <p className="text-xs text-slate-400">
                  {resultMetrics.isPassed
                    ? isBn
                      ? `আপনি ${resultMetrics.starsEarned}টি স্টার অর্জন করেছেন!`
                      : `You earned ${resultMetrics.starsEarned} Stars!`
                    : isBn
                    ? `পাস করতে ন্যূনতম ${activeLesson.passAccuracy}% নির্ভুলতা প্রয়োজন।`
                    : `Need minimum ${activeLesson.passAccuracy}% accuracy to pass.`}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {isBn ? 'অভিনন্দন! পরীক্ষা সমাপ্ত' : 'Test Completed!'}
                </h2>
                <p className="text-xs text-slate-400">
                  {resultMetrics.rankTitle}
                </p>
              </div>
            )}

            {/* Scorecard Metric Grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Gross WPM</span>
                <p className="text-2xl font-bold text-amber-400 font-mono">
                  {resultMetrics.grossWpm}
                </p>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Net WPM</span>
                <p className="text-2xl font-bold text-blue-400 font-mono">
                  {resultMetrics.netWpm}
                </p>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</span>
                <p className="text-2xl font-bold text-emerald-400 font-mono">
                  {resultMetrics.accuracy}%
                </p>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Time</span>
                <p className="text-2xl font-bold text-slate-200 font-mono">
                  {formatTime(resultMetrics.timeTaken)}
                </p>
              </div>
            </div>

            {/* Candidate Name Input for Certificate (Speed test mode) */}
            {activeMode === 'speed-test' && (
              <div className="w-full flex flex-col gap-1.5 text-left">
                <label className="text-xs text-slate-400 font-medium">
                  {isBn ? 'সার্টিফিকেটে আপনার নাম:' : 'Candidate Name for Certificate:'}
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              {activeMode === 'learning' && nextLesson && resultMetrics.isPassed ? (
                <button
                  onClick={() => {
                    setActiveLesson(nextLesson);
                    setSelectedLevelTab(nextLesson.level);
                    resetSession();
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>{isBn ? 'পরবর্তী লেসন শুরু করুন' : 'Start Next Lesson'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : activeMode === 'speed-test' ? (
                <button
                  onClick={() => {
                    if (onSaveCertificate && resultMetrics) {
                      onSaveCertificate({
                        id: `cert-eng-${Date.now()}`,
                        userName: candidateName || 'Candidate',
                        wpm: resultMetrics.grossWpm,
                        accuracy: resultMetrics.accuracy,
                        date: new Date().toLocaleDateString(),
                        durationMinutes: Math.max(1, Math.round(resultMetrics.timeTaken / 60)),
                        testTitle: activePassage.titleEn
                      });
                    }
                    setShowCertModal(true);
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isBn ? 'সার্টিফিকেট দেখুন ও প্রিন্ট' : 'View & Print Certificate'}</span>
                </button>
              ) : null}

              <button
                onClick={resetSession}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isBn ? 'পুনরায় চেষ্টা করুন' : 'Try Again'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. Printable Certificate Modal */}
      {showCertModal && resultMetrics && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border-8 border-slate-900 flex flex-col items-center text-center gap-6 relative print:border-none print:shadow-none">
            {/* Certificate Header */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-cyan-600 font-extrabold text-sm uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5 text-cyan-600" />
                <span>TypeShikhi Certified Speed Verification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                Certificate of Typing Proficiency
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full my-1" />
            </div>

            {/* Candidate Name Presentation */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs uppercase font-medium text-slate-500 tracking-wider">
                This is proudly presented to
              </span>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 border-b-2 border-slate-300 pb-1 px-8 min-w-[280px]">
                {candidateName || 'Candidate'}
              </p>
              <span className="text-xs text-slate-600 mt-2 max-w-md">
                for successfully demonstrating exceptional touch typing speed and accuracy in English typing skills assessment.
              </span>
            </div>

            {/* Performance Badges */}
            <div className="w-full grid grid-cols-3 gap-4 py-4 border-y border-slate-200">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Gross Speed</span>
                <p className="text-3xl font-extrabold text-cyan-600 font-mono">
                  {resultMetrics.grossWpm} WPM
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Net Speed</span>
                <p className="text-3xl font-extrabold text-blue-600 font-mono">
                  {resultMetrics.netWpm} WPM
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Accuracy</span>
                <p className="text-3xl font-extrabold text-emerald-600 font-mono">
                  {resultMetrics.accuracy}%
                </p>
              </div>
            </div>

            {/* Footer credentials */}
            <div className="w-full flex items-center justify-between text-xs text-slate-500 pt-2">
              <div className="text-left font-mono">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Engine: TypeShikhi QWERTY v2.0</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="w-28 border-b border-slate-400 mb-1" />
                <span className="text-[10px] uppercase font-bold text-slate-700">Verified System</span>
              </div>
            </div>

            {/* Print Controls */}
            <div className="w-full flex items-center justify-end gap-3 pt-4 border-t border-slate-200 print:hidden">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setShowCertModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnglishTypingView;
