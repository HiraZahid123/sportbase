<?php

namespace App\Services;

use App\Models\Club;
use App\Models\RegistrationAttempt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class ClubValidationService
{
    /**
     * Rate limiting configuration
     */
    private const RATE_LIMIT_MAX_ATTEMPTS = 10;
    private const RATE_LIMIT_DECAY_MINUTES = 60;
    private const TIMING_ATTACK_DELAY_MS = 100;

    /**
     * Validate a club identifier with timing attack prevention
     * 
     * @param string $identifier The club identifier to validate
     * @param Request|null $request The current request for logging
     * @return Club|null The club if found, null otherwise
     */
    public function validateIdentifier(string $identifier, ?Request $request = null): ?Club
    {
        $request = $request ?? request();
        $startTime = microtime(true);
        
        // Always perform the same database operation to prevent timing attacks
        $club = Club::where('registration_identifier', $identifier)->first();
        
        // Ensure consistent timing by adding a minimum delay
        $this->ensureConsistentTiming($startTime);
        
        // Log the attempt for audit purposes
        $this->logValidationAttempt($identifier, $club, $request);
        
        return $club;
    }

    /**
     * Check if the current request is rate limited
     * 
     * @param Request|null $request The current request
     * @return bool True if rate limited, false otherwise
     */
    public function isRateLimited(?Request $request = null): bool
    {
        $request = $request ?? request();
        $key = $this->getRateLimitKey($request);
        
        return RateLimiter::tooManyAttempts($key, self::RATE_LIMIT_MAX_ATTEMPTS);
    }

    /**
     * Apply rate limiting for club validation attempts
     * 
     * @param Request|null $request The current request
     * @return void
     */
    public function applyRateLimit(?Request $request = null): void
    {
        $request = $request ?? request();
        $key = $this->getRateLimitKey($request);
        
        RateLimiter::hit($key, self::RATE_LIMIT_DECAY_MINUTES * 60);
    }

    /**
     * Get the remaining rate limit attempts
     * 
     * @param Request|null $request The current request
     * @return int Number of remaining attempts
     */
    public function getRemainingAttempts(?Request $request = null): int
    {
        $request = $request ?? request();
        $key = $this->getRateLimitKey($request);
        
        return RateLimiter::remaining($key, self::RATE_LIMIT_MAX_ATTEMPTS);
    }

    /**
     * Get the rate limit retry after time in seconds
     * 
     * @param Request|null $request The current request
     * @return int Seconds until rate limit resets
     */
    public function getRetryAfter(?Request $request = null): int
    {
        $request = $request ?? request();
        $key = $this->getRateLimitKey($request);
        
        return RateLimiter::availableIn($key);
    }

    /**
     * Generate a unique identifier for a club
     * 
     * @return string A unique UUID identifier
     */
    public function generateUniqueIdentifier(): string
    {
        do {
            $identifier = (string) Str::uuid();
        } while (Club::where('registration_identifier', $identifier)->exists());
        
        return $identifier;
    }

    /**
     * Validate that an identifier is properly formatted
     * 
     * @param string $identifier The identifier to validate
     * @return bool True if valid format, false otherwise
     */
    public function isValidIdentifierFormat(string $identifier): bool
    {
        // UUID v4 format validation
        return Str::isUuid($identifier);
    }

    /**
     * Log a validation attempt for audit purposes
     * 
     * @param string $identifier The identifier that was validated
     * @param Club|null $club The club found (if any)
     * @param Request $request The current request
     * @return void
     */
    private function logValidationAttempt(string $identifier, ?Club $club, Request $request): void
    {
        $success = !is_null($club);
        
        // Log to Laravel's logging system
        Log::info('Club registration identifier validation attempt', [
            'identifier' => $identifier,
            'found' => $success,
            'club_id' => $club?->id,
            'club_name' => $club?->name,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp' => now()->toISOString(),
            'session_id' => $request->hasSession() ? $request->session()->getId() : null,
        ]);

        // Create audit record in database
        RegistrationAttempt::logAttempt([
            'club_identifier' => $identifier,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'success' => $success,
            'club_id' => $club?->id,
            'registration_source' => 'club-specific',
            'error_message' => $success ? null : 'Invalid club identifier',
        ]);
    }

    /**
     * Ensure consistent timing to prevent timing attacks
     * 
     * @param float $startTime The start time of the operation
     * @return void
     */
    private function ensureConsistentTiming(float $startTime): void
    {
        $elapsedMs = (microtime(true) - $startTime) * 1000;
        $remainingMs = max(0, self::TIMING_ATTACK_DELAY_MS - $elapsedMs);
        
        if ($remainingMs > 0) {
            usleep($remainingMs * 1000); // Convert to microseconds
        }
    }

    /**
     * Generate a rate limiting key for the current request
     * 
     * @param Request $request The current request
     * @return string The rate limiting key
     */
    private function getRateLimitKey(Request $request): string
    {
        return 'club_validation:' . $request->ip();
    }

    /**
     * Get validation statistics for monitoring
     * 
     * @param int $hours Number of hours to look back
     * @return array Statistics about validation attempts
     */
    public function getValidationStats(int $hours = 24): array
    {
        $attempts = RegistrationAttempt::where('registration_source', 'club-specific')
            ->where('created_at', '>=', now()->subHours($hours))
            ->get();

        $uniqueIps = $attempts->pluck('ip_address')->unique()->count();
        $uniqueIdentifiers = $attempts->pluck('club_identifier')->unique()->count();

        return [
            'total_attempts' => $attempts->count(),
            'successful_attempts' => $attempts->where('success', true)->count(),
            'failed_attempts' => $attempts->where('success', false)->count(),
            'unique_ips' => $uniqueIps,
            'unique_identifiers' => $uniqueIdentifiers,
            'success_rate' => $attempts->count() > 0 ? 
                round(($attempts->where('success', true)->count() / $attempts->count()) * 100, 2) : 0,
            'period_hours' => $hours,
        ];
    }

    /**
     * Check if an IP address has suspicious activity
     * 
     * @param string $ipAddress The IP address to check
     * @param int $hours Number of hours to look back
     * @return bool True if suspicious activity detected
     */
    public function hasSuspiciousActivity(string $ipAddress, int $hours = 1): bool
    {
        $attempts = RegistrationAttempt::fromIp($ipAddress)
            ->recent($hours)
            ->get();

        $failedAttempts = $attempts->where('success', false)->count();
        $uniqueIdentifiers = $attempts->pluck('club_identifier')->unique()->count();

        // Consider suspicious if:
        // - More than 5 failed attempts in the time period
        // - Trying more than 3 different identifiers
        return $failedAttempts > 5 || $uniqueIdentifiers > 3;
    }

    /**
     * Clear rate limiting for a specific IP (admin function)
     * 
     * @param string $ipAddress The IP address to clear
     * @return void
     */
    public function clearRateLimit(string $ipAddress): void
    {
        $key = 'club_validation:' . $ipAddress;
        RateLimiter::clear($key);
    }
}