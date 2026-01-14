<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SubscriptionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        if ($user->role === 'club') {
            if (!$user->subscribed('default')) {
                return redirect()->route('subscription.index');
            }
        }

        if ($user->role === 'athlete') {
            // Check if athlete has paid
            if (!$user->subscribed('default')) {
                return redirect()->route('subscription.index');
            }

            // Check if their club has paid
            $athleteProfile = $user->athleteProfile;
            if ($athleteProfile && $athleteProfile->club) {
                if (!$athleteProfile->club->user->subscribed('default')) {
                    return Inertia::render('Errors/ClubUnpaid');
                }
            }
        }

        return $next($request);
    }
}
