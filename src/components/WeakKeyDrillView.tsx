import React, { useState } from 'react';
import { Target, ChevronLeft, ArrowRight, Play } from 'lucide-react';
import type { AppState } from '../store/useTypingStore';
import type { Lesson } from '../data/curriculum';


interface WeakKeyDrillViewProps {
  state: AppState;
  onStartDrill: (customLesson: Lesson) => void;
  onBackToDashboard: () => void;
  initialKeys?: string[];
}

export const WeakKeyDrillView: React.FC<WeakKeyDrillViewProps> = ({
  state,
  onStartDrill,
  onBackToDashboard,
  initialKeys = []
}) => {
  const isBn = state.settings.language === 'bn';

  // Extract keys from state.weakKeys
  const identifiedWeakKeys = Object.entries(state.weakKeys)
    .filter(([_, data]) => data.errors > 0)
    .sort((a, b) => b[1].errors - a[1].errors)
    .map(([char]) => char);

  const initialSelected = initialKeys.length > 0 ? initialKeys : identifiedWeakKeys.slice(0, 5);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    initialSelected.length > 0 ? initialSelected : ['ক', 'খ', 'ক্ষ', 'ি', 'ে', 'জ্ঞ']
  );

  const commonBengaliKeys = [
    'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
    'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন',
    'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ',
    'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ক্ষ', 'জ্ঞ', 'ঞ্চ', 'ঞ্জ',
    'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', '্র', 'র্'
  ];

  const toggleKey = (char: string) => {
    setSelectedKeys((prev) =>
      prev.includes(char) ? prev.filter((k) => k !== char) : [...prev, char]
    );
  };

  const generateDrill = () => {
    if (selectedKeys.length === 0) return;

    // Generate balanced practice drill with words and repetitions of selected keys
    const patterns: string[] = [];
    const karList = ['ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', '্র', 'র্'];

    selectedKeys.forEach((k) => {
      if (karList.includes(k)) {
        // For kar/fola, practice with standard base consonants
        if (k === '্র') {
          patterns.push('ক্র গ্র প্র ব্র ত্র');
        } else if (k === 'র্') {
          patterns.push('র্ক র্গ র্প র্ব র্ত');
        } else {
          patterns.push(`ক${k} ত${k} ব${k} ম${k} স${k} দ${k}`);
        }
      } else {
        // For consonants or conjuncts
        patterns.push(`${k} ${k} ${k}`);
        patterns.push(`${k}া ${k}ি ${k}ে ${k}ু`);
      }
    });

    const combinedText = patterns.join(' ');


    const drillLesson: Lesson = {
      id: `weak-drill-${Date.now()}`,
      level: 99,
      subIndex: 1,
      titleEn: 'Targeted Weak-Key Drill',
      titleBn: 'দুর্বল বর্ণ অনুশীলন ড্রিল',
      category: 'drill',
      descriptionEn: `Custom drill focusing on: ${selectedKeys.join(', ')}`,
      descriptionBn: `বিশেষ অনুশীলন: ${selectedKeys.join(', ')}`,
      targetText: combinedText,
      keysTaught: [],
      passAccuracy: 90,
      tipBn: 'ধীরেসুস্থে প্রতিটি বর্ণের কি-ম্যাপিং মনে করার চেষ্টা করুন।'
    };

    onStartDrill(drillLesson);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4">
        <button
          onClick={onBackToDashboard}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isBn ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl font-bold text-white font-bangla flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-rose-400" />
            <span>{isBn ? 'দুর্বল কী স্পেশাল ড্রিল' : 'Targeted Weak-Key Drill'}</span>
          </h2>
          <p className="text-xs text-slate-400 font-bangla">
            {isBn
              ? 'যেসব বর্ণে আপনার বারবার ভুল হয়, সেগুলো নির্বাচন করে কাস্টম অনুশীলন ড্রিল তৈরি করুন'
              : 'Select your problematic keys to auto-generate personalized practice drills'}
          </p>
        </div>

        <div className="w-16" />
      </div>

      {/* Identified Weak Keys Banner */}
      {identifiedWeakKeys.length > 0 && (
        <div className="w-full p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-left">
          <span className="text-xs font-semibold text-rose-300">
            {isBn ? '📊 আপনার সাম্প্রতিক ভুল হওয়া বর্ণসমূহ:' : '📊 Your Recently Missed Keys:'}
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {identifiedWeakKeys.map((k) => {
              const errs = state.weakKeys[k]?.errors || 0;
              const isSel = selectedKeys.includes(k);
              return (
                <button
                  key={k}
                  onClick={() => toggleKey(k)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-bangla font-bold flex items-center gap-1.5 transition-all border ${
                    isSel
                      ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105'
                      : 'bg-rose-950/60 text-rose-300 border-rose-800/80 hover:bg-rose-900/40'
                  }`}
                >
                  <span>{k}</span>
                  <span className="text-[10px] font-mono opacity-80">({errs}x)</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Key Picker Grid */}
      <div className="w-full glass-panel rounded-3xl p-6 border-slate-800 bg-slate-950/80">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-300 uppercase">
            {isBn ? 'অনুশীলনের জন্য বর্ণ নির্বাচন করুন:' : 'Select Characters to Practice:'}
          </span>
          <span className="text-xs text-cyan-400 font-mono">
            {selectedKeys.length} {isBn ? 'টি নির্বাচিত' : 'Selected'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {commonBengaliKeys.map((char) => {
            const isSel = selectedKeys.includes(char);
            return (
              <button
                key={char}
                onClick={() => toggleKey(char)}
                className={`w-11 h-11 rounded-xl font-bangla text-base font-bold flex items-center justify-center transition-all border ${
                  isSel
                    ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Drill Button */}
      <button
        onClick={generateDrill}
        disabled={selectedKeys.length === 0}
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-rose-500/25 flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-102"
      >
        <Play className="w-5 h-5 fill-white" />
        <span>{isBn ? 'টার্গেটেড ড্রিল শুরু করুন' : 'Launch Custom Drill'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
