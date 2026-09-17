import { jsPDF } from 'jspdf';
import { UploadedImage, PdfSettings, ConversionProgress } from '../types';

// Standard paper dimensions in millimeters
const PAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
  legal: { width: 215.9, height: 355.6 },
};

const MARGIN_SIZES: Record<string, number> = {
  none: 0,
  small: 8,
  normal: 15,
};

/**
 * Loads an image and renders it to an HTMLCanvasElement respecting rotation.
 * Returns a high-quality data URL and the natural/rotated dimensions.
 */
async function processImageToCanvas(
  imageItem: UploadedImage,
  quality: number
): Promise<{ dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const rotation = ((imageItem.rotation % 360) + 360) % 360;
      const is90or270 = rotation === 90 || rotation === 270;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to create canvas context'));
        return;
      }

      if (is90or270) {
        canvas.width = img.naturalHeight;
        canvas.height = img.naturalWidth;
      } else {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx.restore();

      // Output as JPEG or PNG based on alpha / quality
      const isPngOrHasAlpha = imageItem.type === 'image/png' && quality >= 0.95;
      const mimeType = isPngOrHasAlpha ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mimeType, quality);

      resolve({
        dataUrl,
        width: canvas.width,
        height: canvas.height,
      });
    };

    img.onerror = () => {
      reject(new Error(`Could not load image ${imageItem.name}`));
    };

    img.src = imageItem.previewUrl;
  });
}

/**
 * Generates a single PDF containing all provided images with user settings.
 */
