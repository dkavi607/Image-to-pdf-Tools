import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AdPlaceholder } from './components/AdPlaceholder';
import { ImageDropzone } from './components/ImageDropzone';
import { ImagePreviewGrid } from './components/ImagePreviewGrid';
import { PdfSettingsPanel } from './components/PdfSettingsPanel';
import { ConvertActionBar } from './components/ConvertActionBar';
import { ConversionModal } from './components/ConversionModal';
import { SeoHowToSection } from './components/SeoHowToSection';
import { BlogArticlesSection } from './components/BlogArticlesSection';
import { FaqSection } from './components/FaqSection';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';
import { UploadedImage, PdfSettings, ConversionProgress, ConvertedPdfResult } from './types';
import { generatePdf } from './utils/pdfGenerator';
import { Sparkles, Shield, Zap, FileText } from 'lucide-react';

export default function App() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [settings, setSettings] = useState<PdfSettings>({
    pageSize: 'a4',
    orientation: 'auto',
    margin: 'none',
    imageFit: 'contain',
    quality: 0.85,
    fileName: 'converted-document',
  });

  const [conversionProgress, setConversionProgress] = useState<ConversionProgress>({
    isConverting: false,
    current: 0,
    total: 0,
    percent: 0,
    statusText: '',
  });

  const [conversionResult, setConversionResult] = useState<ConvertedPdfResult | null>(null);
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);

  const handleImagesAdded = useCallback((newImages: UploadedImage[]) => {
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleRotate = useCallback((id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img))
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleMove = useCallback((fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    if (images.length > 0 && window.confirm('Are you sure you want to remove all uploaded images?')) {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      setImages([]);
    }
  }, [images]);

  const handleSettingsChange = useCallback((updated: Partial<PdfSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  }, []);

  const handleConvert = async () => {
    if (images.length === 0) return;

    try {
      const outputName = settings.fileName.trim() ? `${settings.fileName.trim()}.pdf` : 'converted-document.pdf';
      const result = await generatePdf(images, settings, (prog) => {
        setConversionProgress(prog);
      });

      setConversionResult({
        blob: result.blob,
        url: result.url,
        fileName: outputName,
        fileSize: result.fileSize,
        pageCount: result.pageCount,
        generatedAt: new Date(),
      });
    } catch (err: any) {
      alert(err.message || 'An error occurred during PDF conversion.');
      setConversionProgress({
        isConverting: false,
        current: 0,
        total: 0,
        percent: 0,
        statusText: '',
      });
    }
  };

  const handleReset = () => {
    if (conversionResult?.url) {
      URL.revokeObjectURL(conversionResult.url);
    }
    setConversionResult(null);
    setConversionProgress({
      isConverting: false,
      current: 0,
      total: 0,
      percent: 0,
      statusText: '',
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-slate-900 font-sans">
      {/* 1. Navigation Header */}
      <Header
        onOpenModal={(modal) => setActiveModal(modal)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* AdSense Placement 1: Top Banner Ad (Below Header, Above Tool) */}
          <AdPlaceholder type="top-banner" />

          {/* 2. Hero Section */}
          <HeroSection />

          {/* 3. The Core Tool Interface */}
          <section id="tool" className="mt-8 mb-12 scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Main Tool Area */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white border border-violet-100/90 rounded-3xl p-5 sm:p-8 shadow-md">
                  {/* Dropzone */}
                  <ImageDropzone
                    onImagesAdded={handleImagesAdded}
                    hasImages={images.length > 0}
                  />

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <ImagePreviewGrid
                      images={images}
                      onRotate={handleRotate}
                      onDelete={handleDelete}
                      onMove={handleMove}
                      onClearAll={handleClearAll}
                    />
                  )}

                  {/* AdSense Placement 3: In-Tool Ad (Between preview area and convert button) */}
                  <AdPlaceholder type="in-tool" />

                  {/* PDF Customization Settings */}
                  {images.length > 0 && (
                    <PdfSettingsPanel
                      settings={settings}
                      onChange={handleSettingsChange}
                    />
                  )}

                  {/* Convert Action Bar */}
                  {images.length > 0 ? (
                    <ConvertActionBar
                      images={images}
                      isConverting={conversionProgress.isConverting}
                      onConvert={handleConvert}
                    />
                  ) : (
                    <div className="text-center py-4 text-xs text-slate-400">
                      Upload one or more images above to enable conversion settings and preview.
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Area (Desktop Ad + Fast Tips) */}
              <div className="lg:col-span-4 space-y-6">
                {/* AdSense Placement 2: Sidebar Ad (Visible on desktop, hidden on mobile) */}
                <div className="hidden lg:block">
                  <AdPlaceholder type="sidebar" />
                </div>

                {/* Privacy & Fast Tips Widget */}
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50/50 border border-violet-100 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-violet-900 font-bold text-sm mb-3">
                    <Shield className="w-4 h-4 text-violet-700" />
                    <span>Instant Client Privacy</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Your images are never uploaded to any cloud server or database. All PDF pages are rendered directly in your browser using client-side JavaScript.
                  </p>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Zero network delay & instant save</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                      <span>Mix JPG, PNG & WEBP seamlessly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>Custom A4, Letter & Fit-to-image sizes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SEO Content Section (How to use & Why choose our tool) */}
          <SeoHowToSection />

          {/* 5. Editorial Guides & Articles (For SEO & AdSense value) */}
          <BlogArticlesSection />

          {/* 6. FAQ Section */}
          <FaqSection />

          {/* AdSense Placement 4: Bottom Content Ad (Below FAQ section) */}
          <AdPlaceholder type="bottom-content" />
        </div>
      </main>

      {/* Conversion Progress & Preview Modal */}
      <ConversionModal
        progress={conversionProgress}
        result={conversionResult}
        onClose={() => setConversionResult(null)}
        onReset={handleReset}
      />

      {/* Legal & Informational Modals */}
      <LegalModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* 7. Footer */}
      <Footer
        onOpenModal={(modal) => setActiveModal(modal)}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}
