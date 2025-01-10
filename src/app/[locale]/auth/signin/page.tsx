import AuthLayout from "@/components/auth/layout";
import AuthSignin from "@/components/auth/signin";
import { seoContent } from "@/lib/seo/seo";
import { Locale } from "@/lib/types/misc";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: Locale }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  return await seoContent({
    page: "signin",
    locale,
  });
}

export default async function SigninPage() {
  return (
    <AuthLayout>
      <AuthSignin />
    </AuthLayout>
  );
}
