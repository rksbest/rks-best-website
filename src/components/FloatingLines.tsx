'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingLinesProps {
  enabledWaves?: ('top' | 'middle' | 'bottom')[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  bendRadius?: number;
  bendStrength?: number;
  interactive?: boolean;
  parallax?: boolean;
}

export default function FloatingLines({
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = 5,
  lineDistance = 5,
  bendRadius = 5,
  bendStrength = -0.5,
  interactive = true,
  parallax = true,
}: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const getLineCount = (index: number) =>
      Array.isArray(lineCount) ? lineCount[index] : lineCount;
    const getLineDistance = (index: number) =>
      Array.isArray(lineDistance) ? lineDistance[index] : lineDistance;

    const drawWave = (waveY: number, waveIndex: number, amplitude: number) => {
      const count = getLineCount(waveIndex);
      const distance = getLineDistance(waveIndex);

      for (let i = 0; i < count; i++) {
        const startX = i * distance * 40;
        const points: { x: number; y: number }[] = [];

        for (let x = startX; x < startX + distance * 40; x += 5) {
          const offset = parallax ? (mouseRef.current.x / canvas.width) * 20 : 0;
          const y =
            waveY +
            Math.sin((x + timeRef.current * 2 + offset) / bendRadius) *
              bendStrength *
              amplitude;
          points.push({ x, y });
        }

        ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 + waveIndex * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let j = 1; j < points.length; j++) {
            const xc = (points[j - 1].x + points[j].x) / 2;
            const yc = (points[j - 1].y + points[j].y) / 2;
            ctx.quadraticCurveTo(points[j - 1].x, points[j - 1].y, xc, yc);
          }
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(13, 17, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.016;

      if (enabledWaves.includes('top')) {
        drawWave(100, 0, 30);
      }
      if (enabledWaves.includes('middle')) {
        drawWave(canvas.height / 2, 1, 40);
      }
      if (enabledWaves.includes('bottom')) {
        drawWave(canvas.height - 100, 2, 30);
      }

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (interactive) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [enabledWaves, bendRadius, bendStrength, interactive, parallax, lineCount, lineDistance]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
