import React, { useState } from 'react';
import { X, Search, HelpCircle, Layers, Zap, Hash, Feather, BookOpen } from 'lucide-react';

interface CheatSheetModalProps {
  isBn: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isBn, onClose }) => {
  const [activeTab, setActiveTab] = useState<'vowels' | 'consonants' | 'kars' | 'conjuncts' | 'digits'>('conjuncts');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const vowelsData = [
    { char: 'অ', keys: 'Shift + F (বা G + Shift + F)', desc: 'সরাসরি শিফট এফ' },
    { char: 'আ', keys: 'G + F', desc: 'লিংকার G + া-কার' },
    { char: 'ই', keys: 'G + D', desc: 'লিংকার G + ি-কার' },
    { char: 'ঈ', keys: 'G + Shift + D', desc: 'লিংকার G + ী-কার' },
    { char: 'উ', keys: 'G + S', desc: 'লিংকার G + ু-কার' },
    { char: 'ঊ', keys: 'G + Shift + S', desc: 'লিংকার G + ূ-কার' },
    { char: 'ঋ', keys: 'Shift + A (বা G + A)', desc: 'সরাসরি শিফট এ' },
    { char: 'এ', keys: 'G + C', desc: 'লিংকার G + ে-কার' },
    { char: 'ঐ', keys: 'G + Shift + C', desc: 'লিংকার G + ৈ-কার' },
    { char: 'ও', keys: 'X (বা G + X)', desc: 'সরাসরি X কী' },
    { char: 'ঔ', keys: 'G + Shift + X', desc: 'লিংকার G + ৗ-কার' }
  ];

  const consonantsData = [
    { char: 'ক', key: 'J', shiftChar: 'খ', shiftKey: 'Shift + J' },
    { char: 'গ', key: 'O', shiftChar: 'ঘ', shiftKey: 'Shift + O' },
    { char: 'ঙ', key: 'Q', shiftChar: 'ং (অনুস্বার)', shiftKey: 'Shift + Q' },
    { char: 'চ', key: 'Y', shiftChar: 'ছ', shiftKey: 'Shift + Y' },
    { char: 'জ', key: 'U', shiftChar: 'ঝ', shiftKey: 'Shift + U' },
    { char: 'ঞ', key: 'Shift + I', shiftChar: 'হ', shiftKey: 'I (Normal)' },
    { char: 'ট', key: 'T', shiftChar: 'ঠ', shiftKey: 'Shift + T' },
    { char: 'ড', key: 'E', shiftChar: 'ঢ', shiftKey: 'Shift + E' },
    { char: 'ণ', key: 'Shift + B', shiftChar: 'ন', shiftKey: 'B (Normal)' },
    { char: 'ত', key: 'K', shiftChar: 'থ', shiftKey: 'Shift + K' },
    { char: 'দ', key: 'L', shiftChar: 'ধ', shiftKey: 'Shift + L' },
    { char: 'প', key: 'R', shiftChar: 'ফ', shiftKey: 'Shift + R' },
    { char: 'ব', key: 'H', shiftChar: 'ভ', shiftKey: 'Shift + H' },
    { char: 'ম', key: 'M', shiftChar: 'শ (তালব্য-শ)', shiftKey: 'Shift + M' },
    { char: 'য', key: 'W', shiftChar: 'য় (অন্তঃস্থ য়)', shiftKey: 'Shift + W' },
    { char: 'র', key: 'V', shiftChar: 'ল', shiftKey: 'Shift + V' },
    { char: 'স', key: 'N', shiftChar: 'ষ (মূর্ধন্য-ষ)', shiftKey: 'Shift + N' },
    { char: 'ড়', key: 'P', shiftChar: 'ঢ়', shiftKey: 'Shift + P' }
  ];

  const karsData = [
    { name: 'আ-কার (া)', char: 'া', key: 'F', rule: 'বর্ণের পরে বসে (যেমন: ক + F = কা)' },
    { name: 'ই-কার (ি)', char: 'ি', key: 'D', rule: '⚡ প্রি-কার: বর্ণের আগে চাপতে হয় (D + ক = কি)' },
    { name: 'ঈ-কার (ী)', char: 'ী', key: 'Shift + D', rule: 'বর্ণের পরে বসে (ক + Shift+D = কী)' },
    { name: 'উ-কার (ু)', char: 'ু', key: 'S', rule: 'বর্ণের পরে বসে (ক + S = কু)' },
    { name: 'ূ-কার (ূ)', char: 'ূ', key: 'Shift + S', rule: 'বর্ণের পরে বসে (ক + Shift+S = কূ)' },
    { name: 'ঋ-কার (ৃ)', char: 'ৃ', key: 'A', rule: 'বর্ণের পরে বসে (ক + A = কৃ)' },
    { name: 'এ-কার (ে)', char: 'ে', key: 'C', rule: '⚡ প্রি-কার: বর্ণের আগে চাপতে হয় (C + ক = কে)' },
    { name: 'ঐ-কার (ৈ)', char: 'ৈ', key: 'Shift + C', rule: '⚡ প্রি-কার: বর্ণের আগে চাপতে হয় (Shift+C + ক = কৈ)' },
    { name: 'ও-কার (ো)', char: 'ো', key: 'C + বর্ণ + F', rule: '⚡ যৌগিক: C (ে) চেপে বর্ণ চেপে F (া) চাপলে ো হয় (যেমন: কো)' },
    { name: 'ঔ-কার (ৌ)', char: 'ৌ', key: 'C + বর্ণ + Shift+X', rule: '⚡ যৌগিক: C (ে) চেপে বর্ণ চেপে Shift+X (ৗ) চাপলে ৌ হয় (যেমন: কৌ)' },
    { name: 'র-ফলা (্র)', char: '্র', key: 'Z', rule: 'বর্ণের পরে বসে (ক + Z = ক্র, গ + Z = গ্র)' },
    { name: 'রেফ (র্)', char: 'র্', key: 'Shift + Z', rule: '⚡ প্রি-ফলা: বর্ণের আগে চাপতে হয় (Shift+Z + ক = র্ক)' }
  ];

  const conjunctsData = [
    { char: 'ক্ষ', formula: 'ক + ্ + ষ', keys: 'J + G + Shift+N', eg: 'শিক্ষা, ক্ষমা, পরীক্ষা' },
    { char: 'জ্ঞ', formula: 'জ + ্ + ঞ', keys: 'U + G + Shift+I', eg: 'জ্ঞান, বিজ্ঞান, অজ্ঞ' },
    { char: 'ঙ্ক', formula: 'ঙ + ্ + ক', keys: 'Q + G + J', eg: 'অঙ্ক, কলঙ্ক' },
    { char: 'ঙ্গ', formula: 'ঙ + ্ + গ', keys: 'Q + G + O', eg: 'গঙ্গা, অঙ্গ, বঙ্গ' },
    { char: 'ঞ্চ', formula: 'ঞ + ্ + চ', keys: 'Shift+I + G + Y', eg: 'পঞ্চম, চঞ্চল' },
    { char: 'ঞ্জ', formula: 'ঞ + ্ + জ', keys: 'Shift+I + G + U', eg: 'অঞ্জলি, ব্যঞ্জন' },
    { char: 'ণ্ট', formula: 'ণ + ্ + ট', keys: 'Shift+B + G + T', eg: 'ঘণ্টা, বণ্টন' },
    { char: 'ণ্ড', formula: 'ণ + ্ + ড', keys: 'Shift+B + G + E', eg: 'কাণ্ড, পাণ্ডব' },
    { char: 'ন্ত', formula: 'ন + ্ + ত', keys: 'B + G + K', eg: 'শান্তি, অনন্ত' },
    { char: 'ন্দ', formula: 'ন + ্ + দ', keys: 'B + G + L', eg: 'আনন্দ, সুন্দর' },
    { char: 'ন্ধ', formula: 'ন + ্ + ধ', keys: 'B + G + Shift+L', eg: 'অন্ধকার, গন্ধ' },
    { char: 'ম্প', formula: 'ম + ্ + প', keys: 'M + G + R', eg: 'কম্পিউটার, সম্পদ' },
    { char: 'ম্ব', formula: 'ম + ্ + ব', keys: 'M + G + H', eg: 'কম্বল, অম্বর' },
    { char: 'ম্ভ', formula: 'ম + ্ + ভ', keys: 'M + G + Shift+H', eg: 'সম্ভব, আরম্ভ' },
    { char: 'ষ্ট', formula: 'ষ + ্ + ট', keys: 'Shift+N + G + T', eg: 'কষ্ট, মিষ্টি, রাষ্ট্র' },
    { char: 'ষ্ঠ', formula: 'ষ + ্ + ঠ', keys: 'Shift+N + G + Shift+T', eg: 'শ্রেষ্ঠ, ষষ্ঠ' },
    { char: 'ষ্ণ', formula: 'ষ + ্ + ণ', keys: 'Shift+N + G + Shift+B', eg: 'উষ্ণ, কৃষ্ণ' },
    { char: 'স্ত', formula: 'স + ্ + ত', keys: 'N + G + K', eg: 'রাস্তা, পুস্তক' },
    { char: 'স্থ', formula: 'স + ্ + থ', keys: 'N + G + Shift+K', eg: 'স্থান, স্বাস্থ্য' },
    { char: 'হ্ম', formula: 'হ + ্ + ম', keys: 'I + G + M', eg: 'ব্রাহ্মণ, ব্রহ্মপুত্র' },
    { char: 'হ্ন', formula: 'হ + ্ + ন', keys: 'I + G + B', eg: 'চিহ্ন, মধ্যাহ্ন' },
    { char: 'দ্ব', formula: 'দ + ্ + ব', keys: 'L + G + H', eg: 'দ্বিতীয়, দ্বীপ' },
    { char: 'দ্ধ', formula: 'দ + ্ + ধ', keys: 'L + G + Shift+L', eg: 'যুদ্ধ, সমৃদ্ধি' },
    { char: 'ত্র', formula: 'ত + ্র (বা ত+্+র)', keys: 'K + Z', eg: 'ছাত্র, রাত্রি' },
    { char: 'শ্র', formula: 'শ + ্র (বা শ+্+র)', keys: 'Shift+M + Z', eg: 'শ্রদ্ধা, বিশ্রাম' }
  ];

  const digitsData = [
    { char: '১', key: '1' },
    { char: '২', key: '2' },
    { char: '৩', key: '3' },
    { char: '৪', key: '4' },
    { char: '৫', key: '5' },
    { char: '৬', key: '6' },
    { char: '৭', key: '7' },
    { char: '৮', key: '8' },
    { char: '৯', key: '9' },
    { char: '০', key: '0' },
    { char: '। (দাঁড়ি)', key: 'Shift + G' },
    { char: '৳ (টাকা)', key: 'Shift + 4 (বা $)' },
    { char: 'ঁ (চন্দ্রবিন্দু)', key: 'Shift + 7' },
    { char: 'ঃ (বিসর্গ)', key: 'Quote (\')' }
  ];

  // Filter items by search query
  const filterBySearch = (items: Array<any>) => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => {
      return (
        (item.char && item.char.includes(q)) ||
        (item.name && item.name.includes(q)) ||
        (item.keys && item.keys.toLowerCase().includes(q)) ||
        (item.key && item.key.toLowerCase().includes(q)) ||
        (item.eg && item.eg.includes(q))
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-3xl glass-panel border border-slate-700/80 bg-slate-900/95 shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-bangla">
                {isBn ? 'বিজয় কীবোর্ড সম্পূর্ণ চিটশিট ও নিয়মাবলী' : 'Complete Bijoy Keymap Reference & Rules'}
              </h2>
              <p className="text-xs text-slate-400 font-bangla mt-0.5">
                {isBn
                  ? 'স্বরবর্ণ, ব্যঞ্জনবর্ণ, কার, ফলা ও ৫০+ যুক্তাক্ষরের কি-ম্যাপিং গাইড'
                  : 'Quick lookup guide for vowels, consonants, pre-kars, and conjuncts'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Tabs Header */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'conjuncts', labelBn: 'যুক্তাক্ষর (Conjuncts)', icon: Zap },
              { id: 'kars', labelBn: 'কার ও ফলা (Kars)', icon: Layers },
              { id: 'vowels', labelBn: 'স্বরবর্ণ (Vowels)', icon: Feather },
              { id: 'consonants', labelBn: 'ব্যঞ্জনবর্ণ (Consonants)', icon: HelpCircle },
              { id: 'digits', labelBn: 'সংখ্যা ও যতিচিহ্ন', icon: Hash }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.labelBn}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'বর্ণ বা শব্দ খুঁজুন...' : 'Search letter / conjunct...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-bangla"
            />
          </div>
        </div>

        {/* Tab Content Container */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Tab 1: Conjuncts (যুক্তাক্ষর) */}
          {activeTab === 'conjuncts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filterBySearch(conjunctsData).map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bangla text-2xl font-bold flex items-center justify-center">
                      {c.char}
                    </span>
                    <div>
                      <span className="text-xs text-slate-400 font-bangla">{c.formula}</span>
                      <p className="text-xs font-mono font-bold text-slate-200 mt-0.5">{c.keys}</p>
                      <p className="text-[11px] text-slate-500 font-bangla mt-1">উদাহরণ: {c.eg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Kars & Fola */}
          {activeTab === 'kars' && (
            <div className="flex flex-col gap-2.5">
              {filterBySearch(karsData).map((k, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bangla text-xl font-bold flex items-center justify-center">
                      {k.char}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white font-bangla">{k.name}</h4>
                      <p className="text-xs text-slate-400 font-bangla mt-0.5">{k.rule}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-cyan-400">
                    {k.key}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Vowels (স্বরবর্ণ) */}
          {activeTab === 'vowels' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filterBySearch(vowelsData).map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3"
                >
                  <span className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bangla text-2xl font-bold flex items-center justify-center">
                    {v.char}
                  </span>
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">{v.keys}</span>
                    <span className="text-[11px] text-slate-400 font-bangla">{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Consonants */}
          {activeTab === 'consonants' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filterBySearch(consonantsData).map((c, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                >
                  {/* Normal */}
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bangla text-lg font-bold flex items-center justify-center border border-slate-800">
                      {c.char}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{c.key}</span>
                  </div>

                  <span className="text-slate-700">|</span>

                  {/* Shifted */}
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-purple-950/40 text-purple-300 font-bangla text-lg font-bold flex items-center justify-center border border-purple-800/60">
                      {c.shiftChar}
                    </span>
                    <span className="text-xs font-mono text-purple-300 font-semibold">
                      {c.shiftKey}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 5: Digits & Punctuation */}
          {activeTab === 'digits' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filterBySearch(digitsData).map((d, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                >
                  <span className="text-xl font-bold font-bangla text-white">{d.char}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-400 font-bold">
                    {d.key}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
