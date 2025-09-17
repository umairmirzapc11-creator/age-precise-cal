import React, { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { Gift, Clock, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CountdownTimerProps {
  nextBirthday: Date;
}

export default function CountdownTimer({ nextBirthday }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const days = differenceInDays(nextBirthday, now);
      const hours = differenceInHours(nextBirthday, now) % 24;
      const minutes = differenceInMinutes(nextBirthday, now) % 60;
      const seconds = differenceInSeconds(nextBirthday, now) % 60;
      const totalDays = differenceInDays(nextBirthday, now);

      setTimeLeft({ days, hours, minutes, seconds, totalDays });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [nextBirthday]);

  const yearProgress = ((365 - timeLeft.totalDays) / 365) * 100;

  return (
    <Card className="p-6 md:p-8 bg-gradient-subtle overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-primary opacity-10 rounded-full -ml-12 -mb-12" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gift className="w-6 h-6 text-primary" />
            Next Birthday Countdown
          </h2>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(nextBirthday, 'MMMM d, yyyy')}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {timeLeft.days}
            </div>
            <div className="text-sm text-muted-foreground">Days</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary">
              {timeLeft.hours}
            </div>
            <div className="text-sm text-muted-foreground">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">
              {timeLeft.minutes}
            </div>
            <div className="text-sm text-muted-foreground">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {timeLeft.seconds}
            </div>
            <div className="text-sm text-muted-foreground">Seconds</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Year Progress
            </span>
            <span className="font-medium">{Math.round(yearProgress)}%</span>
          </div>
          <Progress value={yearProgress} className="h-2" />
        </div>

        {timeLeft.totalDays === 0 && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-xl font-bold text-primary animate-pulse">
              🎉 Happy Birthday! 🎂
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}