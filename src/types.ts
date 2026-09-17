export interface UploadedImage {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
}

export type PageSize = 'a4' | 'letter' | 'legal' | 'fit';
export type Orientation = 'auto' | 'portrait' | 'landscape';
export type MarginSize = 'none' | 'small' | 'normal';
export type ImageFit = 'contain' | 'fill' | 'original';

export interface PdfSettings {
  pageSize: PageSize;
  orientation: Orientation;
  margin: MarginSize;
  imageFit: ImageFit;
  quality: number; // 0.5 to 1.0
  fileName: string;
}

export interface ConversionProgress {
  isConverting: boolean;
  current: number;
  total: number;
  percent: number;
  statusText: string;
}

export interface ConvertedPdfResult {
  blob: Blob;
  url: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  generatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  readTime: string;
  category: string;
  summary: string;
  date: string;
  author: string;
  content: string[];
}
