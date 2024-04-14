import { MainProvider } from "@/components/context/main";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stealth Keystore",
  description: "Stealth Keystore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MainProvider>
        <body className={inter.className}>{children}</body>
      </MainProvider>
    </html>
  );
}
