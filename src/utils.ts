import type {DocumentInitParameters} from 'pdfjs-dist/types/src/display/api';

import {DEFAULT_PDF_TO_IMAGES_OPTIONS} from './constants';
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
