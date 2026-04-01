'use client';

import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DigitInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onDigitChange?: (value: string) => void;
}

export const DigitInput = React.forwardRef<HTMLInputElement, DigitInputProps>(
  ({ onDigitChange, onChange, className, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = ref || internalRef;
    const [displayValue, setDisplayValue] = React.useState('');
    const digitRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      // Animate digits when value changes
      const animateDigits = () => {
        if (typeof inputRef === 'object' && inputRef?.current) {
          const value = inputRef.current.value;
          setDisplayValue(value);

          // Animate each digit
          const digits = value.split('');
          digits.forEach((digit, index) => {
            if (digitRefs.current[index]) {
              digitRefs.current[index]!.style.animation = 'none';
              setTimeout(() => {
                if (digitRefs.current[index]) {
                  digitRefs.current[index]!.style.animation = `digit-scroll 0.3s ease-out ${index * 0.05}s`;
                }
              }, 10);
            }
          });
        }
      };

      const observer = new MutationObserver(animateDigits);
      if (typeof inputRef === 'object' && inputRef?.current) {
        observer.observe(inputRef.current, {
          attributes: true,
          attributeFilter: ['value'],
        });
      }

      return () => observer.disconnect();
    }, [inputRef]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      if (onChange) {
        onChange(e);
      }
      
      if (onDigitChange) {
        onDigitChange(value);
      }

      setDisplayValue(value);

      // Trigger digit animation
      const digits = value.split('');
      digits.forEach((digit, index) => {
        if (digitRefs.current[index]) {
          digitRefs.current[index]!.style.animation = 'none';
          setTimeout(() => {
            if (digitRefs.current[index]) {
              digitRefs.current[index]!.style.animation = `digit-scroll 0.3s ease-out ${index * 0.05}s`;
            }
          }, 10);
        }
      });
    };

    return (
      <>
        <style>{`
          @keyframes digit-scroll {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .digit-animated {
            display: inline-block;
            min-width: 0.6em;
            text-align: center;
          }
        `}</style>
        <div className="relative">
          <Input
            ref={inputRef}
            onChange={handleChange}
            className={cn(
              'pr-8 tracking-widest font-mono text-lg',
              className
            )}
            {...props}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none font-mono text-lg font-bold text-primary">
            {displayValue.split('').map((digit, index) => (
              <span
                key={index}
                ref={(el) => {
                  digitRefs.current[index] = el;
                }}
                className="digit-animated"
              >
                {digit}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }
);

DigitInput.displayName = 'DigitInput';
