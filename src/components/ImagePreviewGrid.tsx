import React, { useState } from 'react';
import {
  RotateCw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  GripVertical,
  CheckCircle,
  FileImage,
} from 'lucide-react';
import { UploadedImage } from '../types';
import { formatBytes } from '../utils/pdfGenerator';

interface ImagePreviewGridProps {
  images: UploadedImage[];
  onRotate: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onClearAll: () => void;
}

export const ImagePreviewGrid: React.FC<ImagePreviewGridProps> = ({
  images,
  onRotate,
  onDelete,
  onMove,
  onClearAll,
}) => {
  const [zoomImage, setZoomImage] = useState<UploadedImage | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (toIndex: number) => {
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      onMove(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (images.length === 0) return null;

  return (
    <div className="mb-6">
      {/* Top Grid Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">
            Selected Images ({images.length})
          </span>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
            Total: {formatBytes(images.reduce((acc, img) => acc + img.size, 0))}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 hidden sm:inline">
            Drag cards or use arrows to change page order
          </span>
          <button
            type="button"
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {images.map((image, index) => {
          const isDraggingThis = draggedIndex === index;
          const isTargetDrop = dragOverIndex === index;

          return (
            <div
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(index)}
              className={`group relative bg-white border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-150 flex flex-col ${
                isTargetDrop
                  ? 'border-violet-600 ring-2 ring-violet-400 scale-105'
                  : 'border-slate-200 hover:border-violet-300'
              } ${isDraggingThis ? 'opacity-40' : 'opacity-100'}`}
            >
              {/* Page Number Badge */}
              <div className="absolute top-2 left-2 z-10 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <span>Page {index + 1}</span>
              </div>

              {/* Quick Delete top right */}
              <button
                type="button"
                onClick={() => onDelete(image.id)}
                title="Remove image"
                className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 hover:bg-red-600 hover:text-white text-slate-600 rounded-md shadow-xs opacity-80 hover:opacity-100 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Image Preview Container */}
              <div className="relative aspect-3/4 bg-slate-100 flex items-center justify-center p-2 overflow-hidden cursor-grab active:cursor-grabbing">
                <img
                  src={image.previewUrl}
                  alt={image.name}
                  style={{
                    transform: `rotate(${image.rotation}deg)`,
                    transition: 'transform 0.2s ease',
                  }}
                  className="max-h-full max-w-full object-contain pointer-events-none rounded"
                />

                {/* Zoom Overlay on hover */}
                <button
                  type="button"
                  onClick={() => setZoomImage(image)}
                  title="View full image"
                  className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                >
                  <span className="p-2 bg-white/90 text-slate-800 rounded-full shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>
              </div>

              {/* Card Footer / Controls */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
                <p className="font-semibold text-slate-800 truncate" title={image.name}>
                  {image.name}
                </p>
                
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{formatBytes(image.size)}</span>
                  <span>{image.rotation > 0 ? `${image.rotation}°` : '0°'}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-200/60">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => onMove(index, index - 1)}
                    title="Move Left"
                    className="p-1 text-center flex items-center justify-center bg-white hover:bg-violet-100 text-slate-700 hover:text-violet-800 border border-slate-200 rounded disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRotate(image.id)}
                    title="Rotate 90° clockwise"
                    className="p-1 text-center flex items-center justify-center bg-white hover:bg-violet-100 text-slate-700 hover:text-violet-800 border border-slate-200 rounded cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={index === images.length - 1}
                    onClick={() => onMove(index, index + 1)}
                    title="Move Right"
                    className="p-1 text-center flex items-center justify-center bg-white hover:bg-violet-100 text-slate-700 hover:text-violet-800 border border-slate-200 rounded disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-4 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileImage className="w-5 h-5 text-violet-600" />
                <span className="font-bold text-slate-900 text-sm truncate max-w-xs sm:max-w-md">
                  {zoomImage.name}
                </span>
                <span className="text-xs text-slate-500">
                  ({zoomImage.width} × {zoomImage.height} px)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 min-h-[300px] overflow-auto bg-slate-50 rounded-xl my-2">
              <img
                src={zoomImage.previewUrl}
                alt={zoomImage.name}
                style={{
                  transform: `rotate(${zoomImage.rotation}deg)`,
                }}
                className="max-h-[65vh] max-w-full object-contain rounded shadow-xs"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-2">
              <span>Rotation: {zoomImage.rotation}°</span>
              <button
                type="button"
                onClick={() => onRotate(zoomImage.id)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet-100 hover:bg-violet-200 text-violet-800 font-semibold rounded-lg"
              >
                <RotateCw className="w-4 h-4" />
                Rotate 90°
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
