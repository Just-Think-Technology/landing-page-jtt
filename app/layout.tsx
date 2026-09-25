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
    default: "Just Think Technology · Think Smarter. Build Better.",
    template: "%s | Just Think Technology",
  },
  description:
    "Projetamos e construímos software confiável, escalável e evolutivo para problemas reais de negócio: tecnologia estruturada, engenharia sólida, impacto real.",
  metadataBase: new URL("https://jttechnology.com.br"),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Just Think Technology · Think Smarter. Build Better.",
    description:
      "Tecnologia estruturada, engenharia sólida e impacto real no negócio.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-clip scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}
