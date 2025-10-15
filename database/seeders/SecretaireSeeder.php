<?php

namespace Database\Seeders;

use App\Models\Secretaire;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SecretaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer un secrétaire de test avec des données prédéfinies
        $user1 = User::create([
            'nom' => 'Ouédraogo',
            'prenom' => 'Aminata',
            'email' => 'aminata@edm.com',
            'password' => Hash::make('password'),
            'role' => 'secretaire',
            'email_verified_at' => now(),
        ]);

        Secretaire::create([
            'user_id' => $user1->id,
            'matricule' => 'SEC-AMI2024',
            'grade' => 'chef_de_service',
            'numero_telephone' => '+226 07 55 44 33',
            'adresse' => 'Ouagadougou, Burkina Faso',
        ]);

        // Créer un deuxième secrétaire de test
        $user2 = User::create([
            'nom' => 'Kaboré',
            'prenom' => 'Fatoumata',
            'email' => 'fatoumata@edm.com',
            'password' => Hash::make('password'),
            'role' => 'secretaire',
            'email_verified_at' => now(),
        ]);

        Secretaire::create([
            'user_id' => $user2->id,
            'matricule' => 'SEC-FAT2024',
            'grade' => 'assistante',
            'numero_telephone' => '+226 06 11 22 33',
            'adresse' => 'Bobo-Dioulasso, Burkina Faso',
        ]);


        $this->command->info('✅ 2 secrétaires créé(e)s avec succès (2 prédéfini(e)s + 3 aléatoires)');
    }
}
