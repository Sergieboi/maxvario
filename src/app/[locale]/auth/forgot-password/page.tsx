import AuthForgotPassword from "@/components/auth/forgot-password";
import AuthLayout from "@/components/auth/layout";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "forgotPassword",
    locale,
  });
}

export default async function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthForgotPassword />
    </AuthLayout>
  );
}
