import React, { useState, useMemo } from 'react';
import {
  Lock,
  Star,
  CheckCircle,
  Search,
  ChevronRight,
  Filter,
  Layers,
  ChevronDown
} from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import type { Lesson } from '../data/curriculum';
import type { AppState } from '../store/useTypingStore';

interface CurriculumViewProps {
  state: AppState;
  onSelectLesson: (lesson: Lesson) => void;
  onBackToDashboard: () => void;
}

type CategoryFilter = 'all' | 'home' | 'top_bottom' | 'shift' | 'digits' | 'kar_fola' | 'conjuncts' | 'words_sentences' | 'speed_exam';
type StatusFilter = 'all' | 'unlocked' | 'completed' | 'pending';

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  state,
  onSelectLesson,
  onBackToDashboard
}) => {
  const isBn = state.settings.language === 'bn';

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryFilter>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<StatusFilter>('all');

  const allLessons = useMemo(() => CURRICULUM.flatMap((lvl) => lvl.lessons), []);
  const completedList = Object.values(state.completedLessons);
  const completedCount = completedList.length;
  const totalStars = completedList.reduce((acc, curr) => acc + curr.stars, 0);
  const totalPossibleStars = allLessons.length * 3;

  // Filter categories helper
  const matchesCategoryGroup = (level: number, group: CategoryFilter): boolean => {
    if (group === 'all') return true;
    if (group === 'home') return level >= 0 && level <= 2;
    if (group === 'top_bottom') return level >= 3 && level <= 4;
    if (group === 'shift') return level === 5;
    if (group === 'digits') return level === 6;
    if (group === 'kar_fola') return level === 7;
    if (group === 'conjuncts') return level === 8;
    if (group === 'words_sentences') return level >= 9 && level <= 10;
    if (group === 'speed_exam') return level >= 11 && level <= 12;
    return true;
  };

  // Filtered levels and lessons
  const filteredCurriculum = useMemo(() => {
    return CURRICULUM.filter((category) => {
      // 1. Category group filter
      if (!matchesCategoryGroup(category.level, selectedCategoryFilter)) {
        return false;
      }

      // 2. Status filter on category level
      const isUnlocked = state.unlockedLevels.includes(category.level);
      const isCompleted = category.lessons.every((l) => !!state.completedLessons[l.id]);

      if (selectedStatusFilter === 'unlocked' && !isUnlocked) return false;
      if (selectedStatusFilter === 'completed' && !isCompleted) return false;
      if (selectedStatusFilter === 'pending' && isCompleted) return false;

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const catNameMatch =
          category.nameBn.toLowerCase().includes(q) ||
          category.nameEn.toLowerCase().includes(q) ||
          category.summaryBn.toLowerCase().includes(q) ||
          category.summaryEn.toLowerCase().includes(q) ||
          `l${category.level}`.includes(q);

        const lessonMatch = category.lessons.some(
          (l) =>
            l.titleBn.toLowerCase().includes(q) ||
            l.titleEn.toLowerCase().includes(q) ||
            l.targetText.toLowerCase().includes(q) ||
            `l${l.level}.${l.subIndex}`.includes(q)
        );

        return catNameMatch || lessonMatch;
      }

      return true;
    });
  }, [searchQuery, selectedCategoryFilter, selectedStatusFilter, state.unlockedLevels, state.completedLessons]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center gap-8 animate-fadeIn">
      {/* 1. Header with Breadcrumb & Stats Header */}
      <div className="w-full rounded-3xl glass-panel border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 relative overflow-hidden shadow-xl text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              <button
                onClick={onBackToDashboard}
                className="hover:underline text-slate-400 hover:text-slate-200 transition-colors"
              >
                {isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}
              </button>
              <span className="text-slate-600">/</span>
              <span>{isBn ? 'পাঠ্যক্রম ও লেসন তালিকা' : 'Curriculum & Lessons'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-bangla tracking-tight">
              {isBn ? 'সম্পূর্ণ পাঠ্যক্রম ও লেসন নির্বাচন' : 'Curriculum Roadmap & Lesson Selector'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-bangla mt-2 max-w-2xl leading-relaxed">
              {isBn
                ? 'হোম রো থেকে শুরু করে সকল লেভেল ও স্পেশাল যুক্তাক্ষর লেসন নির্বাচন করে প্র্যাকটিস করুন। প্রতিটি লেসনে ৯০% নির্ভুলতা অর্জন করলে স্বয়ংক্রিয়ভাবে পরবর্তী লেভেল আনলক হবে।'
                : 'Browse all 13 graded levels and 33 lessons. Score 90%+ accuracy to unlock the next level.'}
            </p>
          </div>

          {/* Quick Progress Indicator */}
          <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                {isBn ? 'অগ্রগতি' : 'Progress'}
              </span>
              <span className="text-xl font-bold font-mono text-cyan-400 block mt-0.5">
                {completedCount}/{allLessons.length} <span className="text-xs text-slate-400 font-bangla">{isBn ? 'লেসন' : 'Lessons'}</span>
              </span>
            </div>

            <div className="h-9 w-px bg-slate-800" />

            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                {isBn ? 'মোট স্টার' : 'Stars'}
              </span>
              <span className="text-xl font-bold font-mono text-yellow-400 flex items-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{totalStars}/{totalPossibleStars}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Search, Filter & Quick-Jump Toolbar */}
      <div className="w-full rounded-2xl glass-panel border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-4 text-left shadow-lg">
        {/* Top Row: Search input and Quick Jump Dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'লেসন, বর্ণ বা কীওয়ার্ড দিয়ে খুঁজুন...' : 'Search lessons by name, key, level...'}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-bangla transition-all"
            />
          </div>

          {/* Direct Lesson Selector Dropdown */}
          <div className="relative w-full sm:w-auto flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold font-bangla whitespace-nowrap hidden sm:inline">
              {isBn ? 'সরাসরি যান:' : 'Quick Jump:'}
            </span>
            <div className="relative w-full sm:w-64">
              <select
                onChange={(e) => {
                  const lesson = allLessons.find((l) => l.id === e.target.value);
                  if (lesson) onSelectLesson(lesson);
                }}
                defaultValue=""
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-bangla appearance-none cursor-pointer pr-8"
              >
                <option value="" disabled>
                  {isBn ? '— যেকোনো লেসন নির্বাচন করুন —' : '— Select Any Lesson —'}
                </option>
                {CURRICULUM.map((lvl) => (
                  <optgroup key={lvl.level} label={`L${lvl.level}: ${isBn ? lvl.nameBn : lvl.nameEn}`}>
                    {lvl.lessons.map((l) => (
                      <option key={l.id} value={l.id}>
                        L{l.level}.{l.subIndex}: {isBn ? l.titleBn : l.titleEn}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom Row: Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
          </span>

          {[
            { id: 'all', labelBn: 'সকল লেভেল (১৩)', labelEn: 'All (13)' },
            { id: 'home', labelBn: 'হোম রো (L0-2)', labelEn: 'Home Row (L0-2)' },
            { id: 'top_bottom', labelBn: 'টপ ও বটম (L3-4)', labelEn: 'Top/Bottom (L3-4)' },
            { id: 'shift', labelBn: 'শিফট লেয়ার (L5)', labelEn: 'Shift (L5)' },
            { id: 'digits', labelBn: 'সংখ্যা (L6)', labelEn: 'Digits (L6)' },
            { id: 'kar_fola', labelBn: 'কার ও ফলা (L7)', labelEn: 'Kar/Fola (L7)' },
            { id: 'conjuncts', labelBn: 'যুক্তাক্ষর (L8)', labelEn: 'Conjuncts (L8)' },
            { id: 'words_sentences', labelBn: 'শব্দ ও বাক্য (L9-10)', labelEn: 'Words (L9-10)' },
            { id: 'speed_exam', labelBn: 'স্পিড ও পরীক্ষা (L11-12)', labelEn: 'Exam (L11-12)' }
          ].map((tab) => {
            const isActive = selectedCategoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategoryFilter(tab.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all font-bangla ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                    : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800'
                }`}
              >
                {isBn ? tab.labelBn : tab.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filtered Curriculum Levels Grid */}
      <div className="w-full flex flex-col gap-5 text-left">
        {filteredCurriculum.length === 0 ? (
          <div className="w-full p-12 rounded-3xl glass-panel border border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center gap-3 text-center">
            <Layers className="w-10 h-10 text-slate-600" />
            <h3 className="text-base font-bold text-slate-300 font-bangla">
              {isBn ? 'কোনো লেসন পাওয়া যায়নি' : 'No lessons found matching filter'}
            </h3>
            <p className="text-xs text-slate-500 font-bangla">
              {isBn ? 'অন্য কোনো কীওয়ার্ড দিয়ে সার্চ করুন অথবা ফিল্টার রিসেট করুন।' : 'Try searching for a different keyword or reset filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryFilter('all');
                setSelectedStatusFilter('all');
              }}
              className="mt-2 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 font-bangla transition-all"
            >
              {isBn ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          filteredCurriculum.map((category) => {
            const isUnlocked = state.unlockedLevels.includes(category.level);
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
                    : 'border-slate-900 bg-slate-950/40 opacity-75'
                }`}
              >
                {/* Level Header Bar */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-bold text-base shadow-inner shrink-0 ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      {isUnlocked ? <span>L{category.level}</span> : <Lock className="w-4 h-4 text-slate-600" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-bangla">
                          {isBn ? category.nameBn : category.nameEn}
                        </h3>
                        {isUnlocked ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700 font-mono flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> LOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-bangla mt-0.5">
                        {isBn ? category.summaryBn : category.summaryEn}
                      </p>
                    </div>
                  </div>

                  {/* Stars Progress for Category */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-yellow-400">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>{catStars}/{catPossibleStars}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-lessons Grid */}
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.lessons.map((lesson) => {
                    const completed = state.completedLessons[lesson.id];
                    const stars = completed?.stars || 0;

                    return (
                      <div
                        key={lesson.id}
                        className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                          isUnlocked
                            ? 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/70 shadow-sm'
                            : 'bg-slate-950/30 border-slate-900/80 cursor-not-allowed'
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

                          {/* Sample Text Preview */}
                          <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] font-bangla text-slate-400 truncate select-none">
                            {lesson.targetText}
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/60">
                          {completed ? (
                            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>{completed.bestWpm} WPM ({completed.bestAccuracy}%)</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-500 font-bangla">
                              {isBn ? `পাস: ${lesson.passAccuracy}%` : `Pass: ${lesson.passAccuracy}%`}
                            </span>
                          )}

                          <button
                            onClick={() => isUnlocked && onSelectLesson(lesson)}
                            disabled={!isUnlocked}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                              isUnlocked
                                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500 hover:to-blue-600 text-cyan-300 hover:text-white border border-cyan-500/40 shadow-sm'
                                : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                            }`}
                          >
                            <span>{completed ? (isBn ? 'অনুশীলন' : 'Practice') : (isBn ? 'শুরু করুন' : 'Start')}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
