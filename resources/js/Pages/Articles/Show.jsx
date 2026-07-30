import { Link } from "@inertiajs/react";
import AppLayout from "../../Components/Layout/AppLayout";
import PageHead from "../../Components/Shared/PageHead";
import ArticleCard from "../../Components/Articles/ArticleCard";
import ShareLinks from "../../Components/Articles/ShareLinks";
import formatDate from "../../utils/formatDate";

export default function ArticleShow({
  article,
  relatedArticles = [],
  shareImage,
}) {
  return (
    <>
      <PageHead
        title={article.title}
        description={article.excerpt}
        path={`/artikel/${article.slug}`}
        image={article.image_url}
        shareImage={shareImage}
        imageAlt={article.image_alt || article.title}
        ogType="article"
        publishedTime={article.published_at}
        modifiedTime={article.updated_at}
      />

      <article className="bg-white pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm mb-6"
          >
            <Link
              href="/"
              className="text-gray-500 hover:text-navy transition-colors"
            >
              Beranda
            </Link>
            <span className="text-gray-300 select-none">/</span>
            <Link
              href="/artikel"
              className="text-gray-500 hover:text-navy transition-colors"
            >
              Artikel
            </Link>
            <span className="text-gray-300 select-none">/</span>
            <span className="text-orange font-medium truncate">
              {article.title}
            </span>
          </nav>

          <h1 className="text-2xl sm:text-4xl font-black text-navy leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5a1.25 1.25 0 00-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5a1.25 1.25 0 00-1.25-1.25H4.75z"
                clipRule="evenodd"
              />
            </svg>
            {formatDate(article.published_at)}
          </div>

          {article.image_url && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <img
                src={article.image_url}
                alt={article.image_alt || article.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[56px_1fr] gap-6 lg:gap-14">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <ShareLinks
                title={article.title}
                path={`/artikel/${article.slug}`}
              />
            </div>

            <div
              className="text-black text-base leading-relaxed
                [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-black [&>h2]:text-navy [&>h2]:mt-8 [&>h2]:mb-4
                [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-3
                [&>p]:mb-5
                [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-1
                [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol]:space-y-1
                [&>blockquote]:border-l-4 [&>blockquote]:border-orange [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6
                [&_a]:text-orange [&_a]:underline [&_a]:font-medium
                [&_img]:rounded-2xl [&_img]:my-6
                [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-black text-navy mb-8">
              Artikel Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

ArticleShow.layout = (page) => <AppLayout>{page}</AppLayout>;
