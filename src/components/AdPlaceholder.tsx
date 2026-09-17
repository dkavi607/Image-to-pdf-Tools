import React from 'react';

export type AdSlotType = 'top-banner' | 'sidebar' | 'in-tool' | 'bottom-content';

interface AdPlaceholderProps {
  type: AdSlotType;
  className?: string;
}

const AD_CONFIG: Record<
  AdSlotType,
  {
    id: string;
    classNames: string;
    label: string;
    dimensions: string;
    minHeight: string;
  }
> = {
  'top-banner': {
    id: 'ad-top-banner',
    classNames: 'ad-slot-banner',
    label: 'Google AdSense – Top Leaderboard',
    dimensions: 'Responsive (728×90 / 970×90)',
    minHeight: 'min-h-[100px]',
  },
  'sidebar': {
    id: 'ad-sidebar-right',
    classNames: 'ad-slot-sidebar',
    label: 'Google AdSense – Desktop Sidebar',
    dimensions: '300×250 / 300×600 Half-Page',
    minHeight: 'min-h-[280px]',
  },
  'in-tool': {
    id: 'ad-in-tool',
    classNames: 'ad-slot-in-tool',
    label: 'Google AdSense – In-Tool Native',
    dimensions: 'Responsive In-Feed (728×90 / 336×280)',
    minHeight: 'min-h-[110px]',
  },
  'bottom-content': {
    id: 'ad-bottom-content',
    classNames: 'ad-slot-bottom',
    label: 'Google AdSense – Bottom Matched Content',
    dimensions: 'Responsive Multiplex (728×90 / 970×250)',
    minHeight: 'min-h-[120px]',
  },
};

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, className = '' }) => {
  const config = AD_CONFIG[type];

  return (
    <div
      id={config.id}
      className={`ad-container ${config.classNames} w-full my-6 bg-slate-50/80 border border-dashed border-violet-200 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all hover:border-violet-300 ${config.minHeight} ${className}`}
      aria-label="Advertisement Placement"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-violet-100/70 text-violet-700">
          Advertisement
        </span>
        <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
          #{config.id}
        </span>
      </div>
      <p className="text-xs font-medium text-slate-600 mb-0.5">
        {config.label}
      </p>
      <p className="text-[11px] text-slate-400">
        Placement Size: <span className="font-mono text-slate-500">{config.dimensions}</span>
      </p>
    </div>
  );
};
