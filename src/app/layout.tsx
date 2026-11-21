import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chat from "@/components/chat";
import { profile } from "@/lib/content";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  alternates: { canonical: "/" },
  title: {
    default: "Alfonsus Jason Christian — Software Engineer",
    template: "%s — Jason Christian",
  },
  description:
    "Software engineer in Tangerang building full-stack applications and practical business systems with Next.js, React, Python, PostgreSQL, and Odoo.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jason Christian",
    title: "Alfonsus Jason Christian — Software Engineer",
    description:
      "Full-stack applications, enterprise ERP systems, and practical AI workflows by Alfonsus Jason Christian.",
    images: ["/aljasonch.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/aljasonch.png" },
};

const themeScript = `try{var s=localStorage.getItem("theme");document.documentElement.dataset.theme=s==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${profile.website}/#website`,
      url: profile.website,
      name: profile.name,
      description:
        "Portfolio of Alfonsus Jason Christian, Software Engineer in Tangerang, Indonesia.",
    },
    {
      "@type": "Person",
      "@id": `${profile.website}/#person`,
      name: profile.name,
      alternateName: "Jason Christian",
      jobTitle: profile.role,
      url: profile.website,
      email: `mailto:${profile.email}`,
      sameAs: [profile.github, profile.linkedin, profile.instagram],
      worksFor: {
        "@type": "Organization",
        name: "PT Solusi Kode Indonesia",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Multimedia Nusantara",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tangerang",
        addressCountry: "ID",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Chat />
      </body>
    </html>
  );
}
