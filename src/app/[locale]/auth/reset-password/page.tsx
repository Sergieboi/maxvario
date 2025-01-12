import AuthLayout from "@/components/auth/layout";
import AuthResetPassword from "@/components/auth/reset-password";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "resetPassword",
    locale,
  });
}

export default async function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthResetPassword />
    </AuthLayout>
  );
}
