import React from 'react';
import { FileDown, Sparkles, Check, ArrowRight } from 'lucide-react';
import { UploadedImage } from '../types';
import { formatBytes } from '../utils/pdfGenerator';

interface ConvertActionBarProps {
  images: UploadedImage[];
  isConverting: boolean;
  onConvert: () => void;
}

export const ConvertActionBar: React.FC<ConvertActionBarProps> = ({
  images,
  isConverting,
  onConvert,
}) => {
  const totalSize = images.reduce((acc, img) => acc + img.size, 0);

  return (
    <div className="bg-gradient-to-r from-violet-900 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-xl shadow-violet-950/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <span className="text-base sm:text-lg font-bold">
            Ready to Generate PDF
          </span>
          <span className="px-2 py-0.5 text-xs font-semibold bg-violet-800/80 rounded-full border border-violet-700/60">
            {images.length} {images.length === 1 ? 'Page' : 'Pages'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-violet-200">
          Source file total size: <span className="font-semibold text-white">{formatBytes(totalSize)}</span> • 100% Client-Side Processing
        </p>
      </div>

      {/* Primary Action Button (Red #DC2626 / #E11D48 per prompt) */}
      <button
        type="button"
        disabled={images.length === 0 || isConverting}
        onClick={onConvert}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
      >
        <FileDown className="w-6 h-6 text-white animate-bounce" />
        <span>Convert to PDF</span>
        <ArrowRight className="w-5 h-5 text-red-200" />
      </button>
    </div>
  );
};
