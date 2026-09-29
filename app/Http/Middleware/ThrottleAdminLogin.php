<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ThrottleAdminLogin
{
    public function __construct(private readonly Throttle $throttle) {}

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $routeName = $request->route()?->getName();

        if (! is_string($routeName) || ! str_ends_with($routeName, '.auth.login')) {
            return $next($request);
        }

        return $this->throttle->handle($request, $next, 'admin-login');
    }
}
