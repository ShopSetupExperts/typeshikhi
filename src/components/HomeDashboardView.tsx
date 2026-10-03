import React from 'react';
import {
  BookOpen,
  Play,
  Gauge,
  Target,
  FileEdit,
  Sparkles,
  Star,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Keyboard
} from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import type { Lesson } from '../data/curriculum';
import type { AppState } from '../store/useTypingStore';

interface HomeDashboardViewProps {
  state: AppState;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigate: (view: AppState['currentView']) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  state,
  onSelectLesson,
  onNavigate
}) => {
  const isBn = state.settings.language === 'bn';

  const allLessons = CURRICULUM.flatMap((lvl) => lvl.lessons);
  const completedList = Object.values(state.completedLessons);
  const completedCount = completedList.length;
  const totalStars = completedList.reduce((acc, curr) => acc + curr.stars, 0);
  const totalPossibleStars = allLessons.length * 3;
  const overallProgress = Math.round((completedCount / allLessons.length) * 100);

  // Calculate average WPM and accuracy across completed lessons
  const avgWpm =
    completedCount > 0
      ? Math.round(completedList.reduce((acc, curr) => acc + curr.bestWpm, 0) / completedCount)
      : 0;
  const avgAccuracy =
    completedCount > 0
      ? Math.round(completedList.reduce((acc, curr) => acc + curr.bestAccuracy, 0) / completedCount)
      : 100;

  // Next recommended lesson to practice
  const nextLessonToResume =
    allLessons.find((l) => !state.completedLessons[l.id]) || allLessons[0];

  // Weak keys count
  const errorKeyCount = Object.values(state.weakKeys).filter((k) => k.errors > 0).length;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center gap-8 animate-fadeIn">
      {/* 1. Hero Welcome & Quick Start Banner */}
      <div className="w-full rounded-3xl glass-panel border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isBn ? 'জিরো-ইনস্টল প্রফেশনাল টাইপিং টিউটর' : 'Zero-Install Professional Typing Tutor'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-bangla tracking-tight leading-tight">
              সহজে শিখুন <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">বিজয় বাংলা টাইপিং</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-bangla mt-2.5 leading-relaxed">
              {isBn
                ? 'হোম রো থেকে শুরু করে যুক্তাক্ষর, কার ও সরকারি চাকরির টাইপিং স্পিড টেস্ট—সরাসরি আপনার কীবোর্ডেই টাইপ করুন কোনো সফটওয়্যার ইনস্টল ছাড়াই।'
                : 'Master Bijoy typing with real-time finger placement guide, on-screen keyboard, and govt-exam simulation.'}
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 font-bangla">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{isBn ? `${state.profile.streakDays} দিনের স্ট্রিক` : `${state.profile.streakDays} Day Streak`}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 font-bangla">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isBn ? '১৩টি প্রফেশনাল লেভেল' : '13 Graded Levels'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 font-bangla">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? '৫০+ যুক্তাক্ষর মাস্টার ড্রিল' : '50+ Conjuncts'}</span>
              </div>
            </div>
          </div>

          {/* Right Action & Progress Widget */}
          <div className="flex flex-col items-stretch sm:items-end gap-3 min-w-[260px]">
            <button
              onClick={() => onSelectLesson(nextLessonToResume)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isBn ? 'অনুশীলন চালিয়ে যান' : 'Continue Practice'}</span>
            </button>

            {/* Overall Progress Mini Card */}
            <div className="w-full bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 text-left">
              <div className="flex items-center justify-between text-xs mb-1 font-medium">
                <span className="text-slate-400">{isBn ? 'মোট সমাপ্তি:' : 'Progress:'}</span>
                <span className="text-cyan-400 font-mono font-bold">{overallProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>
                  {completedCount}/{allLessons.length} {isBn ? 'লেসন সম্পন্ন' : 'Lessons'}
                </span>
                <span className="text-yellow-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400" /> {totalStars}/{totalPossibleStars}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Hub Feature Navigation Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Curriculum Card (Highlighted) */}
        <div
          onClick={() => onNavigate('curriculum')}
          className="glass-card rounded-2xl p-5 border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-slate-950 hover:border-cyan-400 cursor-pointer group flex flex-col justify-between gap-4 transition-all shadow-lg hover:shadow-cyan-500/10 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bangla">
              {isBn ? '৩৩টি লেসন' : '33 Lessons'}
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-bangla group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>{isBn ? 'পাঠ্যক্রম ও লেসন সমূহ' : 'Curriculum & Lessons'}</span>
              <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-slate-400 font-bangla mt-1">
              {isBn ? 'লেভেল ০ থেকে ১২ পর্যন্ত সকল লেসন ব্রাউজ ও নির্বাচন করুন' : 'Browse all levels from home row to exam'}
            </p>
          </div>
        </div>

        {/* Speed Test Card */}
        <div
          onClick={() => onNavigate('speed-test')}
          className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/40 hover:border-blue-500/40 cursor-pointer group flex flex-col justify-between gap-4 transition-all shadow-md hover:shadow-blue-500/10 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gauge className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 font-bangla">
              {isBn ? '১/৩/৫ মিনিট' : '1/3/5 Min'}
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-bangla group-hover:text-blue-300 transition-colors flex items-center justify-between">
              <span>{isBn ? 'স্পিড টেস্ট' : 'Speed Test'}</span>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-slate-400 font-bangla mt-1">
              {isBn ? 'লাইভ টাইমিং টেস্ট ও ভেরিফাইড সার্টিফিকেট অর্জন' : 'Timed exam with verified certification'}
            </p>
          </div>
        </div>

        {/* Weak Key Drill Card */}
        <div
          onClick={() => onNavigate('weak-keys')}
          className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/40 hover:border-rose-500/40 cursor-pointer group flex flex-col justify-between gap-4 transition-all shadow-md hover:shadow-rose-500/10 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            {errorKeyCount > 0 ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bangla animate-pulse">
                {isBn ? `${errorKeyCount}টি বর্ণ দুর্বল` : `${errorKeyCount} Weak`}
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bangla">
                {isBn ? 'নিখুঁত' : 'Perfect'}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-bangla group-hover:text-rose-300 transition-colors flex items-center justify-between">
              <span>{isBn ? 'দুর্বল কী ড্রিল' : 'Weak Keys Drill'}</span>
              <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-slate-400 font-bangla mt-1">
              {isBn ? 'ভুল হওয়া বর্ণগুলো চিহ্নিত করে আলাদা ড্রিল' : 'Practice troubled characters with custom drills'}
            </p>
          </div>
        </div>

        {/* Custom Text Practice Card */}
        <div
          onClick={() => onNavigate('custom-practice')}
          className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/40 hover:border-emerald-500/40 cursor-pointer group flex flex-col justify-between gap-4 transition-all shadow-md hover:shadow-emerald-500/10 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileEdit className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bangla">
              {isBn ? 'কাস্টম' : 'Custom'}
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-bangla group-hover:text-emerald-300 transition-colors flex items-center justify-between">
              <span>{isBn ? 'কাস্টম টেক্সট' : 'Custom Practice'}</span>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-slate-400 font-bangla mt-1">
              {isBn ? 'নিজের ডকুমেন্ট বা পরীক্ষার অনুচ্ছেদ পেস্ট করে টাইপ' : 'Paste any Bangla paragraph or exam text'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Recommended Next Lesson & Performance Summary Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Lesson Card (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl glass-panel border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between gap-5 text-left">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  L{nextLessonToResume.level}.{nextLessonToResume.subIndex}
                </span>
                <span className="text-xs text-slate-400 font-bangla">
                  {isBn ? 'পরবর্তী প্রস্তাবিত লেসন' : 'Recommended Next Lesson'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('curriculum')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold font-bangla flex items-center gap-1"
              >
                <span>{isBn ? 'অন্য লেসন বেছে নিন' : 'Browse All'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white font-bangla">
              {isBn ? nextLessonToResume.titleBn : nextLessonToResume.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-bangla mt-1.5 leading-relaxed">
              {isBn ? nextLessonToResume.descriptionBn : nextLessonToResume.descriptionEn}
            </p>

            {/* Target text preview */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 font-bangla text-base text-slate-300 tracking-wide select-none truncate">
              {nextLessonToResume.targetText}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bangla">
              <Keyboard className="w-4 h-4 text-slate-500" />
              <span>{isBn ? `পাস লক্ষ্য: ${nextLessonToResume.passAccuracy}% নির্ভুলতা` : `Pass target: ${nextLessonToResume.passAccuracy}% acc`}</span>
            </div>

            <button
              onClick={() => onSelectLesson(nextLessonToResume)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all transform hover:scale-102"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isBn ? 'এখনই শুরু করুন' : 'Start Lesson'}</span>
            </button>
          </div>
        </div>

        {/* Analytics & Performance Widget (1 col) */}
        <div className="rounded-3xl glass-panel border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between gap-4 text-left">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white font-bangla flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? 'আপনার টাইপিং পরিসংখ্যান' : 'Typing Analytics'}</span>
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                {state.profile.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  {isBn ? 'গড় গতি' : 'Avg Speed'}
                </span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">
                  {avgWpm} <span className="text-[10px] text-slate-400">WPM</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  {isBn ? 'গড় নির্ভুলতা' : 'Avg Accuracy'}
                </span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">
                  {avgAccuracy}%
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  {isBn ? 'মোট কি-স্ট্রোক' : 'Keystrokes'}
                </span>
                <span className="text-base font-bold font-mono text-slate-200 mt-1 block truncate">
                  {state.profile.totalKeystrokes}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  {isBn ? 'প্র্যাকটিস টাইম' : 'Total Time'}
                </span>
                <span className="text-base font-bold font-mono text-slate-200 mt-1 block truncate">
                  {state.profile.totalTimeMinutes} <span className="text-[10px] text-slate-400">{isBn ? 'মিনিট' : 'min'}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('curriculum')}
            className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-semibold font-bangla flex items-center justify-center gap-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isBn ? 'সকল পাঠ্যক্রম দেখুন' : 'View Full Curriculum'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
