import AuthLayout from "@/components/auth/layout";
import AuthSignup from "@/components/auth/signup";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "signup",
    locale,
  });
}

export default async function SigninPage() {
  return (
    <AuthLayout>
      <AuthSignup />
    </AuthLayout>
  );
}
