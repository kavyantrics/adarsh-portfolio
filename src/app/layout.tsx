import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Adarsh Portfolio | Digital Garden",
  description: "Personal portfolio showcasing projects and skills",
  icons: {
    icon: [
      {
        url: '/logo.jpg',
        type: 'image/jpeg',
        sizes: '32x32',
      }
    ],
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
