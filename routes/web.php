<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/tentang-kami', AboutController::class)->name('about');

Route::get('/layanan', [ServiceController::class, 'index'])->name('services');

Route::get('/layanan/{slug}', [ServiceController::class, 'show'])->name('services.show');

Route::permanentRedirect('/kalkulator', '/cek-ongkir');

Route::get('/cek-ongkir', CalculatorController::class)->name('calculator');

Route::get('/kontak', [ContactController::class, 'index'])->name('contact');

Route::post('/kontak', [ContactController::class, 'store']);

Route::get('/artikel', [ArticleController::class, 'index'])->name('articles.index');

Route::get('/artikel/{slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::get('/cek-resi', TrackingController::class)->name('tracking');

Route::get('/robots.txt', [SitemapController::class, 'robots']);

Route::get('/sitemap.xml', [SitemapController::class, 'sitemap']);
