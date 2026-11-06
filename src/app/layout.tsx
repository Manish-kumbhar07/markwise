import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import '../index.css';

export const metadata: Metadata = {
  title: 'Markwise | Enterprise Brand Governance',
  description:
    'Review marketing copy against your brand rules and approved evidence. Get clear explanations, suggested edits, and a traceable approval history.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#F47745]/20 selection:text-[#174C3B]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

