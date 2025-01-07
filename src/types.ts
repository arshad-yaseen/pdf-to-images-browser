import type {DocumentInitParameters} from 'pdfjs-dist/types/src/display/api';

/**
 * Configuration options for converting PDF to images.
 */
export type PDFToImagesOptions = {
  /**
   * Output image format - either PNG or JPEG
   * @default 'png'
   */
  format?: 'png' | 'jpg';
  /**
   * Scale factor for the output images. Default is 1.0
   * @default 1.0
   */
  scale?: number;
  /**
   * Which pages to convert. Can be 'all', 'first', 'last', a page number, array of numbers, or range
   * @example
   * // Convert all pages
   * pages: 'all'
   * // Convert only first page
   * pages: 'first'
   * // Convert only last page
   * pages: 'last'
   * // Convert specific page
   * pages: 2
   * // Convert multiple specific pages
   * pages: [1, 3, 5]
   * // Convert range of pages
   * pages: { start: 1, end: 5 }
   * @default 'all'
   */
  pages?: PDFPageSelection;
  /**
   * Desired output format of the converted images
   * @default 'base64'
   */
  output?: 'buffer' | 'base64' | 'blob' | 'dataurl';
  /** Additional PDF document parameters */
  docParams?: PDFDocumentParams;
};

/**
 * Result type for PDF to images conversion.
 * Returns an array where each element can be a string (base64/dataURL),
 * Blob, or ArrayBuffer depending on the output option.
 */
export type PDFToImagesResult = (string | Blob | ArrayBuffer)[];

/** Parameters for configuring PDF document loading */
export type PDFDocumentParams = Omit<DocumentInitParameters, 'data' | 'url'>;

/**
 * Specifies which pages to process from a PDF document.
 * Can be 'first', 'last', 'all', a specific page number,
 * an array of page numbers, or a range with start/end.
 */
export type PDFPageSelection =
  | {
      start?: number;
      end?: number;
    }
  | 'first'
  | 'last'
  | 'all'
  | number
  | number[];

/**
 * Supported input types for PDF source documents.
 * Can be a string (base64/URL), URL object, ArrayBuffer, or File.
 */
export type PDFSource = string | URL | ArrayBuffer | File;
