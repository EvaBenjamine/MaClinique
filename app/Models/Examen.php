<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Examen extends Model
{
    use HasFactory;

    protected $fillable = [
        'dossier_patient_id',
        'consultation_id',
        'type',
        'date',
        'prescrit_par',
        'realise_par',
        'resultats',
        'interpretation',
        'fichier_rapport',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Obtenir le dossier patient associé à cet examen.
     */
    public function dossierPatient(): BelongsTo
    {
        return $this->belongsTo(DossierPatient::class);
    }

    /**
     * Obtenir la consultation associée à cet examen.
     */
    public function consultation(): BelongsTo
    {
        return $this->belongsTo(Consultation::class);
    }

    /**
     * Obtenir le praticien qui a prescrit cet examen.
     */
    public function prescripteur(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class, 'prescrit_par');
    }

    /**
     * Obtenir le praticien qui a réalisé cet examen.
     */
    public function realisateur(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class, 'realise_par');
    }

    /**
     * Obtenir l'échographie associée si cet examen est une échographie.
     */
    public function echographie()
    {
        if ($this->type === 'Échographie') {
            return $this->hasOne(Echographie::class);
        }
        return null;
    }
}
