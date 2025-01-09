[![npm version](https://img.shields.io/npm/v/pdf-to-images-browser.svg)](https://www.npmjs.com/package/pdf-to-images-browser)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

# PDF to Images Browser

A lightweight, browser-based library for converting PDF files to images with ease. Built with PDF.js, this package provides a simple yet powerful API to transform PDF documents into high-quality PNG or JPEG images.

## Features

- 🔌 Just plug and play - no setup or configuration needed
- 🌐 Browser-only implementation with zero server dependencies
- 🎯 Works out of the box - all complexity handled internally
- 🖼️ Automatic worker initialization and bundling
- 💪 Built-in canvas rendering and image conversion
- 🎨 Smart defaults that just work
- 📦 Multiple output formats (PNG/JPEG) and types (base64, buffer, blob, dataURL)
- ⚡ Convert specific pages or page ranges
- 🛡️ Robust error handling and TypeScript support
- 🧠 Super memory efficient with batch processing and cleanup

[Demo](https://pdf-to-images-browser.arshadyaseen.com/)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Main Function](#main-function)
  - [Parameters](#parameters)
- [Converting Specific Pages](#converting-specific-pages)
- [Using Different Output Formats](#using-different-output-formats)
- [Using Batch Processing](#using-batch-processing)
- [Error Handling](#error-handling)
- [Browser Compatibility](#browser-compatibility)
- [Performance Limits](#performance-limits)
- [Server-side usage](#server-side-usage)
  - [Next.js Usage](#nextjs-usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install pdf-to-images-browser
```

## Quick Start

```typescript
import pdfToImages from 'pdf-to-images-browser';

// Convert PDF file to images
const handlePDFConversion = async (file: File) => {
  try {
    const images = await pdfToImages(file, {
      format: 'png',
      output: 'dataurl',
    });

    console.log(`Converted ${images.length} pages`);
  } catch (error) {
    console.error('Conversion failed:', error);
  }
};
```

## API Reference

### Main Function

```typescript
pdfToImages(source: PDFSource, options?: PDFToImagesOptions): Promise<PDFToImagesResult>
```

### Parameters

#### `source: PDFSource`

The PDF document to convert. Accepts:

- `File` object
- URL string
- Base64 string
- ArrayBuffer
- URL object

#### `options: PDFToImagesOptions`

Optional configuration object with the following properties:

| Option       | Type                                          | Default     | Description                          |
| ------------ | --------------------------------------------- | ----------- | ------------------------------------ |
| `format`     | `'png' \| 'jpg'`                              | `'png'`     | Output image format                  |
| `scale`      | `number`                                      | `1.0`       | Scale factor for the output images   |
| `pages`      | `PDFPageSelection`                            | `'all'`     | Which pages to convert               |
| `output`     | `'buffer' \| 'base64' \| 'blob' \| 'dataurl'` | `'base64'`  | Output format                        |
| `docParams`  | `PDFDocumentParams`                           | `undefined` | Additional PDF.js parameters         |
| `batchSize`  | `number`                                      | `3`         | Number of pages to process per batch |
| `batchDelay` | `number`                                      | `100`       | Delay in ms between batches          |
| `onProgress` | `function`                                    | `undefined` | Progress callback function           |

### Page Selection Options

The `pages` option accepts various formats:

```typescript
// Convert all pages
pages: 'all'

// Convert only first page
pages: 'first'

// Convert only last page
pages: 'last'

// Convert specific page
pages: 2

// Convert multiple specific pages
pages: [1, 3, 5]

// Convert range of pages
pages: { start: 1, end: 5 }
```

## Examples

### Basic Usage with File Input

```typescript
import pdfToImages from 'pdf-to-images-browser';

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const images = await pdfToImages(file, {
      format: 'png',
      output: 'dataurl',
    });

    // Display images
    images.forEach((imageUrl, index) => {
      const img = document.createElement('img');
      img.src = imageUrl as string;
      document.body.appendChild(img);
    });
  } catch (error) {
    console.error('Conversion failed:', error);
  }
};
```

### Converting Specific Pages

```typescript
// Convert only pages 1, 3, and 5
const images = await pdfToImages(pdfFile, {
pages: [1, 3, 5],
format: 'jpg',
scale: 1.5
});

// Convert a range of pages
const images = await pdfToImages(pdfFile, {
pages: { start: 1, end: 5 },
output: 'blob'
});
```

### Using Different Output Formats

```typescript
// Get base64 strings
const base64Images = await pdfToImages(pdfFile, {
  output: 'base64',
});

// Get Blob objects
const blobImages = await pdfToImages(pdfFile, {
  output: 'blob',
});

// Get ArrayBuffer objects
const bufferImages = await pdfToImages(pdfFile, {
  output: 'buffer',
});
```

### Progress Tracking

```typescript
const images = await pdfToImages(pdfFile, {
  onProgress: ({completed, total, batch}) => {
    console.log(`Processed ${completed} of ${total} pages`);
    // Handle new batch of images if needed
    batch.forEach(image => {
      // Process each image in the batch
    });
  },
});
```

## Error Handling

The library throws specific errors that you can catch and handle:

```typescript
import pdfToImages from 'pdf-to-images-browser';

try {
  const images = await pdfToImages(file);
} catch (error) {
  if (error.name === 'PDFToImagesError') {
    // Handle specific PDF conversion errors
    console.error('PDF conversion error:', error.message);
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
```

## Browser Compatibility

This library works in all modern browsers that support the Canvas API and PDF.js:

## Performance Limits

The PDF to Images conversion process is constrained by browser limitations and available system resources. Here are the recommended limits for optimal performance:

| Resource        | Recommended Limit | Maximum Limit | Notes                                |
| --------------- | ----------------- | ------------- | ------------------------------------ |
| File Size       | 100MB             | 200MB         | Browser memory constraints           |
| Page Count      | 100 pages         | 200-300 pages | Depends on content complexity        |
| Page Dimensions | 5000x5000px       | 8192x8192px   | Browser canvas limits                |
| Scale Factor    | 2.0               | 4.0           | Memory usage increases quadratically |

## Server-side usage

This library only works in browser environments. Attempting to use it in Node.js or other server-side environments will throw a `BrowserEnvironmentError`.

### Next.js Usage

For Next.js applications, you need to use dynamic imports with SSR disabled to prevent server-side execution errors.

Create a separate component, e.g. `PDFConverter.tsx`, including the 'use client' directive, and then use it in your pages like this:

```typescript
"use client";

import dynamic from 'next/dynamic';

const PDFConverter = dynamic(() => import('./PDFConverter'), {
  ssr: false,
});

export default function Page() {
  return <PDFConverter />;
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
