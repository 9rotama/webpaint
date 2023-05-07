import '@/styles/globals.css';
import React from 'react';
import GlobalNav from './GlobalNav';
import { Quicksand } from '@next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${quicksand.variable}`}>
      <head>
        <title>paintapp</title>
      </head>
      <body className={`mb-5 font-quicksand text-slate-700`}>
        <GlobalNav />
        {children}
      </body>
    </html>
  );
}
