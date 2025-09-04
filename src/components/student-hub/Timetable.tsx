'use client';

import { useState, useEffect } from 'react';
import type { Lesson, Day } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const days: { key: Day; name: string }[] = [
  { key: 'MON', name: 'Mon' },
  { key: 'TUE', name: 'Tue' },
  { key: 'WED', name: 'Wed' },
  { key: 'THU', name: 'Thu' },
  { key: 'FRI', name: 'Fri' },
];

function getInitialDay(): Day {
    const day = new Date().getDay();
    const
     daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
    const today = daysOfWeek[day];
    if (today === 'SAT' || today === 'SUN') return 'MON';
    return today as Day;
}

interface TimetableProps {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
  initialDay?: Day;
}

export function Timetable({ lessons, onLessonClick, initialDay }: TimetableProps) {
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  useEffect(() => {
    setSelectedDay(initialDay || getInitialDay());
  }, [initialDay]);

  if (!selectedDay) {
      return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-2 px-4 md:px-0">
                <div className="flex-grow grid grid-cols-5 gap-2 rounded-lg bg-card p-1">
                {days.map(day => (
                    <Button
                    key={day.key}
                    variant={'ghost'}
                    className="w-full h-auto py-2 text-sm font-medium"
                    >
                    {day.name}
                    </Button>
                ))}
                </div>
                 <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Open Calendar</span>
                </Button>
            </div>
        </div>
      );
  }


  const filteredLessons = lessons.filter(lesson => lesson.day === selectedDay).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 px-4 md:px-0">
        <div className="flex-grow grid grid-cols-5 gap-2 rounded-lg bg-card p-1">
          {days.map(day => (
            <Button
              key={day.key}
              variant={selectedDay === day.key ? 'secondary' : 'ghost'}
              className="w-full h-auto py-2 text-sm font-medium"
              onClick={() => setSelectedDay(day.key)}
            >
              {day.name}
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Open Calendar</span>
        </Button>
      </div>
      <div className="px-4 md:px-0 space-y-3">
        {filteredLessons.length > 0 ? (
          filteredLessons.map(lesson => (
            <Card
              key={lesson.id}
              className="cursor-pointer transition-all hover:bg-card/80 hover:shadow-md"
              onClick={() => onLessonClick(lesson)}
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold">{lesson.subject}</p>
                  <p className="text-sm text-muted-foreground">{`${lesson.teacher} · ${lesson.room}`}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{lesson.time}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
            <Card className="bg-card/50">
                <CardContent className="p-16 text-center text-muted-foreground">
                    <p>No lessons scheduled for this day.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
