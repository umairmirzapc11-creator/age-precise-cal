import React from 'react';
import { Card } from '@/components/ui/card';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Enter Your Birth Date',
      description: 'Simply select your birth date using our easy date picker. You can optionally add your birth time for even more precise calculations.',
    },
    {
      number: '2',
      title: 'Click Calculate',
      description: 'Hit the "Calculate Age Now" button and our advanced algorithm instantly computes your exact age, accounting for leap years and time zones.',
    },
    {
      number: '3',
      title: 'View Your Results',
      description: 'Get comprehensive results including your age in multiple formats, next birthday countdown, zodiac signs, and detailed life statistics.',
    },
    {
      number: '4',
      title: 'Share or Download',
      description: 'Share your results with friends via social media or download a personalized age certificate for your records.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your age in years, months and days in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 relative hover:shadow-lg transition-all">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-hero text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <div className="pt-4">
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}