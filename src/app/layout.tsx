
'use client';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { PrivacyProvider } from '@/contexts/PrivacyContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>Student Hub</title>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <LanguageProvider>
            <PrivacyProvider>
              {children}
              <Toaster />
            </PrivacyProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
