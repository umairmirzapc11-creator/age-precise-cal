import React from 'react';
import { 
  Clock, 
  Calendar, 
  Globe, 
  Download, 
  Share2, 
  Shield,
  Zap,
  Smartphone,
  ChartBar
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Features() {
  const features = [
    {
      icon: Clock,
      title: 'Precise Calculations',
      description: 'Accurate to the second with timezone and DST support',
      color: 'text-primary',
    },
    {
      icon: Calendar,
      title: 'Birthday Countdown',
      description: 'Real-time countdown to your next birthday celebration',
      color: 'text-secondary',
    },
    {
      icon: Globe,
      title: 'Timezone Support',
      description: 'Handles all timezones and daylight saving time changes',
      color: 'text-accent',
    },
    {
      icon: ChartBar,
      title: 'Life Statistics',
      description: 'Total days, weeks, hours, and heartbeats calculated',
      color: 'text-primary',
    },
    {
      icon: Share2,
      title: 'Share Results',
      description: 'Share your age calculation with friends and family',
      color: 'text-secondary',
    },
    {
      icon: Download,
      title: 'Download Certificate',
      description: 'Get a personalized age certificate as PDF',
      color: 'text-accent',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No data stored - all calculations happen in your browser',
      color: 'text-success',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices and screen sizes',
      color: 'text-primary',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant results with no server delays',
      color: 'text-secondary',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Age Calculator?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most comprehensive and accurate age calculator with features you won't find anywhere else
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all hover:scale-105 bg-gradient-card"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}