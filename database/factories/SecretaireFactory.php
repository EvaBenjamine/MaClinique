<?php

namespace Database\Factories;

use App\Models\Secretaire;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Secretaire>
 */
class SecretaireFactory extends Factory
{
    protected $model = Secretaire::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grades = [
            'chef_de_service',
            'assistante',
            'principale',
        ];

        return [
            'user_id' => User::factory()->state([
                'role' => 'secretaire',
            ]),
            'matricule' => 'SEC-' . strtoupper($this->faker->unique()->bothify('????####')),
            'grade' => $this->faker->randomElement($grades),
            'numero_telephone' => $this->faker->optional(0.8)->numerify('+226 0# ## ## ##'),
            'adresse' => $this->faker->optional(0.7)->city() . ', Burkina Faso',
        ];
    }

    /**
     * Create a secretaire with a specific grade.
     */
    public function withGrade(string $grade): static
    {
        return $this->state(fn (array $attributes) => [
            'grade' => $grade,
        ]);
    }

    /**
     * Create a principal secretary.
     */
    public function principal(): static
    {
        return $this->state(fn (array $attributes) => [
            'grade' => 'principale',
        ]);
    }

    /**
     * Create a administrative manager.
     */
    public function manager(): static
    {
        return $this->state(fn (array $attributes) => [
            'grade' => 'chef_de_service',
        ]);
    }
}
