import * as pdfjsLib from 'pdfjs-dist';
import type {
  DocumentInitParameters,
  PDFDocumentProxy,
} from 'pdfjs-dist/types/src/display/api';

import {
  CanvasRenderingError,
  InvalidOutputOptionError,
  InvalidPagesOptionError,
} from './errors';
import type {PDFSource, PDFToImagesOptions, PDFToImagesResult} from './types';
import {
  configurePDFToImagesParameters,
  convertPDFBase64ToBuffer,
  extractBase64FromDataURL,
  generatePDFPageRange,
} from './utils';

/**
 * Converts a PDF document to an array of images.
 * @param source - The PDF source to convert.
 * @param options - Optional configuration options for the conversion.
 * @returns A promise that resolves to an array of images.
 */
export async function pdfToImages(
  source: PDFSource,
  options?: PDFToImagesOptions,
): Promise<PDFToImagesResult> {
  const {documentParams, opts} = configurePDFToImagesParameters(
    source,
    options,
  );
  return await processPDF(documentParams, opts);
}

async function processPDF(
  documentParams: DocumentInitParameters,
  options: PDFToImagesOptions,
): Promise<(string | Blob | ArrayBuffer)[]> {
  const pdfDoc = await pdfjsLib.getDocument(documentParams).promise;
  const numPages = pdfDoc.numPages;
  const pages = options.pages || 'all';

  let pageNumbers: number[] = [];

  if (pages === 'all') {
    pageNumbers = Array.from({length: numPages}, (_, i) => i + 1);
  } else if (pages === 'first') {
    pageNumbers = [1];
  } else if (pages === 'last') {
    pageNumbers = [numPages];
  } else if (typeof pages === 'number') {
    pageNumbers = [Math.max(pages, 1)];
  } else if (Array.isArray(pages)) {
    pageNumbers = pages.length ? pages : [1];
  } else if (typeof pages === 'object') {
    const start = pages.start ?? 1;
    const end = pages.end ?? numPages;
    pageNumbers = generatePDFPageRange(start, end);
  } else {
    throw new InvalidPagesOptionError();
  }

  const images = [];
  for (const pageNumber of pageNumbers) {
    const image = await renderPageToImage(pdfDoc, pageNumber, options);
    images.push(image);
    // Yield to event loop to prevent UI blocking
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  return images;
}

async function renderPageToImage(
  pdfDoc: PDFDocumentProxy,
  pageNumber: number,
  options: PDFToImagesOptions,
): Promise<string | Blob | ArrayBuffer> {
  const {scale = 1.0, format = 'png', output = 'base64'} = options;

  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({scale});

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {canvasContext: context, viewport};

  await page.render(renderContext).promise;

  const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const dataURL = canvas.toDataURL(mimeType);

  switch (output) {
    case 'dataurl':
      return dataURL;
    case 'base64':
      return extractBase64FromDataURL(dataURL);
    case 'buffer':
      return convertPDFBase64ToBuffer(extractBase64FromDataURL(dataURL));
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
}
