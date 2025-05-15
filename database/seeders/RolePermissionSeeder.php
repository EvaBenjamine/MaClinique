<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Créer les rôles
        $roles = [
            'admin',
            'sage-femme',
            'secretaire',
            'patiente',
        ];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // Exemple de permissions (à adapter selon besoin)
        Permission::firstOrCreate(['name' => 'gerer utilisateurs']);
        Permission::firstOrCreate(['name' => 'gerer patientes']);
        Permission::firstOrCreate(['name' => 'voir dossiers']);
        // ...

        // Créer un admin par défaut
        $adminUser = User::firstOrCreate([
            'email' => 'admin@maclinique.com',
        ], [
            'nom' => 'Admin',
            'prenom' => 'Principal',
            'telephone' => '0000000000',
            'adresse' => 'Siège',
            'password' => Hash::make('admin1234'),
            'email_verified_at' => now(),
        ]);
        $adminUser->assignRole('admin');
        Admin::firstOrCreate(['user_id' => $adminUser->id]);
    }
}
