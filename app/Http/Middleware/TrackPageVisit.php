<?php

namespace App\Http\Middleware;

use App\Models\PageVisit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
            PageVisit::create([
                'path' => '/'.ltrim($request->path(), '/'),
                'ip_address' => $request->ip(),
                'user_agent' => (string) $request->userAgent(),
                'referer' => $request->headers->get('referer'),
            ]);
        }

        return $response;
    }
}
