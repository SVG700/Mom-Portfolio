import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: {
    default: "CA Kavya Patnam | Chartered Accountant",
    template: "%s | CA Kavya Patnam"
  },
  description:
    "Professional portfolio of CA Kavya Patnam, Chartered Accountant and Financial Consultant based in Mysuru, Karnataka.",
  keywords: [
    "CA Kavya Patnam",
    "Chartered Accountant",
    "Financial Consultant",
    "Audit",
    "Tax Consulting",
    "Mysuru"
  ],
  openGraph: {
    title: "CA Kavya Patnam | Chartered Accountant",
    description:
      "Partnering in Financial Success through audit, taxation, advisory, and strategic financial consulting.",
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "CA Kavya Patnam | Chartered Accountant",
    description:
      "Partnering in Financial Success through audit, taxation, advisory, and strategic financial consulting."
  },
  metadataBase: new URL("https://example.vercel.app")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>{children}</body>
    </html>
  );
}
