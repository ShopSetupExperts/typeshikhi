import React, { useState, useEffect, useCallback } from 'react';
import type { AppState, UserCertificate } from './store/useTypingStore';
import { loadSavedState, saveStateToStorage } from './store/useTypingStore';
import { CURRICULUM } from './data/curriculum';
import type { Lesson } from './data/curriculum';
import type { TypingMetrics } from './engine/bijoy-engine';


import { Navbar } from './components/Navbar';
import { HomeDashboardView } from './components/HomeDashboardView';
import { CurriculumView } from './components/CurriculumView';
import { LessonView } from './components/LessonView';
import { SpeedTestView } from './components/SpeedTestView';
import { WeakKeyDrillView } from './components/WeakKeyDrillView';
import { CustomPracticeView } from './components/CustomPracticeView';
import { ResultModal } from './components/ResultModal';
import { CheatSheetModal } from './components/CheatSheetModal';
import { ProfileStatsModal } from './components/ProfileStatsModal';
import { SettingsModal } from './components/SettingsModal';
import { MobileNotice } from './components/MobileNotice';
import { soundManager } from './engine/sound-synthesizer';

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => loadSavedState());

  // Modal open states
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  // Active lesson completion modal state
  const [completedMetrics, setCompletedMetrics] = useState<TypingMetrics | null>(null);

  // Weak key targeted drill launcher state
  const [weakDrillInitialKeys, setWeakDrillInitialKeys] = useState<string[]>([]);

  // Apply theme and font settings on root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.settings.theme);
    soundManager.setSoundType(state.settings.soundType);
    soundManager.setVolume(state.settings.soundVolume);
  }, [state.settings]);

  // Persist state to storage on every meaningful state change
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  // View Navigation
  const handleNavigate = (view: AppState['currentView']) => {
    setState((prev) => ({ ...prev, currentView: view }));
  };

  // Lesson Selection
  const handleSelectLesson = (lesson: Lesson) => {
    setState((prev) => ({
      ...prev,
      activeLesson: lesson,
      currentView: 'lesson'
    }));
    setCompletedMetrics(null);
  };

  // Lesson Completion Handler
  const handleLessonComplete = useCallback((metrics: TypingMetrics) => {
    setCompletedMetrics(metrics);

    setState((prev) => {
      const active = prev.activeLesson || CURRICULUM[0].lessons[0];
      const isPassed = metrics.accuracy >= active.passAccuracy;

      let stars = 0;
      if (isPassed) {
        stars = 1;
        if (metrics.accuracy >= 95 && metrics.grossWpm >= (active.targetWpm || 15)) stars = 2;
        if (metrics.accuracy >= 98 && metrics.grossWpm >= (active.targetWpm || 25)) stars = 3;
      }

      // Update completed lessons
      const prevLessonData = prev.completedLessons[active.id];
      const newCompleted = {
        ...prev.completedLessons,
        [active.id]: {
          stars: Math.max(prevLessonData?.stars || 0, stars),
          bestWpm: Math.max(prevLessonData?.bestWpm || 0, metrics.grossWpm),
          bestAccuracy: Math.max(prevLessonData?.bestAccuracy || 0, metrics.accuracy),
          attempts: (prevLessonData?.attempts || 0) + 1
        }
      };

      // Unlock next level if passed
      const nextLevel = active.level + 1;
      const newUnlocked = isPassed && !prev.unlockedLevels.includes(nextLevel) && nextLevel <= 12
        ? [...prev.unlockedLevels, nextLevel]
        : prev.unlockedLevels;

      // Update weak keys error map
      const newWeakKeys = { ...prev.weakKeys };
      for (const [char, stats] of Object.entries(metrics.weakKeys)) {
        const existing = newWeakKeys[char] || { attempts: 0, errors: 0 };
        newWeakKeys[char] = {
          attempts: existing.attempts + stats.attempts,
          errors: existing.errors + stats.errors
        };
      }

      // Check badges unlocks
      const now = new Date().toISOString();
      const newBadges = prev.badges.map((b) => {
        if (b.unlockedAt) return b;
        if (b.id === 'first-step' && isPassed) return { ...b, unlockedAt: now };
        if (b.id === 'speed-15' && metrics.grossWpm >= 15) return { ...b, unlockedAt: now };
        if (b.id === 'speed-25' && metrics.grossWpm >= 25 && metrics.accuracy >= 90) return { ...b, unlockedAt: now };
        if (b.id === 'speed-40' && metrics.grossWpm >= 40) return { ...b, unlockedAt: now };
        if (b.id === 'sniper-accuracy' && metrics.accuracy === 100) return { ...b, unlockedAt: now };
        if (b.id === 'conjunct-master' && active.level === 8 && stars === 3) return { ...b, unlockedAt: now };
        if (b.id === 'govt-ready' && active.level === 12 && isPassed) return { ...b, unlockedAt: now };
        return b;
      });

      return {
        ...prev,
        completedLessons: newCompleted,
        unlockedLevels: newUnlocked,
        weakKeys: newWeakKeys,
        badges: newBadges,
        profile: {
          ...prev.profile,
          xp: prev.profile.xp + (isPassed ? 50 * stars : 10),
          totalKeystrokes: prev.profile.totalKeystrokes + metrics.totalKeystrokes,
          totalWords: prev.profile.totalWords + Math.round(metrics.totalKeystrokes / 5),
          totalTimeMinutes: prev.profile.totalTimeMinutes + Math.round(metrics.elapsedSeconds / 60)
        }
      };
    });
  }, []);

  // Next lesson trigger
  const handleNextLesson = () => {
    if (!state.activeLesson) return;
    const allLessons = CURRICULUM.flatMap((l) => l.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === state.activeLesson?.id);
    if (currentIndex >= 0 && currentIndex + 1 < allLessons.length) {
      const next = allLessons[currentIndex + 1];
      handleSelectLesson(next);
    } else {
      handleNavigate('dashboard');
    }
  };

  // Prev lesson trigger
  const handlePrevLesson = () => {
    if (!state.activeLesson) return;
    const allLessons = CURRICULUM.flatMap((l) => l.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === state.activeLesson?.id);
    if (currentIndex > 0) {
      const prev = allLessons[currentIndex - 1];
      handleSelectLesson(prev);
    }
  };

  // Weak Key Drill Launcher
  const handleStartWeakDrill = (customLesson: Lesson) => {
    setState((prev) => ({
      ...prev,
      activeLesson: customLesson,
      currentView: 'lesson'
    }));
  };

  // Save speed test certificate
  const handleSaveCertificate = (cert: UserCertificate) => {
    setState((prev) => ({
      ...prev,
      certificates: [cert, ...prev.certificates]
    }));
  };

  // Settings update
  const handleUpdateSettings = (newSettings: Partial<AppState['settings']>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  // Theme cycler
  const handleCycleTheme = () => {
    const themes: Array<AppState['settings']['theme']> = ['dark', 'emerald', 'cyber', 'sepia'];
    const currentIdx = themes.indexOf(state.settings.theme);
    const nextTheme = themes[(currentIdx + 1) % themes.length];
    handleUpdateSettings({ theme: nextTheme });
  };

  // Sound cycler
  const handleToggleSound = () => {
    const nextSound = state.settings.soundType === 'off' ? 'mechanical' : 'off';
    handleUpdateSettings({ soundType: nextSound });
  };

  // Profile update
  const handleUpdateProfile = (name: string, avatar: string) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name,
        avatar
      }
    }));
  };

  const isBn = state.settings.language === 'bn';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Mobile Notice Bar */}
      <MobileNotice isBn={isBn} />

      {/* Global Navbar */}
      <Navbar
        state={state}
        onNavigate={handleNavigate}
        onOpenSettings={() => setShowSettings(true)}
        onOpenCheatSheet={() => setShowCheatSheet(true)}
        onOpenProfile={() => setShowProfile(true)}
        onToggleLanguage={() =>
          handleUpdateSettings({ language: state.settings.language === 'bn' ? 'en' : 'bn' })
        }
        onCycleTheme={handleCycleTheme}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full flex flex-col items-center justify-start">
        {state.currentView === 'dashboard' && (
          <HomeDashboardView
            state={state}
            onSelectLesson={handleSelectLesson}
            onNavigate={handleNavigate}
          />
        )}

        {state.currentView === 'curriculum' && (
          <CurriculumView
            state={state}
            onSelectLesson={handleSelectLesson}
            onBackToDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {state.currentView === 'lesson' && state.activeLesson && (
          <LessonView
            lesson={state.activeLesson}
            state={state}
            onComplete={handleLessonComplete}
            onBackToDashboard={() => handleNavigate('dashboard')}
            onSelectLesson={handleSelectLesson}
            onNextLesson={handleNextLesson}
            onPrevLesson={handlePrevLesson}
          />
        )}

        {state.currentView === 'speed-test' && (
          <SpeedTestView
            state={state}
            onBackToDashboard={() => handleNavigate('dashboard')}
            onSaveCertificate={handleSaveCertificate}
          />
        )}

        {state.currentView === 'weak-keys' && (
          <WeakKeyDrillView
            state={state}
            initialKeys={weakDrillInitialKeys}
            onStartDrill={handleStartWeakDrill}
            onBackToDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {state.currentView === 'custom-practice' && (
          <CustomPracticeView
            state={state}
            onStartCustomPractice={handleStartWeakDrill}
            onBackToDashboard={() => handleNavigate('dashboard')}
          />
        )}
      </main>

      {/* Result Modal */}
      {completedMetrics && state.activeLesson && (
        <ResultModal
          lesson={state.activeLesson}
          metrics={completedMetrics}
          isBn={isBn}
          onRetry={() => setCompletedMetrics(null)}
          onNextLesson={() => {
            setCompletedMetrics(null);
            handleNextLesson();
          }}
          onPracticeWeakKeys={(keys) => {
            setCompletedMetrics(null);
            setWeakDrillInitialKeys(keys);
            handleNavigate('weak-keys');
          }}
          onClose={() => setCompletedMetrics(null)}
        />
      )}

      {/* Cheat Sheet Reference Modal */}
      {showCheatSheet && (
        <CheatSheetModal isBn={isBn} onClose={() => setShowCheatSheet(false)} />
      )}

      {/* Profile & Statistics Modal */}
      {showProfile && (
        <ProfileStatsModal
          state={state}
          isBn={isBn}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          state={state}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500 font-bangla">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            {isBn
              ? 'টাইপশিখি (TypeShikhi) — বাংলাদেশ ও আন্তর্জাতিক মানসম্পন্ন প্রফেশনাল বিজয় বাংলা টাইপিং ইঞ্জিন।'
              : 'TypeShikhi — Professional Bijoy Bangla Typing Tutor and Engine.'}
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>কীবোর্ড লেআউট: আনন্দ কম্পিউটার্স বিজয় স্ট্যান্ডার্ড</span>
            <span>•</span>
            <span>Unicode NFC Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
