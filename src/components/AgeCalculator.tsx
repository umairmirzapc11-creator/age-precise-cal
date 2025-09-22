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
  const [ageInYears, setAgeInYears] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    if (!birthDate) {
      toast({
        title: "Please enter your birth date",
        variant: "destructive",
      });
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    
    if (birth > today) {
      toast({
        title: "Invalid date",
        description: "Birth date cannot be in the future",
        variant: "destructive",
      });
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      years--;
    }

    setAgeInYears(years);
    toast({
      title: "Age calculated successfully! 🎉",
      description: `You are ${years} years old`,
    });
  };

  return (
    <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Calculate Your Age</h2>
          <p className="text-muted-foreground">Enter your birth date to calculate your exact age</p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full text-base"
              max={format(new Date(), 'yyyy-MM-dd')}
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full sm:w-auto sm:max-w-[300px] mx-auto block px-[25px] py-[12px] text-[18px] rounded-[8px] bg-[#4CAF50] text-white font-medium transition-colors hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2"
          >
            Calculate Age
          </button>

          {ageInYears !== null && (
            <div className="text-center p-6 bg-gradient-subtle rounded-lg">
              <p className="text-2xl font-bold text-primary">
                Your Age: {ageInYears} years
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}