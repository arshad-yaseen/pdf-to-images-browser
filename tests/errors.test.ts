import {describe, expect, it} from 'vitest';

import {
  BrowserEnvironmentError,
  CanvasRenderingError,
  InvalidOutputOptionError,
  InvalidPagesOptionError,
  PDFToImagesError,
} from '../src/errors';

describe('errors', () => {
  describe('PDFToImagesError', () => {
    it('should create error with correct name and message', () => {
      const error = new PDFToImagesError('Test error');
      expect(error.name).toBe('PDFToImagesError');
      expect(error.message).toBe('Test error');
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('BrowserEnvironmentError', () => {
    it('should create error with correct message', () => {
      const error = new BrowserEnvironmentError();
      expect(error.message).toBe('This library requires a browser environment');
      expect(error).toBeInstanceOf(PDFToImagesError);
    });
  });

  describe('InvalidPagesOptionError', () => {
    it('should create error with correct message', () => {
      const error = new InvalidPagesOptionError();
      expect(error.message).toBe('Invalid pages option');
      expect(error).toBeInstanceOf(PDFToImagesError);
    });
  });

  describe('InvalidOutputOptionError', () => {
    it('should create error with correct message', () => {
      const error = new InvalidOutputOptionError();
      expect(error.message).toBe('Invalid output option');
      expect(error).toBeInstanceOf(PDFToImagesError);
    });
  });

  describe('CanvasRenderingError', () => {
    it('should create error with correct message', () => {
      const error = new CanvasRenderingError();
      expect(error.message).toBe('Canvas toBlob failed');
      expect(error).toBeInstanceOf(PDFToImagesError);
    });
  });
});
