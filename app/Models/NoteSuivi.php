<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class NoteSuivi extends Model
{
    use HasFactory;

    protected $fillable = [
        'dossier_patient_id',
        'contenu',
        'date_note',
        'ajoute_par',
        'type_note',
    ];

    protected $casts = [
        'date_note' => 'date',
    ];

    /**
     * Obtenir le dossier patient associé à cette note.
     */
    public function dossierPatient(): BelongsTo
    {
        return $this->belongsTo(DossierPatient::class);
    }

    /**
     * Obtenir l'utilisateur qui a ajouté cette note.
     */
    public function ajoutePar(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class, 'ajoute_par');
    }
}
