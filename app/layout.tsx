import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import CustomCursor from "@/components/CustomCursor";

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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M9HRCD2Z2D"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M9HRCD2Z2D');
            `,
          }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
