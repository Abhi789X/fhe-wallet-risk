import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FHE Wallet Risk Checker',
  description: 'Private wallet scoring using Fully Homomorphic Encryption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
