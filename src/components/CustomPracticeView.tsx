import React, { useState } from 'react';
import { FileEdit, Play, ChevronLeft, ArrowRight } from 'lucide-react';
import type { AppState } from '../store/useTypingStore';
import type { Lesson } from '../data/curriculum';


interface CustomPracticeViewProps {
  state: AppState;
  onStartCustomPractice: (customLesson: Lesson) => void;
  onBackToDashboard: () => void;
}

export const CustomPracticeView: React.FC<CustomPracticeViewProps> = ({
  state,
  onStartCustomPractice,
  onBackToDashboard
}) => {
  const isBn = state.settings.language === 'bn';

  const sampleTexts = [
    {
      titleBn: 'অফিসিয়াল দরখাস্ত ও চিঠি',
      titleEn: 'Official Office Application',
      text: 'বরাবর, মহাপরিচালক, মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর, ঢাকা। বিষয়: কম্পিউটার ল্যাবের সরঞ্জামাদি সরবরাহ প্রসঙ্গে। মহোদয়, বিনীত নিবেদন এই যে, আমাদের প্রতিষ্ঠানের কম্পিউটার টাইপিং প্রশিক্ষণ গতিশীল করার নিমিত্তে প্রয়োজনীয় কীবোর্ড ও কম্পিউটার সামগ্রী বরাদ্দ প্রদানে আপনার সদয় মর্জি কামনা করিতেছি।'
    },
    {
      titleBn: 'বাংলা কবিতা: বিদ্রোহী (নজরুল)',
      titleEn: 'Poetry: Bidrohi (Kazi Nazrul Islam)',
      text: 'বল বীর- বল উন্নত মম শির! শির নেহারি আমারি নতশির ওই শিখর হিমাদ্রির! বল বীর- বল মহাবিশ্বের মহাকাশ ফাড়ি চন্দ্র সূর্য গ্রহ তারা ছাড়ি ভূলোক দ্যুলোক গোলক ভেদিয়া খোদার আসন আরশ ছেদিয়া উঠিয়াছি চির-বিস্ময় আমি বিশ্ববিধাতৃর!'
    },
    {
      titleBn: 'প্রযুক্তি ও প্রোগ্রামিং',
      titleEn: 'Technology & Modern Web',
      text: 'আধুনিক সফটওয়্যার প্রকৌশলে দ্রুত টাইপিং দক্ষতা প্রোগ্রামারদের কর্মক্ষমতা অনেক গুণ বাড়িয়ে দেয়। বিশেষ করে দাপ্তরিক ও ডাটা প্রসেসিংয়ে বাংলা টাইপিংয়ে দক্ষতা আজ প্রতিটি ক্ষেত্রে অপরিহার্য।'
    }
  ];

  const [customText, setCustomText] = useState<string>(sampleTexts[0].text);
  const [customTitle, setCustomTitle] = useState<string>('কাস্টম প্র্যাকটিস টেক্সট');

  const handleStart = () => {
    if (!customText.trim()) return;

    const customLesson: Lesson = {
      id: `custom-${Date.now()}`,
      level: 100,
      subIndex: 1,
      titleEn: 'Custom Text Practice',
      titleBn: customTitle.trim() || 'কাস্টম টেক্সট অনুশীলন',
      category: 'words',
      descriptionEn: 'Custom uploaded text typing practice',
      descriptionBn: 'ব্যবহারকারীর নিজস্ব টেক্সট অনুশীলন',
      targetText: customText.trim(),
      keysTaught: [],
      passAccuracy: 90
    };

    onStartCustomPractice(customLesson);
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
            <FileEdit className="w-5 h-5 text-cyan-400" />
            <span>{isBn ? 'কাস্টম টেক্সট প্র্যাকটিস' : 'Custom Text Practice'}</span>
          </h2>
          <p className="text-xs text-slate-400 font-bangla">
            {isBn
              ? 'আপনার প্রয়োজনীয় যে কোনো বাংলা টেক্সট পেস্ট করে বিজয় কীবোর্ডে টাইপ অনুশীলন করুন'
              : 'Paste any custom Bengali text to practice with live Bijoy layout assistance'}
          </p>
        </div>

        <div className="w-16" />
      </div>

      {/* Preset Sample Buttons */}
      <div className="w-full flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-semibold">
          {isBn ? 'নমুনা অনুচ্ছেদসমূহ:' : 'Preset Samples:'}
        </span>
        {sampleTexts.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCustomText(sample.text);
              setCustomTitle(isBn ? sample.titleBn : sample.titleEn);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-bangla transition-all"
          >
            {isBn ? sample.titleBn : sample.titleEn}
          </button>
        ))}
      </div>

      {/* Textarea Box */}
      <div className="w-full glass-panel rounded-3xl p-6 border-slate-800 bg-slate-950/80 flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {isBn ? 'অনুশীলনের শিরোনাম:' : 'Practice Title:'}
          </label>
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-bangla"
            placeholder="শিরোনাম দিন..."
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            {isBn ? 'বাংলা টেক্সট লিখুন বা পেস্ট করুন:' : 'Enter / Paste Bangla Text:'}
          </label>
          <textarea
            rows={7}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-base text-slate-200 focus:outline-none focus:border-cyan-500 font-bangla leading-relaxed resize-y"
            placeholder="এখানে আপনার টেক্সট পেস্ট করুন..."
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            {isBn ? 'মোট বর্ণ/অক্ষর:' : 'Characters:'}{' '}
            <strong className="text-cyan-400">{customText.length}</strong>
          </span>
          <span>
            {isBn ? 'মোট শব্দ:' : 'Words:'}{' '}
            <strong className="text-cyan-400">
              {customText.trim() ? customText.trim().split(/\s+/).length : 0}
            </strong>
          </span>
        </div>
      </div>

      {/* Launch Button */}
      <button
        onClick={handleStart}
        disabled={!customText.trim()}
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-102"
      >
        <Play className="w-5 h-5 fill-white" />
        <span>{isBn ? 'কাস্টম টাইপিং শুরু করুন' : 'Start Custom Practice'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
