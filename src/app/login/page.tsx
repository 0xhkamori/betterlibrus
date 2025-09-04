
'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  if (isLoading || (!isLoading && user)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await login(email, password);
    } catch (error) {
      // Error is caught and toast is shown in useAuth.
      // We just need to ensure the loader stops.
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-sm relative">
        {isLoggingIn && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 rounded-lg">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )}
        <div className={isLoggingIn ? 'opacity-50 pointer-events-none' : ''}>
            <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your Librus Synergia credentials to sign in.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
                <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Login</Label>
                    <Input id="email" type="text" placeholder="Your Librus Login" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoggingIn} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoggingIn} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                    Sign in
                </Button>
                </CardContent>
            </form>
        </div>
      </Card>
    </main>
  );
}
