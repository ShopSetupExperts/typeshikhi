import React, { useState } from 'react';
import { X, Search, CheckCircle, Star, ChevronRight, Lock } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import type { Lesson } from '../data/curriculum';
import type { AppState } from '../store/useTypingStore';

interface LessonQuickPickerModalProps {
  state: AppState;
  activeLessonId?: string;
  onSelectLesson: (lesson: Lesson) => void;
  onClose: () => void;
}

export const LessonQuickPickerModal: React.FC<LessonQuickPickerModalProps> = ({
  state,
  activeLessonId,
  onSelectLesson,
  onClose
}) => {
  const isBn = state.settings.language === 'bn';
  const [search, setSearch] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  const filteredLessons = CURRICULUM.flatMap((cat) => cat.lessons).filter((lesson) => {
    if (selectedLevel !== 'all' && lesson.level !== selectedLevel) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        lesson.titleBn.toLowerCase().includes(q) ||
        lesson.titleEn.toLowerCase().includes(q) ||
        lesson.targetText.toLowerCase().includes(q) ||
        `l${lesson.level}.${lesson.subIndex}`.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl glass-panel border border-slate-700/80 bg-slate-950 p-6 flex flex-col gap-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white font-bangla">
              {isBn ? 'লেসন নির্বাচন করুন (Select Lesson)' : 'Choose a Lesson'}
            </h2>
            <p className="text-xs text-slate-400 font-bangla mt-0.5">
              {isBn ? 'যেকোনো লেসনে সরাসরি জাম্প করে প্র্যাকটিস শুরু করুন' : 'Jump directly into any practice lesson'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Level Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isBn ? 'লেসন নাম বা বর্ণ দিয়ে সার্চ...' : 'Search lesson...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-bangla"
            />
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full sm:w-48 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-bangla cursor-pointer"
          >
            <option value="all">{isBn ? 'সকল লেভেল (All)' : 'All Levels'}</option>
            {CURRICULUM.map((cat) => (
              <option key={cat.level} value={cat.level}>
                L{cat.level}: {isBn ? cat.nameBn : cat.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Lessons List Scrollable Area */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 max-h-[50vh] scrollbar-thin scrollbar-thumb-slate-800">
          {filteredLessons.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 font-bangla">
              {isBn ? 'কোনো লেসন পাওয়া যায়নি।' : 'No lessons found.'}
            </div>
          ) : (
            filteredLessons.map((lesson) => {
              const isUnlocked = state.unlockedLevels.includes(lesson.level);
              const isCurrent = lesson.id === activeLessonId;
              const completed = state.completedLessons[lesson.id];
              const stars = completed?.stars || 0;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (isUnlocked) {
                      onSelectLesson(lesson);
                      onClose();
                    }
                  }}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-cyan-500/15 border-cyan-500/40 shadow-sm'
                      : isUnlocked
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer'
                      : 'bg-slate-950/40 border-slate-900/60 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-cyan-500 text-slate-950'
                          : isUnlocked
                          ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                          : 'bg-slate-950 text-slate-600 border border-slate-900'
                      }`}
                    >
                      {isUnlocked ? `L${lesson.level}.${lesson.subIndex}` : <Lock className="w-3.5 h-3.5" />}
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-200 font-bangla">
                          {isBn ? lesson.titleBn : lesson.titleEn}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bangla">
                            {isBn ? 'বর্তমান' : 'Active'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-bangla line-clamp-1 mt-0.5">
                        {lesson.targetText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {/* Stars */}
                    {completed ? (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <div className="flex items-center">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className={`w-2.5 h-2.5 ${s <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-700'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {isUnlocked && <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
