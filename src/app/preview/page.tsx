'use client';

import FloatingLines from '@/components/FloatingLines';

export default function PreviewPage() {
  return (
    <div className="min-h-screen w-screen bg-background relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 w-full h-full">
        <FloatingLines 
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      {/* Content on top */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-5xl font-bold text-white mb-4">FloatingLines Background</h1>
        <p className="text-xl text-gray-300">Move your mouse to see the parallax effect</p>
      </div>
    </div>
  );
}
