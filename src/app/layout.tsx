import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://markwise.ai'),
  title: 'Markwise | Enterprise Brand Governance',
  description:
    'Review marketing and corporate copy against your brand rules and approved evidence. Get clear explanations, suggested edits, and a traceable approval history.',
  openGraph: {
    title: 'Markwise | Enterprise Brand Governance',
    description:
      'Deterministic pre-publish review, causal explainability, and cryptographic brand audit trails for enterprise legal and marketing teams.',
    url: 'https://markwise.ai',
    siteName: 'Markwise',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Markwise Enterprise AI Brand Governance Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markwise | Enterprise Brand Governance',
    description:
      'Review marketing copy against brand rules and approved evidence with causal explainability.',
    images: ['/og-image.png'],
    creator: '@markwise',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#F47745]/20 selection:text-[#174C3B]">
        {/* Accessible Skip to Main Content Link for Keyboard and Screen Readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#F47745] focus:text-white focus:font-semibold focus:text-sm focus:rounded-lg focus:shadow-xl focus:ring-2 focus:ring-[#123B2F] focus:outline-none transition-all"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
