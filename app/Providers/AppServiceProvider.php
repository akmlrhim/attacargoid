<?php

namespace App\Providers;

use App\Models\CompanySetting;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Inertia\ExceptionResponse;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerRateLimiters();

        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        View::composer('app', function ($view) {
            $view->with('company', CompanySetting::current());
        });

        Inertia::handleExceptionsUsing(function (ExceptionResponse $response) {
            if (in_array($response->statusCode(), [403, 404, 419, 429, 500, 503])) {
                return $response->render('ErrorPage', [
                    'status' => $response->statusCode(),
                ])->withSharedData();
            }
        });
    }

    private function registerRateLimiters(): void
    {
        RateLimiter::for('site', function (Request $request) {
            return Limit::perMinute(120)->by('site:'.$request->ip());
        });

        RateLimiter::for('contact', function (Request $request) {
            $ip = $request->ip();

            return [
                Limit::perMinute(3)->by('contact:burst:'.$ip),
                Limit::perHour(10)->by('contact:hour:'.$ip),
                Limit::perDay(20)->by('contact:day:'.$ip),
            ];
        });

        RateLimiter::for('search', function (Request $request) {
            return Limit::perMinute(30)->by('search:'.$request->ip());
        });

        RateLimiter::for('admin-login', function (Request $request) {
            return Limit::perMinute(20)->by('admin-login:'.$request->ip());
        });
    }
}
