"use client";

import { useState, useEffect, memo, useRef } from 'react';
import VariableProximity from './variable-proximity';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import RotatingText from './RotatingText';
import AnimatedRiseKeepShine from './AnimatedRiseKeepShine';


const HeroContent = () => {
    const [titleCompletelyTyped, setTitleCompletelyTyped] = useState(true);
    
    const tagline = "Gratitude Universe Forever";
    const [displayedTagline, setDisplayedTagline] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingPeriod = 150;

    const heroContainerRef = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
        if (!titleCompletelyTyped) return;

        const handleTyping = () => {
            const fullText = tagline;
            if (isDeleting) {
                setDisplayedTagline(current => fullText.substring(0, current.length - 1));
                if (displayedTagline.length === 1) {
                    setIsDeleting(false);
                }
            } else {
                setDisplayedTagline(current => fullText.substring(0, current.length + 1));
                if (displayedTagline.length === fullText.length) {
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            }
        };

        const ticker = setInterval(handleTyping, typingPeriod);

        return () => { clearInterval(ticker) };
    }, [displayedTagline, isDeleting, titleCompletelyTyped]);

    
    return (
        <div ref={heroContainerRef} className="relative flex flex-col items-center justify-center text-center z-10 pointer-events-none w-full h-full p-4">
            <div className="flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center mb-4">
                    <h1 className="flex flex-col sm:flex-row items-center font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
                        
                        <div className="flex items-baseline pointer-events-auto">
                           <span className="text-foreground mr-2">RK</span>
                           <div className="bg-[#1877F2] text-white rounded-lg px-4 py-2">
                                <RotatingText
                                    texts={[ "Sharma", "Solicitors", "Solutions", "Services" ]}
                                    mainClassName="text-white"
                                    staggerDuration={0.08}
                                    animatePresenceMode="wait"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mt-4 sm:mt-0">
                            <span className="relative transition-all duration-300 hover:scale-105 pointer-events-auto">
                                <VariableProximity
                                    label=".Best"
                                    fromFontVariationSettings="'wght' 400"
                                    toFontVariationSettings="'wght' 900"
                                    containerRef={heroContainerRef}
                                    radius={200}
                                    className="animate-rainbow-flow bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent ml-2"
                                    style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                />
                            </span>
                            <div className="ml-3 pointer-events-auto">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg cursor-default animate-badge-glow">
                                                <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                                                <path d="M17.273 8.38542L10.398 15.2604L7.72797 12.5904" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>VVIP</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </h1>
                </div>

                {titleCompletelyTyped && (
                  <>
                    <p className="font-body text-lg md:text-2xl text-gray-300 h-8 min-w-[1px]">
                        {displayedTagline}
                        <span className="inline-block w-[2px] h-6 bg-accent animate-pulse ml-1 translate-y-1"></span>
                    </p>
                    <div className="mt-8">
                      <p className="font-body text-sm md:text-lg text-gray-400 mb-4">
                        Below is a message for you:
                      </p>
                      <div className="text-xl md:text-3xl font-bold">
                        <AnimatedRiseKeepShine />
                      </div>
                    </div>
                  </>
                )}
            </div>
        </div>
    );
};

export default HeroContent;
