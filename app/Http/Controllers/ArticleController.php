<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q'));
        $dateFrom = $this->parseDate($request->query('from'));
        $dateTo = $this->parseDate($request->query('to'));

        $articles = Article::published()
            ->when($search !== '', fn (Builder $query) => $this->applySearch($query, $search))
            ->when($dateFrom, fn (Builder $query) => $query->whereDate('published_at', '>=', $dateFrom))
            ->when($dateTo, fn (Builder $query) => $query->whereDate('published_at', '<=', $dateTo))
            ->paginate(9, ['id', 'title', 'slug', 'excerpt', 'image_url', 'image_alt', 'published_at'])
            ->onEachSide(1)
            ->withQueryString()
            ->through(fn ($a) => array_merge($a->toArray(), ['image_url' => resolveImageUrl($a->image_url)]));

        if ($articles->isEmpty() && $articles->currentPage() > 1) {
            abort(404);
        }

        $page = $articles->currentPage();

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'activeSearch' => Str::limit($search, 80, ''),
            'activeDateFrom' => $dateFrom,
            'activeDateTo' => $dateTo,
        ])
            ->withViewData(['seo' => array_merge(
                pageSeo(
                    'Artikel & Berita Seputar Ekspedisi Kalimantan'.($page > 1 ? " - Halaman {$page}" : ''),
                    'Kumpulan artikel dan berita terbaru seputar jasa ekspedisi, cargo, dan logistik dari ATTA Cargo untuk wilayah Kalimantan Selatan & Tengah.'.($page > 1 ? " Halaman {$page} dari {$articles->lastPage()}." : ''),
                    $page > 1 ? "/artikel?page={$page}" : '/artikel',
                ),
                ['breadcrumbs' => [
                    ['name' => 'Beranda', 'url' => url('/')],
                    ['name' => 'Artikel', 'url' => url('/artikel')],
                ]],
            )]);
    }

    private function applySearch(Builder $query, string $search): void
    {
        if ($query->getConnection()->getDriverName() === 'mysql') {
            $query->whereFullText(['title', 'excerpt'], $search);

            return;
        }

        $query->where(function (Builder $query) use ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('excerpt', 'like', "%{$search}%");
        });
    }

    private function parseDate(?string $value): ?string
    {
        if (! $value || ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
            return null;
        }

        [$year, $month, $day] = array_map('intval', explode('-', $value));

        return checkdate($month, $day, $year) ? $value : null;
    }

    public function show(string $slug): Response
    {
        $article = Article::published()->where('slug', $slug)->firstOrFail();
        $article->image_url = resolveImageUrl($article->image_url);

        $relatedArticles = Article::published()
            ->where('id', '!=', $article->id)
            ->limit(3)
            ->get(['id', 'title', 'slug', 'excerpt', 'image_url', 'image_alt', 'published_at'])
            ->map(fn ($a) => array_merge($a->toArray(), ['image_url' => resolveImageUrl($a->image_url)]));

        $articleSeo = pageSeo(
            $article->title,
            $article->excerpt,
            "/artikel/{$article->slug}",
            $article->image_url,
            $article->image_alt ?: $article->title,
        );

        return Inertia::render('Articles/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
            'shareImage' => $articleSeo['image'],
        ])->withViewData(['seo' => array_merge(
            $articleSeo,
            [
                'og_type' => 'article',
                'share_title' => $article->title,
                'published_time' => $article->published_at?->toAtomString(),
                'modified_time' => $article->updated_at?->toAtomString(),
                'breadcrumbs' => [
                    ['name' => 'Beranda', 'url' => url('/')],
                    ['name' => 'Artikel', 'url' => url('/artikel')],
                    ['name' => $article->title, 'url' => url("/artikel/{$article->slug}")],
                ],
                'jsonld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Article',
                    'headline' => $article->title,
                    'description' => $article->excerpt,

                    'image' => array_values(array_filter([$articleSeo['image'], $article->image_url])),
                    'datePublished' => $article->published_at?->toAtomString(),
                    'dateModified' => $article->updated_at?->toAtomString(),
                    'author' => [
                        '@type' => 'Organization',
                        'name' => 'ATTA Cargo',
                        '@id' => url('/').'#organization',
                    ],
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => 'ATTA Cargo',
                        '@id' => url('/').'#organization',
                    ],
                    'mainEntityOfPage' => url("/artikel/{$article->slug}"),
                ],
            ],
        )]);
    }
}
