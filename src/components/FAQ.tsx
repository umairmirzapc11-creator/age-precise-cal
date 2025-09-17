import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

export default function FAQ() {
  const faqs = [
    {
      question: 'How accurate is this age calculator?',
      answer: 'Our age calculator is extremely accurate, calculating your age down to the second. It accounts for leap years, different month lengths, and can even handle timezone differences when you provide your birth time.',
    },
    {
      question: 'Does the calculator handle leap years?',
      answer: 'Yes! Our calculator properly handles leap years in all calculations. This ensures your age is always calculated correctly, even if you were born on February 29th.',
    },
    {
      question: 'Can I calculate the age difference between two people?',
      answer: 'Absolutely! Use our Age Difference Calculator feature to compare two birth dates and see the exact age difference in years, months, days, and total days.',
    },
    {
      question: 'Is my data stored anywhere?',
      answer: 'No, we prioritize your privacy. All calculations happen directly in your browser. We don\'t store, track, or save any personal information or birth dates you enter.',
    },
    {
      question: 'Can I share my age calculation results?',
      answer: 'Yes! You can easily share your results through social media, copy a shareable link, or download a personalized age certificate as a PDF document.',
    },
    {
      question: 'What is the Chinese zodiac shown in the results?',
      answer: 'The Chinese zodiac is a 12-year cycle where each year is represented by an animal. Your Chinese zodiac sign is determined by your birth year and is part of ancient Chinese astrology.',
    },
    {
      question: 'Why does the calculator show heartbeats?',
      answer: 'We estimate your total heartbeats based on the average human heart rate of 70 beats per minute. It\'s a fun way to visualize just how long you\'ve been alive!',
    },
    {
      question: 'Can I use this calculator for historical dates?',
      answer: 'Yes, you can calculate ages for any date in the past. This is useful for determining the age of historical figures, calculating how old someone would be today, or finding ages at specific points in time.',
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our age calculator
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
}