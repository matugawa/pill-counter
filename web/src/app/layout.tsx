import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pill Counter PoC",
  description: "Next.js + Camera + YOLO Demo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
