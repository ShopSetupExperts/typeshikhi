import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Star,
  RotateCcw,
  ArrowRight,
  Target,
  Share2,
  CheckCircle2,
  XCircle,
  X
} from 'lucide-react';
import type { Lesson } from '../data/curriculum';
import type { TypingMetrics } from '../engine/bijoy-engine';
import { soundManager } from '../engine/sound-synthesizer';

interface ResultModalProps {
  lesson: Lesson;
  metrics: TypingMetrics;
  isBn: boolean;
  onRetry: () => void;
  onNextLesson?: () => void;
  onPracticeWeakKeys: (keys: string[]) => void;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  lesson,
  metrics,
  isBn,
  onRetry,
  onNextLesson,
  onPracticeWeakKeys,
  onClose
}) => {
  // Calculate stars
  let stars = 0;
  const isPassed = metrics.accuracy >= lesson.passAccuracy;
  if (isPassed) {
    stars = 1;
    if (metrics.accuracy >= 95 && metrics.grossWpm >= (lesson.targetWpm || 15)) stars = 2;
    if (metrics.accuracy >= 98 && metrics.grossWpm >= (lesson.targetWpm || 25)) stars = 3;
  }


  // Trigger celebration on pass
  useEffect(() => {
    if (isPassed) {
      soundManager.playVictoryFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    } else {
      soundManager.playErrorSound();
    }
  }, [isPassed]);

  // Extract weak keys
  const weakKeyEntries = Object.entries(metrics.weakKeys)
    .filter(([_, data]) => data.errors > 0)
    .sort((a, b) => b[1].errors - a[1].errors);

  const handleShare = () => {
    const text = `⌨️ টাইপশিখি (TypeShikhi) এ আমার স্কোর: ${metrics.grossWpm} WPM গতি এবং ${metrics.accuracy}% নির্ভুলতা! বিজয় কীবোর্ডে টাইপিং শিখুন সহজে।`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert(isBn ? 'ফলাফল ক্লিপবোর্ডে কপি করা হয়েছে!' : 'Result copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl glass-panel border border-slate-700/80 bg-slate-900/95 p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Level & Title */}
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
          {isBn ? `লেভেল ${lesson.level} সমাপ্ত` : `Level ${lesson.level} Complete`}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-bangla mt-1">
          {isBn ? lesson.titleBn : lesson.titleEn}
        </h3>


        {/* Star Rating Animation */}
        <div className="flex items-center justify-center gap-3 my-4">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className={`p-2.5 rounded-2xl transition-all duration-300 transform ${
                starIdx <= stars
                  ? 'bg-amber-500/20 text-yellow-400 scale-110 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/60 text-slate-600 scale-95'
              }`}
            >
              <Star
                className={`w-8 h-8 ${
                  starIdx <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Pass / Fail Status Badge */}
        <div className="mb-6">
          {isPassed ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isBn ? 'অভিনন্দন! লেসন সফলভাবে উত্তীর্ণ হয়েছে।' : 'Lesson Passed Successfully!'}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-semibold">
              <XCircle className="w-4 h-4" />
              <span>
                {isBn
                  ? `উত্তীর্ণ হতে কমপক্ষে ${lesson.passAccuracy}% নির্ভুলতা প্রয়োজন।`
                  : `Need ${lesson.passAccuracy}% accuracy to pass.`}
              </span>
            </div>
          )}
        </div>

        {/* Scorecard Stats Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {/* Gross WPM */}
          <div className="glass-card rounded-xl p-3 flex flex-col items-center bg-slate-950/50 border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              {isBn ? 'গতি (Gross)' : 'Gross WPM'}
            </span>
            <span className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">
              {metrics.grossWpm}
            </span>
          </div>

          {/* Accuracy */}
          <div className="glass-card rounded-xl p-3 flex flex-col items-center bg-slate-950/50 border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              {isBn ? 'নির্ভুলতা' : 'Accuracy'}
            </span>
            <span
              className={`text-2xl font-bold font-mono mt-0.5 ${
                metrics.accuracy >= 90 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {metrics.accuracy}%
            </span>
          </div>

          {/* Time */}
          <div className="glass-card rounded-xl p-3 flex flex-col items-center bg-slate-950/50 border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              {isBn ? 'সময়' : 'Time'}
            </span>
            <span className="text-2xl font-bold font-mono text-slate-200 mt-0.5">
              {metrics.elapsedSeconds}s
            </span>
          </div>

          {/* Total Keystrokes & Errors */}
          <div className="glass-card rounded-xl p-3 flex flex-col items-center bg-slate-950/50 border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              {isBn ? 'ভুল সংখ্যা' : 'Mistakes'}
            </span>
            <span className="text-2xl font-bold font-mono text-rose-400 mt-0.5">
              {metrics.errorKeystrokes}
            </span>
          </div>
        </div>

        {/* Weak Keys Diagnostic Card */}
        {weakKeyEntries.length > 0 && (
          <div className="w-full mb-6 p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-left">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
                <Target className="w-4 h-4 text-rose-400" />
                <span>{isBn ? 'দুর্বল বর্ণসমূহ (ভুল হয়েছে):' : 'Weak Keys (Need Practice):'}</span>
              </div>
              <button
                onClick={() => onPracticeWeakKeys(weakKeyEntries.map(([char]) => char))}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-medium"
              >
                {isBn ? 'অনুশীলন শুরু করুন ➔' : 'Practice These Keys ➔'}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {weakKeyEntries.slice(0, 6).map(([char, data]) => (
                <span
                  key={char}
                  className="px-2.5 py-1 rounded-lg bg-rose-900/40 border border-rose-800/60 text-white font-bangla text-sm font-bold flex items-center gap-1.5"
                >
                  <span>{char}</span>
                  <span className="text-[10px] font-mono text-rose-300 font-normal">
                    ({data.errors}x)
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onRetry}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isBn ? 'আবার চেষ্টা করুন' : 'Retry Lesson'}</span>
          </button>

          {isPassed && onNextLesson && (
            <button
              onClick={onNextLesson}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{isBn ? 'পরবর্তী লেসন' : 'Next Lesson'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isBn ? 'শেয়ার করুন' : 'Share Result'}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
