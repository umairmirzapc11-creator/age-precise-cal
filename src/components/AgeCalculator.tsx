import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Heart, Star, Gift, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateAge, AgeCalculation } from '@/utils/ageCalculations';
import { useToast } from '@/hooks/use-toast';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [ageData, setAgeData] = useState<AgeCalculation | null>(null);
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

    const calculatedAge = calculateAge(birth);
    if (calculatedAge) {
      setAgeData(calculatedAge);
      toast({
        title: "Age calculated successfully! 🎉",
        description: `You are ${calculatedAge.years} years old`,
      });
    }
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

          {ageData && (
            <div className="space-y-6 mt-8">
              {/* Main Age Display */}
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <p className="text-3xl font-bold text-primary mb-2">
                  {ageData.years} years, {ageData.months} months, {ageData.days} days
                </p>
                <p className="text-lg text-muted-foreground">
                  {ageData.hours.toLocaleString()} hours, {ageData.minutes.toLocaleString()} minutes, {ageData.seconds.toLocaleString()} seconds
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Heartbeats */}
                <Card className="p-4 bg-card/50">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Heartbeats</p>
                      <p className="text-xl font-bold">{ageData.totalHeartbeats?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </Card>

                {/* Birth Day */}
                <Card className="p-4 bg-card/50">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Born on</p>
                      <p className="text-xl font-bold">{ageData.birthDayOfWeek}</p>
                    </div>
                  </div>
                </Card>

                {/* Zodiac Sign */}
                <Card className="p-4 bg-card/50">
                  <div className="flex items-center space-x-3">
                    <Star className="w-8 h-8 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Zodiac Sign</p>
                      <p className="text-xl font-bold">{ageData.zodiacSign}</p>
                    </div>
                  </div>
                </Card>

                {/* Next Birthday */}
                <Card className="p-4 bg-card/50">
                  <div className="flex items-center space-x-3">
                    <Gift className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Next Birthday</p>
                      <p className="text-xl font-bold">{ageData.daysUntilBirthday} days</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Additional Stats */}
              <Card className="p-4 bg-card/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{ageData.totalDays?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Days</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{ageData.totalMonths?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Months</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{ageData.totalWeeks?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Weeks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{ageData.totalHours?.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}