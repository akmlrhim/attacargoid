<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class Throttle
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $limiter): Response
    {
        $resolve = RateLimiter::limiter($limiter);

        if ($resolve === null) {
            return $next($request);
        }

        $limits = Arr::wrap($resolve($request));

        foreach ($limits as $limit) {
            if (RateLimiter::tooManyAttempts($limit->key, $limit->maxAttempts)) {
                return $this->tooMany($request, $limit, RateLimiter::availableIn($limit->key));
            }
        }

        foreach ($limits as $limit) {
            RateLimiter::hit($limit->key, $limit->decaySeconds);

            if ($limit->responseCallback !== null) {
                $limit->responseCallback($limit);
            }
        }

        return $next($request);
    }

    private function tooMany(Request $request, Limit $limit, int $retryAfter): Response
    {
        $headers = [
            'Retry-After' => (string) $retryAfter,
            'X-RateLimit-Limit' => (string) $limit->maxAttempts,
            'X-RateLimit-Remaining' => '0',
        ];

        if (! $request->inertia() && $request->expectsJson()) {
            return response()->json(
                ['message' => "Terlalu banyak permintaan. Coba lagi dalam {$retryAfter} detik."],
                429,
                $headers,
            );
        }

        return Inertia::render('ErrorPage', ['status' => 429])
            ->toResponse($request)
            ->setStatusCode(429)
            ->withHeaders($headers);
    }
}
