<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Service;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

class SitemapController extends Controller
{
    public function robots(): Response
    {
        $content = "User-agent: *\nAllow: /\n\nSitemap: ".url('/sitemap.xml')."\n";

        return response($content, 200, ['Content-Type' => 'text/plain']);
    }

    public function sitemap(): Response
    {
        $latestService = Service::max('updated_at');
        $latestArticle = Article::published()->max('updated_at');

        $pages = [
            ['path' => '/', 'priority' => '1.0', 'changefreq' => 'weekly', 'lastmod' => $latestService],
            ['path' => '/layanan', 'priority' => '0.9', 'changefreq' => 'weekly', 'lastmod' => $latestService],
            ['path' => '/artikel', 'priority' => '0.8', 'changefreq' => 'daily', 'lastmod' => $latestArticle],
            ['path' => '/cek-ongkir', 'priority' => '0.7', 'changefreq' => 'monthly', 'lastmod' => null],
            ['path' => '/tentang-kami', 'priority' => '0.6', 'changefreq' => 'monthly', 'lastmod' => null],
            ['path' => '/kontak', 'priority' => '0.6', 'changefreq' => 'monthly', 'lastmod' => null],
        ];

        foreach (Service::active()->get(['slug', 'updated_at']) as $service) {
            $pages[] = [
                'path' => "/layanan/{$service->slug}",
                'priority' => '0.7',
                'changefreq' => 'monthly',
                'lastmod' => $service->updated_at,
            ];
        }

        foreach (Article::published()->get(['slug', 'updated_at']) as $article) {
            $pages[] = [
                'path' => "/artikel/{$article->slug}",
                'priority' => '0.6',
                'changefreq' => 'monthly',
                'lastmod' => $article->updated_at,
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
        foreach ($pages as $page) {
            $xml .= '  <url><loc>'.e(url($page['path'])).'</loc>';
            if ($page['lastmod']) {
                $xml .= '<lastmod>'.Carbon::parse($page['lastmod'])->toAtomString().'</lastmod>';
            }
            $xml .= '<changefreq>'.$page['changefreq'].'</changefreq>';
            $xml .= '<priority>'.$page['priority'].'</priority>';
            $xml .= '</url>'."\n";
        }
        $xml .= '</urlset>'."\n";

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
