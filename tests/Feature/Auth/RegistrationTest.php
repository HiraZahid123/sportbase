<?php

namespace Tests\Feature\Auth;

use App\Models\Club;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        // Create a club for the athlete to register with
        $club = Club::factory()->create();

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'athlete',
            'club_id' => $club->id,
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('athlete.register.show', absolute: false));
    }

    public function test_club_specific_registration_screen_can_be_rendered(): void
    {
        $club = Club::factory()->create();

        $response = $this->get('/register/club/' . $club->registration_identifier);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Auth/Register')
                ->has('preselectedClub')
                ->where('isClubSpecific', true)
                ->where('preselectedClub.id', $club->id)
        );
    }

    public function test_invalid_club_identifier_redirects_to_general_registration(): void
    {
        $response = $this->get('/register/club/invalid-identifier');

        $response->assertRedirect('/register');
        $response->assertSessionHas('error', 'Invalid registration link. Please select your club manually.');
    }

    public function test_club_specific_registration_works(): void
    {
        $club = Club::factory()->create();

        $response = $this->post('/register', [
            'name' => 'Test Athlete',
            'email' => 'athlete@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'athlete',
            'club_id' => $club->id,
            'is_club_specific' => true,
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('athlete.register.show', absolute: false));

        // Verify the athlete profile was created with correct club and registration source
        $user = User::where('email', 'athlete@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('athlete', $user->role);
        
        $athleteProfile = $user->athleteProfile;
        $this->assertNotNull($athleteProfile);
        $this->assertEquals($club->id, $athleteProfile->club_id);
        $this->assertEquals('club-specific', $athleteProfile->registration_source);
    }

    public function test_general_registration_works(): void
    {
        $club = Club::factory()->create();

        $response = $this->post('/register', [
            'name' => 'Test Athlete',
            'email' => 'athlete@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'athlete',
            'club_id' => $club->id,
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('athlete.register.show', absolute: false));

        // Verify the athlete profile was created with correct club and registration source
        $user = User::where('email', 'athlete@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('athlete', $user->role);
        
        $athleteProfile = $user->athleteProfile;
        $this->assertNotNull($athleteProfile);
        $this->assertEquals($club->id, $athleteProfile->club_id);
        $this->assertEquals('general', $athleteProfile->registration_source);
    }

    public function test_club_registration_works(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test Club',
            'email' => 'club@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'club',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('club.register.show', absolute: false));

        // Verify the club was created
        $user = User::where('email', 'club@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('club', $user->role);
        
        $club = $user->club;
        $this->assertNotNull($club);
        $this->assertEquals('Test Club', $club->name);
        $this->assertNotNull($club->registration_identifier);
    }

    public function test_successful_registration_attempts_are_logged_for_audit(): void
    {
        $club = Club::factory()->create();

        // Test successful club-specific registration logging
        $response = $this->post('/register', [
            'name' => 'Test Athlete',
            'email' => 'athlete@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'athlete',
            'club_id' => $club->id,
            'is_club_specific' => true,
        ]);

        // Check that the user was authenticated and redirected
        $this->assertAuthenticated();

        // Verify successful club-specific registration attempt was logged
        $this->assertDatabaseHas('registration_attempts', [
            'success' => true,
            'registration_source' => 'club-specific',
            'club_id' => $club->id,
        ]);

        // Logout the user for the next test
        $this->post('/logout');

        // Test successful general registration logging
        $response = $this->post('/register', [
            'name' => 'Test Athlete 2',
            'email' => 'athlete2@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'athlete',
            'club_id' => $club->id,
        ]);

        // Check that the user was authenticated
        $this->assertAuthenticated();

        // Verify successful general registration attempt was logged
        $this->assertDatabaseHas('registration_attempts', [
            'success' => true,
            'registration_source' => 'general',
            'club_id' => $club->id,
        ]);
    }
}
