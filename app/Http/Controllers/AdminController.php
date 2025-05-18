<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\SageFemme;
use App\Models\Secretaire;
use App\Models\Patiente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Afficher la page d'index des utilisateurs
     */
    public function index()
    {
        // Vérifier si l'utilisateur a les permissions nécessaires
        if (!auth()->user()->isAdmin() &&
            !auth()->user()->isSageFemme() &&
            !auth()->user()->isSecretaire()) {
            abort(403);
        }

        // Récupérer les utilisateurs en fonction du rôle
        $admins = [];
        $sageFemmes = [];
        $secretaires = [];
        $patientes = [];

        // Si admin, récupérer tous les utilisateurs
        if (auth()->user()->isAdmin()) {
            $admins = User::where('role', 'admin')
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                        'email' => $user->email,
                        'role' => $user->role,
                    ];
                });

            $sageFemmes = User::where('role', 'sage_femme')
                ->with('sageFemme')
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                        'email' => $user->email,
                        'role' => $user->role,
                        'matricule' => $user->sageFemme ? $user->sageFemme->matricule : null,
                        'grade' => $user->sageFemme ? $user->sageFemme->grade : null,
                        'specialite' => $user->sageFemme ? $user->sageFemme->specialite : null,
                    ];
                });

            $secretaires = User::where('role', 'secretaire')
                ->with('secretaire')
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                        'email' => $user->email,
                        'role' => $user->role,
                        'matricule' => $user->secretaire ? $user->secretaire->matricule : null,
                        'grade' => $user->secretaire ? $user->secretaire->grade : null,
                    ];
                });
        }

        return Inertia::render('admin/index', [
            'admins' => $admins,
            'sageFemmes' => $sageFemmes,
            'secretaires' => $secretaires,
        ]);
    }

    /**
     * Stocker un nouvel utilisateur admin
     */
    public function storeAdmin(Request $request)
    {
        // Vérifier si l'utilisateur est admin
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        // Valider les données
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'numero_telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:255',
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'admin',
        ]);

        // Créer le profil admin
        $admin = Admin::create([
            'user_id' => $user->id,
            'numero_telephone' => $validated['numero_telephone'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
        ]);

        return redirect()->route('users.index')->with('success', 'Administrateur créé avec succès.');
    }

    /**
     * Stocker une nouvelle sage-femme
     */
    public function storeSageFemme(Request $request)
    {
        // Vérifier si l'utilisateur est admin
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        // Valider les données
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'matricule' => 'required|string|max:50|unique:sage_femmes',
            'grade' => 'required|string|max:100',
            'specialite' => 'nullable|string|max:100',
            'numero_telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:255',
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'sage_femme',
        ]);

        // Créer le profil sage-femme
        $sageFemme = SageFemme::create([
            'user_id' => $user->id,
            'matricule' => $validated['matricule'],
            'grade' => $validated['grade'],
            'specialite' => $validated['specialite'] ?? null,
            'numero_telephone' => $validated['numero_telephone'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
        ]);

        return redirect()->route('users.index')->with('success', 'Sage-femme créée avec succès.');
    }

    /**
     * Stocker un nouveau secrétaire
     */
    public function storeSecretaire(Request $request)
    {
        // Vérifier si l'utilisateur est admin
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        // Valider les données
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'matricule' => 'required|string|max:50|unique:secretaires',
            'grade' => 'required|string|max:100',
            'numero_telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:255',
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'secretaire',
        ]);

        // Créer le profil secrétaire
        $secretaire = Secretaire::create([
            'user_id' => $user->id,
            'matricule' => $validated['matricule'],
            'grade' => $validated['grade'],
            'numero_telephone' => $validated['numero_telephone'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
        ]);

        return redirect()->route('users.index')->with('success', 'Secrétaire créé avec succès.');
    }

    /**
     * Afficher un utilisateur
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        // Vérifier si l'utilisateur a les permissions nécessaires
        if (!auth()->user()->isAdmin() &&
            !auth()->user()->isSageFemme() &&
            !auth()->user()->isSecretaire()) {
            // Si c'est une patiente, elle ne peut voir que son propre profil
            if (auth()->user()->isPatiente() && auth()->id() != $id) {
                abort(403);
            }
        }

        $userData = [
            'id' => $user->id,
            'nom' => $user->nom,
            'prenom' => $user->prenom,
            'email' => $user->email,
            'role' => $user->role,
        ];

        // Ajouter les données spécifiques au rôle
        switch ($user->role) {
            case 'admin':
                $admin = $user->admin;
                if ($admin) {
                    $userData['numero_telephone'] = $admin->numero_telephone;
                    $userData['adresse'] = $admin->adresse;
                }
                break;

            case 'sage_femme':
                $sageFemme = $user->sageFemme;
                if ($sageFemme) {
                    $userData['matricule'] = $sageFemme->matricule;
                    $userData['grade'] = $sageFemme->grade;
                    $userData['specialite'] = $sageFemme->specialite;
                    $userData['numero_telephone'] = $sageFemme->numero_telephone;
                    $userData['adresse'] = $sageFemme->adresse;
                }
                break;

            case 'secretaire':
                $secretaire = $user->secretaire;
                if ($secretaire) {
                    $userData['matricule'] = $secretaire->matricule;
                    $userData['grade'] = $secretaire->grade;
                    $userData['numero_telephone'] = $secretaire->numero_telephone;
                    $userData['adresse'] = $secretaire->adresse;
                }
                break;
        }

        return Inertia::render('Users/Show', [
            'user' => $userData,
        ]);
    }
}
