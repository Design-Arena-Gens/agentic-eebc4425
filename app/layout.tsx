import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUXOR9 Orchestration Layer",
  description: "Master orchestrator for multi-agent task management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
