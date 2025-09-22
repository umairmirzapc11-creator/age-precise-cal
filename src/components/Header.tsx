import React, { useEffect, useState } from 'react';
import { Calculator, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navItems = [{
    label: 'Age Calculator',
    href: '#calculator'
  }, {
    label: 'Age Difference',
    href: '#difference'
  }, {
    label: 'How it Works',
    href: '#how-it-works'
  }, {
    label: 'FAQ',
    href: '#faq'
  }];
  useEffect(() => {
    // Use requestAnimationFrame to batch DOM updates and avoid forced reflow
    requestAnimationFrame(() => {
      // Check for saved theme preference or default to light
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      setTheme(initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    });
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">AgeCalculator Pro</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => <a key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {item.label}
            </a>)}
        </div>

        {/* Theme Toggle and Mobile Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-primary" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navItems.map(item => <a key={item.label} href={item.href} className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">
                      {item.label}
                    </a>)}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>;
}