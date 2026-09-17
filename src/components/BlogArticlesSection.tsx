import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, X, Check } from 'lucide-react';
import { ARTICLES_DATA } from '../data/contentData';
import { Article } from '../types';

export const BlogArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="guides" className="py-12 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-violet-700 bg-violet-100/70 px-3 py-1 rounded-full">
            Helpful Guides & Insights
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
            Image to PDF Optimization Articles
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Practical tips for creating smaller, crisper, and more professional PDF documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-violet-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug hover:text-violet-700 transition-colors">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="text-left cursor-pointer"
                  >
                    {article.title}
                  </button>
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span className="font-medium text-slate-600">{article.date}</span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1 font-bold text-violet-700 hover:text-violet-900 cursor-pointer"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-violet-100 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-violet-600" />
                  {selectedArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-violet-600" />
                  {selectedArticle.date}
                </span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-slate-600 text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}

              <div className="mt-8 p-4 bg-violet-50 rounded-2xl border border-violet-200/70">
                <h4 className="font-bold text-violet-900 text-sm mb-1">
                  Ready to test these techniques?
                </h4>
                <p className="text-xs text-violet-700 mb-3">
                  Upload your files to our tool and see how fast and clean your documents convert.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Go to Image Converter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
