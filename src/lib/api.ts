
import type { Lesson, SubjectGrade, Absence, Exam, Announcement } from './types';
import { BookOpen, Calculator, FlaskConical, Globe, Palette, Languages } from 'lucide-react';

// A helper function to make fetch requests and handle errors
async function fetchData(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    return response.json();
}

// Helper to get an icon for a subject
function getIconForSubject(subjectName: string) {
    const lowerCaseSubject = subjectName.toLowerCase();
    if (lowerCaseSubject.includes('matematyka') || lowerCaseSubject.includes('calculus')) return Calculator;
    if (lowerCaseSubject.includes('chemia') || lowerCaseSubject.includes('chemistry')) return FlaskConical;
    if (lowerCaseSubject.includes('historia') || lowerCaseSubject.includes('history')) return Globe;
    if (lowerCaseSubject.includes('plastyka') || lowerCaseSubject.includes('sztuka') || lowerCaseSubject.includes('painting')) return Palette;
    if (lowerCaseSubject.includes('hiszpański') || lowerCaseSubject.includes('spanish')) return Languages;
    // Default icon
    return BookOpen;
}

// Maps day numbers from the API (1=Mon, 5=Fri) to our Day type
function mapDay(dayNumber: number): Day {
    const dayMap: { [key: number]: Day } = {
        1: 'MON',
        2: 'TUE',
        3: 'WED',
        4: 'THU',
        5: 'FRI',
    };
    return dayMap[dayNumber] || 'MON';
}


export async function getTimetable(): Promise<Lesson[]> {
    const apiData = await fetchData('/api/timetable');

    // The API returns an object with days as keys, so we need to flatten and map it.
    const lessons: Lesson[] = Object.entries(apiData).flatMap(([day, dayLessons]) => {
        const dayNumber = parseInt(day.replace('d', ''), 10);
        return (dayLessons as any[]).map((lesson, index) => ({
            id: `l-${dayNumber}-${index}`,
            subject: lesson.subject,
            teacher: lesson.teacher,
            time: lesson.time,
            room: lesson.room,
            day: mapDay(dayNumber),
            type: 'lesson'
        }));
    });
    return lessons;
}

export async function getGrades(): Promise<SubjectGrade[]> {
    const apiData = await fetchData('/api/grades');
    // The API returns an array of subjects, each with an array of grades.
    // We need to map this to our SubjectGrade type.
    return apiData.map((subject: any) => ({
        id: subject.id,
        subject: subject.name,
        average: subject.average, // Assuming the API provides an average
        icon: getIconForSubject(subject.name),
        type: 'grade',
        grades: subject.grades.map((grade: any) => ({
            id: grade.id,
            assignment: grade.description.category.name,
            score: parseFloat(grade.grade.replace(',', '.')), // Handle comma decimal separator
            maxScore: grade.description.category.weight, // This might need adjustment based on real data
            date: new Date(grade.date).toISOString().split('T')[0],
        }))
    }));
}

export async function getAbsences(): Promise<Absence[]> {
     const apiData = await fetchData('/api/absences');
     // The API returns an array of absences, which we map to our Absence type.
    return apiData.map((absence: any) => ({
        id: absence.id,
        subject: absence.lesson.subject,
        teacher: absence.teacher.name,
        date: new Date(absence.date).toISOString().split('T')[0],
        reason: absence.reason || 'Not specified',
        status: absence.isExcused ? 'Excused' : (absence.isPresenceJustified ? 'Pending' : 'Unexcused'),
        type: 'absence'
    }));
}

export async function getExams(): Promise<Exam[]> {
    const apiData = await fetchData('/api/exams');
    // The API returns calendar events, we map them to our Exam type.
    return apiData.map((event: any) => ({
        id: event.id,
        subject: event.title,
        date: new Date(event.dateFrom).toISOString().split('T')[0],
        time: new Date(event.dateFrom).toTimeString().split(' ')[0].substring(0, 5),
        location: event.place || 'N/A',
        type: 'exam'
    }));
}

export async function getAnnouncements(): Promise<Announcement[]> {
    const apiData = await fetchData('/api/announcements');
    // The API returns announcements, we map them to our Announcement type.
    return apiData.map((announcement: any) => ({
        id: announcement.id,
        title: announcement.subject,
        content: announcement.content, // This will be fetched on-demand in a real scenario
        author: announcement.user.name,
        date: new Date(announcement.date).toISOString().split('T')[0],
        type: 'announcement'
    }));
}
