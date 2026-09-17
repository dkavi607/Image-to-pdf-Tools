import React, { useState } from 'react';
import { FileText, ShieldCheck, Menu, X, HelpCircle, BookOpen, Sparkles, Info } from 'lucide-react';

interface HeaderProps {
  onOpenModal: (modal: 'about' | 'privacy' | 'terms' | 'contact') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-violet-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#tool"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('tool');
            }}
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-violet-700 to-violet-500 text-white flex items-center justify-center shadow-md shadow-violet-200 group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-display">
                  Image to <span className="text-violet-700">pdf</span> Tools
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200/60">
                  <Sparkles className="w-3 h-3 text-red-500" /> Free
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Convert JPG, PNG & WEBP to PDF in your browser
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('tool')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
            >
              Converter
            </button>
            <button
              onClick={() => handleNavClick('how-to-use')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
            >
              How to Use
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('guides')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-violet-600" />
              Guides
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-violet-600" />
              FAQs
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1" />

            <button
              onClick={() => onOpenModal('privacy')}
              className="px-3 py-2 text-xs font-semibold text-violet-700 bg-violet-50/80 hover:bg-violet-100 rounded-lg transition-colors flex items-center gap-1 border border-violet-200/60"
              title="100% Private Client-Side Conversion"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
              100% Private
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-violet-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('tool')}
              className="text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-violet-50 hover:text-violet-700 rounded-lg"
            >
              Convert Images
            </button>
            <button
              onClick={() => handleNavClick('how-to-use')}
              className="text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-violet-50 hover:text-violet-700 rounded-lg"
            >
              How to Use
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-violet-50 hover:text-violet-700 rounded-lg"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('guides')}
              className="text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-violet-50 hover:text-violet-700 rounded-lg flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-violet-600" />
              Guides & Articles
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="text-left px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-violet-50 hover:text-violet-700 rounded-lg flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-violet-600" />
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('privacy');
              }}
              className="px-3 py-2 text-slate-600 hover:text-violet-700 bg-slate-50 rounded-md"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('terms');
              }}
              className="px-3 py-2 text-slate-600 hover:text-violet-700 bg-slate-50 rounded-md"
            >
              Terms of Service
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('contact');
              }}
              className="px-3 py-2 text-slate-600 hover:text-violet-700 bg-slate-50 rounded-md"
            >
              Contact Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
