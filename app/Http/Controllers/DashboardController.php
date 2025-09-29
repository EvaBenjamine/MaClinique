<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patiente;
use App\Models\Consultation;
use App\Models\Examen;
use App\Models\Prescription;
use App\Models\Rdv;
use App\Models\Document;
use App\Models\Note;
use App\Models\Accouchement;
use App\Models\User;

class DashboardController extends Controller
{
    /**
     * Afficher la liste des patientes
     */
    public function index()
    {
        $patientes = Patiente::with('user')->count();

        $users= User::with('patiente', 'sageFemme', 'secretaire')->count();

        $consultations = Consultation::with(['sageFemme.user', 'dossierPatient.patiente.user'])->get();

        $CPN = Consultation::where('type_consultation', 'consultation_prenatale')->count();
        $CPP = Consultation::where('type_consultation', 'consultation_postnatale')->count();
        $autres = Consultation::whereNotIn('type_consultation', ['consultation_prenatale', 'consultation_postnatale'])->count();

        $annee = 2025; // Année spécifique
        $Jan = Consultation::whereMonth('date', 1)
                   ->whereYear('date', $annee)
                   ->count();
        $Fev = Consultation::whereMonth('date', 2)
                   ->whereYear('date', $annee)
                   ->count();
        $Mar = Consultation::whereMonth('date', 3)
                   ->whereYear('date', $annee)
                   ->count();
        $Avr = Consultation::whereMonth('date', 4)
                   ->whereYear('date', $annee)
                   ->count();
        $Mai = Consultation::whereMonth('date', 5)
                   ->whereYear('date', $annee)
                   ->count();
        $Juin = Consultation::whereMonth('date', 6)
                   ->whereYear('date', $annee)
                   ->count();
        $Juil = Consultation::whereMonth('date', 7)
                   ->whereYear('date', $annee)
                   ->count();
        $Aout = Consultation::whereMonth('date', 8)
                   ->whereYear('date', $annee)
                   ->count();
        $Sep = Consultation::whereMonth('date', 9)
                   ->whereYear('date', $annee)
                   ->count();
        $Oct = Consultation::whereMonth('date', 10)
                   ->whereYear('date', $annee)
                   ->count();
        $Nov = Consultation::whereMonth('date', 11)
                   ->whereYear('date', $annee)
                   ->count();
        $Dec = Consultation::whereMonth('date', 12)
                   ->whereYear('date', $annee)
                   ->count();

                   //dd($Jan, $Fev, $Mar, $Avr, $Mai, $Juin, $Juil, $Aout, $Sep, $Oct, $Nov, $Dec);

        return inertia('dashboard', [
            'patientesCount' => $patientes,
            'usersCount' => $users,
            'consultations' => $consultations,
            'CPN' => $CPN,
            'CPP' => $CPP,
            'autres' => $autres,
            'Jan' => $Jan,
            'Fev' => $Fev,
            'Mar' => $Mar,
            'Avr' => $Avr,
            'Mai' => $Mai,
            'Juin' => $Juin,
            'Juil' => $Juil,
            'Aout' => $Aout,
            'Sep' => $Sep,
            'Oct' => $Oct,
            'Nov' => $Nov,
            'Dec' => $Dec,
        ]);
    }
    
    /**
     * Récupère les données pour le graphique des patientes par tranche d'âge
     */
    private function getPatientesChartData()
    {
        // Définir les tranches d'âge
        $ageRanges = [
            '18-25 ans' => [18, 25],
            '26-35 ans' => [26, 35],
            '36-45 ans' => [36, 45],
            '46+ ans' => [46, 150]
        ];
        
        $labels = [];
        $values = [];
        
        // Compter les patientes par tranche d'âge
        foreach ($ageRanges as $label => $range) {
            $count = Patiente::whereBetween('age', $range)->count();
            $labels[] = $label;
            $values[] = $count;
        }
        
        return [
            'labels' => $labels,
            'values' => $values,
        ];
    }
    
    /**
     * Récupère les rendez-vous pour le calendrier du dashboard
     */
    private function getRendezVousData()
    {
        $now = Carbon::now();
        $weekStart = $now->copy()->startOfWeek();
        $weekEnd = $now->copy()->endOfWeek();
        
        return RendezVous::with(['patiente.user', 'sageFemme.user'])
            ->whereBetween('date', [$weekStart->toDateString(), $weekEnd->toDateString()])
            ->where('statut', '!=', 'annulé')
            ->orderBy('date')
            ->orderBy('heure')
            ->get()
            ->map(function ($rdv) {
                return [
                    'id' => $rdv->id,
                    'title' => $rdv->motif,
                    'patiente' => $rdv->patiente->user->nom . ' ' . $rdv->patiente->user->prenom,
                    'sageFemme' => $rdv->sageFemme->user->nom . ' ' . $rdv->sageFemme->user->prenom,
                    'start' => Carbon::parse($rdv->date . ' ' . $rdv->heure)->toIso8601String(),
                    'end' => Carbon::parse($rdv->date . ' ' . $rdv->heure)->addMinutes(30)->toIso8601String(),
                    'statut' => $rdv->statut,
                ];
            });
    }
    
    /**
     * Afficher les détails d'une patiente
     */
    public function show($id)
    {
        $patiente = Patiente::with([
            'user', 
            'dossierPatient.consultations', 
            'dossierPatient.examens', 
            'dossierPatient.prescriptions', 
            'dossierPatient.rendezVous', 
            'dossierPatient.documents', 
            'dossierPatient.notes'
        ])->findOrFail($id);
        
        return Inertia::render('Patientes/Show', [
            'patiente' => $patiente,
        ]);
    }
}
