import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokémon Explorer — Interactive Pokédex',
  description:
    'A modern, interactive Pokémon explorer app built with Next.js, TypeScript, and PokéAPI. View stats, filter by types, search, and manage favorites.',
  keywords: ['Pokémon', 'Pokédex', 'Next.js', 'TypeScript', 'PokéAPI', 'React'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-200`}
      >
        {children}
      </body>
    </html>
  );
}
