import React from 'react';
import {
  BookOpen,
  Gauge,
  Target,
  FileEdit,
  HelpCircle,
  User,
  Flame,
  Star,
  Volume2,
  VolumeX,
  Languages,
  Palette,
  Settings
} from 'lucide-react';
import type { AppState } from '../store/useTypingStore';
import { soundManager } from '../engine/sound-synthesizer';

interface NavbarProps {
  state: AppState;
  onNavigate: (view: AppState['currentView']) => void;
  onOpenSettings: () => void;
  onOpenCheatSheet: () => void;
  onOpenProfile: () => void;
  onToggleLanguage: () => void;
  onCycleTheme: () => void;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  state,
  onNavigate,
  onOpenSettings,
  onOpenCheatSheet,
  onOpenProfile,
  onToggleLanguage,
  onCycleTheme,
  onToggleSound
}) => {
  const isBn = state.settings.language === 'bn';

  // Calculate total stars earned
  const totalStars = Object.values(state.completedLessons).reduce((acc, curr) => acc + curr.stars, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 group focus:outline-none text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl font-bold text-white tracking-wider font-bangla">বি</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent font-bangla tracking-tight">
                  টাইপশিখি
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold uppercase tracking-wider">
                  Bijoy
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isBn ? 'প্রফেশনাল বিজয় বাংলা টাইপিং টিউটর' : 'Professional Bijoy Bangla Typing Tutor'}
              </p>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                state.currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{isBn ? 'হোম' : 'Home'}</span>
            </button>

            <button
              onClick={() => onNavigate('curriculum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                state.currentView === 'curriculum'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isBn ? 'পাঠ্যক্রম' : 'Curriculum'}</span>
            </button>

            <button
              onClick={() => onNavigate('speed-test')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                state.currentView === 'speed-test'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{isBn ? 'স্পিড টেস্ট' : 'Speed Test'}</span>
            </button>

            <button
              onClick={() => onNavigate('weak-keys')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                state.currentView === 'weak-keys'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{isBn ? 'দুর্বল কী ড্রিল' : 'Weak Keys'}</span>
            </button>

            <button
              onClick={() => onNavigate('custom-practice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                state.currentView === 'custom-practice'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>{isBn ? 'কাস্টম টেক্সট' : 'Custom Text'}</span>
            </button>
          </nav>
        </div>

        {/* Right: Gamification Badges & Tools */}
        <div className="flex items-center gap-2">
          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold"
            title={isBn ? 'প্রতিদিনের প্র্যাকটিস ধারাবাহিকতা' : 'Daily practice streak'}
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{state.profile.streakDays} {isBn ? 'দিন' : 'd'}</span>
          </div>

          {/* Stars Counter */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-semibold"
            title={isBn ? 'মোট অর্জিত স্টার' : 'Total stars earned'}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{totalStars}</span>
          </div>

          <div className="h-5 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

          {/* Cheat Sheet Helper Button */}
          <button
            onClick={onOpenCheatSheet}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 border border-slate-800 flex items-center gap-1.5 transition-colors"
            title={isBn ? 'বিজয় কীবোর্ড চিটশিট ও নিয়ম' : 'Bijoy Keymap Cheat Sheet'}
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">{isBn ? 'চিটশিট' : 'Cheat Sheet'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playKeyClick();
            }}
            className={`p-2 rounded-lg text-xs transition-colors border ${
              state.settings.soundType !== 'off'
                ? 'text-cyan-400 border-cyan-800/60 bg-cyan-950/40 hover:bg-cyan-900/50'
                : 'text-slate-500 border-slate-800 hover:bg-slate-800'
            }`}
            title={isBn ? `শব্দ: ${state.settings.soundType}` : `Sound: ${state.settings.soundType}`}
          >
            {state.settings.soundType !== 'off' ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onCycleTheme}
            className="p-2 rounded-lg text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800 transition-colors"
            title={isBn ? 'থিম পরিবর্তন করুন' : 'Change Theme'}
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-200 border border-slate-800 hover:bg-slate-800 flex items-center gap-1 transition-colors"
            title="Toggle Bangla / English"
          >
            <Languages className="w-3.5 h-3.5 text-blue-400" />
            <span>{isBn ? 'EN' : 'বাং'}</span>
          </button>

          {/* Settings Modal Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800 transition-colors"
            title={isBn ? 'সেটিংস' : 'Settings'}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Profile & Stats Modal Trigger */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-all hover:scale-102"
          >
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium max-w-[80px] truncate hidden sm:inline">
              {state.profile.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
