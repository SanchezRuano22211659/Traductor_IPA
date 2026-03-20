// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Traductor Ingles - IPA",
  description: "Traductor de ingles a IPA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />

        <main>{children}</main>

        <footer className="site-footer">
          <p>© 2024 IPA Tech - Proyecto de IA para Ingeniería en Sistemas</p>
        </footer>
      </body>
    </html>
  );
}