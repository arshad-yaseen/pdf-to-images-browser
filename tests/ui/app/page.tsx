'use client';

import dynamic from 'next/dynamic';

const Demo = dynamic(() => import('./components/demo'), {ssr: false});

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 pb-16 gap-6 sm:p-8 md:p-12 lg:p-20">
      <div className="text-center w-full max-w-4xl px-4">
        <a
          href="https://github.com/arshad-yaseen/pdf-to-images-browser"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-4 text-sm sm:text-base text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline transition-colors break-words">
          https://github.com/arshad-yaseen/pdf-to-images-browser
        </a>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 tracking-tighter">
          pdf-to-images-browser
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert your PDF documents into high-quality images. Simply upload a
          PDF file and get image versions of each page.
        </p>
      </div>
      <Demo />
    </div>
  );
}
