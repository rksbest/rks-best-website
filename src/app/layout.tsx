import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'RKS.Best: Gratitude Universe',
  description: 'An ultra-luxury universe for RKS.Best. Gratitude Universe Forever.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg width='256' height='256' viewBox='0 0 256 256' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='256' height='256' rx='60' fill='url(%23paint0_linear_1_18)'/><path d='M89.3766 64L64 80.2045V175.795L89.3766 192H166.623L192 175.795V80.2045L166.623 64H89.3766Z' fill='%2318181B'/><path d='M160.941 154.582C160.941 154.582 163.701 150.052 160.941 149.25C158.181 148.448 143.541 148.917 143.541 148.917L138.5 147.583L142.021 138.25L143.541 120.25L128.901 113.583L114.261 120.25L112.741 147.583L108.5 152.25L101.941 152.583C101.941 152.583 95.8612 153.25 95.0212 150.917C94.1812 148.583 95.0212 144.583 95.0212 144.583L97.0212 135.25L99.7012 118.917L114.261 106.25L128.901 103.583L143.541 106.25L157.901 118.917L160.941 144.583L160.941 154.582Z' fill='url(%23paint1_linear_1_18)'/><path d='M128.901 110.25C128.901 110.25 133.621 110.583 133.621 112.583C133.621 114.583 128.901 114.917 128.901 114.917H124.181C124.181 114.917 119.461 114.583 119.461 112.583C119.461 110.583 124.181 110.25 124.181 110.25H128.901Z' fill='url(%23paint2_linear_1_18)'/><path d='M107.465 101.205L108.5 100.25L110.276 101.427L109.803 99.4668L111.5 98.25L109.525 98.131L108.835 96.25L108.124 98.131L106.148 98.25L107.846 99.4668L107.465 101.205Z' fill='%23FFD700'/><defs><linearGradient id='paint0_linear_1_18' x1='128' y1='0' x2='128' y2='256' gradientUnits='userSpaceOnUse'><stop stop-color='white' stop-opacity='0.1'/><stop offset='1' stop-color='white' stop-opacity='0'/></linearGradient><linearGradient id='paint1_linear_1_18' x1='128.941' y1='103.583' x2='128.941' y2='154.582' gradientUnits='userSpaceOnUse'><stop stop-color='%2342A5F5'/><stop offset='1' stop-color='%231E88E5'/></linearGradient><linearGradient id='paint2_linear_1_18' x1='126.541' y1='110.25' x2='126.541' y2='114.917' gradientUnits='userSpaceOnUse'><stop stop-color='%2364B5F6'/><stop offset='1' stop-color='%2342A5F5'/></linearGradient></defs></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
