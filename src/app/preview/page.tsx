'use client';

import FloatingLines from '@/components/FloatingLines';

export default function PreviewPage() {
  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Background animation - positioned absolutely and behind content */}
      <div className="absolute inset-0 -z-10">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
      </div>

      {/* Content on top */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-white mb-4">FloatingLines Background</h1>
        <p className="text-xl text-gray-300">Move your mouse to see the parallax effect</p>
      </div>
    </div>
  );
}
