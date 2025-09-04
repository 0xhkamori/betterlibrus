
'use client';
import { useState, useEffect } from 'react';
import { Section } from '@/components/student-hub/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

export function SettingsView() {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 px-4 md:px-0">
        <Section title="Notification Settings">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </Section>
  
        <Section title="Appearance">
           <Card>
              <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-12" />
                  </div>
                   <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-28" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                  </div>
              </CardContent>
          </Card>
        </Section>
  
        <Section title="Account">
           <Card>
              <CardContent className="p-0">
                 <Skeleton className="h-[52px] w-full" />
                 <div className="mx-6 border-b border-border"></div>
                 <Skeleton className="h-[52px] w-full" />
              </CardContent>
          </Card>
        </Section>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 md-px-0">
      <Section title="Notification Settings">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="grade-notifications">New Grade Alerts</Label>
              <Switch id="grade-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="announcement-notifications">New Announcements</Label>
              <Switch id="announcement-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="exam-reminders">Exam Reminders</Label>
                <Switch id="exam-reminders" />
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Appearance">
         <Card>
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Theme</Label>
                    <p className="text-muted-foreground">Dark</p>
                </div>
                 <div className="flex items-center justify-between">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary" />
                        <p className="text-muted-foreground">Electric Blue</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </Section>

      <Section title="Account">
         <Card>
            <CardContent className="p-0">
               <Button variant="ghost" className="w-full justify-between p-6">
                    <span>Manage Account</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
               </Button>
               <div className="px-6">
                <div className="border-b border-border"></div>
               </div>
               <Button variant="ghost" className="w-full justify-between p-6 text-destructive hover:text-destructive" onClick={logout}>
                    <span>Sign Out</span>
               </Button>
            </CardContent>
        </Card>
      </Section>
    </div>
  );
}
