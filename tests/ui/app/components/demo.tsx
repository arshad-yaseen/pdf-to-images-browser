'use client';

import {useState} from 'react';

import pdfToImages from 'pdf-to-images-browser';

export default function Demo() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const imageResults = await pdfToImages(file, {
        format: 'png',
        output: 'dataurl',
      });

      setImages(imageResults as string[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col items-center gap-4">
        <label
          htmlFor="pdf-upload"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
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
          <div className="text-gray-600">Converting PDF to images...</div>
        )}

        {error && <div className="text-red-500">{error}</div>}
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Converted Images ({images.length})
          </h2>
          <div className="grid gap-4">
            {images.map((image, index) => (
              <div key={index} className="border rounded-lg p-4">
                <img
                  src={image}
                  alt={`Page ${index + 1}`}
                  className="max-w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
