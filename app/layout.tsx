import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { ToastProvider } from "@/components/ui/toast";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
});

const lora = Lora({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vquranschool.com"),
  title: {
    default: "vQuranSchool – #1 Online Quran Academy | Book Free Trial Class",
    template: "%s | vQuranSchool – Online Quran Classes",
  },
  description:
    "Join vQuranSchool for premium 1-on-1 live online Quran classes with certified male & female tutors. Courses in Noorani Qaida, Tajweed, Nazra & Hifz. Serving UK, USA, Canada & Australia. Book your FREE trial today!",
  keywords: [
    "online quran classes",
    "learn quran online",
    "online quran tutor",
    "quran classes for kids",
    "online quran academy",
    "best online quran classes",
    "quran classes uk",
    "quran classes usa",
    "quran classes canada",
    "quran classes australia",
    "tajweed classes online",
    "hifz program online",
    "noorani qaida online",
    "female quran tutor online",
    "1 on 1 quran tutor",
    "affordable quran classes",
    "live quran classes",
    "quran for kids online",
    "book free quran trial class",
    "quran teacher online",
    "islamic education online",
    "quran classes for muslims abroad",
    "online quran school for beginners",
  ],
  authors: [{ name: "vQuranSchool", url: "https://vquranschool.com" }],
  creator: "vQuranSchool",
  publisher: "vQuranSchool",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vquranschool.com",
    siteName: "vQuranSchool",
    title: "vQuranSchool – #1 Online Quran Academy | Book Free Trial",
    description:
      "1-on-1 live online Quran classes with certified teachers. Tajweed, Hifz & Nazra for all ages. Students from UK, USA, Canada & Australia. Start learning today!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "vQuranSchool – Online Quran Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "vQuranSchool – Online Quran Classes with Certified Tutors",
    description:
      "Learn Quran online with 1-on-1 certified tutors. Flexible schedule. Students from UK, USA, Canada & Australia. Book your FREE trial now!",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://vquranschool.com",
  },
  category: "Education",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "vQuranSchool",
  alternateName: "vquranschool",
  url: "https://vquranschool.com",
  logo: "https://vquranschool.com/logo.png",
  description:
    "vQuranSchool is a premium online Quran academy offering 1-on-1 live classes in Noorani Qaida, Nazra, Tajweed, and Hifz with certified male and female teachers for students worldwide.",
  telephone: "+92-304-4296295",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+92-304-4296295",
      contactType: "customer service",
      availableLanguage: ["English", "Urdu", "Arabic"],
    },
  ],
  sameAs: ["https://wa.me/923044296295"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  areaServed: ["GB", "US", "CA", "AU", "PK", "IN", "AE"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Online Quran Courses",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Course", name: "Free Trial Quran Class" },
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${lora.variable} font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500/30 selection:text-blue-900`}>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <MobileStickyCTA />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
