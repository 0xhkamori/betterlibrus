
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 bg-background/80 backdrop-blur-sm border-b border-border">
            <Skeleton className="h-8 w-24" />
             <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </header>
         <main className="flex-1 overflow-y-auto pb-24">
            <div className="container mx-auto max-w-4xl pt-6">
                <div className="space-y-8">
                    <div className="px-4 md:px-0 space-y-4">
                        <Skeleton className="h-8 w-32 mb-4" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                     <div className="px-4 md:px-0 space-y-4">
                        <Skeleton className="h-8 w-32 mb-4" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                     <div className="px-4 md:px-0 space-y-4">
                        <Skeleton className="h-8 w-32 mb-4" />
                         <div className="space-y-3">
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                         </div>
                    </div>
                </div>
            </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-10 h-16 bg-background/80 backdrop-blur-sm border-t border-border">
            <div className="container mx-auto h-full max-w-4xl">
                <div className="flex h-full items-center justify-around">
                     {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-12 rounded-lg" />
                     ))}
                </div>
            </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
