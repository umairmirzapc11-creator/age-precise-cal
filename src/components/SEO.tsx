import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

export default function SEO({ 
  title = "Age Calculator — Calculate Age in Years, Months & Days | AgeCalc Pro",
  description = "Instantly calculate your exact age in years, months, days, hours and minutes. Next birthday countdown, timezone support, printable certificate. Try the free online age calculator now.",
  keywords = "age calculator, calculate age, how old am I, age calculator in years months days, age calculator with time zone, age difference calculator, next birthday countdown, calculate age online, birthday calculator, exact age calculator",
  url = "https://agecalc.pro",
  image = "https://agecalc.pro/og-image.jpg"
}: SEOProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AgeCalc Pro - Age Calculator",
    "description": description,
    "url": url,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2847"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is this age calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our age calculator is extremely accurate, calculating your age down to the second. It accounts for leap years, different month lengths, and timezone differences."
        }
      },
      {
        "@type": "Question",
        "name": "Does the calculator handle leap years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our calculator properly handles leap years in all calculations, ensuring your age is always calculated correctly."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data stored anywhere?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, we prioritize your privacy. All calculations happen directly in your browser. We don't store any personal information."
        }
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </script>
    </Helmet>
  );
}