<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Club;
use App\Models\AthleteProfile;
use Illuminate\Support\Str;

class ClubDashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_club_dashboard_displays_registration_url_and_stats()
    {
        // Create a club user
        $user = User::factory()->create([
            'role' => 'club',
            'status' => 'active'
        ]);

        // Create a club for the user
        $club = Club::factory()->create([
            'user_id' => $user->id,
            'registration_identifier' => Str::uuid()
        ]);

        // Create some athletes for the club
        $athletes = AthleteProfile::factory()->count(5)->create([
            'club_id' => $club->id,
            'registration_source' => 'club-specific'
        ]);

        // Create some recent athletes
        AthleteProfile::factory()->count(2)->create([
            'club_id' => $club->id,
            'registration_source' => 'general',
            'created_at' => now()->subDays(15)
        ]);

        // Create some older athletes (outside 30 days)
        AthleteProfile::factory()->count(3)->create([
            'club_id' => $club->id,
            'registration_source' => 'club-specific',
            'created_at' => now()->subDays(45)
        ]);

        // Act as the club user and visit the dashboard
        $response = $this->actingAs($user)
            ->get(route('club.dashboard'));

        // Assert the response is successful
        $response->assertStatus(200);

        // Assert the response contains the expected data
        $response->assertInertia(fn ($page) => 
            $page->component('Dashboard/ClubDashboard')
                ->has('club')
                ->has('registrationUrl')
                ->has('registrationStats')
                ->has('stats')
                ->where('registrationStats.total_athletes', 10)
                ->where('registrationStats.club_specific_registrations', 8)
                ->where('registrationStats.general_registrations', 2)
                ->where('registrationStats.recent_registrations', 7) // 5 + 2 within last 30 days
        );
    }

    public function test_unauthorized_user_cannot_access_club_dashboard()
    {
        // Create a non-club user
        $user = User::factory()->create([
            'role' => 'athlete',
            'status' => 'active'
        ]);

        // Try to access the club dashboard
        $response = $this->actingAs($user)
            ->get(route('club.dashboard'));

        // Should be forbidden
        $response->assertStatus(403);
    }

    public function test_club_without_club_record_cannot_access_dashboard()
    {
        // Create a club user without a club record
        $user = User::factory()->create([
            'role' => 'club',
            'status' => 'active'
        ]);

        // Try to access the club dashboard
        $response = $this->actingAs($user)
            ->get(route('club.dashboard'));

        // Should be forbidden
        $response->assertStatus(403);
    }

    public function test_registration_stats_calculation()
    {
        // Create a club user
        $user = User::factory()->create([
            'role' => 'club',
            'status' => 'active'
        ]);

        // Create a club for the user
        $club = Club::factory()->create([
            'user_id' => $user->id,
            'registration_identifier' => Str::uuid()
        ]);

        // Create athletes with different registration sources and dates
        AthleteProfile::factory()->count(3)->create([
            'club_id' => $club->id,
            'registration_source' => 'club-specific',
            'created_at' => now()->subDays(10)
        ]);

        AthleteProfile::factory()->count(2)->create([
            'club_id' => $club->id,
            'registration_source' => 'general',
            'created_at' => now()->subDays(5)
        ]);

        AthleteProfile::factory()->count(1)->create([
            'club_id' => $club->id,
            'registration_source' => 'club-specific',
            'created_at' => now()->subDays(45) // Older than 30 days
        ]);

        // Act as the club user and visit the dashboard
        $response = $this->actingAs($user)
            ->get(route('club.dashboard'));

        // Assert the registration stats are calculated correctly
        $response->assertInertia(fn ($page) => 
            $page->where('registrationStats.total_athletes', 6)
                ->where('registrationStats.club_specific_registrations', 4)
                ->where('registrationStats.general_registrations', 2)
                ->where('registrationStats.recent_registrations', 5) // Only last 30 days
                ->where('registrationStats.club_specific_percentage', 66.7)
        );
    }
}