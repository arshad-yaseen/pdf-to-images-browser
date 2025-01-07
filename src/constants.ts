import type {PDFToImagesOptions} from './types';

export const DEFAULT_PDF_TO_IMAGES_OPTIONS: PDFToImagesOptions = {
  format: 'png',
  output: 'base64',
  pages: 'all',
  scale: 1.0,
};
