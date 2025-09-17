import React, { useState } from 'react';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { calculateAgeDifference, AgeDifference } from '@/utils/ageCalculations';
import { useToast } from '@/hooks/use-toast';

export default function AgeDifferenceCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [difference, setDifference] = useState<AgeDifference | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    if (!date1 || !date2) {
      toast({
        title: "Please enter both dates",
        variant: "destructive",
      });
      return;
    }

    const result = calculateAgeDifference(date1, date2);
    
    if (result) {
      setDifference(result);
      toast({
        title: "Age difference calculated!",
        description: `Difference: ${result.years} years, ${result.months} months, ${result.days} days`,
      });
    } else {
      toast({
        title: "Invalid dates",
        description: "Please enter valid dates",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 md:p-8 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Age Difference Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date1" className="text-base font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              First Person's Birth Date
            </Label>
            <Input
              id="date1"
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="text-base"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date2" className="text-base font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              Second Person's Birth Date
            </Label>
            <Input
              id="date2"
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="text-base"
            />
          </div>
        </div>

        <Button 
          onClick={handleCalculate}
          size="lg"
          variant="gradient"
          className="w-full"
        >
          <ArrowRight className="w-5 h-5" />
          Calculate Age Difference
        </Button>

        {difference && (
          <div className="mt-6 p-6 bg-gradient-subtle rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Age Difference Results</h3>
              {difference.olderPerson !== 'same' && (
                <Badge variant="secondary">
                  {difference.olderPerson === 'first' ? 'First person is older' : 'Second person is older'}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-primary">{difference.years}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-secondary">{difference.months}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-accent">{difference.days}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-primary">{difference.totalDays}</div>
                <div className="text-sm text-muted-foreground">Total Days</div>
              </div>
            </div>

            {difference.olderPerson === 'same' && (
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-lg font-medium text-primary">
                  Both persons have the same age!
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}