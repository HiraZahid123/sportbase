<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Services\ClubValidationService;
use App\Models\Club;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;

class ClubValidationServiceIntegrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_validates_club_identifier_in_web_context()
    {
        // Arrange
        $user = User::factory()->create();
        $club = Club::factory()->create(['user_id' => $user->id]);
        $service = new ClubValidationService();

        // Act - Simulate a web request
        $response = $this->get("/register/club/{$club->registration_identifier}");

        // Assert - The route should exist and be accessible
        // Note: This will fail until we implement the route, but demonstrates integration
        $response->assertStatus(200);
    }

    /** @test */
    public function it_handles_invalid_identifier_gracefully()
    {
        // Arrange
        $invalidIdentifier = 'invalid-identifier';
        $service = new ClubValidationService();

        // Act
        $result = $service->validateIdentifier($invalidIdentifier);

        // Assert
        $this->assertNull($result);
        $this->assertDatabaseHas('registration_attempts', [
            'club_identifier' => $invalidIdentifier,
            'success' => false,
            'registration_source' => 'club-specific'
        ]);
    }

    /** @test */
    public function it_logs_validation_attempts_with_real_request_data()
    {
        // Arrange
        Log::spy();
        $user = User::factory()->create();
        $club = Club::factory()->create(['user_id' => $user->id]);
        $service = new ClubValidationService();

        // Act - Create a real request context
        $request = $this->createRequest('GET', '/test');
        $result = $service->validateIdentifier($club->registration_identifier, $request);

        // Assert
        $this->assertInstanceOf(Club::class, $result);
        Log::shouldHaveReceived('info')
            ->once()
            ->with('Club registration identifier validation attempt', \Mockery::on(function ($data) use ($club) {
                return $data['identifier'] === $club->registration_identifier
                    && $data['found'] === true
                    && $data['club_id'] === $club->id;
            }));
    }

    /** @test */
    public function it_applies_rate_limiting_in_web_context()
    {
        // Arrange
        $service = new ClubValidationService();
        $club = Club::factory()->create();

        // Act - Make multiple requests to trigger rate limiting
        for ($i = 0; $i < 11; $i++) {
            $request = $this->createRequest('GET', '/test', ['REMOTE_ADDR' => '192.168.1.1']);
            $service->applyRateLimit($request);
        }

        // Assert
        $request = $this->createRequest('GET', '/test', ['REMOTE_ADDR' => '192.168.1.1']);
        $this->assertTrue($service->isRateLimited($request));
    }

    /**
     * Create a request instance for testing
     */
    private function createRequest(string $method, string $uri, array $server = []): \Illuminate\Http\Request
    {
        $request = \Illuminate\Http\Request::create($uri, $method);
        
        foreach ($server as $key => $value) {
            $request->server->set($key, $value);
        }
        
        return $request;
    }
}