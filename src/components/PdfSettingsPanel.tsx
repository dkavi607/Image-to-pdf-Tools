import React from 'react';
import { Sliders, FileType, Layout, Maximize, Gauge, Edit3 } from 'lucide-react';
import { PdfSettings, PageSize, Orientation, MarginSize, ImageFit } from '../types';

interface PdfSettingsPanelProps {
  settings: PdfSettings;
  onChange: (updated: Partial<PdfSettings>) => void;
}

export const PdfSettingsPanel: React.FC<PdfSettingsPanelProps> = ({ settings, onChange }) => {
  return (
    <div className="bg-white border border-violet-100 rounded-2xl p-5 sm:p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Sliders className="w-5 h-5 text-violet-700" />
        <h3 className="text-base font-bold text-slate-900">PDF Document Settings</h3>
        <span className="text-xs text-slate-400 font-normal ml-auto">Optional customization</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Page Size */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <FileType className="w-3.5 h-3.5 text-violet-600" />
            Page Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'a4', label: 'A4 Standard', desc: '210 × 297 mm' },
              { id: 'letter', label: 'US Letter', desc: '8.5 × 11 in' },
              { id: 'legal', label: 'US Legal', desc: '8.5 × 14 in' },
              { id: 'fit', label: 'Fit to Image', desc: 'Match aspect' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ pageSize: opt.id as PageSize })}
                className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                  settings.pageSize === opt.id
                    ? 'border-violet-600 bg-violet-50/80 text-violet-900 ring-1 ring-violet-500 shadow-xs'
                    : 'border-slate-200 hover:border-violet-300 bg-white text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">{opt.label}</div>
                <div className="text-[10px] text-slate-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Layout className="w-3.5 h-3.5 text-violet-600" />
            Page Orientation
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'auto', label: 'Auto Detect', icon: '🔄' },
              { id: 'portrait', label: 'Portrait', icon: '📄' },
              { id: 'landscape', label: 'Landscape', icon: '🖼️' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange({ orientation: opt.id as Orientation })}
                className={`p-2.5 text-center rounded-xl border transition-all cursor-pointer ${
                  settings.orientation === opt.id
                    ? 'border-violet-600 bg-violet-50/80 text-violet-900 ring-1 ring-violet-500 shadow-xs'
                    : 'border-slate-200 hover:border-violet-300 bg-white text-slate-700'
                }`}
              >
                <div className="text-sm mb-0.5">{opt.icon}</div>
                <div className="text-xs font-bold">{opt.label}</div>
              </button>
            ))}
          </div>

          {/* Margins */}
          <div className="mt-3">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              Page Margins
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'none', label: 'None (0mm)' },
                { id: 'small', label: 'Small (8mm)' },
                { id: 'normal', label: 'Normal (15mm)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange({ margin: opt.id as MarginSize })}
                  className={`py-1.5 px-2 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    settings.margin === opt.id
                      ? 'border-violet-600 bg-violet-600 text-white font-semibold'
                      : 'border-slate-200 hover:border-violet-300 bg-white text-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compression / Quality & File Name */}
        <div className="flex flex-col justify-between">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Gauge className="w-3.5 h-3.5 text-violet-600" />
              Image Quality & Compression
            </label>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {[
                { quality: 0.95, label: 'High (Best)' },
                { quality: 0.85, label: 'Standard' },
                { quality: 0.65, label: 'Compact' },
              ].map((opt) => (
                <button
                  key={opt.quality}
                  type="button"
                  onClick={() => onChange({ quality: opt.quality })}
                  className={`py-1.5 px-2 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    Math.abs(settings.quality - opt.quality) < 0.05
                      ? 'border-violet-600 bg-violet-600 text-white font-semibold'
                      : 'border-slate-200 hover:border-violet-300 bg-white text-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <Edit3 className="w-3.5 h-3.5 text-violet-600" />
              Output PDF File Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={settings.fileName}
                onChange={(e) => onChange({ fileName: e.target.value })}
                placeholder="document"
                className="w-full pl-3 pr-12 py-2 text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-violet-500 focus:bg-white text-slate-800"
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">
                .pdf
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
