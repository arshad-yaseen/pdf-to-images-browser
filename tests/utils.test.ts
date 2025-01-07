import {describe, expect, it} from 'vitest';

import {
  configurePDFToImagesParameters,
  extractBase64FromDataURL,
  generatePDFPageRange,
} from '../src/utils';

describe('utils', () => {
  describe('extractBase64FromDataURL', () => {
    it('should extract base64 data from data URL', () => {
      const dataURL =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      const result = extractBase64FromDataURL(dataURL);
      expect(result).toBe(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      );
    });
  });

  describe('generatePDFPageRange', () => {
    it('should generate correct page range', () => {
      expect(generatePDFPageRange(1, 3)).toEqual([1, 2, 3]);
      expect(generatePDFPageRange(2, 4)).toEqual([2, 3, 4]);
      expect(generatePDFPageRange(1, 1)).toEqual([1]);
    });

    it('should handle invalid ranges by returning empty array', () => {
      expect(generatePDFPageRange(3, 1)).toEqual([]);
    });
  });

  describe('configurePDFToImagesParameters', () => {
    it('should configure parameters for ArrayBuffer source', () => {
      const buffer = new ArrayBuffer(8);
      const result = configurePDFToImagesParameters(buffer);

      expect(result.documentParams).toHaveProperty('data', buffer);
      expect(result.opts).toEqual({
        format: 'png',
        output: 'base64',
        pages: 'all',
        scale: 1.0,
      });
    });

    it('should configure parameters for File source', () => {
      const file = new File(['test'], 'test.pdf', {type: 'application/pdf'});
      const result = configurePDFToImagesParameters(file);

      expect(result.documentParams.url).toMatch(/^blob:/);
      expect(result.opts).toEqual({
        format: 'png',
        output: 'base64',
        pages: 'all',
        scale: 1.0,
      });
    });

    it('should configure parameters for URL source', () => {
      const url = 'https://example.com/test.pdf';
      const result = configurePDFToImagesParameters(url);

      expect(result.documentParams).toHaveProperty('url', url);
      expect(result.opts).toEqual({
        format: 'png',
        output: 'base64',
        pages: 'all',
        scale: 1.0,
      });
    });

    it('should merge custom options', () => {
      const url = 'https://example.com/test.pdf';
      const result = configurePDFToImagesParameters(url, {
        format: 'jpg',
        scale: 2.0,
        pages: 'first',
      });

      expect(result.documentParams).toHaveProperty('url', url);
      expect(result.opts).toEqual({
        format: 'jpg',
        output: 'base64',
        pages: 'first',
        scale: 2.0,
      });
    });
  });
});
