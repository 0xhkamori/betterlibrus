import type { Exam } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';

interface ExamsProps {
  exams: Exam[];
}

export function Exams({ exams }: ExamsProps) {
  return (
    <div className="px-4 md:px-0 space-y-3">
      {exams.map(exam => (
        <Card key={exam.id} className="bg-card/50 cursor-pointer hover:bg-card/80">
          <CardContent className="p-4 space-y-2">
             <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center p-3 rounded-md bg-card border w-20">
                    <span className="text-sm font-medium text-muted-foreground">{new Date(exam.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                    <span className="text-3xl font-bold">{new Date(exam.date).getDate()}</span>
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-base">{exam.subject}</p>
                  <p className="text-sm text-muted-foreground">{exam.subject.includes('Paper') ? 'Paper Submission' : 'In-person Exam'}</p>
                </div>
            </div>
            <div className="flex items-center justify-end text-sm text-muted-foreground gap-4 pt-2">
                 <div className='flex items-center gap-2'>
                    <Clock className="h-4 w-4" />
                    <span>{exam.time}</span>
                </div>
                 <div className='flex items-center gap-2'>
                    <MapPin className="h-4 w-4" />
                    <span>{exam.location}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
