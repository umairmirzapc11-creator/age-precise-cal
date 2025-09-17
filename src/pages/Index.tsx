import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AgeCalculator from '@/components/AgeCalculator';
import AgeDifferenceCalculator from '@/components/AgeDifferenceCalculator';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background">
        <SEO />
        <Header />
        <main>
          <Hero />
          <section id="calculator" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <AgeCalculator />
            </div>
          </section>
          <section id="difference" className="py-16 md:py-24 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <AgeDifferenceCalculator />
            </div>
          </section>
          <Features />
          <HowItWorks />
          <FAQ />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;