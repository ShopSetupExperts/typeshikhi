import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Pause,
  Gauge,
  Target,
  Clock,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import type { Lesson } from '../data/curriculum';
import { BijoyEngine } from '../engine/bijoy-engine';
import type { KeyStep, TypingMetrics } from '../engine/bijoy-engine';
import { BIJOY_KEYMAP } from '../engine/bijoy-layout';
import type { FingerType } from '../engine/bijoy-layout';
import { soundManager } from '../engine/sound-synthesizer';
import { OnScreenKeyboard } from './OnScreenKeyboard';
import { HandsGuide } from './HandsGuide';
import { LessonQuickPickerModal } from './LessonQuickPickerModal';
import { ListFilter } from 'lucide-react';
import type { AppState } from '../store/useTypingStore';

interface LessonViewProps {
  lesson: Lesson;
  state: AppState;
  onComplete: (metrics: TypingMetrics) => void;
  onBackToDashboard: () => void;
  onSelectLesson?: (lesson: Lesson) => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  state,
  onComplete,
  onBackToDashboard,
  onSelectLesson,
  onNextLesson,
  onPrevLesson
}) => {
  const isBn = state.settings.language === 'bn';
  const targetText = lesson.targetText.trim();
  const targetGraphemes = useMemo(() => BijoyEngine.splitGraphemes(targetText), [targetText]);

  const [showPickerModal, setShowPickerModal] = useState<boolean>(false);

  // Engine instance
  const engineRef = useRef<BijoyEngine>(new BijoyEngine());

  // Typing state
  const [typedGraphemes, setTypedGraphemes] = useState<string[]>([]);
  const [currentGraphemeIndex, setCurrentGraphemeIndex] = useState<number>(0);
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [weakKeys, setWeakKeys] = useState<Record<string, { attempts: number; errors: number }>>({});

  // Active keyboard state for visualization
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [pendingPreKar, setPendingPreKar] = useState<string | null>(null);

  // Timer & active state
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // Next key steps solver
  const currentTargetGrapheme = targetGraphemes[currentGraphemeIndex] || '';
  const currentKeySteps: KeyStep[] = useMemo(() => currentTargetGrapheme
    ? BijoyEngine.solveKeystrokesForGrapheme(currentTargetGrapheme)
    : [], [currentTargetGrapheme]);

  const [activeStepInGrapheme, setActiveStepInGrapheme] = useState<number>(0);

  // Active finger for hands guide
  const currentKeyDef = currentKeySteps[activeStepInGrapheme]
    ? BIJOY_KEYMAP[currentKeySteps[activeStepInGrapheme].code]
    : null;
  const activeFinger: FingerType | undefined = currentKeyDef?.finger;

  // Reset engine & states
  const handleReset = useCallback(() => {
    engineRef.current.reset();
    setTypedGraphemes([]);
    setCurrentGraphemeIndex(0);
    setKeystrokeCount(0);
    setErrorCount(0);
    setBackspaceCount(0);
    setWeakKeys({});
    setPendingPreKar(null);
    setIsStarted(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    setActiveStepInGrapheme(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    handleReset();
  }, [lesson.id, handleReset]);

  // Timer effect
  useEffect(() => {
    if (isStarted && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isPaused]);

  // Handle focus loss
  useEffect(() => {
    const handleBlur = () => {
      if (isStarted) setIsPaused(true);
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [isStarted]);

  // Handle physical keydown
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (['Space', 'Slash', 'Quote', 'Backspace', 'Tab'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key === 'Shift') {
        setIsShiftPressed(true);
        return;
      }

      if (isPaused) {
        setIsPaused(false);
      }

      setPressedKeys((prev) => new Set(prev).add(e.code));
      soundManager.playKeyClick();

      if (!isStarted) {
        setIsStarted(true);
      }

      setKeystrokeCount((prev) => prev + 1);

      if (e.code === 'Backspace') {
        setBackspaceCount((prev) => prev + 1);
        engineRef.current.handleBackspace();
        const pending = engineRef.current.getPendingState();
        setPendingPreKar(pending.kar);

        if (activeStepInGrapheme > 0) {
          setActiveStepInGrapheme((prev) => Math.max(0, prev - 1));
        } else if (typedGraphemes.length > 0) {
          const nextTyped = [...typedGraphemes];
          nextTyped.pop();
          setTypedGraphemes(nextTyped);
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
      const pendingState = engineRef.current.getPendingState();
      setPendingPreKar(pendingState.kar);

      const currentFullText = engineRef.current.getBuffer();
      const newTypedGraphemes = BijoyEngine.splitGraphemes(currentFullText);
      const targetChar = targetGraphemes[currentGraphemeIndex];

      // Multi-step grapheme check (e.g. 'আ' = G + F, 'কো' = C + J + F, 'ক্ষ' = J + G + Shift+N)
      const isMultiStep = currentKeySteps.length > 1;
      const isIntermediateStep = isMultiStep && isExpectedKey && activeStepInGrapheme + 1 < currentKeySteps.length;

      if (isIntermediateStep) {
        setActiveStepInGrapheme((prev) => prev + 1);
        setTypedGraphemes(newTypedGraphemes);
        return;
      }

      // Final step of current grapheme, or single key grapheme, or mistyped key
      const isMatch = !!(targetChar && newTypedGraphemes[currentGraphemeIndex] === targetChar);

      if (targetChar) {
        setWeakKeys((prev) => {
          const existing = prev[targetChar] || { attempts: 0, errors: 0 };
          return {
            ...prev,
            [targetChar]: {
              attempts: existing.attempts + 1,
              errors: isMatch ? existing.errors : existing.errors + 1
            }
          };
        });

        if (!isMatch) {
          soundManager.playErrorSound();
          setErrorCount((prev) => prev + 1);
        }
      }

      setTypedGraphemes(newTypedGraphemes);
      const nextIndex = Math.max(newTypedGraphemes.length, currentGraphemeIndex + 1);
      setCurrentGraphemeIndex(nextIndex);
      setActiveStepInGrapheme(0);

      if (newTypedGraphemes.length >= targetGraphemes.length || nextIndex >= targetGraphemes.length) {
        const metrics = BijoyEngine.calculateMetrics(
          targetText,
          currentFullText,
          elapsedSeconds + 1,
          keystrokeCount + 1,
          backspaceCount,
          weakKeys
        );
        onComplete(metrics);
      }
    },
    [
      isStarted,
      isPaused,
      typedGraphemes,
      currentGraphemeIndex,
      targetGraphemes,
      currentKeySteps,
      activeStepInGrapheme,
      targetText,
      elapsedSeconds,
      keystrokeCount,
      backspaceCount,
      weakKeys,
      onComplete
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

  // Live Metrics calculations
  const minutes = Math.max(elapsedSeconds / 60, 0.01);
  const liveGrossWpm = isStarted ? Math.round((keystrokeCount / 5) / minutes) : 0;
  let correctCount = 0;
  for (let i = 0; i < typedGraphemes.length; i++) {
    if (i < targetGraphemes.length && typedGraphemes[i] === targetGraphemes[i]) {
      correctCount++;
    }
  }
  const liveAccuracy =
    typedGraphemes.length > 0 ? Math.round((correctCount / typedGraphemes.length) * 100) : 100;
  const progressPercent = Math.min(100, Math.round((typedGraphemes.length / targetGraphemes.length) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2 flex flex-col items-center gap-2 sm:gap-2.5 select-none">
      {/* 1. Unified Compact Top HUD Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-2 px-3 rounded-2xl glass-panel border-slate-800 bg-slate-950/80">
        {/* Left: Nav & Title with Quick Lesson Picker Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold shrink-0"
            title={isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Clickable Lesson Selector Badge */}
          <button
            onClick={() => setShowPickerModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group shadow-sm"
            title={isBn ? 'অন্য লেসন নির্বাচন করুন' : 'Change Lesson'}
          >
            <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold font-mono shrink-0">
              L{lesson.level}.{lesson.subIndex}
            </span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white font-bangla truncate max-w-[120px] sm:max-w-[200px]">
              {isBn ? lesson.titleBn : lesson.titleEn}
            </span>
            <ListFilter className="w-3 h-3 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform ml-0.5" />
          </button>
        </div>

        {/* Center: Live Stats Ribbon */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono">
          {/* Speed */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800" title="Gross WPM">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-cyan-400">{liveGrossWpm}</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">WPM</span>
          </div>

          {/* Accuracy */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800" title="Accuracy">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span
              className={`font-bold ${
                liveAccuracy >= 95 ? 'text-emerald-400' : liveAccuracy >= 90 ? 'text-yellow-400' : 'text-rose-400'
              }`}
            >
              {liveAccuracy}%
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800" title="Time Elapsed">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-200">
              {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, '0')}
            </span>
          </div>

          {/* Progress & Errors */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800" title="Progress and Mistakes">
            <span className="text-indigo-400 font-bold">{progressPercent}%</span>
            {errorCount > 0 && (
              <span className="text-rose-400 font-bold text-[10px] flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3" />
                {errorCount}
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {onPrevLesson && (
            <button
              onClick={onPrevLesson}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              title={isBn ? 'পূর্ববর্তী' : 'Prev'}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs flex items-center gap-1"
            title={isBn ? 'পুনরায়' : 'Restart'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-bangla">{isBn ? 'রিস্টার্ট' : 'Reset'}</span>
          </button>

          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              title={isBn ? 'পরবর্তী' : 'Next'}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Target Bangla Text Box (Compact & High Contrast) */}
      <div className="w-full relative glass-panel rounded-2xl p-3.5 sm:p-4 border border-slate-700/80 bg-slate-950/90 shadow-xl overflow-hidden shrink-0">
        {/* Paused Overlay */}
        {isPaused && (
          <div className="absolute inset-0 z-20 rounded-2xl bg-slate-950/85 backdrop-blur-sm flex items-center justify-center gap-2">
            <Pause className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200 font-bangla">
              {isBn ? 'টাইপিং সাময়িক স্থগিত — শুরু করতে যে কোনো কী চাপুন' : 'Paused — Press any key to resume'}
            </span>
          </div>
        )}

        {/* Target Text Stream */}
        <div
          className={`font-bangla leading-snug text-left tracking-wide min-h-[56px] sm:min-h-[64px] max-h-[85px] overflow-y-auto flex flex-wrap items-center gap-y-1.5 ${
            state.settings.fontSize === 'large'
              ? 'text-2xl sm:text-3xl'
              : state.settings.fontSize === 'xlarge'
              ? 'text-3xl sm:text-4xl'
              : 'text-xl sm:text-2xl'
          }`}
          style={{ fontFamily: state.settings.fontFamily }}
        >
          {targetGraphemes.map((grapheme, idx) => {
            const isTyped = idx < typedGraphemes.length;
            const isCurrent = idx === currentGraphemeIndex;
            const isCorrect = isTyped && typedGraphemes[idx] === grapheme;
            const isIncorrect = isTyped && !isCorrect;

            let statusClass = 'text-slate-400/90';
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

        {/* Progress line inside card bottom */}
        <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden mt-2.5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3. Sleek Interactive Keystroke & Assist Ribbon */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm shrink-0">
        {/* Keystroke Sequence Guide */}
        {currentTargetGrapheme ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-semibold font-bangla">
              {isBn ? 'কী অনুক্রম:' : 'Next:'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-bold font-bangla">
              {currentTargetGrapheme}
            </span>
            <span className="text-slate-500 text-xs">➔</span>

            {currentKeySteps.map((step, sIdx) => {
              const isActiveStep = sIdx === activeStepInGrapheme;
              return (
                <div key={sIdx} className="flex items-center gap-1">
                  <div
                    className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold flex items-center gap-1 border transition-all ${
                      isActiveStep
                        ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400 shadow-sm scale-105 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <span>{step.label}</span>
                    {step.description && (
                      <span className="text-[10px] text-slate-400 font-bangla">
                        ({step.description})
                      </span>
                    )}
                  </div>
                  {sIdx < currentKeySteps.length - 1 && (
                    <span className="text-slate-600 text-xs">+</span>
                  )}
                </div>
              );
            })}

            {pendingPreKar && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold font-bangla ml-1">
                প্রি-কার: {pendingPreKar}
              </span>
            )}
          </div>
        ) : (
          <div className="text-xs text-emerald-400 font-bangla font-semibold">
            {isBn ? '✓ লেসন সম্পন্ন হয়েছে!' : '✓ Lesson Complete!'}
          </div>
        )}

        {/* Active Tip / Finger Hint */}
        {lesson.tipBn && (
          <div className="hidden md:flex items-center gap-1 text-[11px] text-blue-300 font-bangla truncate max-w-md">
            <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{isBn ? lesson.tipBn : lesson.tipEn}</span>
          </div>
        )}
      </div>

      {/* 4. Compact Hands Guide Ribbon (Optional toggle / Always compact) */}
      {state.settings.showHandsGuide && (
        <HandsGuide activeFinger={activeFinger} isBn={isBn} />
      )}

      {/* 5. On-Screen Keyboard (Fully visible in one screen!) */}
      <OnScreenKeyboard
        targetSteps={currentKeySteps}
        activeStepIndex={activeStepInGrapheme}
        pressedKeys={pressedKeys}
        isShiftPressed={isShiftPressed}
        size={state.settings.keyboardSize}
        showFingerGuide={true}
      />

      {/* 6. Quick Lesson Picker Modal */}
      {showPickerModal && (
        <LessonQuickPickerModal
          state={state}
          activeLessonId={lesson.id}
          onSelectLesson={(l) => {
            if (onSelectLesson) onSelectLesson(l);
            setShowPickerModal(false);
          }}
          onClose={() => setShowPickerModal(false)}
        />
      )}
    </div>
  );
};
