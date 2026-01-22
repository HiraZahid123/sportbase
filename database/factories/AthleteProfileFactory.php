<?php

namespace Database\Factories;

use App\Models\AthleteProfile;
use App\Models\User;
use App\Models\Club;
use App\Models\TrainingGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AthleteProfile>
 */
class AthleteProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AthleteProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'club_id' => Club::factory(),
            'registration_source' => $this->faker->randomElement(['general', 'club-specific']),
            'training_group_id' => null, // Can be set by relationships in tests
            'sex' => $this->faker->randomElement(['male', 'female', 'other']),
            'birthday' => $this->faker->date('Y-m-d', '-18 years'),
            'weight' => $this->faker->randomFloat(2, 40, 120),
            'height' => $this->faker->randomFloat(2, 150, 200),
            'id_code' => $this->faker->optional(0.8)->numerify('###########'),
            'nationality' => $this->faker->optional(0.9)->country(),
            'municipality' => $this->faker->optional(0.8)->city(),
            'phone' => $this->faker->optional(0.9)->phoneNumber(),
            'address' => $this->faker->optional(0.8)->address(),
            'emergency_contact_json' => $this->faker->optional(0.7)->randomElement([
                [
                    'name' => $this->faker->name(),
                    'phone' => $this->faker->phoneNumber(),
                    'relationship' => $this->faker->randomElement(['parent', 'guardian', 'spouse', 'sibling'])
                ]
            ]),
            'is_paid' => $this->faker->boolean(70), // 70% chance of being paid
        ];
    }

    /**
     * Indicate that the athlete was registered via club-specific URL.
     */
    public function clubSpecific(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'registration_source' => 'club-specific',
            ];
        });
    }

    /**
     * Indicate that the athlete was registered via general registration.
     */
    public function general(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'registration_source' => 'general',
            ];
        });
    }

    /**
     * Indicate that the athlete is paid.
     */
    public function paid(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_paid' => true,
            ];
        });
    }

    /**
     * Indicate that the athlete is not paid.
     */
    public function unpaid(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'is_paid' => false,
            ];
        });
    }
}
