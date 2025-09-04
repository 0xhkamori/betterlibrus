
'use client';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { PrivacyProvider } from '@/contexts/PrivacyContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { FontProvider } from '@/contexts/FontContext';
import { RoundnessProvider } from '@/contexts/RoundnessContext';

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Source+Serif+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <title>BetterLibrus</title>
        <meta name="description" content="A better interface for Librus school management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#121212" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <LanguageProvider>
            <FontProvider>
              <RoundnessProvider>
                <PrivacyProvider>
                  {children}
                  <Toaster />
                </PrivacyProvider>
              </RoundnessProvider>
            </FontProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
