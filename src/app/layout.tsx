import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import "./kinetic.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chat from "@/components/chat";
import { profile } from "@/lib/content";

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
      "From complex to useful. Explore my work, experience, and approach to building software.",
    images: ["/aljasonch.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/aljasonch.png" },
};

const themeScript = `try{var s=localStorage.getItem("theme");var d=s==="light"||s==="dark"?s:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=d}catch(e){}`;

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
    <html lang="en" suppressHydrationWarning>
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
