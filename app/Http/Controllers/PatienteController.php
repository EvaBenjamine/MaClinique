<?php
namespace App\Http\Controllers;

use App\Models\Patiente;
use App\Models\DossierPatient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatienteController extends Controller
{
    // Liste des patientes
    public function index()
    {
        $patientes = Patiente::with('user', 'dossierPatient')->orderBy('created_at', 'desc')->get();
        return Inertia::render('patientes/index', ['patientes' => $patientes]);
    }

    // Afficher le formulaire de création
    public function create()
    {
        return Inertia::render('patientes/create');
    }

    // Enregistrer une nouvelle patiente
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'date_naissance' => 'nullable|date',
            'numero_dossier' => 'required|unique:patientes',
        ]);
        $patiente = Patiente::create($request->only(['user_id', 'date_naissance', 'numero_dossier']));
        // Création du dossier patient associé
        DossierPatient::create([
            'patiente_id' => $patiente->id,
            'date_ouverture' => now(),
        ]);
        return redirect()->route('patientes.index')->with('success', 'Patiente créée !');
    }

    // Afficher le détail d'une patiente
    public function show($id)
    {
        $patiente = Patiente::with('user', 'dossierPatient')->findOrFail($id);
        return Inertia::render('patientes/show', ['patiente' => $patiente]);
    }

    // Afficher le formulaire d’édition
    public function edit($id)
    {
        $patiente = Patiente::with('user', 'dossierPatient')->findOrFail($id);
        return Inertia::render('patientes/edit', ['patiente' => $patiente]);
    }

    // Mettre à jour une patiente
    public function update(Request $request, $id)
    {
        $patiente = Patiente::findOrFail($id);
        $request->validate([
            'date_naissance' => 'nullable|date',
            'numero_dossier' => 'required|unique:patientes,numero_dossier,'.$patiente->id,
        ]);
        $patiente->update($request->only(['date_naissance', 'numero_dossier']));
        return redirect()->route('patientes.index')->with('success', 'Patiente mise à jour !');
    }

    // Supprimer une patiente
    public function destroy($id)
    {
        $patiente = Patiente::findOrFail($id);
        $patiente->delete();
        return redirect()->route('patientes.index')->with('success', 'Patiente supprimée !');
    }
}
