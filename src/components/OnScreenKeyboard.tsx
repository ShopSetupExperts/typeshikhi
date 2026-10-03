import React from 'react';
import { BIJOY_KEYMAP, KEYBOARD_ROWS, FINGER_COLORS } from '../engine/bijoy-layout';
import type { KeyStep } from '../engine/bijoy-engine';

interface OnScreenKeyboardProps {
  targetSteps?: KeyStep[];
  activeStepIndex?: number;
  pressedKeys: Set<string>;
  isShiftPressed: boolean;
  size?: 'compact' | 'standard' | 'large';
  onKeyClick?: (code: string, shift: boolean) => void;
  showFingerGuide?: boolean;
}

export const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({
  targetSteps = [],
  activeStepIndex = 0,
  pressedKeys,
  isShiftPressed,
  size = 'standard',
  onKeyClick,
  showFingerGuide = true
}) => {
  const currentStep = targetSteps[activeStepIndex];
  const targetCode = currentStep?.code;
  const isTargetShifted = !!currentStep?.shift;

  // Ergonomic responsive key sizing classes
  const sizeClasses = {
    compact: {
      container: 'p-2 sm:p-2.5 gap-1',
      row: 'gap-0.5 sm:gap-1',
      key: 'h-8 sm:h-9 text-xs',
      banglaText: 'text-xs sm:text-sm font-semibold',
      enText: 'text-[8px] sm:text-[9px]',
      space: 'h-8 sm:h-9'
    },
    standard: {
      container: 'p-2.5 sm:p-3.5 gap-1 sm:gap-1.5',
      row: 'gap-1 sm:gap-1.5',
      key: 'h-9 sm:h-10 md:h-11 text-xs sm:text-sm',
      banglaText: 'text-sm sm:text-base font-bold',
      enText: 'text-[9px] sm:text-[10px]',
      space: 'h-9 sm:h-10 md:h-11'
    },
    large: {
      container: 'p-3 sm:p-4 gap-1.5 sm:gap-2',
      row: 'gap-1.5 sm:gap-2',
      key: 'h-11 sm:h-12 md:h-13 text-sm sm:text-base',
      banglaText: 'text-base sm:text-lg font-bold',
      enText: 'text-[10px] sm:text-xs',
      space: 'h-11 sm:h-12 md:h-13'
    }
  }[size];

  // Key width proportions
  const getKeyWidth = (code: string) => {
    switch (code) {
      case 'Backspace':
        return 'flex-[1.6] min-w-[50px] sm:min-w-[65px]';
      case 'Tab':
        return 'flex-[1.3] min-w-[42px] sm:min-w-[50px]';
      case 'CapsLock':
        return 'flex-[1.5] min-w-[48px] sm:min-w-[60px]';
      case 'Enter':
        return 'flex-[1.8] min-w-[55px] sm:min-w-[70px]';
      case 'ShiftLeft':
        return 'flex-[1.9] min-w-[60px] sm:min-w-[75px]';
      case 'ShiftRight':
        return 'flex-[2.1] min-w-[65px] sm:min-w-[85px]';
      case 'Space':
        return 'flex-[6] max-w-[360px] sm:max-w-[420px]';
      default:
        return 'flex-1 min-w-[28px] sm:min-w-[34px] max-w-[58px]';
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none shrink-0">
      <div
        className={`w-full max-w-4xl rounded-2xl glass-panel border border-slate-800/90 bg-slate-950/90 shadow-2xl flex flex-col ${sizeClasses.container}`}
      >
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex items-center justify-center w-full ${sizeClasses.row} ${
              rowIndex === 4 ? 'mt-0.5' : ''
            }`}
          >
            {row.map((code) => {
              const keyDef = BIJOY_KEYMAP[code];
              const isPressed = pressedKeys.has(code);
              const isTarget = targetCode === code;
              const isShiftKey = code === 'ShiftLeft' || code === 'ShiftRight';
              const isTargetShiftActive = isShiftKey && isTargetShifted;
              const isShiftActive = isShiftKey && isShiftPressed;

              // Finger styling
              const fingerInfo = keyDef ? FINGER_COLORS[keyDef.finger] : null;

              // Special key labels
              let specialLabel = '';
              if (code === 'Backspace') specialLabel = '⌫';
              else if (code === 'Tab') specialLabel = 'Tab';
              else if (code === 'CapsLock') specialLabel = 'Caps';
              else if (code === 'Enter') specialLabel = '↵';
              else if (code === 'ShiftLeft' || code === 'ShiftRight') specialLabel = '⇧ Shift';
              else if (code === 'Space') specialLabel = 'Space (স্পেস)';

              if (!keyDef) {
                return (
                  <button
                    key={code}
                    onClick={() => onKeyClick?.(code, isShiftPressed)}
                    className={`keycap ${getKeyWidth(code)} ${sizeClasses.key} ${
                      isPressed || isShiftActive ? 'is-pressed bg-slate-800' : ''
                    } ${isTargetShiftActive ? 'is-target ring-2 ring-purple-500' : ''} text-slate-400 font-medium`}
                  >
                    <span className="text-[10px] sm:text-[11px] tracking-tight">{specialLabel}</span>
                  </button>
                );
              }

              return (
                <button
                  key={code}
                  onClick={() => onKeyClick?.(code, isShiftPressed)}
                  style={{
                    borderBottomColor: showFingerGuide && fingerInfo ? fingerInfo.text : undefined,
                    borderBottomWidth: showFingerGuide && fingerInfo ? '2px' : undefined
                  }}
                  className={`keycap ${getKeyWidth(code)} ${sizeClasses.key} ${
                    isPressed ? 'is-pressed' : ''
                  } ${isTarget ? 'is-target' : ''} transition-all duration-75 relative group px-0.5`}
                  title={`${keyDef.labelEn}: ${keyDef.normal} | Shift+${keyDef.labelEn}: ${keyDef.shift} (${
                    fingerInfo?.label || ''
                  })`}
                >
                  {/* Top Row: English key label & Shifted Bangla char */}
                  <div className="w-full flex items-center justify-between px-1 -mt-0.5">
                    <span className={`${sizeClasses.enText} font-mono text-slate-400/80 uppercase`}>
                      {keyDef.labelEn}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-bangla transition-opacity ${
                        isShiftPressed
                          ? 'text-cyan-300 font-bold scale-110'
                          : 'text-slate-400 opacity-70'
                      }`}
                    >
                      {keyDef.shift}
                    </span>
                  </div>

                  {/* Main Center: Normal Bangla Glyph */}
                  <div className="flex items-center justify-center my-auto">
                    <span
                      className={`font-bangla ${sizeClasses.banglaText} ${
                        !isShiftPressed
                          ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                          : 'text-slate-400 opacity-60'
                      }`}
                    >
                      {keyDef.normal}
                    </span>
                  </div>

                  {/* Finger Dot indicator */}
                  {showFingerGuide && fingerInfo && (
                    <div
                      className="absolute bottom-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                      style={{ backgroundColor: fingerInfo.text }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
