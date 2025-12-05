import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Witty Wolf Studio - Design & Marketing",
  description: "Projetamos de forma inesquecível identidades e marketing nítido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
