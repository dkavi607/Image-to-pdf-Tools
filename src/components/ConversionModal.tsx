import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  ExternalLink,
  X,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { ConversionProgress, ConvertedPdfResult } from '../types';
import { formatBytes } from '../utils/pdfGenerator';

interface ConversionModalProps {
  progress: ConversionProgress;
  result: ConvertedPdfResult | null;
  onClose: () => void;
  onReset: () => void;
}

export const ConversionModal: React.FC<ConversionModalProps> = ({
  progress,
  result,
  onClose,
  onReset,
}) => {
  useEffect(() => {
    if (result && !progress.isConverting) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#DC2626', '#3B82F6', '#10B981'],
        });
      } catch (e) {
        // Safe fallback if confetti canvas fails
      }
    }
  }, [result, progress.isConverting]);

  if (!progress.isConverting && !result) return null;

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-violet-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-violet-900 to-indigo-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center">
              {progress.isConverting ? (
                <Loader2 className="w-5 h-5 text-violet-300 animate-spin" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {progress.isConverting ? 'Creating Your PDF...' : 'Your PDF is Ready!'}
              </h3>
              <p className="text-xs text-violet-200">
                {progress.isConverting
                  ? 'Rendering images into high-resolution PDF pages'
                  : 'Generated 100% locally in your browser'}
              </p>
            </div>
          </div>

          {!progress.isConverting && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {progress.isConverting ? (
            <div className="py-8 text-center">
              {/* Spinner & Progress Bar */}
              <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-violet-100 border-t-violet-700 rounded-full animate-spin" />
                <span className="absolute text-xs font-bold text-violet-900">
                  {progress.percent}%
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-800 mb-1">
                {progress.statusText}
              </h4>
              <p className="text-xs text-slate-500 mb-6">
                Processing {progress.current} of {progress.total} images...
              </p>

              {/* Progress track */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-violet-600 to-red-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Large images may take a few moments to scale and encode.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Document Summary Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-14 bg-red-100 text-red-600 rounded-xl flex flex-col items-center justify-center font-bold text-xs shadow-xs border border-red-200">
                    <FileCheck className="w-5 h-5 mb-0.5" />
                    <span>PDF</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base break-all">
                      {result.fileName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'} •{' '}
                      <span className="font-semibold text-slate-700">{formatBytes(result.fileSize)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 text-xs font-semibold text-violet-700 hover:bg-violet-100/70 border border-violet-200 rounded-xl inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Preview in New Tab
                  </a>
                </div>
              </div>

              {/* In-Modal PDF Viewer Iframe (Embedded Preview) */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 h-64 sm:h-72 shadow-inner">
                <iframe
                  src={`${result.url}#toolbar=0&navpanes=0`}
                  title="PDF Preview"
                  className="w-full h-full border-0"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-base rounded-xl shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Now
                </button>

                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Convert More Images
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
