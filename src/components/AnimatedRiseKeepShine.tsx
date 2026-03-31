"use client";

import { useEffect, useState } from 'react';

const AnimatedRiseKeepShine = () => {
  const text = "Rise. Keep. Shine";
  const [animation, setAnimation] = useState<string>('fadeInUp');
  const [colorScheme, setColorScheme] = useState<string[]>([]);

  const animations = [
    'fadeInUp',
    'slideInLeft',
    'slideInRight',
    'bounceIn',
    'rotateIn',
    'zoomIn',
    'fadeInDown',
  ];

  const colorPalettes = [
    ['#FF6B6B', '#4ECDC4'], // Red, Teal
    ['#FFD93D', '#6BCB77'], // Yellow, Green
    ['#4D96FF', '#FF6B9D'], // Blue, Pink
    ['#FF8C42', '#7C3AED'], // Orange, Purple
    ['#00D4FF', '#FF006E'], // Cyan, Magenta
    ['#FB5607', '#FFBE0B'], // Orange, Gold
    ['#8338EC', '#FF006E'], // Purple, Pink
    ['#3A86FF', '#FB5607'], // Blue, Orange
  ];

  useEffect(() => {
    // Randomize animation and colors on mount and at intervals
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    
    setAnimation(randomAnimation);
    setColorScheme(randomPalette);

    // Change animation and colors every 4 seconds
    const interval = setInterval(() => {
      const newAnimation = animations[Math.floor(Math.random() * animations.length)];
      const newPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      setAnimation(newAnimation);
      setColorScheme(newPalette);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getAnimationClass = (animationType: string) => {
    const animationMap: Record<string, string> = {
      fadeInUp: 'animate-fade-in-up',
      slideInLeft: 'animate-slide-in-left',
      slideInRight: 'animate-slide-in-right',
      bounceIn: 'animate-bounce-in',
      rotateIn: 'animate-rotate-in',
      zoomIn: 'animate-zoom-in',
      fadeInDown: 'animate-fade-in-down',
    };
    return animationMap[animationType] || 'animate-fade-in-up';
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      const isFirstLetterOfWord = index === 0 || (index > 0 && text[index - 1] === ' ') || (index > 0 && text[index - 1] === '.');
      const color = isFirstLetterOfWord && colorScheme[0] ? colorScheme[0] : colorScheme[1] || '#FFF';

      return (
        <span
          key={index}
          style={{ color }}
          className={`inline-block transition-colors duration-500 ${getAnimationClass(animation)}`}
          style={{
            animationDelay: `${index * 0.05}s`,
            color,
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotate-in {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }

        .animate-rotate-in {
          animation: rotate-in 0.6s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoom-in 0.6s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }
      `}</style>
      <div className={getAnimationClass(animation)}>
        {renderText()}
      </div>
    </div>
  );
};

export default AnimatedRiseKeepShine;
