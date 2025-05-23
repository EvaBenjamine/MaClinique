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

class PatienteController extends Controller
{
    /**
     * Afficher la page d'index des patientes
     */
    public function index()
    {
        // Récupérer les patientes en fonction du rôle
        $patientes = [];
        $patientes = Patient::with('user')->get();
        // $patientes = Patiente::with('user')->whereHas('user', function ($query) {
        //     $query->where('role', 'patiente');
        // })->get();

        return Inertia::render('Patientes/ListePatientes', [
            'patientes' => $patientes,
        ]);

    }
    /**
     * Afficher le formulaire de création d'une patiente
     */
    public function create(){
        return Inertia::render('Patientes/AjouterPatiente');
    }

    /**
     * Enregistrer une nouvelle patiente
     */
    public function store(Request $request)
    {
        // Valider les données
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'age' => 'required|integer|min:1|max:150',
            'profession' => 'nullable|string|max:255',
            'situation_matrimoniale' => 'nullable|string|max:50',
            'groupe_sanguin' => 'nullable|string|max:10',
            'numero_telephone' => 'nullable|string|max:20',
            'numero_urgence' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:255',
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'patiente',
        ]);

        // Créer le profil patiente
        $patiente = Patiente::create([
            'user_id' => $user->id,
            'age' => $validated['age'],
            'profession' => $validated['profession'] ?? null,
            'situation_matrimoniale' => $validated['situation_matrimoniale'] ?? null,
            'groupe_sanguin' => $validated['groupe_sanguin'] ?? null,
            'numero_telephone' => $validated['numero_telephone'] ?? null,
            'numero_urgence' => $validated['numero_urgence'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
        ]);

        return redirect()->route('users.index')->with('success', 'Patiente créé avec succès.');
    }

        /**
     * Afficher le formulaire d'édition d'une patiente
     */
    public function edit($id)
    {
        $patiente = Patiente::with('user')->findOrFail($id);
        return Inertia::render('Patientes/EditerPatiente', [
            'patiente' => $patiente,
        ]);
    }
    /**
     * Mettre à jour une patiente
     */
    public function update(Request $request, $id)
    {
        // Valider les données
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($id),
            ],
            'age' => 'required|integer|min:1|max:150',
            'profession' => 'nullable|string|max:255',
            'situation_matrimoniale' => 'nullable|string|max:50',
            'groupe_sanguin' => 'nullable|string|max:10',
            'numero_telephone' => 'nullable|string|max:20',
            'numero_urgence' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:255',
        ]);

        // Mettre à jour l'utilisateur
        $user = User::findOrFail($id);
        $user->update([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
        ]);

        // Mettre à jour le profil patiente
        $patiente = Patiente::where('user_id', $id)->first();
        $patiente->update([
            'age' => $validated['age'],
            'profession' => $validated['profession'] ?? null,
            'situation_matrimoniale' => $validated['situation_matrimoniale'] ?? null,
            'groupe_sanguin' => $validated['groupe_sanguin'] ?? null,
            'numero_telephone' => $validated['numero_telephone'] ?? null,
            'numero_urgence' => $validated['numero_urgence'] ?? null,
            'adresse' => $validated['adresse'] ?? null,
        ]);

        return redirect()->route('users.index')->with('success', "Patiente mise à jour avec succès.");
    }

}


