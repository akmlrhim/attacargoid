<?php

namespace App\Http\Middleware;

use App\Models\PageVisit;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class TrackPageVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->isMethod('get') && $response->isSuccessful()) {
            $this->record($request);
        }

        return $response;
    }

    /**
     * Analytics must never break a page that already rendered successfully, so
     * any failure here is swallowed and logged instead of bubbling up as a 500.
     */
    private function record(Request $request): void
    {
        try {
            PageVisit::create([
                'path' => Str::limit('/'.ltrim($request->path(), '/'), 250, ''),
                'ip_address' => $request->ip(),
                'user_agent' => Str::limit((string) $request->userAgent(), 1000, ''),
                'referer' => Str::limit((string) $request->headers->get('referer', ''), 1000, '') ?: null,
            ]);
        } catch (Throwable $e) {
            Log::warning('Failed to record page visit.', ['exception' => $e]);
        }
    }
}
