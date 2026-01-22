<?php

namespace App\Http\Controllers\Examples;

use App\Http\Controllers\Controller;
use App\Services\ClubValidationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * Example controller demonstrating ClubValidationService usage
 * This is for demonstration purposes and shows how the service
 * would be integrated into actual controllers.
 */
class ClubValidationExampleController extends Controller
{
    private ClubValidationService $clubValidationService;

    public function __construct(ClubValidationService $clubValidationService)
    {
        $this->clubValidationService = $clubValidationService;
    }

    /**
     * Example of how to validate a club identifier in a controller
     */
    public function validateClub(Request $request, string $identifier): JsonResponse
    {
        // Check rate limiting first
        if ($this->clubValidationService->isRateLimited($request)) {
            return response()->json([
                'error' => 'Too many attempts. Please try again later.',
                'retry_after' => $this->clubValidationService->getRetryAfter($request)
            ], 429);
        }

        // Apply rate limiting
        $this->clubValidationService->applyRateLimit($request);

        // Validate the identifier format first
        if (!$this->clubValidationService->isValidIdentifierFormat($identifier)) {
            return response()->json([
                'error' => 'Invalid identifier format',
                'valid' => false
            ], 400);
        }

        // Validate the club identifier
        $club = $this->clubValidationService->validateIdentifier($identifier, $request);

        if ($club) {
            return response()->json([
                'valid' => true,
                'club' => [
                    'id' => $club->id,
                    'name' => $club->name,
                    'registration_url' => $club->registration_url
                ]
            ]);
        }

        return response()->json([
            'valid' => false,
            'error' => 'Club not found'
        ], 404);
    }

    /**
     * Example of how to get validation statistics
     */
    public function getValidationStats(): JsonResponse
    {
        $stats = $this->clubValidationService->getValidationStats(24);
        
        return response()->json($stats);
    }

    /**
     * Example of how to check for suspicious activity
     */
    public function checkSuspiciousActivity(Request $request): JsonResponse
    {
        $ipAddress = $request->ip();
        $isSuspicious = $this->clubValidationService->hasSuspiciousActivity($ipAddress);
        
        return response()->json([
            'ip_address' => $ipAddress,
            'suspicious' => $isSuspicious,
            'remaining_attempts' => $this->clubValidationService->getRemainingAttempts($request)
        ]);
    }

    /**
     * Example of how to generate a new unique identifier
     */
    public function generateIdentifier(): JsonResponse
    {
        $identifier = $this->clubValidationService->generateUniqueIdentifier();
        
        return response()->json([
            'identifier' => $identifier,
            'format_valid' => $this->clubValidationService->isValidIdentifierFormat($identifier)
        ]);
    }
}