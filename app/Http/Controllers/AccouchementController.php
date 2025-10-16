<?php

namespace App\Http\Controllers;

use App\Models\Accouchement;
use App\Models\DossierPatient;
use App\Models\SageFemme;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccouchementController extends Controller
{
    /**
     * Afficher la liste des accouchements
     */
    public function index()
    {
        $accouchements = Accouchement::with(['sageFemme.user', 'dossierPatient.patiente.user'])
            ->orderBy('date_accouchement', 'desc')
            ->get();

        foreach ($accouchements as $accouchement) {
            $accouchement->patient = $accouchement->dossierPatient->patiente->user;
            $accouchement->sage_femme = $accouchement->sageFemme->user;

            $accouchement->sage_femme_nom = $accouchement->sageFemme->user->nom;
            $accouchement->sage_femme_prenom = $accouchement->sageFemme->user->prenom;
        }

        return Inertia::render('accouchements/index', [
            'accouchements' => $accouchements,
            'sagesFemmes' => SageFemme::with('user')->get(),
            'dossiers' => DossierPatient::with('patiente.user')->get(),
        ]);
    }

    /**
     * Afficher le formulaire de création d'un accouchement
     */
    public function create($dossierId)
    {
        $dossier = DossierPatient::with('patiente.user')->findOrFail($dossierId);
        $sagesFemmes = SageFemme::with('user')->get();

        return Inertia::render('Accouchements/AjouterAccouchement', [
            'dossier' => $dossier,
            'sagesFemmes' => $sagesFemmes,
        ]);
    }

    /**
     * Supprimer un accouchement
     */
    public function destroy(Accouchement $accouchement)
    {
        $accouchement->delete();

        return redirect()->back()->with('success', 'Accouchement supprimé avec succès.');
    }
}
