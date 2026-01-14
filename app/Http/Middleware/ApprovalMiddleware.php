<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ApprovalMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && ($user->status === 'pending' || $user->status === 'rejected')) {
            // Allow access to registration completion routes
            if ($request->routeIs('club.register.*') || $request->routeIs('athlete.register.*') || $request->routeIs('logout')) {
                return $next($request);
            }

            if ($user->status === 'pending') {
                return Inertia::render('Auth/PendingApproval');
            }

            if ($user->status === 'rejected') {
                return Inertia::render('Auth/Rejected');
            }
        }

        return $next($request);
    }
}
