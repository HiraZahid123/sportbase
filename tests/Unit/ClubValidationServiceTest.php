<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\ClubValidationService;
use App\Models\Club;
use App\Models\RegistrationAttempt;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class ClubValidationServiceTest extends TestCase
{
    use RefreshDatabase;

    private ClubValidationService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ClubValidationService();
    }

    /** @test */
    public function it_validates_existing_club_identifier()
    {
        // Arrange
        $club = Club::factory()->create([
            'registration_identifier' => Str::uuid()
        ]);

        // Act
        $result = $this->service->validateIdentifier($club->registration_identifier);

        // Assert
        $this->assertInstanceOf(Club::class, $result);
        $this->assertEquals($club->id, $result->id);
    }

    /** @test */
    public function it_returns_null_for_invalid_identifier()
    {
        // Arrange
        $invalidIdentifier = Str::uuid();

        // Act
        $result = $this->service->validateIdentifier($invalidIdentifier);

        // Assert
        $this->assertNull($result);
    }

    /** @test */
    public function it_logs_validation_attempts()
    {
        // Arrange
        Log::shouldReceive('info')
            ->once()
            ->with('Club registration identifier validation attempt', \Mockery::type('array'));

        $club = Club::factory()->create([
            'registration_identifier' => Str::uuid()
        ]);

        // Act
        $this->service->validateIdentifier($club->registration_identifier);

        // Assert
        $this->assertDatabaseHas('registration_attempts', [
            'club_identifier' => $club->registration_identifier,
            'success' => true,
            'registration_source' => 'club-specific'
        ]);
    }

    /** @test */
    public function it_logs_failed_validation_attempts()
    {
        // Arrange
        Log::shouldReceive('info')
            ->once()
            ->with('Club registration identifier validation attempt', \Mockery::type('array'));

        $invalidIdentifier = Str::uuid();

        // Act
        $this->service->validateIdentifier($invalidIdentifier);

        // Assert
        $this->assertDatabaseHas('registration_attempts', [
            'club_identifier' => $invalidIdentifier,
            'success' => false,
            'registration_source' => 'club-specific',
            'error_message' => 'Invalid club identifier'
        ]);
    }

    /** @test */
    public function it_generates_unique_identifiers()
    {
        // Act
        $identifier1 = $this->service->generateUniqueIdentifier();
        $identifier2 = $this->service->generateUniqueIdentifier();

        // Assert
        $this->assertNotEquals($identifier1, $identifier2);
        $this->assertTrue(Str::isUuid($identifier1));
        $this->assertTrue(Str::isUuid($identifier2));
    }

    /** @test */
    public function it_validates_identifier_format()
    {
        // Arrange
        $validUuid = Str::uuid();
        $invalidFormat = 'not-a-uuid';

        // Act & Assert
        $this->assertTrue($this->service->isValidIdentifierFormat($validUuid));
        $this->assertFalse($this->service->isValidIdentifierFormat($invalidFormat));
    }

    /** @test */
    public function it_applies_rate_limiting()
    {
        // Arrange
        $request = Request::create('/test', 'GET');
        $request->server->set('REMOTE_ADDR', '192.168.1.1');

        // Act
        $this->service->applyRateLimit($request);

        // Assert
        $this->assertEquals(9, $this->service->getRemainingAttempts($request));
    }

    /** @test */
    public function it_detects_rate_limiting()
    {
        // Arrange
        $request = Request::create('/test', 'GET');
        $request->server->set('REMOTE_ADDR', '192.168.1.1');

        // Apply rate limit multiple times to exceed limit
        for ($i = 0; $i < 11; $i++) {
            $this->service->applyRateLimit($request);
        }

        // Act & Assert
        $this->assertTrue($this->service->isRateLimited($request));
        $this->assertEquals(0, $this->service->getRemainingAttempts($request));
        $this->assertGreaterThan(0, $this->service->getRetryAfter($request));
    }

    /** @test */
    public function it_detects_suspicious_activity()
    {
        // Arrange
        $ipAddress = '192.168.1.100';
        
        // Create multiple failed attempts
        for ($i = 0; $i < 6; $i++) {
            RegistrationAttempt::logAttempt([
                'club_identifier' => Str::uuid(),
                'ip_address' => $ipAddress,
                'success' => false,
                'registration_source' => 'club-specific'
            ]);
        }

        // Act & Assert
        $this->assertTrue($this->service->hasSuspiciousActivity($ipAddress));
    }

    /** @test */
    public function it_detects_suspicious_activity_with_multiple_identifiers()
    {
        // Arrange
        $ipAddress = '192.168.1.101';
        
        // Create attempts with different identifiers
        for ($i = 0; $i < 4; $i++) {
            RegistrationAttempt::logAttempt([
                'club_identifier' => Str::uuid(),
                'ip_address' => $ipAddress,
                'success' => false,
                'registration_source' => 'club-specific'
            ]);
        }

        // Act & Assert
        $this->assertTrue($this->service->hasSuspiciousActivity($ipAddress));
    }

    /** @test */
    public function it_provides_validation_statistics()
    {
        // Arrange
        $club = Club::factory()->create();
        
        // Create some test attempts
        RegistrationAttempt::logAttempt([
            'club_identifier' => $club->registration_identifier,
            'success' => true,
            'registration_source' => 'club-specific'
        ]);
        
        RegistrationAttempt::logAttempt([
            'club_identifier' => Str::uuid(),
            'success' => false,
            'registration_source' => 'club-specific'
        ]);

        // Act
        $stats = $this->service->getValidationStats(24);

        // Assert
        $this->assertEquals(2, $stats['total_attempts']);
        $this->assertEquals(1, $stats['successful_attempts']);
        $this->assertEquals(1, $stats['failed_attempts']);
        $this->assertEquals(50.0, $stats['success_rate']);
        $this->assertEquals(24, $stats['period_hours']);
    }

    /** @test */
    public function it_clears_rate_limit()
    {
        // Arrange
        $ipAddress = '192.168.1.1';
        $request = Request::create('/test', 'GET');
        $request->server->set('REMOTE_ADDR', $ipAddress);

        // Apply rate limit
        $this->service->applyRateLimit($request);
        $this->assertEquals(9, $this->service->getRemainingAttempts($request));

        // Act
        $this->service->clearRateLimit($ipAddress);

        // Assert
        $this->assertEquals(10, $this->service->getRemainingAttempts($request));
    }

    /** @test */
    public function it_prevents_timing_attacks_with_consistent_response_time()
    {
        // Arrange
        $club = Club::factory()->create([
            'registration_identifier' => Str::uuid()
        ]);
        $invalidIdentifier = Str::uuid();

        // Act - Measure timing for valid identifier
        $startValid = microtime(true);
        $this->service->validateIdentifier($club->registration_identifier);
        $validTime = microtime(true) - $startValid;

        // Act - Measure timing for invalid identifier
        $startInvalid = microtime(true);
        $this->service->validateIdentifier($invalidIdentifier);
        $invalidTime = microtime(true) - $startInvalid;

        // Assert - Both operations should take at least the minimum delay time
        $minDelaySeconds = 0.1; // 100ms converted to seconds
        $this->assertGreaterThanOrEqual($minDelaySeconds, $validTime);
        $this->assertGreaterThanOrEqual($minDelaySeconds, $invalidTime);
        
        // The timing difference should be minimal (within 50ms tolerance)
        $timingDifference = abs($validTime - $invalidTime);
        $this->assertLessThan(0.05, $timingDifference, 'Timing difference too large, potential timing attack vulnerability');
    }
}