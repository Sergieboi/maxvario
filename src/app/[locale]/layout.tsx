import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "./providers";
import { routing } from "@/i18n/routing";
import { Locale } from "@/lib/types/misc";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang={locale}>
        <Script
          async
          defer
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA}`}
        ></Script>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Providers>
              <Header />
              <div id="smooth-wrapper">
                <div id="smooth-content">
                  {children}
                  <Footer />
                </div>
              </div>
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
