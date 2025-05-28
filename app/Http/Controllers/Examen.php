<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExamenController extends Controller
{
    public function index()
    {
        $examens = Examen::all();
        return response()->json($examens);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patiente_id' => 'required|exists:patientes,id',
            'type' => 'required|string|max:255',
            'date' => 'required|date',
            'resultats' => 'nullable|string',
            'observations' => 'nullable|string',
        ]);

        $examen = Examen::create($data);

        return response()->json($examen);
    }
    public function destroy($id)
    {
        $examen = Examen::findOrFail($id);
        $examen->delete();

        return response()->json(['message' => 'Examen deleted successfully']);
    }
}
