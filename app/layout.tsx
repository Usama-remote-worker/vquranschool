import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/ui/toast";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "vquranschool - Premium Online Quran Academy | Learn Quran from Certified Teachers",
  description: "Join vquranschool for 1-on-1 online Quran classes with certified teachers. Courses in Nazra, Tajweed, Hifz & Islamic Studies. Flexible scheduling. Book your free trial today!",
  keywords: "online quran classes, quran tutor, learn quran online, tajweed, hifz, islamic education, quran for kids",
  openGraph: {
    title: "vquranschool - Premium Online Quran Academy",
    description: "1-on-1 online Quran classes with certified teachers. Book your free trial today!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500/30 selection:text-blue-900`}>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
