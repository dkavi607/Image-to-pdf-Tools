import React from 'react';
import {
  Upload,
  ArrowUpDown,
  SlidersHorizontal,
  Download,
  Shield,
  Zap,
  CheckCircle,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SeoHowToSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Upload,
      title: 'Upload Your Images',
      desc: 'Drag and drop JPG, PNG, or WEBP files into the upload box, or click "Browse Files". You can also paste copied images using Ctrl+V.',
    },
    {
      step: '02',
      icon: ArrowUpDown,
      title: 'Rearrange & Rotate',
      desc: 'Drag thumbnails to set the exact page sequence. Use the 90° rotation button to fix sideways or upside-down photos.',
    },
    {
      step: '03',
      icon: SlidersHorizontal,
      title: 'Configure Settings',
      desc: 'Select page formats (A4, Letter, Legal, or Fit to Image), margin sizes, orientation, and JPEG compression quality.',
    },
    {
      step: '04',
      icon: Download,
      title: 'Convert & Download',
      desc: 'Click the red "Convert to PDF" button. In just a split second, your combined PDF file is generated and ready to download.',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: '100% Client-Side & Private',
      desc: 'Your photos and documents are never sent over the internet to remote servers. Everything executes inside your local browser.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Conversion',
      desc: 'No waiting on slow cloud upload queues. Take advantage of your device’s hardware for instant PDF generation.',
    },
    {
      icon: Layers,
      title: 'Universal Multi-Format Support',
      desc: 'Seamlessly combine JPG, JPEG, PNG, WEBP, and BMP images of different resolutions and aspect ratios in a single document.',
    },
    {
      icon: Cpu,
      title: 'Completely Free with No Limits',
      desc: 'No watermarks, no hidden limits, and no registration required. Convert as many images into PDFs as you need.',
    },
  ];

  return (
    <section id="how-to-use" className="py-12 border-t border-slate-200/80">
      {/* Step by step */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-violet-700 bg-violet-100/70 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
            How to Use Image to pdf Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Create clean, high-resolution multi-page PDF documents in less than 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white border border-violet-100 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-violet-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 font-mono">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Us */}
      <div id="features" className="max-w-5xl mx-auto px-4 mt-16 pt-12 border-t border-slate-100">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200/60">
            Engineered for Security & Speed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
            Why Choose Image to pdf Tools?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            The safest and simplest way to convert pictures into professional documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-100/70 text-violet-700 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
