import React from 'react';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Heart, 
  Star, 
  TrendingUp,
  Award,
  Globe,
  Cake
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AgeCalculation } from '@/utils/ageCalculations';

interface AgeResultsProps {
  ageData: AgeCalculation;
}

export default function AgeResults({ ageData }: AgeResultsProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Main Age Card */}
      <Card className="p-6 bg-gradient-primary text-white col-span-1 md:col-span-2 lg:col-span-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Cake className="w-6 h-6" />
              Your Exact Age
            </h2>
            <div className="text-4xl md:text-5xl font-bold">
              {ageData.years} years, {ageData.months} months, {ageData.days} days
            </div>
            <div className="text-xl mt-2 opacity-90">
              {ageData.hours} hours, {ageData.minutes} minutes, {ageData.seconds} seconds
            </div>
          </div>
        </div>
      </Card>

      {/* Total Days Lived */}
      <Card className="p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Total Days</div>
            <div className="text-3xl font-bold text-primary">
              {formatNumber(ageData.totalDays)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">days on Earth</div>
          </div>
          <Calendar className="w-8 h-8 text-primary opacity-20" />
        </div>
      </Card>

      {/* Total Hours */}
      <Card className="p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Total Hours</div>
            <div className="text-3xl font-bold text-secondary">
              {formatNumber(ageData.totalHours)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">hours lived</div>
          </div>
          <Clock className="w-8 h-8 text-secondary opacity-20" />
        </div>
      </Card>

      {/* Total Heartbeats (Estimate) */}
      <Card className="p-6 hover:shadow-lg transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Heartbeats</div>
            <div className="text-3xl font-bold text-destructive">
              {formatNumber(Math.round(ageData.totalMinutes * 70))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">estimated beats</div>
          </div>
          <Heart className="w-8 h-8 text-destructive opacity-20" />
        </div>
      </Card>

      {/* Zodiac Signs */}
      <Card className="p-6 hover:shadow-lg transition-all">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">Zodiac Sign</span>
          </div>
          <div className="text-2xl font-bold">{ageData.zodiacSign}</div>
          <Badge variant="secondary" className="w-fit">
            Chinese: {ageData.chineseZodiac}
          </Badge>
        </div>
      </Card>

      {/* Birth Day Info */}
      <Card className="p-6 hover:shadow-lg transition-all">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Birth Day</span>
          </div>
          <div className="text-2xl font-bold">{ageData.birthDayOfWeek}</div>
          <div className="text-sm text-muted-foreground">
            Next birthday: {ageData.nextBirthdayDayOfWeek}
          </div>
        </div>
      </Card>

      {/* Legal Age Status */}
      <Card className="p-6 hover:shadow-lg transition-all">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-success" />
            <span className="text-sm text-muted-foreground">Legal Status</span>
          </div>
          <div className="flex gap-2">
            {ageData.isLegalAge18 && (
              <Badge variant="default" className="bg-success">18+ ✓</Badge>
            )}
            {ageData.isLegalAge21 && (
              <Badge variant="default" className="bg-success">21+ ✓</Badge>
            )}
            {!ageData.isLegalAge18 && (
              <Badge variant="secondary">Minor</Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6 col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-subtle">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Life Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-primary">{formatNumber(ageData.totalWeeks)}</div>
            <div className="text-sm text-muted-foreground">Weeks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">{formatNumber(ageData.totalMonths)}</div>
            <div className="text-sm text-muted-foreground">Months</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">{formatNumber(ageData.totalMinutes)}</div>
            <div className="text-sm text-muted-foreground">Minutes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{formatNumber(Math.round(ageData.totalDays * 8))}</div>
            <div className="text-sm text-muted-foreground">Hours of Sleep</div>
          </div>
        </div>
      </Card>
    </div>
  );
}