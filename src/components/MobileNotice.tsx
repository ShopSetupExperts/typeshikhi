import React, { useState } from 'react';
import { Laptop, X } from 'lucide-react';


interface MobileNoticeProps {
  isBn: boolean;
}

export const MobileNotice: React.FC<MobileNoticeProps> = ({ isBn }) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  if (dismissed) return null;

  return (
    <div className="md:hidden w-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-b border-amber-500/30 p-3 px-4 flex items-center justify-between gap-3 text-left">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
          <Laptop className="w-4 h-4" />
        </div>
        <p className="text-xs text-amber-200 font-bangla leading-snug">
          {isBn
            ? 'বিজয় টাইপিং পুরোপুরি স্পর্শ টাইপিং (Touch Typing) নির্ভর। সেরা অভিজ্ঞতার জন্য ল্যাপটপ বা ডেস্কটপ কিবোর্ড ব্যবহার করুন।'
            : 'Bijoy touch typing is designed for physical keyboards. Use a laptop or desktop computer for full interactive drills.'}
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 text-amber-400 hover:text-amber-200 shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
