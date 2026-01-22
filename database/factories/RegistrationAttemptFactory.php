<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RegistrationAttempt>
 */
class RegistrationAttemptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'club_identifier' => $this->faker->uuid(),
            'ip_address' => $this->faker->ipv4(),
            'user_agent' => $this->faker->userAgent(),
            'success' => $this->faker->boolean(70), // 70% success rate
            'user_id' => null, // Will be set by relationships in tests
            'club_id' => null, // Will be set by relationships in tests
            'error_message' => $this->faker->optional(0.3)->sentence(), // 30% chance of error message
            'registration_source' => $this->faker->randomElement(['general', 'club-specific']),
        ];
    }

    /**
     * Indicate that the registration attempt was successful.
     */
    public function successful()
    {
        return $this->state(function (array $attributes) {
            return [
                'success' => true,
                'error_message' => null,
            ];
        });
    }

    /**
     * Indicate that the registration attempt failed.
     */
    public function failed()
    {
        return $this->state(function (array $attributes) {
            return [
                'success' => false,
                'error_message' => $this->faker->sentence(),
            ];
        });
    }

    /**
     * Indicate that the registration attempt was club-specific.
     */
    public function clubSpecific()
    {
        return $this->state(function (array $attributes) {
            return [
                'registration_source' => 'club-specific',
            ];
        });
    }

    /**
     * Indicate that the registration attempt was general.
     */
    public function general()
    {
        return $this->state(function (array $attributes) {
            return [
                'registration_source' => 'general',
                'club_identifier' => null,
            ];
        });
    }
}
