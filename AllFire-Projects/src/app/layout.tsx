import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AssistantWidget } from "@/components/ui/AssistantWidget";
import { company } from "@/content/company";
import "./globals.css";

// Single family for the whole site. 400/500 carry body copy, 600/700 the
// display headings, so one download covers everything.
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allfireservices.com.au"),
  title: {
    default: `${company.name} | Fire Protection Compliance, Sydney`,
    template: `%s | ${company.name}`,
  },
  description:
    "Firefighter-run fire protection compliance in Sydney. Annual Fire Safety Statements, AS1851 inspections, hydrant testing and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      className={`${rajdhani.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <MotionProvider>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AssistantWidget />
        </MotionProvider>
      </body>
    </html>
  );
}
