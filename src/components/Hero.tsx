import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Accurate to the second • Handles leap years & timezones
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Age Calculator — Calculate Your Exact Age Instantly
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly calculate your precise age in years, months, days, hours, minutes and seconds. 
            Get your next birthday countdown, zodiac signs, and life statistics all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={scrollToCalculator}
              className="w-full sm:w-auto max-w-[300px] mx-auto sm:mx-0 px-[25px] py-[12px] text-[18px] rounded-[8px] bg-[#4CAF50] text-white font-medium transition-colors hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2"
            >
              Calculate Age Now
              <ArrowDown className="w-5 h-5 ml-2 inline animate-bounce" />
            </button>
            <Button 
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-3 min-h-[48px]"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}