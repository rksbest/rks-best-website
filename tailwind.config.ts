import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"PT Sans"', 'sans-serif'],
        headline: ['"Playfair Display"', 'serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(15px) rotate(5deg)' },
          '50%': { transform: 'translateY(10px) translateX(-15px) rotate(-5deg)' },
          '75%': { transform: 'translateY(-15px) translateX(20px) rotate(3deg)' },
          '100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
        },
        'rainbow-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        twinkle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
        'sunrise-arc': {
            '0%': { transform: 'translate(-10vw, 80vh) scale(0.8)', opacity: '1' },
            '50%': { transform: 'translate(50vw, 10vh) scale(1.2)', opacity: '1' },
            '100%': { transform: 'translate(110vw, 80vh) scale(0.8)', opacity: '1' },
        },
        'moon-path': {
            '0%': { transform: 'translate(-10vw, 70vh) scale(0.9)', opacity: '1' },
            '50%': { transform: 'translate(50vw, 15vh) scale(1.1)', opacity: '1' },
            '100%': { transform: 'translate(110vw, 70vh) scale(0.9)', opacity: '1' },
        },
        'thread-burst': {
          '0%': { width: '0rem', opacity: '1' },
          '70%': { width: '9rem', opacity: '1' },
          '100%': { width: '9rem', opacity: '0' },
        },
        'shooting-star': {
            '0%': { transform: 'rotate(-45deg) translateX(0)', opacity: '1' },
            '100%': { transform: 'rotate(-45deg) translateX(-150vw)', opacity: '0' },
        },
        'drift-and-break': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.7' },
          '80%': { transform: 'translate(var(--drift-x), var(--drift-y)) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translate(var(--drift-x), var(--drift-y)) scale(2.5)', opacity: '0' },
        },
        'data-stream': {
            '0%': { transform: 'translateY(-10vh)', opacity: '0' },
            '10%, 90%': { opacity: '0.7' },
            '100%': { transform: 'translateY(110vh)', opacity: '0' },
        },
        'pulse-shadow': {
            '0%': {
                boxShadow: '0 0 0 0 hsl(var(--primary) / 0.7)',
            },
            '70%': {
                boxShadow: '0 0 0 12px hsl(var(--primary) / 0)',
            },
            '100%': {
                boxShadow: '0 0 0 0 hsl(var(--primary) / 0)',
            },
        },
        'pulse-shadow-success': {
            '0%': {
                boxShadow: '0 0 0 0 hsl(var(--success) / 0.7)',
            },
            '70%': {
                boxShadow: '0 0 0 12px hsl(var(--success) / 0)',
            },
            '100%': {
                boxShadow: '0 0 0 0 hsl(var(--success) / 0)',
            },
        },
        'icon-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px hsl(var(--accent) / 0.9)) drop-shadow(0 0 15px hsl(var(--accent) / 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 15px hsl(var(--accent))) drop-shadow(0 0 30px hsl(var(--accent) / 0.7))' },
        },
        'badge-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px #1877F2) drop-shadow(0 0 8px #1877F2)' },
          '50%': { filter: 'drop-shadow(0 0 8px #1877F2) drop-shadow(0 0 16px #1877F2)' },
        },
        'star-shine': {
            '0%, 100%': { textShadow: '0 0 5px #fff, 0 0 10px #fde047, 0 0 15px #fde047' },
            '50%': { textShadow: '0 0 10px #fff, 0 0 20px #fde047, 0 0 30px #fde047' },
        },
        'green-blink': {
            '0%': { transform: 'scale(1)', opacity: '0.75' },
            '100%': { transform: 'scale(1.75)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-1': 'float 22s ease-in-out infinite',
        'float-2': 'float 28s ease-in-out infinite reverse',
        'float-3': 'float 25s ease-in-out infinite',
        'float-4': 'float 35s ease-in-out infinite reverse',
        'float-5': 'float 45s ease-in-out infinite',
        'float-6': 'float 40s ease-in-out infinite reverse',
        'float-7': 'float 52s ease-in-out infinite',
        'float-8': 'float 60s ease-in-out infinite reverse',
        'rainbow-flow': 'rainbow-flow 4s linear infinite',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        'sunrise-arc': 'sunrise-arc 60s linear infinite',
        'moon-path': 'moon-path 50s linear infinite',
        'thread-burst': 'thread-burst 1s ease-out forwards',
        'shooting-star': 'shooting-star 3s linear infinite',
        'drift-and-break': 'drift-and-break linear forwards',
        'data-stream': 'data-stream linear infinite',
        'pulse-shadow': 'pulse-shadow 2.5s infinite cubic-bezier(0.66, 0, 0, 1)',
        'pulse-shadow-success': 'pulse-shadow-success 2.5s infinite cubic-bezier(0.66, 0, 0, 1)',
        'icon-glow': 'icon-glow 2.5s ease-in-out infinite',
        'badge-glow': 'badge-glow 2.5s ease-in-out infinite',
        'star-shine': 'star-shine 2s ease-in-out infinite',
        'green-blink': 'green-blink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
