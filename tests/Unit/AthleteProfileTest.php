<?php

namespace Tests\Unit;

use App\Models\AthleteProfile;
use App\Models\User;
use App\Models\Club;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AthleteProfileTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_athlete_profile_with_registration_source()
    {
        $user = User::factory()->create();
        $club = Club::factory()->create();

        $athlete = AthleteProfile::create([
            'user_id' => $user->id,
            'club_id' => $club->id,
            'registration_source' => 'club-specific',
            'sex' => 'male',
            'is_paid' => false
        ]);

        $this->assertDatabaseHas('athlete_profiles', [
            'id' => $athlete->id,
            'user_id' => $user->id,
            'club_id' => $club->id,
            'registration_source' => 'club-specific'
        ]);
    }

    /** @test */
    public function it_defaults_registration_source_to_general()
    {
        $user = User::factory()->create();
        $club = Club::factory()->create();

        $athlete = AthleteProfile::create([
            'user_id' => $user->id,
            'club_id' => $club->id,
            'sex' => 'male',
            'is_paid' => false
        ]);

        // Should default to 'general' based on migration
        $this->assertEquals('general', $athlete->fresh()->registration_source);
    }

    /** @test */
    public function it_can_check_if_club_specific_registration()
    {
        $athlete = AthleteProfile::factory()->clubSpecific()->create();
        
        $this->assertTrue($athlete->isClubSpecificRegistration());
        $this->assertFalse($athlete->isGeneralRegistration());
    }

    /** @test */
    public function it_can_check_if_general_registration()
    {
        $athlete = AthleteProfile::factory()->general()->create();
        
        $this->assertTrue($athlete->isGeneralRegistration());
        $this->assertFalse($athlete->isClubSpecificRegistration());
    }

    /** @test */
    public function it_has_correct_validation_rules()
    {
        $rules = AthleteProfile::getValidationRules();
        
        $this->assertArrayHasKey('registration_source', $rules);
        $this->assertEquals('required|in:general,club-specific', $rules['registration_source']);
        $this->assertArrayHasKey('user_id', $rules);
        $this->assertArrayHasKey('club_id', $rules);
    }

    /** @test */
    public function it_maintains_existing_relationships()
    {
        $user = User::factory()->create();
        $club = Club::factory()->create();
        
        $athlete = AthleteProfile::factory()->create([
            'user_id' => $user->id,
            'club_id' => $club->id,
        ]);

        $this->assertInstanceOf(User::class, $athlete->user);
        $this->assertInstanceOf(Club::class, $athlete->club);
        $this->assertEquals($user->id, $athlete->user->id);
        $this->assertEquals($club->id, $athlete->club->id);
    }
}