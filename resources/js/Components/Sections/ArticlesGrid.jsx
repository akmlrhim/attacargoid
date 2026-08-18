import ArticleCard from "../Articles/ArticleCard";
import Pagination from "../Shared/Pagination";

export default function ArticlesGrid({ articles }) {
  const items = articles?.data ?? [];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            Belum ada artikel tersedia.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {items.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination paginator={articles} />
          </>
        )}
      </div>
    </section>
  );
}
