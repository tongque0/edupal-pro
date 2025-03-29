const Footer = () => {
    return (
      <footer className="w-full border-t bg-background py-4">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left hover:text-primary transition-colors duration-300">
            © 2025 辽宁科技大学. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-6 justify-center md:justify-start">
            <span className="text-sm font-medium group relative cursor-pointer">
              <span className="inline-block hover:text-primary transition-colors duration-300">博学</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="text-sm font-medium group relative cursor-pointer">
              <span className="inline-block hover:text-primary transition-colors duration-300">明德</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="text-sm font-medium group relative cursor-pointer">
              <span className="inline-block hover:text-primary transition-colors duration-300">经世</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="text-sm font-medium group relative cursor-pointer">
              <span className="inline-block hover:text-primary transition-colors duration-300">致用</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
          </nav>
        </div>
      </footer>
    );
  };

  export default Footer;
