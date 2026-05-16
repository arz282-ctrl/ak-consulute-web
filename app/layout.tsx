import type { Metadata } from 'next';
import { Inter, Sora, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Manrope — open-source stand-in for Google Sans (Product Sans).
// Same geometric warmth, available weights 200–800.
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-google-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Anwar Khan — Legal Consultant & Immigration Expert | London, UK',
  description:
    'In practice since 2004. Personalized legal support across Immigration, Family Law, Wills & Probate, Property Conveyancing and more. Transparent, fixed fees. Multilingual: English & Bengali.',
  keywords: [
    'Anwar Khan',
    'Legal Consultant London',
    'Immigration Lawyer UK',
    'Family Law East London',
    'Conveyancing',
    'Bengali Legal Advisor',
    'akconsultant.uk',
  ],
  openGraph: {
    title: 'Anwar Khan — Legal Consultant & Immigration Expert',
    description:
      '20+ years of trusted legal counsel in London. Book a confidential consultation today.',
    type: 'website',
    locale: 'en_GB',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${manrope.variable}`}>
      <body className="font-sans bg-white text-secondary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
