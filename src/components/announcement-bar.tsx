
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Megaphone, X, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnnouncementBarProps {
  title: string;
  url: string;
  platform: string;
}

const AnnouncementBar = ({ title, url, platform }: AnnouncementBarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  const PlatformIcon = platform === 'YouTube' ? Youtube : Megaphone;

  return (
    <div className={cn(
        "relative top-0 left-0 right-0 z-50 flex items-center justify-center gap-4 bg-gradient-to-r from-purple-500/80 via-primary/80 to-accent/80 p-3 text-sm text-primary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300",
        !isOpen && "-translate-y-full"
    )}>
      <PlatformIcon className="h-5 w-5 flex-shrink-0" />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow text-center font-medium truncate hover:underline"
      >
        <span className="hidden sm:inline">Latest on {platform}: </span>
        {title}
      </a>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 flex-shrink-0 rounded-full hover:bg-black/20"
        onClick={() => setIsOpen(false)}
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AnnouncementBar;
