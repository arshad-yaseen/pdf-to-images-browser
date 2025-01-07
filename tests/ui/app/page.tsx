'use client';

import dynamic from 'next/dynamic';

const Demo = dynamic(() => import('./components/demo'), {ssr: false});

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Demo />
    </div>
  );
}
