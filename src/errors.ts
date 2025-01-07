export class PDFToImagesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PDFToImagesError';
  }
}

export class BrowserEnvironmentError extends PDFToImagesError {
  constructor() {
    super('This library requires a browser environment');
  }
}

export class InvalidPagesOptionError extends PDFToImagesError {
  constructor() {
    super('Invalid pages option');
  }
}

export class InvalidOutputOptionError extends PDFToImagesError {
  constructor() {
    super('Invalid output option');
  }
}

export class CanvasRenderingError extends PDFToImagesError {
  constructor() {
    super('Canvas toBlob failed');
  }
}
