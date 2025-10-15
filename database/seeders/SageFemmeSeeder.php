<?php

namespace Database\Seeders;

use App\Models\SageFemme;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SageFemmeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer une sage-femme de test avec des données prédéfinies
        $user1 = User::create([
            'nom' => 'Maleck',
            'prenom' => 'Tata',
            'email' => 'maleck@edm.com',
            'password' => Hash::make('password'),
            'role' => 'sage_femme',
            'email_verified_at' => now(),
        ]);

        SageFemme::create([
            'user_id' => $user1->id,
            'matricule' => 'SF-MAR2024',
            'grade' => 'chef_de_service',
            'specialite' => 'Gynécologie',
            'numero_telephone' => '+226 07 39 97 50',
            'adresse' => 'Ouagadougou, Burkina Faso',
        ]);


        $this->command->info('✅ 1 sage-femme créée avec succès');
    }
}
