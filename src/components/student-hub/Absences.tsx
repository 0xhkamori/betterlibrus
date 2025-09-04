import type { Absence } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, User, HelpCircle } from 'lucide-react';

interface AbsencesProps {
  absences: Absence[];
}

export function Absences({ absences }: AbsencesProps) {
  const getStatusInfo = (status: Absence['status']) => {
    switch (status) {
      case 'Excused':
        return { variant: 'default', icon: CheckCircle2, label: 'Excused' };
      case 'Unexcused':
        return { variant: 'destructive', icon: XCircle, label: 'Unexcused' };
      case 'Pending':
        return { variant: 'secondary', icon: AlertCircle, label: 'Pending' };
    }
  };

  return (
    <div className="px-4 md:px-0 space-y-3">
      {absences.map(absence => {
        const statusInfo = getStatusInfo(absence.status);
        return (
          <Card key={absence.id} className="bg-card/50 cursor-pointer hover:bg-card/80">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-base">{new Date(absence.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm text-muted-foreground">{absence.subject}</p>
                  </div>
                   <Badge variant={statusInfo.variant} className="flex items-center gap-1.5">
                        <statusInfo.icon className="h-3.5 w-3.5" />
                        <span>{statusInfo.label}</span>
                    </Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1 pt-2">
                 <div className='flex items-center gap-2'>
                    <HelpCircle className="h-4 w-4" />
                    <span>Reason: {absence.reason}</span>
                </div>
                 <div className='flex items-center gap-2'>
                    <User className="h-4 w-4" />
                    <span>Teacher: {absence.teacher}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
