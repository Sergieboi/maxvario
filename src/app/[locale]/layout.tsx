import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "./providers";
import { routing } from "@/i18n/routing";
import { Locale } from "@/lib/types/misc";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { seoContent } from "@/lib/seo/seo";
import Header from "@/components/shared/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ locale: Locale }>
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "home",
    locale,
  });
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
