<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class RegistrationRateLimitMiddleware
{
    /**
     * Rate limiting configuration for different registration endpoints
     */
    private const RATE_LIMITS = [
        'registration_form' => [
            'max_attempts' => 10,
            'decay_minutes' => 60,
            'message' => 'Too many registration page requests. Please try again later.'
        ],
        'registration_submit' => [
            'max_attempts' => 5,
            'decay_minutes' => 60,
            'message' => 'Too many registration attempts. Please try again later.'
        ],
        'club_specific' => [
            'max_attempts' => 15,
            'decay_minutes' => 60,
            'message' => 'Too many club registration requests. Please try again later.'
        ]
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $type = 'registration_form'): SymfonyResponse
    {
        // Validate rate limit type
        if (!array_key_exists($type, self::RATE_LIMITS)) {
            $type = 'registration_form';
        }

        $config = self::RATE_LIMITS[$type];
        $key = $this->getRateLimitKey($request, $type);

        // Check if rate limited
        if (RateLimiter::tooManyAttempts($key, $config['max_attempts'])) {
            return $this->buildRateLimitResponse($request, $key, $config);
        }

        // Apply rate limiting
        RateLimiter::hit($key, $config['decay_minutes'] * 60);

        $response = $next($request);

        // Add rate limit headers to response
        return $this->addRateLimitHeaders($response, $key, $config);
    }

    /**
     * Generate a rate limiting key for the request
     *
     * @param Request $request
     * @param string $type
     * @return string
     */
    private function getRateLimitKey(Request $request, string $type): string
    {
        $ip = $request->ip();
        $userAgent = md5($request->userAgent() ?? '');
        
        // For club-specific registrations, include the identifier in the key
        if ($type === 'club_specific' && $request->route('identifier')) {
            $identifier = $request->route('identifier');
            return "registration:{$type}:{$ip}:{$userAgent}:{$identifier}";
        }

        return "registration:{$type}:{$ip}:{$userAgent}";
    }

    /**
     * Build a rate limit exceeded response
     *
     * @param Request $request
     * @param string $key
     * @param array $config
     * @return SymfonyResponse
     */
    private function buildRateLimitResponse(Request $request, string $key, array $config): SymfonyResponse
    {
        $retryAfter = RateLimiter::availableIn($key);

        // For API requests or AJAX requests, return JSON
        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'message' => $config['message'],
                'retry_after' => $retryAfter,
                'retry_after_human' => $this->formatRetryAfter($retryAfter),
            ], Response::HTTP_TOO_MANY_REQUESTS)
            ->header('Retry-After', $retryAfter)
            ->header('X-RateLimit-Limit', $config['max_attempts'])
            ->header('X-RateLimit-Remaining', 0)
            ->header('X-RateLimit-Reset', now()->addSeconds($retryAfter)->timestamp);
        }

        // For web requests, redirect back with error
        return redirect()->back()
            ->with('error', $config['message'])
            ->with('retry_after', $retryAfter)
            ->with('retry_after_human', $this->formatRetryAfter($retryAfter))
            ->header('Retry-After', $retryAfter);
    }

    /**
     * Add rate limit headers to the response
     *
     * @param SymfonyResponse $response
     * @param string $key
     * @param array $config
     * @return SymfonyResponse
     */
    private function addRateLimitHeaders(SymfonyResponse $response, string $key, array $config): SymfonyResponse
    {
        $remaining = RateLimiter::remaining($key, $config['max_attempts']);
        $resetTime = now()->addSeconds(RateLimiter::availableIn($key))->timestamp;

        $response->headers->set('X-RateLimit-Limit', $config['max_attempts']);
        $response->headers->set('X-RateLimit-Remaining', max(0, $remaining));
        $response->headers->set('X-RateLimit-Reset', $resetTime);

        return $response;
    }

    /**
     * Format retry after time in human readable format
     *
     * @param int $seconds
     * @return string
     */
    private function formatRetryAfter(int $seconds): string
    {
        if ($seconds < 60) {
            return "{$seconds} seconds";
        }

        $minutes = ceil($seconds / 60);
        if ($minutes < 60) {
            return "{$minutes} minutes";
        }

        $hours = ceil($minutes / 60);
        return "{$hours} hours";
    }

    /**
     * Get rate limit statistics for monitoring
     *
     * @param Request $request
     * @param string $type
     * @return array
     */
    public static function getRateLimitStats(Request $request, string $type = 'registration_form'): array
    {
        if (!array_key_exists($type, self::RATE_LIMITS)) {
            $type = 'registration_form';
        }

        $config = self::RATE_LIMITS[$type];
        $key = (new self())->getRateLimitKey($request, $type);

        return [
            'type' => $type,
            'max_attempts' => $config['max_attempts'],
            'remaining' => RateLimiter::remaining($key, $config['max_attempts']),
            'retry_after' => RateLimiter::availableIn($key),
            'is_rate_limited' => RateLimiter::tooManyAttempts($key, $config['max_attempts']),
        ];
    }

    /**
     * Clear rate limit for a specific request (admin function)
     *
     * @param Request $request
     * @param string $type
     * @return void
     */
    public static function clearRateLimit(Request $request, string $type = 'registration_form'): void
    {
        if (!array_key_exists($type, self::RATE_LIMITS)) {
            $type = 'registration_form';
        }

        $key = (new self())->getRateLimitKey($request, $type);
        RateLimiter::clear($key);
    }
}