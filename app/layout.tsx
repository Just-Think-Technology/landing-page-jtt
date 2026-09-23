import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Just Think Technology — Think Smarter. Build Better.",
    template: "%s | Just Think Technology",
  },
  description:
    "Just Think Technology (JTT) builds reliable, scalable and evolvable software for real business problems through structured engineering.",
  metadataBase: new URL("https://justthinktechnology.com"),
  openGraph: {
    title: "Just Think Technology — Think Smarter. Build Better.",
    description:
      "Structured technology, solid engineering and real business impact.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
