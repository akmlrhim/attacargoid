<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ThrottleSearch
{
    public function __construct(private readonly Throttle $throttle) {}

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (trim((string) $request->query('q')) === '') {
            return $next($request);
        }

        return $this->throttle->handle($request, $next, 'search');
    }
}
