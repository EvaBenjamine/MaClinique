<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'role' => 'required|in:admin,sage-femme,secretaire,patiente',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'role' => $request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Création de l'entité spécifique et assignation du rôle
        switch ($request->role) {
            case 'admin':
                \App\Models\Admin::create(['user_id' => $user->id]);
                $user->assignRole('admin');
                break;
            case 'sage-femme':
                \App\Models\SageFemme::create(['user_id' => $user->id]);
                $user->assignRole('sage-femme');
                break;
            case 'secretaire':
                \App\Models\Secretaire::create(['user_id' => $user->id]);
                $user->assignRole('secretaire');
                break;
            case 'patiente':
                $patiente = \App\Models\Patiente::create([
                    'user_id' => $user->id,
                    'numero_dossier' => uniqid('PAT-'),
                ]);
                $user->assignRole('patiente');
                // Création du dossier patient
                \App\Models\DossierPatient::create([
                    'patiente_id' => $patiente->id,
                    'date_ouverture' => now(),
                ]);
                break;
        }

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
