<?php

namespace Database\Factories;

use App\Models\SageFemme;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SageFemme>
 */
class SageFemmeFactory extends Factory
{
    protected $model = SageFemme::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grades = [
            'chef_de_service',
            'adjointe',
            'consultante',
        ];

        $specialites = [
            'Suivi de grossesse',
            'Accouchement physiologique',
            'Suivi post-natal',
            'Échographie obstétricale',
            'Rééducation périnéale',
            'Consultation gynécologique',
            'Urgences obstétricales',
            null, // Certaines sages-femmes n'ont pas de spécialité
        ];

        return [
            'user_id' => User::factory()->state([
                'role' => 'sage_femme',
            ]),
            'matricule' => 'SF-' . strtoupper($this->faker->unique()->bothify('????####')),
            'grade' => $this->faker->randomElement($grades),
            'specialite' => $this->faker->randomElement($specialites),
            'numero_telephone' => $this->faker->optional(0.8)->numerify('+226 0# ## ## ##'),
            'adresse' => $this->faker->optional(0.7)->city() . ', Burkina Faso',
        ];
    }

    /**
     * Create a sage-femme with a specific grade.
     */
    public function withGrade(string $grade): static
    {
        return $this->state(fn (array $attributes) => [
            'grade' => $grade,
        ]);
    }

    /**
     * Create a sage-femme with a specific specialty.
     */
    public function withSpecialite(string $specialite): static
    {
        return $this->state(fn (array $attributes) => [
            'specialite' => $specialite,
        ]);
    }

    /**
     * Create a sage-femme coordinator (cadre).
     */
    public function coordinator(): static
    {
        return $this->state(fn (array $attributes) => [
            'grade' => 'Sage-femme coordinatrice',
        ]);
    }

    /**
     * Create a senior sage-femme (cadre supérieur).
     */
    public function senior(): static
    {
        return $this->state(fn (array $attributes) => [
            'grade' => 'Sage-femme cadre supérieur',
        ]);
    }
}
