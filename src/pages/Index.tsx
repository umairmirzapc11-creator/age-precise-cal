import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load all components for optimal performance
const Header = lazy(() => import('@/components/Header'));
const Hero = lazy(() => import('@/components/Hero'));
const AgeCalculator = lazy(() => import('@/components/AgeCalculator'));

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
        <Suspense fallback={<div className="h-16 bg-background border-b border-border" />}>
          <Header />
        </Suspense>
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>
          <section id="calculator" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <Suspense fallback={<LoadingSpinner />}>
                <AgeCalculator />
              </Suspense>
            </div>
          </section>
          <section id="difference" className="py-16 md:py-24 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <Suspense fallback={<LoadingSpinner />}>
                <AgeDifferenceCalculator />
              </Suspense>
            </div>
          </section>
          <Suspense fallback={<LoadingSpinner />}>
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