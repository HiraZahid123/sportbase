<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\RegistrationAttempt;
use App\Models\User;
use App\Models\Club;

class RegistrationAttemptTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_attempt_can_be_created()
    {
        $attempt = RegistrationAttempt::create([
            'club_identifier' => 'test-uuid-123',
            'ip_address' => '192.168.1.1',
            'user_agent' => 'Mozilla/5.0 Test Browser',
            'success' => true,
            'registration_source' => 'club-specific'
        ]);

        $this->assertInstanceOf(RegistrationAttempt::class, $attempt);
        $this->assertEquals('test-uuid-123', $attempt->club_identifier);
        $this->assertEquals('192.168.1.1', $attempt->ip_address);
        $this->assertTrue($attempt->success);
        $this->assertEquals('club-specific', $attempt->registration_source);
    }

    public function test_registration_attempt_belongs_to_user()
    {
        $user = User::factory()->create();
        $attempt = RegistrationAttempt::factory()->create([
            'user_id' => $user->id
        ]);

        $this->assertInstanceOf(User::class, $attempt->user);
        $this->assertEquals($user->id, $attempt->user->id);
    }

    public function test_registration_attempt_belongs_to_club()
    {
        $club = Club::factory()->create();
        $attempt = RegistrationAttempt::factory()->create([
            'club_id' => $club->id
        ]);

        $this->assertInstanceOf(Club::class, $attempt->club);
        $this->assertEquals($club->id, $attempt->club->id);
    }

    public function test_successful_scope_filters_successful_attempts()
    {
        RegistrationAttempt::factory()->successful()->create();
        RegistrationAttempt::factory()->failed()->create();

        $successfulAttempts = RegistrationAttempt::successful()->get();

        $this->assertCount(1, $successfulAttempts);
        $this->assertTrue($successfulAttempts->first()->success);
    }

    public function test_failed_scope_filters_failed_attempts()
    {
        RegistrationAttempt::factory()->successful()->create();
        RegistrationAttempt::factory()->failed()->create();

        $failedAttempts = RegistrationAttempt::failed()->get();

        $this->assertCount(1, $failedAttempts);
        $this->assertFalse($failedAttempts->first()->success);
    }

    public function test_for_club_identifier_scope_filters_by_identifier()
    {
        $identifier = 'test-uuid-123';
        RegistrationAttempt::factory()->create(['club_identifier' => $identifier]);
        RegistrationAttempt::factory()->create(['club_identifier' => 'different-uuid']);

        $attempts = RegistrationAttempt::forClubIdentifier($identifier)->get();

        $this->assertCount(1, $attempts);
        $this->assertEquals($identifier, $attempts->first()->club_identifier);
    }

    public function test_from_ip_scope_filters_by_ip_address()
    {
        $ipAddress = '192.168.1.1';
        RegistrationAttempt::factory()->create(['ip_address' => $ipAddress]);
        RegistrationAttempt::factory()->create(['ip_address' => '192.168.1.2']);

        $attempts = RegistrationAttempt::fromIp($ipAddress)->get();

        $this->assertCount(1, $attempts);
        $this->assertEquals($ipAddress, $attempts->first()->ip_address);
    }

    public function test_recent_scope_filters_by_time()
    {
        // Create an old attempt
        $oldAttempt = RegistrationAttempt::factory()->create();
        $oldAttempt->created_at = now()->subDays(2);
        $oldAttempt->save();

        // Create a recent attempt
        RegistrationAttempt::factory()->create();

        $recentAttempts = RegistrationAttempt::recent(24)->get();

        $this->assertCount(1, $recentAttempts);
    }

    public function test_success_cast_to_boolean()
    {
        $attempt = RegistrationAttempt::factory()->create(['success' => 1]);

        $this->assertIsBool($attempt->success);
        $this->assertTrue($attempt->success);
    }

    public function test_user_has_many_registration_attempts()
    {
        $user = User::factory()->create();
        RegistrationAttempt::factory()->count(3)->create(['user_id' => $user->id]);

        $this->assertCount(3, $user->registrationAttempts);
    }

    public function test_club_has_many_registration_attempts()
    {
        $club = Club::factory()->create();
        RegistrationAttempt::factory()->count(2)->create(['club_id' => $club->id]);

        $this->assertCount(2, $club->registrationAttempts);
    }

    public function test_log_attempt_creates_registration_attempt()
    {
        $data = [
            'club_identifier' => 'test-uuid',
            'ip_address' => '192.168.1.1',
            'user_agent' => 'Test Browser',
            'success' => true,
            'registration_source' => 'club-specific'
        ];

        $attempt = RegistrationAttempt::logAttempt($data);

        $this->assertInstanceOf(RegistrationAttempt::class, $attempt);
        $this->assertEquals('test-uuid', $attempt->club_identifier);
        $this->assertEquals('192.168.1.1', $attempt->ip_address);
        $this->assertTrue($attempt->success);
        $this->assertEquals('club-specific', $attempt->registration_source);
    }

    public function test_get_club_stats_returns_correct_statistics()
    {
        $club = Club::factory()->create();
        
        // Create test data
        RegistrationAttempt::factory()->successful()->clubSpecific()->create(['club_id' => $club->id]);
        RegistrationAttempt::factory()->successful()->general()->create(['club_id' => $club->id]);
        RegistrationAttempt::factory()->failed()->clubSpecific()->create(['club_id' => $club->id]);

        $stats = RegistrationAttempt::getClubStats($club->id);

        $this->assertEquals(3, $stats['total_attempts']);
        $this->assertEquals(2, $stats['successful_attempts']);
        $this->assertEquals(1, $stats['failed_attempts']);
        $this->assertEquals(2, $stats['club_specific_attempts']);
        $this->assertEquals(1, $stats['general_attempts']);
        $this->assertEquals(66.67, $stats['success_rate']);
    }

    public function test_validation_rules_are_defined()
    {
        $rules = RegistrationAttempt::rules();

        $this->assertIsArray($rules);
        $this->assertArrayHasKey('ip_address', $rules);
        $this->assertArrayHasKey('success', $rules);
        $this->assertArrayHasKey('registration_source', $rules);
    }
}
