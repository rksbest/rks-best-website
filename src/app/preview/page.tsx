'use client';

import FloatingLines from '@/components/FloatingLines';

export default function PreviewPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <FloatingLines 
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-4xl font-bold text-white mb-4">FloatingLines Background</h1>
          <p className="text-lg text-gray-300">Move your mouse to see the parallax effect</p>
        </div>
      </div>
    </div>
  );
}
