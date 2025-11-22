<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\SageFemme;
use App\Models\Secretaire;
use App\Models\Patiente;
use App\Models\DossierPatient; // Ajout de l'import manquant
use App\Models\Consultation;
use App\Models\Accouchement;
use App\Models\Examen;
use App\Models\Prescription;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PatienteController extends Controller
{
    /**
     * Afficher la page d'index des patientes
     */
    public function index()
    {
        $patientes = Patiente::with(['user', 'dossierPatient'])
            ->get()
            ->map(function ($patiente) {
                return [
                    'id' => $patiente->id,
                    'nom' => $patiente->user->nom,
                    'prenom' => $patiente->user->prenom,
                    'email' => $patiente->user->email,
                    'age' => $patiente->age,
                    'groupe_sanguin' => $patiente->groupe_sanguin,
                    'adresse' => $patiente->adresse,
                    'numero_telephone' => $patiente->numero_telephone,
                    'date_derniere_consultation' => $patiente->dossierPatient?->date_derniere_consultation,
                    'statut_dossier' => $patiente->dossierPatient?->statut_dossier ?? 'Non défini',
                    'date_accouchement_prevue' => $patiente->dossierPatient?->date_accouchement_prevue,
                    'sage_femme' => $patiente->dossierPatient->sageFemme->user->nom . ' ' . $patiente->dossierPatient->sageFemme->user->prenom,
                ];
            });

        // Récupérer les sages-femmes pour le formulaire
        $sagesFemmes = SageFemme::with('user')->get()->map(function ($sf) {
            return [
                'id' => $sf->id,
                'nom' => $sf->user->nom . ' ' . $sf->user->prenom,
            ];
        });

        return Inertia::render('patientes/liste', [
            'patientes' => $patientes,
            'sagesFemmes' => $sagesFemmes,
        ]);
    }

    /**
     * Afficher la page d'index des dossiers médicaux
     */
    public function indexDossiers()
    {
        $dossiers = DossierPatient::with(['patiente.user', 'sageFemme.user', 'consultations', 'examens'])
            ->get()
            ->map(function ($dossier) {
                try {
                    $ageGrossesse = $dossier->ageGrossesseSemaines() ?? 0;
                    $trimestre = $dossier->trimestre() ?? 'Non défini';

                    return [
                        'id' => $dossier->id,
                        'patiente' => [
                            'id' => $dossier->patiente->id,
                            'nom' => $dossier->patiente->user->nom,
                            'prenom' => $dossier->patiente->user->prenom,
                            'age' => $dossier->patiente->age,
                            'numero_telephone' => $dossier->patiente->numero_telephone ?? 'N/A',
                            'groupe_sanguin' => $dossier->patiente->groupe_sanguin ?? 'N/A',
                        ],
                        'sage_femme' => [
                            'id' => $dossier->sageFemme->id,
                            'nom' => $dossier->sageFemme->user->nom,
                            'prenom' => $dossier->sageFemme->user->prenom,
                        ],
                        'statut_dossier' => $dossier->statut_dossier ?? 'Actif',
                        'date_creation' => $dossier->created_at->format('Y-m-d'),
                        'date_derniere_consultation' => $dossier->date_derniere_consultation,
                        'date_accouchement_prevue' => $dossier->date_accouchement_prevue,
                        'trimestre' => $trimestre,
                        'age_grossesse_semaines' => $ageGrossesse,
                        'nombre_consultations' => $dossier->consultations->count(),
                        'nombre_examens' => $dossier->examens->count(),
                        'grossesse_a_risque' => $dossier->grossesse_a_risque ?? false,
                        'facteurs_risque' => $dossier->facteurs_risque,
                        'notes_importantes' => $dossier->notes_importantes,
                    ];
                } catch (\Exception $e) {
                    Log::error('Erreur lors du traitement du dossier ID: ' . $dossier->id, [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);

                    // Retourner des données par défaut en cas d'erreur
                    return [
                        'id' => $dossier->id,
                        'patiente' => [
                            'id' => $dossier->patiente->id ?? 0,
                            'nom' => $dossier->patiente->user->nom ?? 'Nom inconnu',
                            'prenom' => $dossier->patiente->user->prenom ?? 'Prénom inconnu',
                            'age' => $dossier->patiente->age ?? 0,
                            'numero_telephone' => 'N/A',
                            'groupe_sanguin' => 'N/A',
                        ],
                        'sage_femme' => [
                            'id' => 0,
                            'nom' => 'Non assigné',
                            'prenom' => '',
                        ],
                        'statut_dossier' => 'Erreur',
                        'date_creation' => $dossier->created_at->format('Y-m-d'),
                        'date_derniere_consultation' => null,
                        'date_accouchement_prevue' => null,
                        'trimestre' => 'Non défini',
                        'age_grossesse_semaines' => 0,
                        'nombre_consultations' => 0,
                        'nombre_examens' => 0,
                        'grossesse_a_risque' => false,
                        'facteurs_risque' => null,
                        'notes_importantes' => 'Erreur lors du chargement des données',
                    ];
                }
            });

        return Inertia::render('dossiers/index', [
            'dossiers' => $dossiers,
        ]);
    }

    /**
     * Afficher le formulaire de création d'une patiente
     */
    public function create()
    {
        // Récupérer les sages-femmes pour le formulaire
        $sagesFemmes = SageFemme::with('user')->get()->map(function ($sf) {
            return [
                'id' => $sf->id,
                'nom' => $sf->user->nom . ' ' . $sf->user->prenom,
            ];
        });

        return response()->json([
            'sagesFemmes' => $sagesFemmes,
        ]);
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
            'email' => 'nullable|string|email|max:255',
            'age' => 'required|integer|min:1|max:150',
            'profession' => 'nullable|string|max:255',
            'situation_matrimoniale' => 'nullable|string|max:50',
            'groupe_sanguin' => 'nullable|string|max:10',
            'numero_telephone' => 'nullable|string|max:20',
            'numero_conjoint' => 'nullable|string|max:20',
            'quartier' => 'nullable|string',
            'date_derniere_regle' => 'nullable|date',
            'date_accouchement_prevue' => 'nullable|date',
            'grossesse_multiple' => 'nullable|boolean',
            'nombre_foetus' => 'nullable|integer',
            'grossesse_a_risque' => 'nullable|boolean',
            'facteurs_risque' => 'nullable|string|max:255',
            'gestite' => 'nullable|integer|min:0',
            'parite' => 'nullable|integer|min:0',
            'fausses_couches' => 'nullable|integer|min:0',
            'ev' => 'nullable|integer|min:0',
            'morts_nes' => 'nullable|integer|min:0',
            'decedes' => 'nullable|integer|min:0',
            'antecedents_medicaux' => 'nullable|string|max:500',
            'antecedents_chirurgicaux' => 'nullable|string|max:500',
            'antecedents_familiaux' => 'nullable|string|max:500',
            'antecedents_gynecologiques' => 'nullable|string|max:500',
            'antecedents_obstetricaux' => 'nullable|string|max:500',
            'allergies' => 'nullable|string|max:500',
            'traitements_en_cours' => 'nullable|string|max:500',
            'maladies_chroniques' => 'nullable|string|max:500',
            'tabac' => 'nullable|boolean',
            'alcool' => 'nullable|boolean',
            'activite_physique' => 'nullable|string|max:255',
            'regime_alimentaire' => 'nullable|string|max:255',
            'sage_femme_id' => 'required|exists:sage_femmes,id',
            'statut_dossier' => 'nullable|string|max:255',
            'notes_importantes' => 'nullable|string|max:1000',
            'recommandations_particulieres' => 'nullable|string|max:1000',
        ], [
            'sage_femme_id.required' => 'Veuillez sélectionner une sage-femme assignée.',
            'sage_femme_id.exists' => 'La sage-femme sélectionnée n\'existe pas.',
        ]);

        // Calculer automatiquement la date d'accouchement si DDR est fournie
        if (!empty($validated['date_derniere_regle']) && empty($validated['date_accouchement_prevue'])) {
            $validated['date_accouchement_prevue'] = \Carbon\Carbon::parse($validated['date_derniere_regle'])
                ->addDays(280)
                ->toDateString();
        }

        try {
            DB::beginTransaction();

            // Générer un email automatique si non fourni
            $email = $validated['email'] ?? 'patiente_' . uniqid() . '@edm.com';

            // Créer l'utilisateur
            $user = User::create([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'email' => $email,
                'password' => Hash::make('password'),
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
                'numero_conjoint' => $validated['numero_conjoint'] ?? null,
                'quartier' => $validated['quartier'] ?? null,
            ]);

            // Créer le dossier de la patiente
            $dossier = DossierPatient::create([
                'patiente_id' => $patiente->id,
                'sage_femme_id' => $validated['sage_femme_id'],
                'date_derniere_regle' => $validated['date_derniere_regle'] ?? null,
                'date_accouchement_prevue' => $validated['date_accouchement_prevue'] ?? null,
                'grossesse_multiple' => $validated['grossesse_multiple'] ?? false,
                'nombre_foetus' => $validated['nombre_foetus'] ?? null,
                'grossesse_a_risque' => $validated['grossesse_a_risque'] ?? false,
                'facteurs_risque' => $validated['facteurs_risque'] ?? null,
                'gestite' => $validated['gestite'] ?? 0,
                'parite' => $validated['parite'] ?? 0,
                'fausses_couches' => $validated['fausses_couches'] ?? 0,
                'ev' => $validated['ev'] ?? 0,
                'morts_nes' => $validated['morts_nes'] ?? 0,
                'decedes' => $validated['decedes'] ?? 0,
                'antecedents_medicaux' => $validated['antecedents_medicaux'] ?? null,
                'antecedents_chirurgicaux' => $validated['antecedents_chirurgicaux'] ?? null,
                'antecedents_familiaux' => $validated['antecedents_familiaux'] ?? null,
                'antecedents_gynecologiques' => $validated['antecedents_gynecologiques'] ?? null,
                'antecedents_obstetricaux' => $validated['antecedents_obstetricaux'] ?? null,
                'allergies' => $validated['allergies'] ?? null,
                'traitements_en_cours' => $validated['traitements_en_cours'] ?? null,
                'maladies_chroniques' => $validated['maladies_chroniques'] ?? null,
                'tabac' => $validated['tabac'] ?? false,
                'alcool' => $validated['alcool'] ?? false,
                'activite_physique' => $validated['activite_physique'] ?? null,
                'regime_alimentaire' => $validated['regime_alimentaire'] ?? null,
                'statut_dossier' => $validated['statut_dossier'] ?? 'Actif',
                'date_derniere_consultation' => null,
                'notes_importantes' => $validated['notes_importantes'] ?? null,
                'recommandations_particulieres' => $validated['recommandations_particulieres'] ?? null,
            ]);

            DB::commit();

            return redirect()->route('patientes.index')->with('success', 'Patiente créée avec succès.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Erreur lors de la création de la patiente: ' . $e->getMessage()]);
        }
    }

    /**
     * Afficher le dossier d'une patiente
     */
    public function show($id)
    {
        $patiente = Patiente::with([
            'user',
            'dossierPatient.sageFemme.user',
        ])->findOrFail($id);

        $dossier = $patiente->dossierPatient;
        $sage_femme = $dossier->sageFemme->user;
        $consultations = $dossier->consultations;
        $examens = $dossier->examens;
        $prescriptions = $dossier->prescriptions;
        $documents = $dossier->documents;
        $accouchements = $dossier->accouchements;
        $sages_femmes = SageFemme::with('user')->get()->map(function ($sf) {
            return [
                'id' => $sf->id,
                'nom' => $sf->user->nom ,
                'prenom' => $sf->user->prenom,
            ];
        });

        //dd($dossier, $patiente, $sage_femme);
        return Inertia::render('patientes/dossier', [
            'dossier' => $dossier,
            'patiente' => [
                'id' => $patiente->id,
                'nom' => $patiente->user->nom,
                'prenom' => $patiente->user->prenom,
                'email' => $patiente->user->email,
                'age' => $patiente->age,
                'profession' => $patiente->profession,
                'situation_matrimoniale' => $patiente->situation_matrimoniale,
                'groupe_sanguin' => $patiente->groupe_sanguin,
                'numero_telephone' => $patiente->numero_telephone,
                'numero_conjoint' => $patiente->numero_conjoint,
                'quartier' => $patiente->quartier,
            ],
            'sage_femme' => $sage_femme,
            'consultations' => $consultations,
            'examens' => $examens,
            'prescriptions' => $prescriptions,
            'documents' => $documents,
            'accouchements' => $accouchements,
            'trimestre' => $dossier->trimestre(),
            'age_grossesse_semaines' => $dossier->ageGrossesseSemaines(),
            'sages_femmes' => $sages_femmes,
        ]);
    }

    /**
     * Afficher le formulaire d'édition d'une patiente
     */
    public function edit($id)
    {
        $patiente = Patiente::with(['user', 'dossierPatient'])->findOrFail($id);

        $sagesFemmes = SageFemme::with('user')->get()->map(function ($sf) {
            return [
                'id' => $sf->id,
                'nom' => $sf->user->nom . ' ' . $sf->user->prenom,
            ];
        });

        return Inertia::render('Patientes/ModifierPatiente', [
            'patiente' => $patiente,
            'sagesFemmes' => $sagesFemmes,
        ]);
    }

    /**
     * Mettre à jour une patiente
     */
    public function update(Request $request, $id)
    {
        $patiente = Patiente::with(['user', 'dossierPatient'])->findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => ['nullable', 'string', 'email', 'max:255', Rule::unique('users')->ignore($patiente->user_id)],
            'age' => 'required|integer|min:1|max:150',
            'profession' => 'nullable|string|max:255',
            'situation_matrimoniale' => 'nullable|string|max:50',
            'groupe_sanguin' => 'nullable|string|max:10',
            'numero_telephone' => 'nullable|string|max:20',
            'numero_conjoint' => 'nullable|string|max:20',
            'quartier' => 'nullable|string',
            // Ajoutez les autres champs selon vos besoins...
        ]);

        try {
            DB::beginTransaction();

            // Générer un email automatique si non fourni
            $email = $validated['email'] ?? $patiente->user->email ?? 'patiente_' . uniqid() . '@ecoledemamans.bf';

            // Mettre à jour l'utilisateur
            $patiente->user->update([
                'nom' => $validated['nom'],
                'prenom' => $validated['prenom'],
                'email' => $email,
            ]);

            // Mettre à jour la patiente
            $patiente->update([
                'age' => $validated['age'],
                'profession' => $validated['profession'] ?? null,
                'situation_matrimoniale' => $validated['situation_matrimoniale'] ?? null,
                'groupe_sanguin' => $validated['groupe_sanguin'] ?? null,
                'numero_telephone' => $validated['numero_telephone'] ?? null,
                'numero_conjoint' => $validated['numero_conjoint'] ?? null,
                'quartier' => $validated['quartier'] ?? null,
            ]);

            DB::commit();

            return redirect()->route('patientes.show', $id)->with('success', 'Patiente mise à jour avec succès.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Erreur lors de la mise à jour: ' . $e->getMessage()]);
        }
    }

    public function storeConsultation(Request $request){
        $validated = $request->validate([
            'dossier_patient_id' => 'required|exists:dossier_patients,id',
            'date' => 'required|date',
            'type_consultation' => 'required|string',

            // Champs communs (14 champs)
            'poids' => 'nullable|numeric',
            'tension_arterielle_systolique' => 'nullable|numeric',
            'tension_arterielle_diastolique' => 'nullable|numeric',
            'observations' => 'nullable|string',
            'prescriptions' => 'nullable|string',
            'examens_prescrits' => 'nullable|string',
            'recommandations' => 'nullable|string',
            'varices' => 'nullable|string',
            'dents_gencives' => 'nullable|string',
            'hauteur_uterine' => 'nullable|numeric',
            'position_foetus' => 'nullable|string|max:255',
            'rythme_cardiaque_foetal' => 'nullable|integer',
            'prochain_rdv' => 'nullable|date',

            // Champs spécifiques CPN (10 champs)
            'age_gestationnel_semaines' => 'nullable|integer',
            'plaintes' => 'nullable|string',
            'maf' => 'nullable|string',
            'vulve' => 'nullable|string',
            'examen_speculum' => 'nullable|string',
            'toucher_vaginal' => 'nullable|string',
            'etat_bassin' => 'nullable|string',

            // Champs spécifiques CPP (17 champs)
            'jour_postnatal' => 'nullable|integer',
            'montee_lait' => 'nullable|boolean',
            'presence_gercures' => 'nullable|boolean',
            'engorgement_mamaire' => 'nullable|boolean',
            'involution_uterine' => 'nullable|boolean',
            'perinee' => 'nullable|string',
            'lochies' => 'nullable|in:normales,abondantes,malodorantes,absentes',
            'mollets' => 'nullable|string',
            'toucher_vaginal_cpp' => 'nullable|string',
            'contraception' => 'nullable|string',
            'poids_nouveau_ne' => 'nullable|numeric',
            'taille_nouveau_ne' => 'nullable|numeric',
            'perimetre_cranien_nouveau_ne' => 'nullable|numeric',
            'perimetre_thoracique_nouveau_ne' => 'nullable|numeric',
            'temperature_nouveau_ne' => 'nullable|numeric',
            'cordon' => 'nullable|string',
            'reflexes' => 'nullable|boolean',
        ]);

        try {
            DB::beginTransaction();

            // Récupérer l'ID de la sage-femme à partir de l'utilisateur connecté
            $sageFemme = SageFemme::where('user_id', auth()->user()->id)->first();

            if (!$sageFemme) {
                throw new \Exception('Utilisateur non autorisé à créer des consultations.');
            }

            // Créer la consultation avec tous les champs
            $consultationData = [
                'dossier_patient_id' => $validated['dossier_patient_id'],
                'sage_femme_id' => $sageFemme->id,
                'date' => $validated['date'],
                'type_consultation' => $validated['type_consultation'],
            ];

            // Ajouter tous les champs disponibles dans validated
            foreach ($validated as $key => $value) {
                if ($key !== 'dossier_patient_id') {
                    $consultationData[$key] = $value;
                }
            }

            $consultation = Consultation::create($consultationData);

            // Mettre à jour la date de dernière consultation dans le dossier patient
            $dossier = DossierPatient::findOrFail($validated['dossier_patient_id']);
            $dossier->update(['date_derniere_consultation' => $validated['date']]);

            DB::commit();

            return back()->with('success', 'Consultation enregistrée avec succès.');

        } catch (\Exception $e) {
            DB::rollBack();

            // Log l'erreur pour le débogage
            \Log::error('Erreur lors de l\'enregistrement de la consultation', [
                'user_id' => auth()->user()->id ?? 'non connecté',
                'request_data' => $request->all(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Erreur lors de l\'enregistrement de la consultation: ' . $e->getMessage()]);
        }

    }


    public function storeAccouchement(Request $request)
    {
        $validated = $request->validate([
            'dossier_patient_id' => 'required|exists:dossier_patients,id',
            'date_accouchement' => 'required|date',
            'heure_accouchement' => 'required',

            // Informations sur la grossesse
            'age_gestationnel' => 'nullable|integer',

            // Travail et accouchement
            'travail' => 'nullable|in:spontane,declenche',
            'presentation' => 'nullable|string',
            'mode_accouchement' => 'nullable|string',

            // Périnée
            'episiotomie' => 'nullable|boolean',
            'dechirure' => 'nullable|boolean',

            // Délivrance
            'delivrance' => 'nullable|string',
            'mode_delivrance' => 'nullable|string',
            'poids_placenta' => 'nullable|numeric',

            // Bébé
            'peau_a_peau' => 'nullable|boolean',
            'poids_bebe' => 'nullable|numeric',
            'taille_bebe' => 'nullable|numeric',
            'perimetre_cranien_bebe' => 'nullable|numeric',
            'perimetre_thoracique_bebe' => 'nullable|numeric',
            'sexe' => 'nullable|in:masculin,feminin',
            'mise_au_sein' => 'nullable|boolean',
            'vitamine_k' => 'nullable|boolean',

            // Notes
            'observations' => 'nullable|string',
            'complications' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            // Récupérer l'ID de la sage-femme à partir de l'utilisateur connecté
            $sageFemme = SageFemme::where('user_id', auth()->user()->id)->first();

            if (!$sageFemme) {
                throw new \Exception('Utilisateur non autorisé à créer des accouchements.');
            }

            // Créer l'accouchement avec tous les champs
            $accouchementData = [
                'dossier_patient_id' => $validated['dossier_patient_id'],
                'sage_femme_id' => $sageFemme->id,
            ];

            // Ajouter tous les champs disponibles dans validated
            foreach ($validated as $key => $value) {
                if ($key !== 'dossier_patient_id') {
                    $accouchementData[$key] = $value;
                }
            }

            $accouchement = Accouchement::create($accouchementData);

            DB::commit();

            return back()->with('success', 'Accouchement enregistré avec succès.');

        } catch (\Exception $e) {
            DB::rollBack();

            // Log l'erreur pour le débogage
            \Log::error('Erreur lors de l\'enregistrement de l\'accouchement', [
                'user_id' => auth()->user()->id ?? 'non connecté',
                'request_data' => $request->all(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Erreur lors de l\'enregistrement de l\'accouchement: ' . $e->getMessage()]);
        }
    }


    public function storeExamen(Request $request)
    {
        $validated = $request->validate([
            'dossier_patient_id' => 'required|exists:dossier_patients,id',
            'realise_par' => 'nullable|exists:sage_femmes,id',
            'prescrit_par' => 'nullable|exists:sage_femmes,id',
            'type' => 'required|string|max:255',
            'date_examen' => 'required|date',
            'resultats' => 'nullable|string|max:1000',
        ]);

        try {
            DB::beginTransaction();

            // Créer l'examen
            $examen = Examen::create([
                'dossier_patient_id' => $validated['dossier_patient_id'],
                'type' => $validated['type'],
                'date' => $validated['date_examen'],
                'realise_par' => $validated['realise_par'] ?? null,
                'prescrit_par' => $validated['prescrit_par'] ?? null,
                'resultats' => $validated['resultats'] ?? null,
            ]);

            // // Créer l'échographie si c'est une échographie
            // if ($validated['type_examen'] === 'Échographie') {
            //     $echographie = Echographie::create([
            //         'examen_id' => $examen->id,
            //         'trimestre' => $validated['trimestre'],
            //         'biometrie' => $validated['biometrie'] ?? null,
            //         'mesures_biometriques' => $validated['mesures_biometriques'] ?? null,
            //         'sexe_foetus' => $validated['sexe_foetus'] ?? null,
            //         'poids_estime' => $validated['poids_estime'] ?? null,
            //         'observations_morphologiques' => $validated['observations_morphologiques'] ?? null,
            //         'observations_placenta' => $validated['observations_placenta'] ?? null,
            //         'observations_liquide_amniotique' => $validated['observations_liquide_amniotique'] ?? null,
            //         'observations_generales' => $validated['observations_generales'] ?? null,
            //     ]);
            // }

            DB::commit();

            return back()->with('success', 'Examen enregistrée avec succès.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Erreur lors de l\'enregistrement de l\'examen: ' . $e->getMessage()]);
        }

    }

    /**
     * Supprimer une patiente
     */
    public function destroy($id)
    {
        try {
            $patiente = Patiente::with(['user', 'dossierPatient'])->findOrFail($id);

            DB::beginTransaction();

            // Supprimer le dossier patient s'il existe
            if ($patiente->dossierPatient) {
                $patiente->dossierPatient->delete();
            }

            // Supprimer la patiente
            $patiente->delete();

            // Supprimer l'utilisateur
            $patiente->user->delete();

            DB::commit();

            return redirect()->route('patientes.index')->with('success', 'Patiente supprimée avec succès.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Erreur lors de la suppression: ' . $e->getMessage()]);
        }
    }
}
