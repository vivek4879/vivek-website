import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://vivek-website-five.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vivek Aher | Full-Stack Engineer",
  description:
    "Personal portfolio of Vivek Aher — full-stack engineer building with Next.js, React, and modern web technologies.",
  openGraph: {
    title: "Vivek Aher | Full-Stack Engineer",
    description:
      "Full-stack engineer building thoughtful software at the intersection of design and engineering.",
    url: SITE_URL,
    siteName: "Vivek Aher",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Aher | Full-Stack Engineer",
    description:
      "Full-stack engineer building thoughtful software at the intersection of design and engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Blocking script that runs before the browser paints.
// Reads localStorage and sets .dark / .machine on <html> immediately.
// This prevents the white flash for dark mode users.
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var mode = localStorage.getItem('mode');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      if (theme === 'dark') document.documentElement.classList.add('dark');
      if (mode === 'machine') document.documentElement.classList.add('machine');
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
