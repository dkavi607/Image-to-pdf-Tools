import React from 'react';
import { FileText, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenModal: (modal: 'about' | 'privacy' | 'terms' | 'contact') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onNavigateSection }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-extrabold text-base">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white">
                <FileText className="w-4 h-4" />
              </div>
              <span>Image to <span className="text-violet-400">pdf</span> Tools</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Fast, free, and completely client-side image-to-PDF compilation. Your files never leave your device.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero server uploads • 100% Private</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('tool')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Image Converter Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-to-use')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  How to Use Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('features')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Features & Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('guides')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Optimization Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faqs')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Legal & Trust
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('about')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('contact')}
                  className="hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Contact & Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Supported formats */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Supported Conversions
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]">JPG to PDF</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]">PNG to PDF</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]">WEBP to PDF</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]">JPEG to PDF</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]">BMP to PDF</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]">Combine Multiple Images</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              Standard paper presets: ISO A4, US Letter, US Legal, and Custom Fit.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Image to pdf Tools. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with security & privacy in mind
          </p>
        </div>
      </div>
    </footer>
  );
};
