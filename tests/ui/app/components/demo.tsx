'use client';

import {useState} from 'react';

import pdfToImages from 'pdf-to-images-browser';

export default function Demo() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    completed: number;
    total: number;
  } | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      setImages([]);
      setProgress(null);

      await pdfToImages(file, {
        format: 'png',
        output: 'dataurl',
        scale: 1.5,
        batchSize: 3, // Process 3 pages at a time
        batchDelay: 50, // 50ms delay between batches
        onProgress: ({completed, total, batch}) => {
          setProgress({completed, total});
          // Append new batch of images
          setImages(prev => [...prev, ...(batch as string[])]);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF');
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col items-center gap-4">
        <label
          htmlFor="pdf-upload"
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
          Select PDF
          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {loading && (
          <div className="text-gray-600 dark:text-gray-400">
            {progress
              ? `Converting pages ${progress.completed} of ${progress.total}...`
              : 'Preparing PDF conversion...'}
          </div>
        )}

        {error && <div className="text-red-500 dark:text-red-400">{error}</div>}
      </div>

      {images.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-medium">
                Page {index + 1}
              </div>
              <img
                src={image}
                alt={`Page ${index + 1}`}
                className="max-w-full h-auto rounded"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
