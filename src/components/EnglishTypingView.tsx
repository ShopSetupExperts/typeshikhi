import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
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
  Info
} from 'lucide-react';
import {
  ENGLISH_DRILLS,
  ENGLISH_SPEED_PASSAGES,
  getEnglishKeyStep
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
}

type TypingMode = 'speed-test' | 'drills' | 'custom';

export const EnglishTypingView: React.FC<EnglishTypingViewProps> = ({
  state,
  onBackToDashboard,
  onUpdateEnglishBestWpm,
  onSaveCertificate
}) => {
  const isBn = state.settings.language === 'bn';

  // Mode selection: 'speed-test' | 'drills' | 'custom'
  const [activeMode, setActiveMode] = useState<TypingMode>('speed-test');

  // Speed test configurations
  const [testDuration, setTestDuration] = useState<number>(60); // 60, 180, 300
  const [passageIndex, setPassageIndex] = useState<number>(0);
  const activePassage = ENGLISH_SPEED_PASSAGES[passageIndex] || ENGLISH_SPEED_PASSAGES[0];

  // Drills configurations
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const activeDrill = ENGLISH_DRILLS[drillIndex] || ENGLISH_DRILLS[0];

  // Custom text configuration
  const [customInputText, setCustomInputText] = useState<string>(
    'The ability to type quickly and accurately is one of the most valuable computer skills in the modern world. Consistent daily practice on home row muscle memory will dramatically improve your speed.'
  );
  const [isEditingCustom, setIsEditingCustom] = useState<boolean>(false);

  // Determine current target text
  const targetText =
    activeMode === 'speed-test'
      ? activePassage.text
      : activeMode === 'drills'
      ? activeDrill.targetText
      : customInputText;

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
  } | null>(null);

  // Refs for auto-scroll and focus
  const textContainerRef = useRef<HTMLDivElement>(null);
  const currentCharSpanRef = useRef<HTMLSpanElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Active target character step
  const targetChar = targetText[charIndex] || '';
  const currentKeyStep = targetChar ? getEnglishKeyStep(targetChar) : undefined;
  const currentKeyDef = currentKeyStep?.code ? BIJOY_KEYMAP[currentKeyStep.code] : undefined;

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

  // Mode or passage/drill change resets session
  useEffect(() => {
    resetSession();
  }, [activeMode, passageIndex, drillIndex, testDuration, resetSession]);

  // Handle speed rank calculation
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

    const metrics = {
      grossWpm,
      netWpm,
      accuracy,
      timeTaken: timeSpentSec,
      totalKeystrokes: keystrokeCount,
      mistakes: mistakeCount,
      rankTitle
    };

    setResultMetrics(metrics);

    // Update English best WPM in profile
    if (grossWpm > (state.profile.englishBestWpm || 0)) {
      onUpdateEnglishBestWpm(grossWpm);
    }

    // Play celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, [
    activeMode,
    testDuration,
    timeLeft,
    elapsedSeconds,
    keystrokeCount,
    mistakeCount,
    state.profile.englishBestWpm,
    onUpdateEnglishBestWpm,
    getSpeedRank
  ]);

  // Countdown timer for speed-test and count-up for drills/custom
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

        // Check if finished passage / drill
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
    // Find matching character
    const charEntry = Object.entries(BIJOY_KEYMAP).find(([c]) => c === code);
    if (!charEntry) return;

    let simulatedChar = '';
    if (code === 'Space') {
      simulatedChar = ' ';
    } else if (code.startsWith('Key')) {
      const letter = charEntry[1].labelEn;
      simulatedChar = shift ? letter.toUpperCase() : letter.toLowerCase();
    } else {
      // Map digits/punctuations
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

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isBn ? 'ইংরেজি টাইপিং স্পিড ইঞ্জিন' : 'English Typing Speed Engine'}
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/70 font-semibold uppercase">
                  QWERTY Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isBn
                  ? 'আন্তর্জাতিক স্ট্যান্ডার্ড টাচ টাইপিং গতি বৃদ্ধির সিস্টেম'
                  : 'Targeted drills & certified timed speed tests'}
              </p>
            </div>
          </div>
        </div>

        {/* Best WPM Badge */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
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

      {/* 2. Mode Selector Tabs */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1 flex-1 min-w-[280px]">
          <button
            onClick={() => {
              setActiveMode('speed-test');
              setIsEditingCustom(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeMode === 'speed-test'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>{isBn ? 'স্পিড টেস্ট (টাইমার)' : 'Timed Speed Test'}</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('drills');
              setIsEditingCustom(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeMode === 'drills'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>{isBn ? 'টাচ ড্রিল (হোম/টপ/বটম)' : 'Touch Typing Drills'}</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('custom');
              setIsEditingCustom(false);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeMode === 'custom'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>{isBn ? 'কাস্টম টেক্সট' : 'Custom Practice'}</span>
          </button>
        </div>

        {/* Secondary Sub-controls based on activeMode */}
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

      {/* 3. Sub-selector (Passage / Drill / Custom Text editor) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {activeMode === 'speed-test' && (
          <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
          <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
          <div className="w-full flex items-center justify-between gap-2">
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
      </div>

      {/* Custom Textarea Editor (When editing custom text) */}
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

      {/* 4. Live Typing HUD Dashboard */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Speed / WPM */}
        <div className="rounded-2xl glass-card border border-slate-800/90 bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {isBn ? 'গতি (Gross WPM)' : 'Speed (Gross WPM)'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
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

      {/* 5. Main Target Text Stream Viewport */}
      <div
        ref={textContainerRef}
        onClick={() => hiddenInputRef.current?.focus()}
        className={`w-full max-h-56 sm:max-h-64 overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border transition-all cursor-text relative shadow-2xl ${
          isKeyError
            ? 'border-rose-500/80 bg-rose-950/10 ring-2 ring-rose-500/40 animate-shake'
            : isStarted
            ? 'border-cyan-500/60 bg-slate-950/90 shadow-cyan-500/5'
            : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
        }`}
      >
        {/* Hidden dummy input to catch mobile/tablet focus if needed */}
        <input
          ref={hiddenInputRef}
          type="text"
          className="opacity-0 absolute -top-10 left-0 w-1 h-1 pointer-events-none"
          aria-hidden="true"
        />

        {/* Start banner prompt if not started */}
        {!isStarted && !isCompleted && (
          <div className="absolute top-2 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium pointer-events-none animate-pulse">
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
                      : 'bg-cyan-500/30 text-cyan-200 ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  }`}
                >
                  {char === ' ' ? '␣' : char}
                  {/* Blinking animated cursor indicator */}
                  <span className="absolute -top-1 -right-0.5 w-0.5 h-7 bg-cyan-400 animate-ping" />
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

      {/* 6. Physical Touch Typing Ergonomic Guidance */}
      {showHands && currentKeyDef && (
        <HandsGuide activeFinger={currentKeyDef.finger} isBn={isBn} />
      )}

      {/* 7. On-Screen QWERTY Keyboard */}
      {showKeyboard && (
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full max-w-4xl flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
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

      {/* 8. Test Completion & Certificate Modal */}
      {isCompleted && resultMetrics && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-xl rounded-3xl glass-panel border border-slate-700 bg-slate-900 p-6 sm:p-8 flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {isBn ? 'অভিনন্দন! পরীক্ষা সমাপ্ত' : 'Test Completed!'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {resultMetrics.rankTitle}
              </p>
            </div>

            {/* Scorecard Metric Grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Gross WPM</span>
                <p className="text-2xl font-bold text-cyan-400 font-mono">
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

            {/* Candidate Name Input for Certificate */}
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

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
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
                      testTitle: activeMode === 'speed-test' ? activePassage.titleEn : 'English Typing Skills'
                    });
                  }
                  setShowCertModal(true);
                }}
                className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isBn ? 'সার্টিফিকেট দেখুন ও প্রিন্ট' : 'View & Print Certificate'}</span>
              </button>

              <button
                onClick={resetSession}
                className="w-full sm:flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isBn ? 'পুনরায় চেষ্টা করুন' : 'Try Again'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Printable Certificate Modal */}
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

            {/* Print Controls (Hidden when printing) */}
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
