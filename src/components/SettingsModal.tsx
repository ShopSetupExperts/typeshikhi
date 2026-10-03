import React from 'react';
import { X, Settings, Palette, Type, Volume2, Eye } from 'lucide-react';
import type { AppState } from '../store/useTypingStore';
import type { SoundType } from '../engine/sound-synthesizer';
import { soundManager } from '../engine/sound-synthesizer';


interface SettingsModalProps {
  state: AppState;
  onUpdateSettings: (newSettings: Partial<AppState['settings']>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ state, onUpdateSettings, onClose }) => {
  const isBn = state.settings.language === 'bn';

  const themes: Array<{ id: AppState['settings']['theme']; labelBn: string; labelEn: string; color: string }> = [
    { id: 'dark', labelBn: 'মিডনাইট স্লেট (ডিফল্ট)', labelEn: 'Midnight Slate (Default)', color: '#090d16' },
    { id: 'emerald', labelBn: 'এমারেল্ড ম্যাট্রিক্স', labelEn: 'Emerald Matrix', color: '#06140e' },
    { id: 'cyber', labelBn: 'সাইবারপঙ্ক ভায়োলেট', labelEn: 'Cyberpunk Violet', color: '#0c081c' },
    { id: 'sepia', labelBn: 'সেপিয়া রিডার', labelEn: 'Warm Sepia', color: '#181411' }
  ];

  const fonts = [
    { id: 'Noto Sans Bengali', name: 'Noto Sans Bengali (ডিফল্ট)' },
    { id: 'Hind Siliguri', name: 'Hind Siliguri (আধুনিক ও স্পষ্ট)' },
    { id: 'Tiro Bangla', name: 'Tiro Bangla (চিরায়ত ক্লাসিক)' }
  ];

  const soundOptions: Array<{ id: SoundType; label: string }> = [
    { id: 'mechanical', label: 'মেকানিক্যাল সুইচ (Mechanical Switch)' },
    { id: 'soft', label: 'সফট বাবল (Soft Bubble)' },
    { id: 'modern', label: 'মডার্ন ডিজিটাল (Modern Digital)' },
    { id: 'off', label: 'শব্দ বন্ধ (Muted)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] rounded-3xl glass-panel border border-slate-700/80 bg-slate-900/95 shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-bangla">
                {isBn ? 'সেটিংস ও পছন্দসমূহ' : 'Settings & Preferences'}
              </h2>
              <p className="text-xs text-slate-400 font-bangla">
                {isBn ? 'কীবোর্ড, ফন্ট, সাউন্ড ও থিম কনফিগারেশন' : 'Customize layout, typography, audio and theme'}
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

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-6">
          {/* Theme Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? 'অ্যাপ থিম (Theme):' : 'Theme:'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onUpdateSettings({ theme: t.id })}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    state.settings.theme === t.id
                      ? 'bg-cyan-500/10 border-cyan-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-slate-600 shadow-sm"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="text-xs font-semibold font-bangla">
                    {isBn ? t.labelBn : t.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bangla Font Family */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
              <Type className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'বাংলা ফন্ট (Font Family):' : 'Bangla Font Family:'}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onUpdateSettings({ fontFamily: f.id })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    state.settings.fontFamily === f.id
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-bold block" style={{ fontFamily: f.id }}>
                    বাংলা টাইপ
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">{f.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sound & Audio */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'টাইপিং সাউন্ড (Typing Sound FX):' : 'Sound Effects:'}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {soundOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onUpdateSettings({ soundType: opt.id });
                    soundManager.setSoundType(opt.id);
                    if (opt.id !== 'off') soundManager.playKeyClick();
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-medium font-bangla transition-all ${
                    state.settings.soundType === opt.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Guides & Toggles */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'ভিজ্যুয়াল সহায়তা ও কীবোর্ড সাইজ:' : 'Visual Guides & Size:'}</span>
            </label>
            <div className="flex flex-col gap-3">
              {/* Hands guide toggle */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-200 block font-bangla">
                    {isBn ? 'আঙুল নির্দেশিকা (Hands & Finger Guide)' : 'Hands & Finger Guide'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bangla">
                    {isBn ? 'টাইপিংয়ের সময় সঠিক আঙুল হাইলাইট করে দেখানো' : 'Highlight active finger for each key'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={state.settings.showHandsGuide}
                  onChange={(e) => onUpdateSettings({ showHandsGuide: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
              </label>

              {/* Key sequence hints */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-200 block font-bangla">
                    {isBn ? 'পরবর্তী কী নির্দেশিকা (Next Key Sequence Hints)' : 'Keystroke Sequence Hints'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bangla">
                    {isBn ? 'যুক্তাক্ষর ও প্রি-কারের জন্য কি অনুক্রম দেখানো' : 'Display exact keystroke steps for conjuncts'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={state.settings.showKeyHints}
                  onChange={(e) => onUpdateSettings({ showKeyHints: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
              </label>

              {/* Keyboard Size selector */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs font-bold text-slate-200 font-bangla">
                  {isBn ? 'অন-স্ক্রিন কীবোর্ড সাইজ:' : 'On-Screen Keyboard Size:'}
                </span>
                <div className="flex items-center gap-1">
                  {(['compact', 'standard', 'large'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => onUpdateSettings({ keyboardSize: sz })}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
                        state.settings.keyboardSize === sz
                          ? 'bg-cyan-500 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
