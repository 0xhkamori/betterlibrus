'use client';
import { useState, useEffect } from 'react';
import { Section } from '@/components/student-hub/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileView() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a very short loading time, e.g., for initial render
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  const student = {
    name: 'Alex Doe',
    email: 'alex.doe@school.edu',
    studentId: '123456789',
    major: 'Computer Science',
    year: '3rd Year',
    avatarUrl: 'https://picsum.photos/100/100',
  };

  if (isLoading) {
    return (
      <div className="space-y-8 px-4 md:px-0">
        <Section title="Student Profile">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Skeleton className="w-24 h-24 rounded-full mb-4" />
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-10 w-28 mt-4" />
            </CardContent>
          </Card>
        </Section>
        <Section title="Details">
          <Card>
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <Skeleton className="h-5 w-16 mb-1" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div>
                <Skeleton className="h-5 w-12 mb-1" />
                <Skeleton className="h-6 w-24" />
              </div>
            </CardContent>
          </Card>
        </Section>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 md:px-0">
      <Section title="Student Profile">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="person portrait" />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-muted-foreground">{student.email}</p>
            <Button variant="outline" className="mt-4">Edit Profile</Button>
          </CardContent>
        </Card>
      </Section>
      <Section title="Details">
        <Card>
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                 <div>
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="font-medium">{student.studentId}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Major</p>
                    <p className="font-medium">{student.major}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{student.year}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">GPA</p>
                    <p className="font-medium">3.8 / 4.0</p>
                </div>
            </CardContent>
        </Card>
      </Section>
    </div>
  );
}
