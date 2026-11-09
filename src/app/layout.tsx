import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chat from "@/components/chat";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: {
    default: "Alfonsus Jason Christian | Software Engineer",
    template: "%s | Jason Christian",
  },
  description:
    "Software engineer in Tangerang building full-stack applications and practical business systems with Next.js, React, Python, and Odoo.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jason Christian",
    title: "Alfonsus Jason Christian | Software Engineer",
    description:
      "From complex to useful. Explore my work, experience, and approach to building software.",
    images: ["/aljasonch.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/aljasonch.png" },
};

const themeScript = `try{var s=localStorage.getItem("theme");var d=s==="light"||s==="dark"?s:window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=d}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
