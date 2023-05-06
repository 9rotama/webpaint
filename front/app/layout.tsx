import '@/styles/globals.css';
import React from 'react';
import GlobalNav from './GlobalNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>paintapp</title>
      </head>
      <body className="mb-5 text-slate-700">
        <GlobalNav />
        {children}
      </body>
    </html>
  );
}
