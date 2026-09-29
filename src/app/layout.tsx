import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { COMPANY } from "@/lib/constants";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

// Self-hosted variable fonts (latin subset). next/font/google is avoided so
// builds never depend on a live Google Fonts request — Google's css2 API
// sometimes returns extensionless /l/font URLs that break builds
// (see vercel/next.js#99114).
const sourceSans = localFont({
  src: "./fonts/source-sans-3-variable.woff2",
  weight: "200 900",
  variable: "--font-source-sans",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/cormorant-garamond-variable.woff2",
  weight: "300 700",
  variable: "--font-cormorant",
  display: "swap",
});

const url = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Steppingstone Realty | Georgetown, Guyana",
    template: "%s | Steppingstone Realty",
  },
  description:
    "Steppingstone Realty provides estate agency services in Guyana, including property sales, rentals, letting, brokerage, valuation, and property administration and management. Based in Georgetown.",
  keywords: [
    "Steppingstone Realty",
    "real estate Guyana",
    "properties for sale Guyana",
    "properties for rent Guyana",
    "property management Guyana",
    "Georgetown real estate",
    "letting services Guyana",
  ],
  authors: [{ name: COMPANY.principal }],
  openGraph: {
    type: "website",
    locale: "en_GY",
    url,
    siteName: COMPANY.name,
    title: "Steppingstone Realty | Georgetown, Guyana",
    description:
      "Estate agency services in Guyana: property sales, rentals, letting, brokerage, valuation, and property management. Principal Realtor Deji Aderemi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steppingstone Realty",
    description:
      "Estate agency services in Georgetown, Guyana — sales, rentals, letting, and property care.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
