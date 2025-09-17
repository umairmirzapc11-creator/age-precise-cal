import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Gift, Share2, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateAge, AgeCalculation, formatAgeString } from '@/utils/ageCalculations';
import { useToast } from '@/hooks/use-toast';
import AgeResults from './AgeResults';
import CountdownTimer from './CountdownTimer';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [ageData, setAgeData] = useState<AgeCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Check for shared URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedDate = params.get('date');
    if (sharedDate) {
      setBirthDate(sharedDate);
      handleCalculate(sharedDate);
    }
  }, []);

  const handleCalculate = (dateValue?: string) => {
    const dateToCalculate = dateValue || birthDate;
    if (!dateToCalculate) {
      toast({
        title: "Please enter your birth date",
        variant: "destructive",
      });
      return;
    }

    const fullDateTime = birthTime 
      ? `${dateToCalculate}T${birthTime}:00` 
      : `${dateToCalculate}T00:00:00`;
    
    const result = calculateAge(fullDateTime);
    
    if (result) {
      setAgeData(result);
      toast({
        title: "Age calculated successfully! 🎉",
        description: formatAgeString(result),
      });
    } else {
      toast({
        title: "Invalid date",
        description: "Please enter a valid birth date in the past",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?date=${birthDate}`;
    const shareData = {
      title: 'My Age Calculation',
      text: `I am ${formatAgeString(ageData!)} old! Calculate your age at`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Link copied to clipboard!",
          description: "Share it with your friends",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownloadCertificate = () => {
    // This would be implemented with a proper PDF generation library
    toast({
      title: "Certificate generation",
      description: "PDF download feature coming soon!",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Main Calculator Card */}
      <Card className="p-6 md:p-8 shadow-card bg-gradient-card">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-base font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Birth Date
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="text-base"
                  max={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthtime" className="text-base font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Birth Time (Optional)
                </Label>
                <Input
                  id="birthtime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="text-base"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => handleCalculate()}
              size="lg"
              variant="hero"
              className="flex-1"
            >
              <Gift className="w-5 h-5" />
              Calculate Age Now
            </Button>
            
            {ageData && (
              <>
                <Button
                  onClick={handleShare}
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Share'}
                </Button>
                
                <Button
                  onClick={handleDownloadCertificate}
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  <Download className="w-5 h-5" />
                  Certificate
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {ageData && (
        <>
          <AgeResults ageData={ageData} />
          <CountdownTimer nextBirthday={ageData.nextBirthday} />
        </>
      )}
    </div>
  );
}