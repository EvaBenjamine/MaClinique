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
     * Afficher les détails d'une patiente
     */
    public function show($id)
    {
        $patiente = Patiente::with(['user', 'dossierPatient.consultations', 'dossierPatient.examens', 'dossierPatient.prescriptions', 'dossierPatient.rendezVous', 'dossierPatient.documents', 'dossierPatient.notes', 'dossierPatient.accouchements'])->findOrFail($id);
        return inertia('Patientes/Show', [
            'patiente' => $patiente,
        ]);
    }
}
