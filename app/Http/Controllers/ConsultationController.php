<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\DossierPatient;
use App\Models\SageFemme;
use App\Models\Patiente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    /**
     * Afficher la liste des consultations pour un dossier patient
     */
    public function index()
    {
        $consultations = Consultation::with(['sageFemme.user', 'dossierPatient.patiente.user'])
            ->orderBy('date', 'desc')
            ->get();

        foreach ($consultations as $consultation) {
            $consultation->patient = $consultation->dossierPatient->patiente->user;
            $consultation->sage_femme = $consultation->sageFemme->user;

            $consultation->sage_femme_nom = $consultation->sageFemme->user->nom;
            $consultation->sage_femme_prenom = $consultation->sageFemme->user->prenom;
        }


        return Inertia::render('consultations/index', [
            'consultations' => $consultations,
            'sagesFemmes' => SageFemme::with('user')->get(),
            'dossiers' => DossierPatient::with('patiente.user')->get(),
        ]);
    }

    /**
     * Afficher le formulaire de création d'une consultation
     */
    public function create($dossierId)
    {
        $dossier = DossierPatient::with('patiente.user')->findOrFail($dossierId);
        $sagesFemmes = SageFemme::with('user')->get();

        return Inertia::render('Consultations/AjouterConsultation', [
            'dossier' => $dossier,
            'sagesFemmes' => $sagesFemmes,
        ]);
    }



    /**
     * Afficher les détails d'une consultation
     */
    public function show($dossierId, $consultationId)
    {
        $dossier = DossierPatient::with('patiente.user')->findOrFail($dossierId);
        $consultation = Consultation::with('sageFemme.user')->findOrFail($consultationId);

        // Vérifier que la consultation appartient bien au dossier
        if ($consultation->dossier_patient_id != $dossierId) {
            abort(404);
        }

        return Inertia::render('Consultations/ConsultationDetails', [
            'dossier' => $dossier,
            'consultation' => $consultation,
        ]);
    }

    /**
     * Afficher le formulaire de modification d'une consultation
     */
    public function edit($dossierId, $consultationId)
    {
        $dossier = DossierPatient::with('patiente.user')->findOrFail($dossierId);
        $consultation = Consultation::findOrFail($consultationId);
        $sagesFemmes = SageFemme::with('user')->get();

        // Vérifier que la consultation appartient bien au dossier
        if ($consultation->dossier_patient_id != $dossierId) {
            abort(404);
        }

        return Inertia::render('Consultations/ModifierConsultation', [
            'dossier' => $dossier,
            'consultation' => $consultation,
            'sagesFemmes' => $sagesFemmes,
        ]);
    }

    /**
     * Mettre à jour une consultation
     */
    public function update(Request $request, $dossierId, $consultationId)
    {
        // Valider les données
        $validated = $request->validate([
            'sage_femme_id' => 'required|exists:sage_femmes,id',
            'date' => 'required|date',
            'type_consultation' => 'required|string|max:255',
            'poids' => 'nullable|numeric',
            'tension_arterielle_systolique' => 'nullable|numeric',
            'tension_arterielle_diastolique' => 'nullable|numeric',
            'hauteur_uterine' => 'nullable|numeric',
            'position_foetus' => 'nullable|string|max:255',
            'rythme_cardiaque_foetal' => 'nullable|integer',
            'observations' => 'nullable|string',
            'prescriptions' => 'nullable|string',
            'examens_prescrits' => 'nullable|string',
            'recommandations' => 'nullable|string',
        ]);

        // Récupérer la consultation
        $consultation = Consultation::findOrFail($consultationId);

        // Vérifier que la consultation appartient bien au dossier
        if ($consultation->dossier_patient_id != $dossierId) {
            abort(404);
        }

        // Mettre à jour la consultation
        $consultation->update($validated);

        return redirect()->route('dossiers.consultations.show', [$dossierId, $consultationId])
            ->with('success', 'Consultation mise à jour avec succès.');
    }

    /**
     * Supprimer une consultation
     */
    public function destroy($dossierId, $consultationId)
    {
        $consultation = Consultation::findOrFail($consultationId);

        // Vérifier que la consultation appartient bien au dossier
        if ($consultation->dossier_patient_id != $dossierId) {
            abort(404);
        }

        $consultation->delete();

        return redirect()->route('dossiers.consultations.index', $dossierId)
            ->with('success', 'Consultation supprimée avec succès.');
    }
}
