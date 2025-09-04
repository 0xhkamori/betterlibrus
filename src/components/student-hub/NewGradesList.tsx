import type { SubjectGrade } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface NewGradesListProps {
  grades: SubjectGrade[];
  onGradeClick: (grade: SubjectGrade) => void;
}

export function NewGradesList({ grades, onGradeClick }: NewGradesListProps) {
    const recentGrades = grades.flatMap(sg => sg.grades.map(g => ({...g, subjectGrade: sg }))).slice(0, 5);

  return (
    <Card className="bg-card/50">
      <CardContent className="p-4">
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-3">
            {recentGrades.map(grade => (
                <Button 
                    key={grade.id} 
                    variant="secondary" 
                    className="h-10 w-10 rounded-md font-bold text-lg"
                    onClick={() => onGradeClick(grade.subjectGrade)}
                >
                {Math.round(grade.score / grade.maxScore * 100)}
                </Button>
            ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
