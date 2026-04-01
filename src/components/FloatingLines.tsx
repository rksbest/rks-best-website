'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FloatingLinesProps {
  enabledWaves?: ('top' | 'middle' | 'bottom')[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  bendRadius?: number;
  bendStrength?: number;
  interactive?: boolean;
  parallax?: boolean;
}

export const FloatingLines: React.FC<FloatingLinesProps> = ({
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = 5,
  lineDistance = 5,
  bendRadius = 5,
  bendStrength = -0.5,
  interactive = true,
  parallax = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const wavePositions: { [key: string]: number } = { top: 0.25, middle: 0.5, bottom: 0.75 };
    const lineCountArray = Array.isArray(lineCount) ? lineCount : [lineCount, lineCount, lineCount];
    const lineDistanceArray = Array.isArray(lineDistance) ? lineDistance : [lineDistance, lineDistance, lineDistance];
    let time = 0;

    const drawWave = (
      waveType: string,
      yRatio: number,
      count: number,
      distance: number,
      index: number
    ) => {
      const baseY = canvas.height * yRatio;
      const color = `rgba(${100 + index * 50}, ${150 - index * 30}, 200, ${0.3 - index * 0.1})`;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      for (let i = 0; i < count; i++) {
        const xStart = (i / count) * canvas.width;
        ctx.beginPath();
        ctx.moveTo(xStart, baseY);

        let yOffset = Math.sin((time * 0.01 + i * 0.5) + (waveType === 'top' ? 0 : waveType === 'bottom' ? Math.PI : Math.PI / 2)) * 30;
        
        if (interactive && parallax) {
          yOffset += (mousePos.y - canvas.height / 2) * 0.05 * (index + 1) * 0.1;
        }

        for (let x = 0; x < canvas.width; x += bendRadius) {
          const waveX = xStart + x;
          const waveY = baseY + yOffset + Math.sin((waveX * 0.01 + time * 0.005)) * bendStrength * 10;
          ctx.lineTo(waveX, waveY);
        }

        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      enabledWaves.forEach((wave, index) => {
        const yRatio = wavePositions[wave];
        const count = lineCountArray[index] || lineCountArray[0];
        const distance = lineDistanceArray[index] || lineDistanceArray[0];
        drawWave(wave, yRatio, count, distance, index);
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [enabledWaves, lineCount, lineDistance, bendRadius, bendStrength, interactive, parallax, mousePos]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: 'linear-gradient(135deg, #0d1117 0%, #1a2332 100%)',
      }}
    />
  );
};

export default FloatingLines;
