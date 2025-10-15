<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer les utilisateurs admin de test
        User::factory()->create([
            'nom' => 'Super',
            'prenom' => 'Admin',
            'email' => 'admin@edm.com',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'nom' => 'Hiensontie',
            'prenom' => 'Agnes',
            'email' => 'agnes@edm.com',
            'role' => 'admin',
        ]);

        // Appeler le seeder des sages-femmes et secrétaires
        $this->call([
            SageFemmeSeeder::class,
            SecretaireSeeder::class,
        ]);
    }
}
