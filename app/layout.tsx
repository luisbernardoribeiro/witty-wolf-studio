import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import CustomCursor from "@/components/CustomCursor";
import LiquidCursor from "@/components/LiquidCursor";

export const metadata: Metadata = {
  title: "Witty Wolf Studio - Design & Marketing",
  description: "Projetamos de forma inesquecível identidades e marketing nítido.",
  other: {
    'cache-control': 'no-cache, no-store, max-age=0',
  },
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
        {/* Only show cursors on desktop */}
        <div className="hidden md:block">
          <LiquidCursor />
          <CustomCursor />
        </div>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
