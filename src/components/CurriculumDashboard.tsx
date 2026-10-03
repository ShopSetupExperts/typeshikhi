import React from 'react';
import {
  Lock,
  Star,
  Play,
  CheckCircle,
  Gauge,
  Target,
  FileEdit,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import type { Lesson } from '../data/curriculum';
import type { AppState } from '../store/useTypingStore';


interface CurriculumDashboardProps {
  state: AppState;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigate: (view: AppState['currentView']) => void;
}

export const CurriculumDashboard: React.FC<CurriculumDashboardProps> = ({
  state,
  onSelectLesson,
  onNavigate
}) => {
  const isBn = state.settings.language === 'bn';

  // Count total completed lessons and stars
  const allLessons = CURRICULUM.flatMap((lvl) => lvl.lessons);
  const completedCount = Object.keys(state.completedLessons).length;
  const totalStars = Object.values(state.completedLessons).reduce((acc, curr) => acc + curr.stars, 0);
  const totalPossibleStars = allLessons.length * 3;
  const overallProgress = Math.round((completedCount / allLessons.length) * 100);

  // Find next uncompleted or current lesson to resume
  const nextLessonToResume =
    allLessons.find((l) => !state.completedLessons[l.id]) || allLessons[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center gap-10">
      {/* Hero Welcome Banner */}
      <div className="w-full rounded-3xl glass-panel border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'জিরো-ইনস্টল ব্রাউজার টাইপিং টিউটর' : 'Zero-Install Browser Typing Tutor'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-bangla tracking-tight leading-tight">
              সহজে শিখুন <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">বিজয় বাংলা টাইপিং</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-bangla mt-3 leading-relaxed">
              {isBn
                ? 'হোম রো থেকে শুরু করে জটিল যুক্তাক্ষর ও সরকারি চাকরির টাইপিং স্পিড টেস্ট পর্যন্ত—সরাসরি আপনার ইংরেজি কীবোর্ডেই টাইপ করুন কোনো সফটওয়্যার ইনস্টল ছাড়াই।'
                : 'Master Bijoy typing step-by-step with real-time finger placement guide, on-screen keyboard, and govt-exam simulation on your standard QWERTY keyboard.'}
            </p>

            {/* Quick Stat badges */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isBn ? '১৩টি প্রফেশনাল লেভেল' : '13 Graded Levels'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{isBn ? '৫০+ যুক্তাক্ষর মাস্টার ড্রিল' : '50+ Conjuncts Mastered'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{isBn ? 'ভেরিফাইড সনদপত্র' : 'Verified Certificates'}</span>
              </div>
            </div>
          </div>

          {/* Right Action Card */}
          <div className="flex flex-col items-center md:items-end gap-4 min-w-[240px]">
            <button
              onClick={() => onSelectLesson(nextLessonToResume)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{isBn ? 'অনুশীলন চালিয়ে যান' : 'Continue Lesson'}</span>
            </button>

            {/* Overall Progress Mini Bar */}
            <div className="w-full max-w-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-400">{isBn ? 'মোট সমাপ্তি:' : 'Overall Progress:'}</span>
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
                  {completedCount}/{allLessons.length} {isBn ? 'লেসন' : 'Lessons'}
                </span>
                <span className="text-yellow-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400" /> {totalStars}/{totalPossibleStars}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Feature Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('speed-test')}
          className="glass-card rounded-2xl p-5 border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 cursor-pointer group flex items-center gap-4 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-bangla group-hover:text-cyan-300 transition-colors">
              {isBn ? '১/৩/৫ মিনিট স্পিড টেস্ট' : '1/3/5 Min Speed Test'}
            </h3>
            <p className="text-xs text-slate-400 font-bangla mt-0.5">
              {isBn ? 'সার্টিফিকেট সহ টাইমিং টেস্ট' : 'Timed exam with certification'}
            </p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('weak-keys')}
          className="glass-card rounded-2xl p-5 border-slate-800 bg-slate-900/40 hover:border-rose-500/40 cursor-pointer group flex items-center gap-4 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-bangla group-hover:text-rose-300 transition-colors">
              {isBn ? 'টার্গেটেড দুর্বল কী ড্রিল' : 'Targeted Weak Key Drill'}
            </h3>
            <p className="text-xs text-slate-400 font-bangla mt-0.5">
              {isBn ? 'ভুল হওয়া বর্ণ শুধরে নেওয়ার ড্রিল' : 'Fix problematic characters'}
            </p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('custom-practice')}
          className="glass-card rounded-2xl p-5 border-slate-800 bg-slate-900/40 hover:border-blue-500/40 cursor-pointer group flex items-center gap-4 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileEdit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-bangla group-hover:text-blue-300 transition-colors">
              {isBn ? 'কাস্টম টেক্সট অনুশীলন' : 'Custom Text Practice'}
            </h3>
            <p className="text-xs text-slate-400 font-bangla mt-0.5">
              {isBn ? 'নিজের টেক্সট দিয়ে প্র্যাকটিস' : 'Paste any document text'}
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Levels Roadmap Section */}
      <div className="w-full flex flex-col gap-6 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white font-bangla">
              {isBn ? 'সম্পূর্ণ পাঠ্যক্রম (Curriculum Roadmap)' : 'Curriculum Roadmap (Levels 0 - 12)'}
            </h2>
            <p className="text-xs text-slate-400 font-bangla mt-0.5">
              {isBn
                ? 'প্রতিটি লেসনে ৯০% এর বেশি নির্ভুলতা অর্জন করলে স্বয়ংক্রিয়ভাবে পরবর্তী লেভেল আনলক হবে।'
                : 'Score 90%+ accuracy in each lesson to unlock the next level.'}
            </p>
          </div>
        </div>

        {/* Level Cards Grid */}
        <div className="flex flex-col gap-4">
          {CURRICULUM.map((category) => {
            const isUnlocked = state.unlockedLevels.includes(category.level);

            // Calculate stars in this category
            const catStars = category.lessons.reduce((acc, l) => {
              return acc + (state.completedLessons[l.id]?.stars || 0);
            }, 0);
            const catPossibleStars = category.lessons.length * 3;

            return (
              <div
                key={category.level}
                className={`rounded-3xl glass-panel border transition-all duration-200 overflow-hidden ${
                  isUnlocked
                    ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    : 'border-slate-900 bg-slate-950/40 opacity-70'
                }`}
              >
                {/* Category Header Bar */}
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60">
                  <div className="flex items-center gap-4">
                    {/* Level Number Badge */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg shadow-inner ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      {isUnlocked ? (
                        <span>L{category.level}</span>
                      ) : (
                        <Lock className="w-5 h-5 text-slate-600" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white font-bangla">
                          {isBn ? category.nameBn : category.nameEn}
                        </h3>
                        {isUnlocked && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                            UNLOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-bangla mt-0.5">
                        {isBn ? category.summaryBn : category.summaryEn}
                      </p>
                    </div>
                  </div>

                  {/* Stars Progress for Category */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-yellow-400">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>
                        {catStars}/{catPossibleStars}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-lessons List */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.lessons.map((lesson) => {
                    const completed = state.completedLessons[lesson.id];
                    const stars = completed?.stars || 0;

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                          isUnlocked
                            ? 'bg-slate-950/60 border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60'
                            : 'bg-slate-950/20 border-slate-900 cursor-not-allowed'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[11px] font-bold font-mono text-cyan-400">
                              L{lesson.level}.{lesson.subIndex}
                            </span>
                            {/* Stars */}
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3 h-3 ${
                                    s <= stars
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <h4 className="text-sm font-bold text-slate-200 font-bangla line-clamp-1">
                            {isBn ? lesson.titleBn : lesson.titleEn}
                          </h4>

                          <p className="text-xs text-slate-400 font-bangla mt-1 line-clamp-2">
                            {isBn ? lesson.descriptionBn : lesson.descriptionEn}
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                          {completed ? (
                            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>{completed.bestWpm} WPM ({completed.bestAccuracy}%)</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-500 font-bangla">
                              {isBn ? 'পাস: ৯০% নির্ভুলতা' : 'Pass: 90% Acc'}
                            </span>
                          )}

                          <button
                            onClick={() => isUnlocked && onSelectLesson(lesson)}
                            disabled={!isUnlocked}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                              isUnlocked
                                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500 hover:to-blue-600 text-cyan-300 hover:text-white border border-cyan-500/40 shadow-sm'
                                : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                            }`}
                          >
                            <span>{completed ? (isBn ? 'পুনরায়' : 'Review') : (isBn ? 'শুরু' : 'Start')}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
