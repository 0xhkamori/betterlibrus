
'use client';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { StudentHub } from '@/components/student-hub/StudentHub';

export default function StudentHubPage() {
    return (
        <ProtectedRoute>
            <StudentHub />
        </ProtectedRoute>
    );
}
