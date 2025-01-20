import Blocks from "@/components/shared/blocks/blocks";
import Container from "@/components/shared/container";
import { getStaticPage } from "@/lib/api/wp";
import { seoContent } from "@/lib/seo/seo";
import { Locale, MVBlog } from "@/lib/types/misc";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const page = await getStaticPage(slug, locale);
  return await seoContent({
    page: "single-page",
    locale,
    data: page,
  });
}

export default async function StaticPage({ params }: Props) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const page: MVBlog | null = await getStaticPage(slug, locale);
  if (!page) {
    return notFound();
  }
  return (
    <>
      {page?.yoast_head_json && (
        <script type="application/ld+json">
          {JSON.stringify(page.yoast_head_json)}
        </script>
      )}
      <Container className="min-h-screen mt-32 space-y-5 pb-24">
        <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
        <Blocks blocks={page.content_json} />
      </Container>
    </>
  );
}
