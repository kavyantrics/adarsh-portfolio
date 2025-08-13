import type { Metadata } from 'next';
import './globals.css';
import AnalyticsTracker from '@/components/AnalyticsTracker';

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: 'Adarsh Portfolio - Full Stack Developer & DevOps Engineer',
  description: 'Full Stack Developer and DevOps Engineer with expertise in React, Node.js, AWS, Docker, and modern web technologies.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo.jpg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
      </head>
      <body 
        className="antialiased font-mono bg-background text-text transition-colors duration-300"
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        > 
         <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
