'use client';

import type { DetailItem, Grade, Lesson, SubjectGrade, Announcement } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '../ui/scroll-area';

interface DetailsSheetProps {
  item: DetailItem | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function LessonDetails({ item }: { item: Lesson }) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{item.subject}</SheetTitle>
        <SheetDescription>{item.time}</SheetDescription>
      </SheetHeader>
      <div className="py-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Teacher</span>
          <span>{item.teacher}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Room</span>
          <span>{item.room}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Day</span>
          <span>{item.day}</span>
        </div>
      </div>
    </>
  );
}

function GradeDetails({ item }: { item: SubjectGrade }) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{item.subject}</SheetTitle>
        <SheetDescription>Average: {item.average}%</SheetDescription>
      </SheetHeader>
      <Separator className="my-4" />
      <div className="flex-1 flex flex-col min-h-0">
        <p className="font-medium mb-2">Grade History</p>
        <ScrollArea className="flex-grow">
          <div className="space-y-3 pr-4">
            {item.grades.map((grade: Grade) => (
              <div key={grade.id} className="flex justify-between items-center rounded-lg border p-3">
                <div>
                  <p className="font-medium">{grade.assignment}</p>
                  <p className="text-xs text-muted-foreground">{grade.date}</p>
                </div>
                <p className="font-bold">{`${grade.score} / ${grade.maxScore}`}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

function AnnouncementDetails({ item }: { item: Announcement }) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{item.title}</SheetTitle>
        <SheetDescription>
          By {item.author} on {item.date}
        </SheetDescription>
      </SheetHeader>
      <Separator className="my-4" />
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-grow">
          <p className="text-sm whitespace-pre-wrap pr-4">{item.content}</p>
        </ScrollArea>
      </div>
    </>
  );
}

export function DetailsSheet({ item, isOpen, onOpenChange }: DetailsSheetProps) {
  const renderContent = () => {
    if (!item) return null;

    switch (item.type) {
      case 'lesson':
        return <LessonDetails item={item as Lesson} />;
      case 'grade':
        return <GradeDetails item={item as SubjectGrade} />;
      case 'announcement':
        return <AnnouncementDetails item={item as Announcement} />;
      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90svh] rounded-t-lg p-6 flex flex-col">
          {renderContent()}
      </SheetContent>
    </Sheet>
  );
}
