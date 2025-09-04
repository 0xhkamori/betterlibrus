import type { SubjectGrade } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';

interface GradesProps {
  grades: SubjectGrade[];
  onGradeClick: (grade: SubjectGrade) => void;
}

export function Grades({ grades, onGradeClick }: GradesProps) {
  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-4 md:px-0">
          {grades.map(subjectGrade => (
            <Card
              key={subjectGrade.id}
              className="w-60 flex-shrink-0 cursor-pointer transition-transform hover:-translate-y-1"
              onClick={() => onGradeClick(subjectGrade)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <subjectGrade.icon className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <p className="font-semibold text-base truncate">{subjectGrade.subject}</p>
                </div>
                <div className="flex space-x-2">
                    {subjectGrade.grades.slice(0, 3).map(g => (
                        <Button key={g.id} variant="outline" size="sm" className="rounded-md font-semibold">
                            {Math.round(g.score / g.maxScore * 100)}
                        </Button>
                    ))}
                    {subjectGrade.grades.length > 3 && (
                        <Button variant="ghost" size="sm" className="rounded-md">
                           +{subjectGrade.grades.length - 3}
                        </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
