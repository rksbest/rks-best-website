"use client";

import { useState, useEffect } from 'react';
import Galaxy from '@/components/galaxy';
import HeroContent from '@/components/hero-content';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { EnquiryForm } from '@/components/enquiry-form';
import { Mail } from 'lucide-react';
import AnnouncementBar from '@/components/announcement-bar';
import { getSocialStats, SocialStatsOutput } from '@/ai/flows/get-social-stats';
import LetterGlitch from '@/components/letter-glitch';
import CursorTrail from '@/components/cursor-trail';


// A self-destructing thread effect component for clicks.
const ClickEffect = ({ id, x, y, onComplete }: { id: number, x: number, y: number, onComplete: (id: number) => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => onComplete(id), 1000);
        return () => clearTimeout(timer);
    }, [id, onComplete]);

    return (
        <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute h-px bg-accent origin-left"
                    style={{
                        transform: `rotate(${i * 45}deg)`,
                        animation: `thread-burst 1s ease-out forwards`,
                    }}
                />
            ))}
        </div>
    );
};


export default function Home() {
    const [clickEffects, setClickEffects] = useState<{id: number, x: number, y: number}[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [latestPost, setLatestPost] = useState<{ title: string; url: string; platform: string } | null>(null);

    useEffect(() => {
        setIsMounted(true);
        async function fetchLatestPost() {
            try {
                const data: SocialStatsOutput = await getSocialStats();
                if (data.youtubeLatestVideos && data.youtubeLatestVideos.length > 0) {
                    const latestVideo = data.youtubeLatestVideos[0];
                    setLatestPost({
                        title: latestVideo.title,
                        url: `https://www.youtube.com/watch?v=${latestVideo.videoId}`,
                        platform: 'YouTube'
                    });
                }
            } catch (error) {
                console.error("Failed to fetch latest post for announcement bar:", error);
            }
        }
        fetchLatestPost();
    }, []);

    const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        
        const newEffect = {
            id: Math.random(),
            x: clientX,
            y: clientY,
        };
        setClickEffects(prev => [...prev, newEffect]);
    };

    const removeClickEffect = (id: number) => {
        setClickEffects(prev => prev.filter(p => p.id !== id));
    };

    if (!isMounted) {
      return null;
    }

    return (
        <>
            {latestPost && <AnnouncementBar {...latestPost} />}
            <CursorTrail />
            <main 
                className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
                onClick={handleInteraction}
                onTouchStart={handleInteraction}
            >
                <div className="absolute inset-0 -z-10 opacity-30">
                    <LetterGlitch />
                </div>
                <div className="absolute inset-0 -z-20">
                    <Galaxy 
                      mouseRepulsion={true}
                      mouseInteraction={true}
                      density={1.5}
                      glowIntensity={0.5}
                      saturation={0.8}
                      hueShift={240}
                    />
                </div>
                <HeroContent />

                {clickEffects.map(effect => (
                    <ClickEffect key={effect.id} {...effect} onComplete={removeClickEffect} />
                ))}

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="fixed bottom-6 right-6 z-20 h-20 w-20 p-0 transition-all duration-300 group"
                        >
                            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-green-blink"></span>
                            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] flex items-center justify-center">
                                {/* Front face */}
                                <div className="absolute w-full h-full flex items-center justify-center [backface-visibility:hidden]">
                                    <Mail className="w-14 h-14 transition-transform group-hover:scale-125 animate-icon-glow" />
                                </div>
                                {/* Back face */}
                                <div className="absolute w-full h-full flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary/80 rounded-lg">
                                    <p className="text-sm font-bold text-center text-primary-foreground px-1">Contact Us</p>
                                </div>
                            </div>
                            <span className="sr-only">Contact Us</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Send an Enquiry</SheetTitle>
                            <SheetDescription>
                                Have a question or a project in mind? Fill out the form below and I'll get back to you soon.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                           <EnquiryForm onFormSubmit={() => setIsSheetOpen(false)} />
                        </div>
                    </SheetContent>
                </Sheet>
            </main>
        </>
    );
}