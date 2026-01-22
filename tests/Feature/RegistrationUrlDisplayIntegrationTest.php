<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Club;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationUrlDisplayIntegrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function club_dashboard_displays_registration_url()
    {
        // Create a club user
        $user = User::factory()->create([
            'role' => 'club',
            'status' => 'active'
        ]);

        $club = Club::factory()->create([
            'user_id' => $user->id,
            'registration_identifier' => 'test-uuid-123'
        ]);

        // Act as the club user and visit the dashboard
        $response = $this->actingAs($user)->get(route('club.dashboard'));

        // Verify the response contains the registration URL
        $response->assertStatus(200);
        
        // Check that the registration URL is passed to the component
        $response->assertInertia(fn ($page) => 
            $page->has('registrationUrl')
                 ->where('registrationUrl', route('register.club', ['identifier' => 'test-uuid-123']))
        );
    }

    /** @test */
    public function registration_url_format_is_correct()
    {
        $user = User::factory()->create([
            'role' => 'club',
            'status' => 'active'
        ]);

        $club = Club::factory()->create([
            'user_id' => $user->id,
            'registration_identifier' => 'specific-test-identifier'
        ]);

        $response = $this->actingAs($user)->get(route('club.dashboard'));

        $response->assertInertia(fn ($page) => 
            $page->where('registrationUrl', function ($url) {
                return str_contains($url, '/register/club/specific-test-identifier');
            })
        );
    }

    /** @test */
    public function registration_stats_are_provided_to_component()
    {
        $user = User::factory()->create([
            'role' => 'club',
            'status' => 'active'
        ]);

        $club = Club::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->get(route('club.dashboard'));

        // Verify registration stats are provided
        $response->assertInertia(fn ($page) => 
            $page->has('registrationStats')
                 ->has('registrationStats.total_athletes')
                 ->has('registrationStats.recent_registrations')
                 ->has('registrationStats.club_specific_registrations')
        );
    }
}