import {GlobalWorkerOptions} from 'pdfjs-dist';

import {BrowserEnvironmentError} from './errors';

// Check if running in browser environment
if (typeof window === 'undefined') {
  throw new BrowserEnvironmentError();
}

// Set the workerSrc for pdfjsLib
if (!GlobalWorkerOptions.workerSrc) {
  GlobalWorkerOptions.workerSrc =
    'https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
}
export {pdfToImages as default} from './core';
export * from './types';
