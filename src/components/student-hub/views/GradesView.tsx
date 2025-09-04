
'use client';
import { useState, useEffect } from 'react';
import { Section } from '@/components/student-hub/Section';
import { Grades } from '@/components/student-hub/Grades';
import { getGrades } from '@/lib/api';
import type { DetailItem, SubjectGrade } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface GradesViewProps {
    onOpenSheet: (item: DetailItem) => void;
}

export function GradesView({ onOpenSheet }: GradesViewProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [grades, setGrades] = useState<SubjectGrade[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getGrades();
                setGrades(data);
            } catch (error) {
                console.error("Failed to fetch grades", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    const semester1Avg = 4.5; // placeholder
    const semester2Avg = 0; // placeholder
    const fullYearAvg = 4.5; // placeholder

    if (isLoading) {
        return (
            <div className="space-y-8">
                <Section title="Averages">
                    <div className="px-4 md:px-0 grid grid-cols-2 gap-4 mb-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <Skeleton className="h-5 w-24" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-7 w-10" />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <Skeleton className="h-5 w-24" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-7 w-10" />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="px-4 md:px-0">
                         <Card>
                            <CardHeader className="pb-2">
                                <Skeleton className="h-5 w-32" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-12" />
                            </CardContent>
                        </Card>
                    </div>
                </Section>
                <Section title="Grades by Subject">
                    <div className="w-full">
                        <div className="flex space-x-4 p-4 md:px-0 overflow-hidden">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-60 flex-shrink-0 space-y-3 p-4 rounded-lg border bg-card">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="w-10 h-10 rounded-lg" />
                                        <Skeleton className="h-5 w-24" />
                                    </div>
                                    <div className="flex space-x-2">
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Section title="Averages">
                 <div className="px-4 md:px-0 grid grid-cols-2 gap-4 mb-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">1st Semester</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="text-2xl font-bold">{semester1Avg.toFixed(1)}</div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">2nd Semester</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="text-2xl font-bold">{semester2Avg ? semester2Avg.toFixed(1) : '-'}</div>
                        </CardContent>
                    </Card>
                </div>
                 <div className="px-4 md:px-0">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Full Year Average</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{fullYearAvg.toFixed(1)}</div>
                        </CardContent>
                    </Card>
                </div>
            </Section>
            <Section title="Grades by Subject">
                <Grades grades={grades} onGradeClick={onOpenSheet} />
            </Section>
        </div>
    );
}
