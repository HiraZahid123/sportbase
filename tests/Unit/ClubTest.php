<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Club;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

class ClubTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_automatically_generates_registration_identifier_on_creation()
    {
        // Create a user first (required for club creation)
        $user = User::factory()->create();
        
        // Create a club without specifying registration_identifier
        $club = Club::create([
            'user_id' => $user->id,
            'name' => 'Test Club',
            'email' => 'test@club.com',
            'phone' => '123456789',
            'address' => 'Test Address',
            'country' => 'Test Country'
        ]);

        // Assert that registration_identifier was automatically generated
        $this->assertNotNull($club->registration_identifier);
        $this->assertTrue(Str::isUuid($club->registration_identifier));
    }

    /** @test */
    public function it_does_not_override_existing_registration_identifier()
    {
        $user = User::factory()->create();
        $customIdentifier = (string) Str::uuid();
        
        $club = Club::create([
            'user_id' => $user->id,
            'name' => 'Test Club',
            'email' => 'test@club.com',
            'phone' => '123456789',
            'address' => 'Test Address',
            'country' => 'Test Country',
            'registration_identifier' => $customIdentifier
        ]);

        // Assert that the custom identifier was preserved
        $this->assertEquals($customIdentifier, $club->registration_identifier);
    }

    /** @test */
    public function it_generates_registration_url_correctly()
    {
        $user = User::factory()->create();
        $club = Club::factory()->create(['user_id' => $user->id]);

        $expectedUrl = route('register.club', ['identifier' => $club->registration_identifier]);
        $this->assertEquals($expectedUrl, $club->registration_url);
    }

    /** @test */
    public function it_can_regenerate_registration_identifier()
    {
        $user = User::factory()->create();
        $club = Club::factory()->create(['user_id' => $user->id]);
        
        $originalIdentifier = $club->registration_identifier;
        
        $club->regenerateRegistrationIdentifier();
        
        // Assert that the identifier changed
        $this->assertNotEquals($originalIdentifier, $club->registration_identifier);
        $this->assertTrue(Str::isUuid($club->registration_identifier));
        
        // Assert that the club was saved to database
        $club->refresh();
        $this->assertNotEquals($originalIdentifier, $club->registration_identifier);
    }

    /** @test */
    public function registration_identifier_is_unique_across_clubs()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        
        $club1 = Club::factory()->create(['user_id' => $user1->id]);
        $club2 = Club::factory()->create(['user_id' => $user2->id]);

        // Assert that both clubs have different registration identifiers
        $this->assertNotEquals($club1->registration_identifier, $club2->registration_identifier);
        $this->assertTrue(Str::isUuid($club1->registration_identifier));
        $this->assertTrue(Str::isUuid($club2->registration_identifier));
    }
}