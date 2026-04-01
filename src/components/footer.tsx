export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-sm py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/images/rks-logo.gif"
              alt="RKS Best Logo"
              className="h-10 w-auto"
            />
            <span className="text-sm font-medium text-foreground">RKS.Best</span>
          </div>

          {/* Tagline */}
          <p className="text-center text-sm text-muted-foreground">
            Rise. Keep. Shine.
          </p>

          {/* Copyright */}
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} RKS.Best. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
