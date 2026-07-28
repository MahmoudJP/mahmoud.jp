import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getWritingArticle, writingArticles } from "@/lib/writing";
import { siteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return writingArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Mahmoud Adel`,
    description: article.description,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: { title: article.title, description: article.description, url: `${siteUrl}/writing/${article.slug}` },
  };
}

export default async function WritingArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getWritingArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="article-shell px-5 pb-24 pt-32 sm:px-8">
        <article className="article-reading mx-auto max-w-3xl">
          <Link href="/writing" className="article-back">
            <ArrowLeft className="h-4 w-4" />
            All writing
          </Link>
          <p className="article-eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.description}</p>
          <p className="article-meta"><Clock3 className="h-4 w-4" />{article.readTime}</p>

          <div className="article-body">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>

          <Link href="/#contact" className="article-cta">
            Let’s talk about your workflow <ArrowUpRight className="h-4 w-4" />
          </Link>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
