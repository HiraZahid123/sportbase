<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Club;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationUrlDisplayTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function club_has_registration_url_accessor()
    {
        // Create a club with a registration identifier
        $club = Club::factory()->create([
            'registration_identifier' => 'test-uuid-123'
        ]);

        // Test that the registration URL is properly formatted
        $expectedUrl = route('register.club', ['identifier' => 'test-uuid-123']);
        $this->assertEquals($expectedUrl, $club->registration_url);
    }

    /** @test */
    public function club_generates_uuid_on_creation()
    {
        $club = Club::factory()->create();

        // Verify that a UUID was generated
        $this->assertNotNull($club->registration_identifier);
        $this->assertIsString($club->registration_identifier);
        $this->assertEquals(36, strlen($club->registration_identifier)); // UUID v4 length
    }

    /** @test */
    public function club_can_regenerate_registration_identifier()
    {
        $club = Club::factory()->create();
        $originalIdentifier = $club->registration_identifier;

        // Regenerate the identifier
        $club->regenerateRegistrationIdentifier();

        // Verify it changed
        $this->assertNotEquals($originalIdentifier, $club->registration_identifier);
        $this->assertNotNull($club->registration_identifier);
        $this->assertEquals(36, strlen($club->registration_identifier));
    }

    /** @test */
    public function registration_url_contains_correct_route_and_identifier()
    {
        $club = Club::factory()->create([
            'registration_identifier' => 'specific-test-uuid'
        ]);

        $registrationUrl = $club->registration_url;

        // Verify the URL contains the expected route and identifier
        $this->assertStringContainsString('/register/club/specific-test-uuid', $registrationUrl);
    }
}