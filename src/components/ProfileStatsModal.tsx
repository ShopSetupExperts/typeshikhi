import React, { useState } from 'react';
import {
  X,
  User,
  Flame,
  Award,
  Star,
  ShieldCheck,
  Trophy,
  Edit2
} from 'lucide-react';
import type { AppState } from '../store/useTypingStore';


interface ProfileStatsModalProps {
  state: AppState;
  isBn: boolean;
  onUpdateProfile: (name: string, avatar: string) => void;
  onClose: () => void;
}

export const ProfileStatsModal: React.FC<ProfileStatsModalProps> = ({
  state,
  isBn,
  onUpdateProfile,
  onClose
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(state.profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(state.profile.avatar);

  const avatars = ['🎯', '⌨️', '🚀', '🔥', '🏆', '⭐', '⚡', '🦉', '🐯', '🌟'];

  const handleSave = () => {
    onUpdateProfile(editName.trim() || 'শিক্ষার্থী', selectedAvatar);
    setIsEditing(false);
  };

  const totalStars = Object.values(state.completedLessons).reduce((acc, curr) => acc + curr.stars, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] rounded-3xl glass-panel border border-slate-700/80 bg-slate-900/95 shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-bangla">
                {isBn ? 'প্রোফাইল ও পরিসংখ্যান' : 'Profile & Statistics'}
              </h2>
              <p className="text-xs text-slate-400 font-bangla">
                {isBn ? 'আপনার টাইপিং অগ্রগতি, অর্জন ও সনদপত্র' : 'Your typing milestones and certificates'}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-6">
          {/* User Card */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-inner">
                {state.profile.avatar}
              </div>
              <div>
                {!isEditing ? (
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-bangla">{state.profile.name}</h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 rounded-md text-slate-400 hover:text-cyan-400"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm text-white font-bangla focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={handleSave}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500 text-white text-xs font-bold"
                    >
                      {isBn ? 'সংরক্ষণ' : 'Save'}
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold font-mono">
                    Bijoy Typist Level
                  </span>
                </div>
              </div>
            </div>

            {/* Streak & Stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{state.profile.streakDays} Days Streak</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-bold font-mono">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{totalStars} Stars</span>
              </div>
            </div>
          </div>

          {/* Avatar Selector if Editing */}
          {isEditing && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold mb-2 block">
                {isBn ? 'অবতার নির্বাচন করুন:' : 'Choose Avatar:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {avatars.map((av) => (
                  <button
                    key={av}
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      selectedAvatar === av
                        ? 'bg-cyan-500/20 border-2 border-cyan-400 scale-110'
                        : 'bg-slate-900 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trophy Case & Achievements */}
          <div>
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>{isBn ? 'অর্জন ও ব্যাজ (Achievements):' : 'Badges & Achievements:'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {state.badges.map((badge) => {
                const isUnlocked = !!badge.unlockedAt;
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isUnlocked
                        ? 'bg-slate-950/70 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-950/30 border-slate-900 opacity-50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-bangla">
                        {isBn ? badge.titleBn : badge.titleEn}
                      </h4>
                      <p className="text-xs text-slate-400 font-bangla mt-0.5">
                        {isBn ? badge.descBn : badge.descEn}
                      </p>
                      {isUnlocked && (
                        <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
                          ✓ Unlocked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earned Certificates */}
          {state.certificates.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? 'অর্জিত সনদপত্রসমূহ:' : 'Earned Certificates:'}</span>
              </h3>
              <div className="flex flex-col gap-2.5">
                {state.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-cyan-300 font-bangla">{cert.testTitle}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {cert.wpm} WPM • {cert.accuracy}% Acc • {cert.date}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
