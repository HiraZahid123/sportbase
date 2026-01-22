<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RegistrationAttempt;
use App\Models\User;
use App\Models\Club;

class RegistrationAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing clubs and users for realistic data
        $clubs = Club::all();
        $users = User::where('role', 'athlete')->get();

        if ($clubs->isEmpty()) {
            $this->command->warn('No clubs found. Please run ClubSeeder first.');
            return;
        }

        // Create successful club-specific registration attempts
        foreach ($clubs as $club) {
            // Create 3-5 successful attempts per club
            $successfulCount = rand(3, 5);
            for ($i = 0; $i < $successfulCount; $i++) {
                $user = $users->random();
                RegistrationAttempt::factory()->successful()->clubSpecific()->create([
                    'club_identifier' => $club->registration_identifier,
                    'club_id' => $club->id,
                    'user_id' => $user->id,
                ]);
            }

            // Create 1-2 failed attempts per club
            $failedCount = rand(1, 2);
            for ($i = 0; $i < $failedCount; $i++) {
                RegistrationAttempt::factory()->failed()->clubSpecific()->create([
                    'club_identifier' => $club->registration_identifier,
                    'club_id' => $club->id,
                    'error_message' => collect([
                        'Email already exists',
                        'Invalid phone number format',
                        'Password too weak',
                        'Required field missing'
                    ])->random(),
                ]);
            }
        }

        // Create some general registration attempts
        for ($i = 0; $i < 10; $i++) {
            $club = $clubs->random();
            $user = $users->random();
            
            RegistrationAttempt::factory()->general()->successful()->create([
                'club_id' => $club->id,
                'user_id' => $user->id,
            ]);
        }

        // Create some failed general registration attempts
        for ($i = 0; $i < 5; $i++) {
            RegistrationAttempt::factory()->general()->failed()->create([
                'error_message' => collect([
                    'No club selected',
                    'Invalid email format',
                    'Terms and conditions not accepted'
                ])->random(),
            ]);
        }

        // Create some attempts with invalid club identifiers (security testing)
        for ($i = 0; $i < 3; $i++) {
            RegistrationAttempt::factory()->failed()->create([
                'club_identifier' => fake()->uuid(),
                'registration_source' => 'club-specific',
                'error_message' => 'Invalid club identifier',
            ]);
        }

        $this->command->info('Created registration attempt records for audit logging.');
    }
}
