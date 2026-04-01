'use client';

import { useRef, useEffect, FC } from 'react';

interface AnimatedWordProps {
  word: string;
  colors: string[];
  bgGradient: string;
  animationSpeed: number;
}

const AnimatedWord: FC<AnimatedWordProps> = ({ word, colors, bgGradient, animationSpeed }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const textChars = useRef<string[]>([]);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastUpdateTime = useRef(Date.now());

  const fontSize = 48;
  const charWidth = 35;
  const charHeight = 60;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'.split('');

  const getRandomChar = () => alphabet[Math.floor(Math.random() * alphabet.length)];

  const initializeText = () => {
    textChars.current = word.split('').map(() => getRandomChar());
  };

  const drawText = () => {
    if (!context.current || !canvasRef.current) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    
    ctx.clearRect(0, 0, width, height);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    textChars.current.forEach((char, index) => {
      const x = width / 2 + (index - textChars.current.length / 2 + 0.5) * charWidth;
      const y = height / 2;
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillText(char, x, y);
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    initializeText();
    drawText();
  };

  const updateText = () => {
    for (let i = 0; i < textChars.current.length; i++) {
      if (Math.random() > 0.7) {
        textChars.current[i] = getRandomChar();
      }
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastUpdateTime.current >= animationSpeed) {
      updateText();
      drawText();
      lastUpdateTime.current = now;
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d');
    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animationSpeed]);

  return (
    <div className={`relative w-full h-48 ${bgGradient} rounded-lg overflow-hidden flex items-center justify-center`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </div>
  );
};

export default function AnimatedWordsSection() {
  const words = [
    {
      word: 'SHARMA',
      colors: ['#61dca3', '#2b4539', '#61b3dc'],
      bgGradient: 'bg-gradient-to-r from-slate-900 via-green-900 to-slate-900',
      animationSpeed: 100,
    },
    {
      word: 'SOLICITORS',
      colors: ['#fbbf24', '#f59e0b', '#d97706'],
      bgGradient: 'bg-gradient-to-r from-slate-900 via-amber-900 to-slate-900',
      animationSpeed: 150,
    },
    {
      word: 'SOLUTIONS',
      colors: ['#60a5fa', '#3b82f6', '#1d4ed8'],
      bgGradient: 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900',
      animationSpeed: 120,
    },
    {
      word: 'SERVICES',
      colors: ['#f472b6', '#ec4899', '#be185d'],
      bgGradient: 'bg-gradient-to-r from-slate-900 via-pink-900 to-slate-900',
      animationSpeed: 130,
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {words.map((item, index) => (
            <AnimatedWord
              key={index}
              word={item.word}
              colors={item.colors}
              bgGradient={item.bgGradient}
              animationSpeed={item.animationSpeed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
