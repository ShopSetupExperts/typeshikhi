import React from 'react';
import type { FingerType } from '../engine/bijoy-layout';
import { FINGER_COLORS } from '../engine/bijoy-layout';

interface HandsGuideProps {
  activeFinger?: FingerType;
  isBn?: boolean;
}

export const HandsGuide: React.FC<HandsGuideProps> = ({ activeFinger, isBn = true }) => {
  const fingerInfo = activeFinger ? FINGER_COLORS[activeFinger] : null;

  return (
    <div className="w-full max-w-4xl flex items-center justify-between gap-3 px-4 py-2 rounded-xl glass-card border border-slate-800/80 bg-slate-950/60 shrink-0">
      {/* Left Hand Mini */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
          {isBn ? 'বাম হাত' : 'Left'}
        </span>
        <div className="flex items-end gap-1 h-9 px-2.5 py-1 bg-slate-900/60 rounded-lg border border-slate-800">
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'left-pinky' ? 'h-7 ring-2 ring-red-400' : 'h-5 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['left-pinky'].text }}
            title="বাম কনিষ্ঠা"
          />
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'left-ring' ? 'h-8 ring-2 ring-orange-400' : 'h-6 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['left-ring'].text }}
            title="বাম অনামিকা"
          />
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'left-middle' ? 'h-9 ring-2 ring-yellow-400' : 'h-7 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['left-middle'].text }}
            title="বাম মধ্যমা"
          />
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'left-index' ? 'h-8 ring-2 ring-green-400' : 'h-6 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['left-index'].text }}
            title="বাম তর্জনী"
          />
          <div
            className={`w-3 rounded-t ml-0.5 transition-all ${
              activeFinger === 'thumb' ? 'h-5 ring-2 ring-purple-400' : 'h-3.5 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['thumb'].text }}
            title="বৃদ্ধাঙ্গুলি"
          />
        </div>
      </div>

      {/* Middle Active Finger Pill */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 shadow-sm">
        <span className="text-[10px] text-slate-400 uppercase font-semibold">
          {isBn ? 'সঠিক আঙুল:' : 'Active Finger:'}
        </span>
        {fingerInfo ? (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: fingerInfo.text }}
            />
            <span className="text-xs font-bold font-bangla" style={{ color: fingerInfo.text }}>
              {isBn ? fingerInfo.labelBn : fingerInfo.label}
            </span>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-bangla">
            {isBn ? 'হোম রো' : 'Home Row'}
          </span>
        )}
      </div>

      {/* Right Hand Mini */}
      <div className="flex items-center gap-2">
        <div className="flex items-end gap-1 h-9 px-2.5 py-1 bg-slate-900/60 rounded-lg border border-slate-800">
          <div
            className={`w-3 rounded-t mr-0.5 transition-all ${
              activeFinger === 'thumb' ? 'h-5 ring-2 ring-purple-400' : 'h-3.5 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['thumb'].text }}
            title="বৃদ্ধাঙ্গুলি"
          />
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'right-index' ? 'h-8 ring-2 ring-cyan-400' : 'h-6 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['right-index'].text }}
            title="ডান তর্জনী"
          />
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'right-middle' ? 'h-9 ring-2 ring-blue-400' : 'h-7 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['right-middle'].text }}
            title="ডান মধ্যমা"
          />
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'right-ring' ? 'h-8 ring-2 ring-purple-400' : 'h-6 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['right-ring'].text }}
            title="ডান অনামিকা"
          />
          <div
            className={`w-2.5 rounded-t transition-all ${
              activeFinger === 'right-pinky' ? 'h-7 ring-2 ring-pink-400' : 'h-5 opacity-40'
            }`}
            style={{ backgroundColor: FINGER_COLORS['right-pinky'].text }}
            title="ডান কনিষ্ঠা"
          />
        </div>
        <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
          {isBn ? 'ডান হাত' : 'Right'}
        </span>
      </div>
    </div>
  );
};
