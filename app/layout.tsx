import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pogodi Zastavu - Flag Guessing Game",
  description:
    "Test your knowledge of world flags with this interactive guessing game!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="https://analytics.bitsandpieces.cloud/script.js" data-website-id="ed4fc46e-f9d0-44eb-a616-37ec3c9888d0"></script>
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col pt-8 md:pt-12">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
