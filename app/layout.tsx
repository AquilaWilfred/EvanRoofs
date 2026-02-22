import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "EvanRoofs | Professional Roofing & Interior Design Services Kenya",
    template: "%s | EvanRoofs",
  },
  description:
    "EvanRoofs offers expert roofing installation, repair, waterproofing, and interior design services across Kenya. 14+ years of experience. 500+ projects completed. Get a free quote today.",
  keywords: [
    "roofing services Kenya", "roof installation Nairobi", "roof repair Kenya",
    "interior design Nairobi", "EvanRoofs", "professional roofers Kenya",
    "roofing company Nairobi", "residential roofing Kenya", "commercial roofing Kenya",
    "false ceiling Nairobi", "waterproofing Kenya", "roof contractors Kenya",
  ],
  authors: [{ name: "EvanRoofs" }],
  creator: "EvanRoofs",
  metadataBase: new URL("https://www.evanroofs.com"),
  alternates: { canonical: "https://www.evanroofs.com" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.evanroofs.com",
    siteName: "EvanRoofs",
    title: "EvanRoofs | Professional Roofing & Interior Design Services Kenya",
    description: "EvanRoofs delivers premium roofing and interior design services across Kenya. 500+ completed projects. Get a free quote.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EvanRoofs - Professional Roofing Services Kenya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EvanRoofs | Professional Roofing & Interior Design Kenya",
    description: "Expert roofing and interior design services across Kenya. Built to last, designed to impress.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "your-google-verification-code" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.evanroofs.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nairobi" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "EvanRoofs",
              "description": "Professional roofing installation, repair, and interior design services in Kenya.",
              "url": "https://www.evanroofs.com",
              "telephone": "+254700000000",
              "email": "info@evanroofs.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Roofing Lane",
                "addressLocality": "Westlands, Nairobi",
                "addressCountry": "KE"
              },
              "openingHours": "Mo-Sa 07:00-18:00",
              "priceRange": "$$",
              "sameAs": [],
              "image": "https://www.evanroofs.com/og-image.jpg"
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

