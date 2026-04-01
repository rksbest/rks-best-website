export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-sm py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Logo */}
          <img 
            src="/images/rks-logo.png"
            alt="RKS Logo"
            className="h-8 w-auto"
          />

          {/* Copyright */}
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} RKS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
