import {getDocument} from 'pdfjs-dist';
import type {DocumentInitParameters} from 'pdfjs-dist/types/src/display/api';

import {InvalidPagesOptionError} from './errors';
import type {PDFSource, PDFToImagesOptions, PDFToImagesResult} from './types';
import {
  configurePDFToImagesParameters,
  generatePDFPageRange,
  renderPDFPageToImage,
} from './utils';

/**
 * Converts a PDF document to an array of images with improved performance.
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
  const {batchSize = 5, batchDelay = 100, onProgress} = options;

  const pdfDoc = await getDocument(documentParams).promise;
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

  const allImages: (string | Blob | ArrayBuffer)[] = [];
  const totalPages = pageNumbers.length;

  // Process pages in batches
  for (let i = 0; i < pageNumbers.length; i += batchSize) {
    const batchPageNumbers = pageNumbers.slice(i, i + batchSize);
    const batchPromises = batchPageNumbers.map(pageNumber =>
      renderPDFPageToImage(pdfDoc, pageNumber, options),
    );

    // Process batch concurrently
    const batchResults = await Promise.all(batchPromises);

    // Clean up previous batch's canvases to free memory
    if (typeof window !== 'undefined') {
      batchPromises.length = 0;
      await new Promise(resolve => setTimeout(resolve, 0)); // Yield to GC (just a hint)
    }

    allImages.push(...batchResults);

    // Report progress if callback provided
    if (onProgress) {
      onProgress({
        completed: Math.min(i + batchSize, totalPages),
        total: totalPages,
        batch: batchResults,
      });
    }

    batchResults.length = 0;

    // Prevent UI blocking between batches
    if (i + batchSize < pageNumbers.length) {
      await new Promise(resolve => setTimeout(resolve, batchDelay));
    }
  }

  pageNumbers.length = 0;

  return allImages;
}
