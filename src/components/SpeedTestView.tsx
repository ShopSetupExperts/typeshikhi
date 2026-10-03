import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Clock,
  RotateCcw,
  Award,
  Printer,
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';
import { TIMED_TEST_PASSAGES } from '../data/curriculum';
import { BijoyEngine } from '../engine/bijoy-engine';
import type { KeyStep } from '../engine/bijoy-engine';
import { soundManager } from '../engine/sound-synthesizer';
import { OnScreenKeyboard } from './OnScreenKeyboard';
import type { AppState, UserCertificate } from '../store/useTypingStore';
import confetti from 'canvas-confetti';


interface SpeedTestViewProps {
  state: AppState;
  onBackToDashboard: () => void;
  onSaveCertificate: (cert: UserCertificate) => void;
}

export const SpeedTestView: React.FC<SpeedTestViewProps> = ({
  state,
  onBackToDashboard,
  onSaveCertificate
}) => {
  const isBn = state.settings.language === 'bn';

  // Config
  const [selectedDuration, setSelectedDuration] = useState<number>(60); // 60s (1m), 180s (3m), 300s (5m)
  const [selectedPassageIndex, setSelectedPassageIndex] = useState<number>(0);
  const activePassage = TIMED_TEST_PASSAGES[selectedPassageIndex];

  // Engine
  const engineRef = useRef<BijoyEngine>(new BijoyEngine());
  const [typedGraphemes, setTypedGraphemes] = useState<string[]>([]);
  const [currentGraphemeIndex, setCurrentGraphemeIndex] = useState<number>(0);
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);


  // Time & Status
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    grossWpm: number;
    netWpm: number;
    accuracy: number;
    totalKeystrokes: number;
    errors: number;
  } | null>(null);

  // Candidate name for certificate
  const [candidateName, setCandidateName] = useState<string>(state.profile.name);

  // Keyboard visualization
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [activeStepInGrapheme, setActiveStepInGrapheme] = useState<number>(0);

  const targetGraphemes = BijoyEngine.splitGraphemes(activePassage.text);
  const currentTargetGrapheme = targetGraphemes[currentGraphemeIndex] || '';
  const currentKeySteps: KeyStep[] = currentTargetGrapheme
    ? BijoyEngine.solveKeystrokesForGrapheme(currentTargetGrapheme)
    : [];

  const handleReset = useCallback(() => {
    engineRef.current.reset();
    setTypedGraphemes([]);
    setCurrentGraphemeIndex(0);
    setActiveStepInGrapheme(0);
    setKeystrokeCount(0);
    setErrorCount(0);
    setIsStarted(false);
    setIsCompleted(false);
    setTimeLeft(selectedDuration);
    setTestResult(null);
  }, [selectedDuration]);

  useEffect(() => {
    handleReset();
  }, [selectedDuration, selectedPassageIndex, handleReset]);

  const finishTest = useCallback(() => {
    setIsCompleted(true);
    const durationMinutes = selectedDuration / 60;
    const grossWpm = Math.round((keystrokeCount / 5) / durationMinutes);

    let correctCount = 0;
    for (let i = 0; i < typedGraphemes.length; i++) {
      if (i < targetGraphemes.length && typedGraphemes[i] === targetGraphemes[i]) {
        correctCount++;
      }
    }
    const accuracy =
      typedGraphemes.length > 0 ? Math.round((correctCount / typedGraphemes.length) * 100) : 0;

    const targetWords = activePassage.text.trim().split(/\s+/);
    const typedWords = engineRef.current.getBuffer().trim().split(/\s+/);
    let correctWords = 0;
    for (let i = 0; i < typedWords.length; i++) {
      if (i < targetWords.length && typedWords[i] === targetWords[i]) {
        correctWords++;
      }
    }
    const netWpm = Math.round(correctWords / durationMinutes);

    const result = {
      grossWpm,
      netWpm,
      accuracy,
      totalKeystrokes: keystrokeCount,
      errors: errorCount
    };
    setTestResult(result);

    // Play victory sound & confetti
    soundManager.playVictoryFanfare();
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch {}

    // Save certificate
    const cert: UserCertificate = {
      id: `cert-${Date.now()}`,
      userName: candidateName,
      wpm: grossWpm,
      accuracy,
      date: new Date().toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      durationMinutes,
      testTitle: isBn ? activePassage.titleBn : activePassage.titleEn
    };
    onSaveCertificate(cert);
  }, [
    selectedDuration,
    keystrokeCount,
    typedGraphemes,
    targetGraphemes,
    activePassage,
    errorCount,
    candidateName,
    isBn,
    onSaveCertificate
  ]);

  // Countdown timer
  useEffect(() => {
    let timer: number | null = null;
    if (isStarted && !isCompleted) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isStarted, isCompleted, finishTest]);


  // Key handlers
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isCompleted) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (['Space', 'Slash', 'Quote', 'Backspace', 'Tab'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
        return;
      }

      setPressedKeys((prev) => new Set(prev).add(e.code));
      soundManager.playKeyClick();

      if (!isStarted) {
        setIsStarted(true);
      }

      setKeystrokeCount((prev) => prev + 1);

      if (e.code === 'Backspace') {
        engineRef.current.handleBackspace();
        if (activeStepInGrapheme > 0) {
          setActiveStepInGrapheme((prev) => Math.max(0, prev - 1));
        } else if (typedGraphemes.length > 0) {
          const next = [...typedGraphemes];
          next.pop();
          setTypedGraphemes(next);
          setCurrentGraphemeIndex(Math.max(0, currentGraphemeIndex - 1));
          setActiveStepInGrapheme(0);
        }
        return;
      }

      const expectedStep = currentKeySteps[activeStepInGrapheme];
      const isExpectedKey = !!(
        expectedStep &&
        expectedStep.code === e.code &&
        (expectedStep.shift === undefined || expectedStep.shift === e.shiftKey)
      );

      engineRef.current.processKey(e.code, e.shiftKey);
      const fullText = engineRef.current.getBuffer();
      const newTyped = BijoyEngine.splitGraphemes(fullText);
      const targetChar = targetGraphemes[currentGraphemeIndex];

      const isMultiStep = currentKeySteps.length > 1;
      const isIntermediateStep = isMultiStep && isExpectedKey && activeStepInGrapheme + 1 < currentKeySteps.length;

      if (isIntermediateStep) {
        setActiveStepInGrapheme((prev) => prev + 1);
        setTypedGraphemes(newTyped);
        return;
      }

      const isMatch = !!(targetChar && newTyped[currentGraphemeIndex] === targetChar);
      if (targetChar && !isMatch) {
        soundManager.playErrorSound();
        setErrorCount((prev) => prev + 1);
      }

      setTypedGraphemes(newTyped);
      const nextIndex = Math.max(newTyped.length, currentGraphemeIndex + 1);
      setCurrentGraphemeIndex(nextIndex);
      setActiveStepInGrapheme(0);

      if (newTyped.length >= targetGraphemes.length || nextIndex >= targetGraphemes.length) {
        finishTest();
      }
    },
    [
      isCompleted,
      isStarted,
      typedGraphemes,
      currentGraphemeIndex,
      targetGraphemes,
      currentKeySteps,
      activeStepInGrapheme,
      finishTest
    ]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      setIsShiftPressed(false);
    }
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(e.code);
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Grade calculation
  const getGrade = (wpm: number, acc: number) => {
    if (wpm >= 35 && acc >= 95) return 'A+ (Exemplary Typist)';
    if (wpm >= 25 && acc >= 90) return 'A (Professional)';
    if (wpm >= 20 && acc >= 85) return 'B+ (Intermediate)';
    if (wpm >= 15 && acc >= 80) return 'B (Competent)';
    return 'C (Practicing)';
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2 flex flex-col items-center gap-2 sm:gap-2.5 select-none">
      {/* Top Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-2 px-3 rounded-2xl glass-panel border-slate-800 bg-slate-950/80">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToDashboard}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs sm:text-sm font-bold text-white font-bangla">
              {isBn ? 'স্পিড টেস্ট' : 'Speed Test'}
            </h2>
          </div>
        </div>

        {!isCompleted && (
          /* Inline Duration & Controls */
          <div className="flex items-center gap-2 flex-wrap">
            {/* Duration Pills */}
            <div className="flex items-center gap-1">
              {[
                { sec: 60, label: isBn ? '১ মি.' : '1m' },
                { sec: 180, label: isBn ? '৩ মি.' : '3m' },
                { sec: 300, label: isBn ? '৫ মি.' : '5m' }
              ].map((d) => (
                <button
                  key={d.sec}
                  onClick={() => {
                    setSelectedDuration(d.sec);
                    setTimeLeft(d.sec);
                    handleReset();
                  }}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedDuration === d.sec
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Passage Selector */}
            <select
              value={selectedPassageIndex}
              onChange={(e) => {
                setSelectedPassageIndex(Number(e.target.value));
                handleReset();
              }}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500 font-bangla max-w-[120px] sm:max-w-[160px] truncate"
            >
              {TIMED_TEST_PASSAGES.map((p, idx) => (
                <option key={p.id} value={idx}>
                  {isBn ? p.titleBn : p.titleEn}
                </option>
              ))}
            </select>

            {/* Time Left Pill */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Live Gross WPM */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 font-bold">
              <span>
                {isStarted
                  ? Math.round(
                      (keystrokeCount / 5) /
                        Math.max((selectedDuration - timeLeft) / 60, 0.01)
                    )
                  : 0}{' '}
                WPM
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleReset}
          className="p-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px] font-bangla">{isBn ? 'রিসেট' : 'Reset'}</span>
        </button>
      </div>

      {!isCompleted ? (
        <>
          {/* Test Passage Stream Box */}
          <div className="w-full glass-panel rounded-2xl p-3 sm:p-4 border border-slate-700 bg-slate-950/90 shadow-xl relative shrink-0">
            <div
              className="font-bangla leading-snug text-left tracking-wide min-h-[60px] sm:min-h-[70px] max-h-[90px] overflow-y-auto flex flex-wrap items-center gap-y-1.5 text-xl sm:text-2xl select-none"
              style={{ fontFamily: state.settings.fontFamily }}
            >
              {targetGraphemes.map((grapheme, idx) => {
                const isTyped = idx < typedGraphemes.length;
                const isCurrent = idx === currentGraphemeIndex;
                const isCorrect = isTyped && typedGraphemes[idx] === grapheme;
                const isIncorrect = isTyped && !isCorrect;

                let statusClass = 'text-slate-400';
                if (isCurrent) statusClass = 'current text-cyan-300 font-bold';
                else if (isCorrect) statusClass = 'correct';
                else if (isIncorrect) statusClass = 'incorrect';

                return (
                  <span
                    key={idx}
                    className={`target-char ${statusClass} ${
                      grapheme === ' ' ? 'w-2.5 sm:w-3 inline-block' : ''
                    }`}
                  >
                    {grapheme === ' ' ? '\u00A0' : grapheme}
                  </span>
                );
              })}
            </div>
          </div>

          {/* On Screen Keyboard */}
          <OnScreenKeyboard
            targetSteps={currentKeySteps}
            activeStepIndex={0}
            pressedKeys={pressedKeys}
            isShiftPressed={isShiftPressed}
            size={state.settings.keyboardSize}
          />
        </>
      ) : (

        /* Completed Result & Certificate View */
        <div className="w-full flex flex-col items-center gap-6">
          {/* Official Certificate Box */}
          <div
            id="certificate-print-area"
            className="w-full max-w-4xl p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-cyan-500/40 shadow-2xl relative overflow-hidden text-center"
          >
            {/* Background Seal Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-cyan-300">
              <ShieldCheck className="w-96 h-96" />
            </div>

            {/* Certificate Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                TYPESHIKHI BANGLADESH • CERTIFICATE OF TYPING PROFICIENCY
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-bangla mt-1">
                বিজয় বাংলা টাইপিং দক্ষতা সনদ
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Verification ID: TS-{Math.floor(100000 + Math.random() * 900000)} • Standard Bijoy 2000/Bayanno Layout
              </p>
            </div>

            {/* Candidate Name Input / Display */}
            <div className="my-6 py-4 border-y border-slate-800">
              <p className="text-xs text-slate-400 font-bangla uppercase tracking-wider mb-2">
                এই মর্মে প্রত্যয়ন করা যাইতেছে যে
              </p>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="text-2xl sm:text-3xl font-bold text-center bg-transparent border-b-2 border-cyan-500/60 focus:border-cyan-400 focus:outline-none text-cyan-300 font-bangla px-4 py-1 max-w-md w-full"
                placeholder="আপনার নাম লিখুন"
              />
              <p className="text-xs text-slate-400 font-bangla mt-2">
                সফলতার সহিত <strong>{selectedDuration / 60} মিনিটের</strong> বিজয় বাংলা টাইপিং স্পিড টেস্ট সম্পন্ন করিয়াছেন।
              </p>
            </div>

            {/* Key Scores Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Gross WPM</span>
                <p className="text-3xl font-bold font-mono text-cyan-400 mt-1">{testResult?.grossWpm}</p>
                <span className="text-[10px] text-slate-500">শব্দ / মিনিট</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Net Word WPM</span>
                <p className="text-3xl font-bold font-mono text-blue-400 mt-1">{testResult?.netWpm}</p>
                <span className="text-[10px] text-slate-500">শুদ্ধ বাংলা শব্দ</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</span>
                <p className="text-3xl font-bold font-mono text-emerald-400 mt-1">{testResult?.accuracy}%</p>
                <span className="text-[10px] text-slate-500">নির্ভুলতা</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Proficiency Grade</span>
                <p className="text-lg font-bold text-amber-400 mt-2 truncate">
                  {testResult ? getGrade(testResult.grossWpm, testResult.accuracy) : 'Passed'}
                </p>
              </div>
            </div>

            {/* Footer Signatures & QR Code */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-left text-xs text-slate-400 font-mono">
              <div>
                <p className="text-white font-bold">TypeShikhi Engine</p>
                <p>Verified Bijoy Layout Standard</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center text-[8px] text-cyan-400 font-bold text-center">
                    QR SEAL
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons for Certificate */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{isBn ? 'সনদ প্রিন্ট / PDF ডাউনলোড করুন' : 'Print Certificate / Save PDF'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isBn ? 'নতুন টেস্ট শুরু করুন' : 'Take Another Test'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
