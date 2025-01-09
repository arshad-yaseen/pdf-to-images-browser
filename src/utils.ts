import type {
  DocumentInitParameters,
  PDFDocumentProxy,
} from 'pdfjs-dist/types/src/display/api';

import {DEFAULT_PDF_TO_IMAGES_OPTIONS} from './constants';
import {
  CanvasRenderingError,
  InvalidOutputOptionError,
  PDFDocumentNotInitializedError,
} from './errors';
import type {PDFSource, PDFToImagesOptions} from './types';

export function extractBase64FromDataURL(dataURL: string): string {
  const base64Index = dataURL.indexOf(';base64,') + ';base64,'.length;
  return dataURL.substring(base64Index);
}

export function convertPDFBase64ToBuffer(base64String: string): ArrayBuffer {
  const data = base64String.split(';base64,').pop() as string;
  const binaryString = window.atob(data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

export function generatePDFPageRange(start: number, end: number): number[] {
  const range: number[] = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}

export function configurePDFToImagesParameters(
  source: PDFSource,
  options?: PDFToImagesOptions,
) {
  const {docParams, ...rest} = {
    ...DEFAULT_PDF_TO_IMAGES_OPTIONS,
    ...options,
  };

  let documentParams: DocumentInitParameters;

  if (source instanceof ArrayBuffer) {
    documentParams = {data: source, ...docParams};
  } else if (source instanceof File) {
    const objectUrl = URL.createObjectURL(source);
    documentParams = {url: objectUrl, ...docParams};
  } else {
    documentParams = {url: source, ...docParams};
  }

  const opts: PDFToImagesOptions = {...rest};

  return {documentParams, opts};
}

export async function renderPDFPageToImage(
  pdfDoc: PDFDocumentProxy | null,
  pageNumber: number,
  options: PDFToImagesOptions,
): Promise<string | Blob | ArrayBuffer> {
  if (!pdfDoc) {
    throw new PDFDocumentNotInitializedError();
  }

  const {scale = 1.0, format = 'png', output = 'base64'} = options;

  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({scale});

  // Create canvas
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', {
    alpha: false, // Optimize for non-transparent images
  }) as CanvasRenderingContext2D;

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render PDF page
  const renderContext = {
    canvasContext: context,
    viewport,
    enableWebGL: true, // Enable WebGL rendering if available
  };

  try {
    await page.render(renderContext).promise;

    // Convert to desired format
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const result = await processCanvasOutput(canvas, mimeType, output);

    return result;
  } finally {
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();

    // Yield to GC
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

export async function processCanvasOutput(
  canvas: HTMLCanvasElement,
  mimeType: string,
  output: PDFToImagesOptions['output'],
): Promise<string | Blob | ArrayBuffer> {
  try {
    switch (output) {
      case 'dataurl':
        return canvas.toDataURL(mimeType);
      case 'base64':
        return extractBase64FromDataURL(canvas.toDataURL(mimeType));
      case 'buffer': {
        const base64 = extractBase64FromDataURL(canvas.toDataURL(mimeType));
        return convertPDFBase64ToBuffer(base64);
      }
      case 'blob':
        return new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            blob => (blob ? resolve(blob) : reject(new CanvasRenderingError())),
            mimeType,
          );
        });
      default:
        throw new InvalidOutputOptionError();
    }
  } catch (error) {
    throw new CanvasRenderingError();
  }
}
