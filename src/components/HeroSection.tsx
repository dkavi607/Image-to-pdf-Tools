import React from 'react';
import { ShieldCheck, Zap, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="text-center pt-8 pb-4 max-w-4xl mx-auto px-4">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/80 border border-violet-200/80 text-violet-800 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
        <Sparkles className="w-4 h-4 text-violet-600 animate-pulse" />
        <span>100% Client-Side • Secure & Private • No Server Uploads</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
        Convert <span className="text-violet-700 underline decoration-violet-300 decoration-wavy decoration-2">JPG, PNG & WEBP</span> to <span className="text-red-600">PDF</span>
      </h1>

      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
        Combine, organize, and transform your photos, document scans, and receipts into a single, professional PDF file. Fast, lightweight, and completely free in your browser.
      </p>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 font-medium">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          No File Size Limits
        </span>
        <span className="flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-violet-600" />
          100% Private (Runs locally)
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" />
          Instant PDF Download
        </span>
      </div>
    </section>
  );
};
