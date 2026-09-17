import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Send, CheckCircle2, Mail, Info } from 'lucide-react';

interface LegalModalsProps {
  activeModal: 'about' | 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  if (!activeModal) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-violet-100 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeModal === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
            {activeModal === 'terms' && <FileText className="w-5 h-5 text-violet-400" />}
            {activeModal === 'about' && <Info className="w-5 h-5 text-violet-400" />}
            {activeModal === 'contact' && <Mail className="w-5 h-5 text-red-400" />}

            <h3 className="text-lg sm:text-xl font-bold">
              {activeModal === 'privacy' && 'Privacy Policy'}
              {activeModal === 'terms' && 'Terms of Service'}
              {activeModal === 'about' && 'About Image to pdf Tools'}
              {activeModal === 'contact' && 'Contact Support & Feedback'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-800">
                Last Updated: September 2026
              </p>
              <p>
                At <strong>Image to pdf Tools</strong>, accessible from this website, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information handled and our absolute commitment to zero cloud logging.
              </p>

              <h4 className="text-sm font-bold text-slate-900 pt-2">
                1. 100% Client-Side Processing (Zero Server Uploads)
              </h4>
              <p>
                Unlike standard online conversion portals, all image rendering, PDF compilation, and file processing happen exclusively inside your web browser using HTML5 Canvas and client-side JavaScript (jsPDF). <strong>Your photos, images, receipts, and documents are NEVER transmitted to, stored on, or inspected by our servers.</strong>
              </p>

              <h4 className="text-sm font-bold text-slate-900 pt-2">
                2. Cookies and Advertising Partners (Google AdSense)
              </h4>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to your website or other websites. Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.
              </p>
              <p>
                Users may opt out of personalized advertising by visiting Google Ads Settings or www.aboutads.info.
              </p>

              <h4 className="text-sm font-bold text-slate-900 pt-2">
                3. Log Files
              </h4>
              <p>
                Standard hosting infrastructure records non-personally identifiable technical logs (such as IP addresses, browser types, timestamp, referring pages) purely for server health and DDoS mitigation.
              </p>
            </div>
          )}

          {activeModal === 'terms' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-800">
                Terms of Use • Image to pdf Tools
              </p>
              <p>
                By using Image to pdf Tools, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">
                1. Permitted Use
              </h4>
              <p>
                You may use this tool freely for personal, educational, or commercial purposes. You are solely responsible for ensuring you possess the legal rights or permissions for any images you process.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">
                2. Disclaimer of Warranty
              </h4>
              <p>
                The tool is provided "as is", without warranty of any kind, express or implied. In no event shall the authors or copyright holders be liable for any claim, damages or other liability.
              </p>
            </div>
          )}

          {activeModal === 'about' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">
                Our Mission: Fast, Private, and Universal Document Tools
              </h4>
              <p>
                We built <strong>Image to pdf Tools</strong> to solve a recurring problem with traditional document utilities: invasive cloud uploads, aggressive file size restrictions, forced email signups, and hidden watermarks.
              </p>
              <p>
                By engineering the entire conversion pipeline to execute directly inside client browser engines via WebAssembly and modern canvas rendering, we deliver instantaneous speed while upholding uncompromised security.
              </p>
              <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100 mt-4">
                <h5 className="font-bold text-violet-900 mb-1">Key Principles:</h5>
                <ul className="list-disc pl-5 space-y-1 text-violet-800">
                  <li>Zero user tracking on personal files</li>
                  <li>No watermarks or quality penalties</li>
                  <li>Full responsiveness across all smartphones, tablets, and desktops</li>
                </ul>
              </div>
            </div>
          )}

          {activeModal === 'contact' && (
            <div>
              {contactSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">
                    Thank You for Reaching Out!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6">
                    Your inquiry has been received. Our team will review your feedback shortly.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back to Converter
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="text-xs text-slate-500">
                    Have suggestions, questions, or encountered an issue with a specific image format? Send us a message!
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us what we can improve or ask a question..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
