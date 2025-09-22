import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInWeeks,
  addYears,
  format,
  isValid,
  parseISO,
  formatDistanceToNow,
  isFuture,
} from 'date-fns';

export interface AgeCalculation {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalHeartbeats?: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
  hoursUntilBirthday: number;
  minutesUntilBirthday: number;
  zodiacSign: string;
  chineseZodiac: string;
  isLegalAge18: boolean;
  isLegalAge21: boolean;
  birthDayOfWeek: string;
  nextBirthdayDayOfWeek: string;
  ageInWords: string;
}

export interface AgeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  totalDays: number;
  olderPerson: 'first' | 'second' | 'same';
  differenceInWords: string;
}

const zodiacSigns = [
  { name: 'Capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, emoji: '♑' },
  { name: 'Aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, emoji: '♒' },
  { name: 'Pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, emoji: '♓' },
  { name: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, emoji: '♈' },
  { name: 'Taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, emoji: '♉' },
  { name: 'Gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, emoji: '♊' },
  { name: 'Cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, emoji: '♋' },
  { name: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, emoji: '♌' },
  { name: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, emoji: '♍' },
  { name: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, emoji: '♎' },
  { name: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, emoji: '♏' },
  { name: 'Sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, emoji: '♐' },
];

const chineseZodiacs = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

export function calculateAge(birthDate: Date | string): AgeCalculation | null {
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  
  if (!isValid(birth) || isFuture(birth)) {
    return null;
  }

  const now = new Date();
  
  // Basic age calculations
  const years = differenceInYears(now, birth);
  const months = differenceInMonths(now, birth) % 12;
  const days = differenceInDays(now, addYears(birth, years)) % 30;
  const hours = differenceInHours(now, birth) % 24;
  const minutes = differenceInMinutes(now, birth) % 60;
  const seconds = differenceInSeconds(now, birth) % 60;

  // Total calculations
  const totalDays = differenceInDays(now, birth);
  const totalWeeks = differenceInWeeks(now, birth);
  const totalMonths = differenceInMonths(now, birth);
  const totalHours = differenceInHours(now, birth);
  const totalMinutes = differenceInMinutes(now, birth);
  
  // Calculate estimated heartbeats (average 70 beats per minute)
  const totalHeartbeats = totalMinutes * 70;

  // Next birthday calculation
  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < now) {
    nextBirthday = addYears(nextBirthday, 1);
  }
  
  const daysUntilBirthday = differenceInDays(nextBirthday, now);
  const hoursUntilBirthday = differenceInHours(nextBirthday, now);
  const minutesUntilBirthday = differenceInMinutes(nextBirthday, now);

  // Zodiac calculations
  const zodiacSign = getZodiacSign(birth);
  const chineseZodiac = getChineseZodiac(birth);

  // Legal age checks
  const isLegalAge18 = years >= 18;
  const isLegalAge21 = years >= 21;

  // Day of week calculations
  const birthDayOfWeek = format(birth, 'EEEE');
  const nextBirthdayDayOfWeek = format(nextBirthday, 'EEEE');

  // Age in words
  const ageInWords = formatDistanceToNow(birth, { addSuffix: false });

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    totalHeartbeats,
    nextBirthday,
    daysUntilBirthday,
    hoursUntilBirthday,
    minutesUntilBirthday,
    zodiacSign,
    chineseZodiac,
    isLegalAge18,
    isLegalAge21,
    birthDayOfWeek,
    nextBirthdayDayOfWeek,
    ageInWords,
  };
}

function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const sign of zodiacSigns) {
    if (sign.startMonth === sign.endMonth) {
      if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) {
        return `${sign.name} ${sign.emoji}`;
      }
    } else {
      if ((month === sign.startMonth && day >= sign.startDay) ||
          (month === sign.endMonth && day <= sign.endDay)) {
        return `${sign.name} ${sign.emoji}`;
      }
    }
  }
  
  return 'Unknown';
}

function getChineseZodiac(date: Date): string {
  const year = date.getFullYear();
  const zodiacIndex = (year - 4) % 12;
  return chineseZodiacs[zodiacIndex];
}

export function calculateAgeDifference(date1: Date | string, date2: Date | string): AgeDifference | null {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;

  if (!isValid(d1) || !isValid(d2)) {
    return null;
  }

  const earlier = d1 < d2 ? d1 : d2;
  const later = d1 < d2 ? d2 : d1;

  const years = differenceInYears(later, earlier);
  const months = differenceInMonths(later, earlier) % 12;
  const days = differenceInDays(later, addYears(earlier, years)) % 30;
  const hours = differenceInHours(later, earlier) % 24;
  const totalDays = differenceInDays(later, earlier);

  let olderPerson: 'first' | 'second' | 'same' = 'same';
  if (d1 < d2) olderPerson = 'first';
  else if (d2 < d1) olderPerson = 'second';

  const differenceInWords = formatDistanceToNow(earlier, { addSuffix: false });

  return {
    years,
    months,
    days,
    hours,
    totalDays,
    olderPerson,
    differenceInWords,
  };
}

export function formatAgeString(age: AgeCalculation): string {
  const parts = [];
  if (age.years > 0) parts.push(`${age.years} year${age.years !== 1 ? 's' : ''}`);
  if (age.months > 0) parts.push(`${age.months} month${age.months !== 1 ? 's' : ''}`);
  if (age.days > 0) parts.push(`${age.days} day${age.days !== 1 ? 's' : ''}`);
  
  return parts.join(', ') || 'Just born!';
}

export function generateShareableUrl(birthDate: string): string {
  const base = window.location.origin;
  const params = new URLSearchParams({ date: birthDate });
  return `${base}?${params.toString()}`;
}