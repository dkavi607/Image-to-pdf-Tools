import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, Plus, FolderUp, Camera } from 'lucide-react';
import { UploadedImage } from '../types';

interface ImageDropzoneProps {
  onImagesAdded: (images: UploadedImage[]) => void;
  hasImages: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImagesAdded, hasImages }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];

      const newImages: UploadedImage[] = [];

      for (const file of files) {
        if (!validImageTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|bmp|gif)$/i)) {
          continue;
        }

        const previewUrl = URL.createObjectURL(file);
        
        // Extract natural dimensions
        const { width, height } = await new Promise<{ width: number; height: number }>((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
          img.onerror = () => resolve({ width: 800, height: 600 });
          img.src = previewUrl;
        });

        newImages.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type || 'image/jpeg',
          previewUrl,
          width,
          height,
          rotation: 0,
        });
      }

      if (newImages.length > 0) {
        onImagesAdded(newImages);
      }
    },
    [onImagesAdded]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value to allow re-uploading the same file if desired
      e.target.value = '';
    }
  };

  // Listen for clipboard paste events (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) pastedFiles.push(file);
        }
      }

      if (pastedFiles.length > 0) {
        processFiles(pastedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [processFiles]);

  if (hasImages) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-violet-50/70 border border-violet-200/80 rounded-xl mb-6">
        <div className="flex items-center gap-2 text-violet-900 text-sm font-semibold">
          <FolderUp className="w-5 h-5 text-violet-700" />
          <span>Need to add more pictures to this PDF?</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
            className="hidden"
            onChange={handleFileInputChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add More Images
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-12 text-center transition-all duration-200 ${
        isDragging
          ? 'border-violet-600 bg-violet-50 scale-[1.01] shadow-lg shadow-violet-100'
          : 'border-violet-300 bg-white hover:border-violet-400 hover:bg-violet-50/30 shadow-sm'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
        className="hidden"
        onChange={handleFileInputChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div className="flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-violet-100 to-violet-50 text-violet-700 flex items-center justify-center mb-5 border border-violet-200/60 shadow-xs group">
          <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-violet-700 transition-transform group-hover:scale-110" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
          Drag & Drop your images here
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm">
          Supports <span className="font-semibold text-slate-700">JPG, PNG, WEBP</span>, and BMP. You can also paste directly with <kbd className="px-1.5 py-0.5 text-[11px] bg-slate-100 border border-slate-300 rounded font-mono text-slate-600">Ctrl+V</kbd>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Primary Action Red CTA */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg shadow-red-200 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <ImageIcon className="w-5 h-5 text-white" />
            Browse Files
          </button>

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="sm:hidden inline-flex items-center gap-2 px-4 py-3 bg-violet-100 hover:bg-violet-200 text-violet-800 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            Camera
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-medium text-slate-400">Accepted formats:</span>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">JPG / JPEG</span>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">PNG</span>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">WEBP</span>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">BMP / GIF</span>
        </div>
      </div>
    </div>
  );
};
