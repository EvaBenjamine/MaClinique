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
        $patientes = Patiente::with('user')->get();
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
            'date_derniere_regle' => 'nullable|date',
            'date_accouchement_prevue' => 'nullable|date',
            'grossesse_multiple' => 'nullable|boolean',
            'nombre_foetus' => 'nullable|integer',
            'grossesse_a_risque' => 'nullable|boolean',
            'facteurs_risque' => 'nullable|string|max:50',
            'nombre_grossesses_anterieures' => 'nullable|integer',
            'nombre_accouchements' => 'nullable|integer',
            'nombre_avortements' => 'nullable|integer',
            'nombre_enfants_vivants' => 'nullable|integer',
            'antecedents_medicaux' => 'nullable|string|max:255',
            'antecedents_chirurgicaux' => 'nullable|string|max:255',
            'antecedents_familiaux' => 'nullable|string|max:255',
            'antecedents_gynecologiques' => 'nullable|string|max:255',
            'antecedents_obstetricaux' => 'nullable|string|max:255',
            'allergies' => 'nullable|string|max:255',
            'traitements_en_cours' => 'nullable|string|max:255',
            'maladies_chroniques' => 'nullable|string|max:255',
            'tabac' => 'nullable|boolean',
            'alcool' => 'nullable|boolean',
            'activite_physique' => 'nullable|string|max:255',
            'regime_alimentaire' => 'nullable|string|max:255',
            // 'sage_femme_referente_id' => 'nullable|integer',
            // 'medecin_referent_id' => 'nullable|integer',
            'statut_dossier' => 'nullable|string|max:255',
            'date_derniere_consultation' => 'nullable|date',
            'notes_importantes' => 'nullable|string|max:255',
            'recommandations_particulieres' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'patiente',
        ]);

        // Créer la patiente associée à l'utilisateur
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

        // Créer le dossier de la patiente
        $dossier = DossierPatient::create([
            'patiente_id' => $patiente->id,
            'sage_femme_id' => $validated['sage_femme_id'] ?? null,
            'date_derniere_regle' => $validated['date_derniere_regle'] ?? null,
            'date_accouchement_prevue' => $validated['date_accouchement_prevue'] ?? null,
            'grossesse_multiple' => $validated['grossesse_multiple'] ?? null,
            'nombre_foetus' => $validated['nombre_foetus'] ?? null,
            'grossesse_a_risque' => $validated['grossesse_a_risque'] ?? null,
            'facteurs_risque' => $validated['facteurs_risque'] ?? null,
            'nombre_grossesses_anterieures' => $validated['nombre_grossesses_anterieures'] ?? null,
            'nombre_accouchements' => $validated['nombre_accouchements'] ?? null,
            'nombre_avortements' => $validated['nombre_avortements'] ?? null,
            'nombre_enfants_vivants' => $validated['nombre_enfants_vivants'] ?? null,
            'antecedents_medicaux' => $validated['antecedents_medicaux'] ?? null,
            'antecedents_chirurgicaux' => $validated['antecedents_chirurgicaux'] ?? null,
            'antecedents_familiaux' => $validated['antecedents_familiaux'] ?? null,
            'antecedents_gynecologiques' => $validated['antecedents_gynecologiques'] ?? null,
            'antecedents_obstetricaux' => $validated['antecedents_obstetricaux'] ?? null,
            'allergies' => $validated['allergies'] ?? null,
            'traitements_en_cours' => $validated['traitements_en_cours'] ?? null,
            'maladies_chroniques' => $validated['maladies_chroniques'] ?? null,
            'tabac' => $validated['tabac'] ?? null,
            'alcool' => $validated['alcool'] ?? null,
            'activite_physique' => $validated['activite_physique'] ?? null,
            'regime_alimentaire' => $validated['regime_alimentaire'] ?? null,
            // 'sage_femme_referente_id' => $validated['sage_femme_referente_id'] ?? null,
            // 'medecin_referent_id' => $validated['medecin_referent_id'] ?? null,
            'statut_dossier' => $validated['statut_dossier'] ?? null,
            'date_derniere_consultation' => $validated['date_derniere_consultation'] ?? null,
            'notes_importantes' => $validated['notes_importantes'] ?? null,
            'recommandations_particulieres' => $validated['recommandations_particulieres'] ?? null,
        ]);

        return redirect()->route('users.index')->with('success', 'Patiente créé avec succès.');
    }
}


