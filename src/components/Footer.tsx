import React from 'react';
import { Calculator, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Calculator Tools',
      links: [
        { label: 'Age Calculator', href: '#calculator' },
        { label: 'Age Difference', href: '#difference' },
        { label: 'Birthday Countdown', href: '#calculator' },
        { label: 'Life Statistics', href: '#calculator' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
      ],
    },
    {
      title: 'Learn More',
      links: [
        { label: 'How to Calculate Age', href: '#' },
        { label: 'Leap Years Explained', href: '#' },
        { label: 'Timezone Impact', href: '#' },
        { label: 'Legal Age by Country', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AgeCalc Pro
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The most accurate and comprehensive age calculator online. Calculate your exact age instantly with timezone support and detailed life statistics.
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      {link.href === '#' && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AgeCalc Pro. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive" /> for accurate age calculations
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}