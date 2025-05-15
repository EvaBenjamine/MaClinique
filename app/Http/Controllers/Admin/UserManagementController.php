<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use App\Models\SageFemme;
use App\Models\Secretaire;
use App\Models\Patiente;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    // Afficher la liste de tous les utilisateurs
    public function index()
    {
        $users = User::with(['admin', 'sageFemme', 'secretaire', 'patiente'])
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('admin/users/index', ['users' => $users]);
    }

    // Afficher le formulaire de création
    public function create()
    {
        return Inertia::render('admin/users/create');
    }

    // Enregistrer un nouvel utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required|string',
            'adresse' => 'required|string',
            'role' => 'required|in:admin,sage-femme,secretaire,patiente',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);
        // Création entité spécifique
        switch ($request->role) {
            case 'admin':
                Admin::create(['user_id' => $user->id]);
                $user->assignRole('admin');
                break;
            case 'sage-femme':
                SageFemme::create(['user_id' => $user->id]);
                $user->assignRole('sage-femme');
                break;
            case 'secretaire':
                Secretaire::create(['user_id' => $user->id]);
                $user->assignRole('secretaire');
                break;
            case 'patiente':
                $patiente = Patiente::create([
                    'user_id' => $user->id,
                    'numero_dossier' => uniqid('PAT-'),
                ]);
                $user->assignRole('patiente');
                break;
        }
        return redirect()->route('admin.users.index')->with('success', 'Utilisateur créé !');
    }

    // Afficher le formulaire d’édition
    public function edit($id)
    {
        $user = User::with(['admin', 'sageFemme', 'secretaire', 'patiente'])->findOrFail($id);
        return Inertia::render('admin/users/edit', ['user' => $user]);
    }

    // Mettre à jour l’utilisateur
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'telephone' => 'required|string',
            'adresse' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$user->id,
        ]);
        $user->update($request->only(['nom', 'prenom', 'telephone', 'adresse', 'email']));
        return redirect()->route('admin.users.index')->with('success', 'Utilisateur mis à jour !');
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'Utilisateur supprimé !');
    }
}
