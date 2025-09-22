import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AgeCalculator from '@/components/AgeCalculator';
import SEO from '@/components/SEO';

// Lazy load components that aren't immediately visible
const AgeDifferenceCalculator = lazy(() => import('@/components/AgeDifferenceCalculator'));
const Features = lazy(() => import('@/components/Features'));
const HowItWorks = lazy(() => import('@/components/HowItWorks'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

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
              <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <AgeDifferenceCalculator />
              </Suspense>
            </div>
          </section>
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
            <Features />
            <HowItWorks />
            <FAQ />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-32 bg-background" />}>
          <Footer />
        </Suspense>
      </div>
    </HelmetProvider>
  );
};

export default Index;