export async function generatePdf(
  images: UploadedImage[],
  settings: PdfSettings,
  onProgress?: (progress: ConversionProgress) => void
): Promise<{ blob: Blob; url: string; fileSize: number; pageCount: number }> {
  if (!images.length) {
    throw new Error('Please add at least one image to convert.');
  }

  const total = images.length;
  onProgress?.({
    isConverting: true,
    current: 0,
    total,
    percent: 5,
    statusText: 'Initializing PDF document...',
  });

  // Small delay for UI smoothness
  await new Promise((r) => setTimeout(r, 100));

  let pdfDoc: jsPDF | null = null;
  const marginMm = MARGIN_SIZES[settings.margin] ?? 0;

  for (let i = 0; i < images.length; i++) {
    const item = images[i];

    onProgress?.({
      isConverting: true,
      current: i + 1,
      total,
      percent: Math.round(((i + 0.3) / total) * 90) + 5,
      statusText: `Processing image ${i + 1} of ${total}: ${item.name}...`,
    });

    const processed = await processImageToCanvas(item, settings.quality);

    // Determine page width and height
    let pageWidth: number;
    let pageHeight: number;
    let orientation: 'p' | 'l' = 'p';

    if (settings.pageSize === 'fit') {
      // Custom page dimensions matching the image aspect ratio
      const dpi = 96; // Standard screen DPI conversion to mm (1 inch = 25.4mm)
      const mmPerPx = 25.4 / dpi;
      const rawWidthMm = processed.width * mmPerPx;
      const rawHeightMm = processed.height * mmPerPx;

      // Scale to manageable mm boundaries (e.g., max 400mm)
      const maxDim = 350;
      const scale = Math.min(1, maxDim / Math.max(rawWidthMm, rawHeightMm));

      pageWidth = (rawWidthMm * scale) + (marginMm * 2);
      pageHeight = (rawHeightMm * scale) + (marginMm * 2);
      orientation = pageWidth >= pageHeight ? 'l' : 'p';
    } else {
      const standardSize = PAGE_DIMENSIONS[settings.pageSize] || PAGE_DIMENSIONS.a4;
      
      if (settings.orientation === 'auto') {
        if (processed.width > processed.height) {
          orientation = 'l';
          pageWidth = Math.max(standardSize.width, standardSize.height);
          pageHeight = Math.min(standardSize.width, standardSize.height);
        } else {
          orientation = 'p';
          pageWidth = Math.min(standardSize.width, standardSize.height);
          pageHeight = Math.max(standardSize.width, standardSize.height);
        }
      } else if (settings.orientation === 'landscape') {
        orientation = 'l';
        pageWidth = Math.max(standardSize.width, standardSize.height);
        pageHeight = Math.min(standardSize.width, standardSize.height);
      } else {
        orientation = 'p';
        pageWidth = Math.min(standardSize.width, standardSize.height);
        pageHeight = Math.max(standardSize.width, standardSize.height);
      }
    }

    // Initialize or add page
    if (i === 0) {
      pdfDoc = new jsPDF({
        orientation,
        unit: 'mm',
        format: settings.pageSize === 'fit' ? [pageWidth, pageHeight] : [pageWidth, pageHeight],
        compress: true,
      });
    } else if (pdfDoc) {
      pdfDoc.addPage([pageWidth, pageHeight], orientation);
    }

    if (!pdfDoc) continue;

    // Calculate drawing dimensions with margins
    const printableWidth = Math.max(10, pageWidth - (marginMm * 2));
    const printableHeight = Math.max(10, pageHeight - (marginMm * 2));

    let imgDrawWidth: number;
    let imgDrawHeight: number;
    let imgDrawX: number;
    let imgDrawY: number;

    const imgAspect = processed.width / processed.height;
    const printableAspect = printableWidth / printableHeight;

    if (settings.imageFit === 'fill') {
      imgDrawWidth = printableWidth;
      imgDrawHeight = printableHeight;
      imgDrawX = marginMm;
      imgDrawY = marginMm;
    } else if (settings.imageFit === 'original') {
      // Convert px to mm
      const mmPerPx = 25.4 / 96;
      const naturalWidthMm = processed.width * mmPerPx;
      const naturalHeightMm = processed.height * mmPerPx;
      
      if (naturalWidthMm <= printableWidth && naturalHeightMm <= printableHeight) {
        imgDrawWidth = naturalWidthMm;
        imgDrawHeight = naturalHeightMm;
      } else {
        // Fallback to contain if original exceeds printable area
        if (imgAspect > printableAspect) {
          imgDrawWidth = printableWidth;
          imgDrawHeight = printableWidth / imgAspect;
        } else {
          imgDrawHeight = printableHeight;
          imgDrawWidth = printableHeight * imgAspect;
        }
      }
      imgDrawX = marginMm + (printableWidth - imgDrawWidth) / 2;
      imgDrawY = marginMm + (printableHeight - imgDrawHeight) / 2;
    } else {
      // Standard: 'contain' (proportional, no crop, no stretch)
      if (imgAspect > printableAspect) {
        imgDrawWidth = printableWidth;
        imgDrawHeight = printableWidth / imgAspect;
      } else {
        imgDrawHeight = printableHeight;
        imgDrawWidth = printableHeight * imgAspect;
      }
      imgDrawX = marginMm + (printableWidth - imgDrawWidth) / 2;
      imgDrawY = marginMm + (printableHeight - imgDrawHeight) / 2;
    }

    const format = processed.dataUrl.startsWith('data:image/png') ? 'PNG' : 'JPEG';
    pdfDoc.addImage(
      processed.dataUrl,
      format,
      imgDrawX,
      imgDrawY,
      imgDrawWidth,
      imgDrawHeight,
      undefined,
      'FAST'
    );
  }

  onProgress?.({
    isConverting: true,
    current: total,
    total,
    percent: 98,
    statusText: 'Finalizing PDF output & compressing...',
  });

  await new Promise((r) => setTimeout(r, 80));

  if (!pdfDoc) {
    throw new Error('Failed to generate PDF document');
  }

  const pdfBlob = pdfDoc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  onProgress?.({
    isConverting: false,
    current: total,
    total,
    percent: 100,
    statusText: 'Conversion complete!',
  });

  return {
    blob: pdfBlob,
    url: pdfUrl,
    fileSize: pdfBlob.size,
    pageCount: total,
  };
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
