<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class RendezVous extends Model
{
    use HasFactory;

    protected $fillable = [
        'dossier_patient_id',
        'sage_femme_id',
        'date_heure',
        'type_consultation',
        'statut',
        'motif',
        'notes',
    ];

    protected $casts = [
        'date_heure' => 'datetime',
    ];

    /**
     * Obtenir le dossier patient associé à ce rendez-vous.
     */
    public function dossierPatient(): BelongsTo
    {
        return $this->belongsTo(DossierPatient::class);
    }

    /**
     * Obtenir le praticien associé à ce rendez-vous.
     */
    public function sageFemme(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class, 'sage_femme_id');
    }
}
