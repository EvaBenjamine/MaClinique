<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'dossier_patient_id',
        'sage_femme_id',
        'date',
        'type_consultation',
        'poids',
        'tension_arterielle_systolique',
        'tension_arterielle_diastolique',
        'hauteur_uterine',
        'position_foetus',
        'rythme_cardiaque_foetal',
        'observations',
        'prescriptions',
        'examens_prescrits',
        'recommandations',
    ];

    protected $casts = [
        'date' => 'date',
        'poids' => 'float',
        'tension_arterielle_systolique' => 'float',
        'tension_arterielle_diastolique' => 'float',
        'hauteur_uterine' => 'float',
        'rythme_cardiaque_foetal' => 'integer',
    ];

    /**
     * Obtenir le dossier patient associé à cette consultation.
     */
    public function dossierPatient(): BelongsTo
    {
        return $this->belongsTo(DossierPatient::class);
    }

    /**
     * Obtenir le praticien qui a effectué cette consultation.
     */
    public function sageFemme(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class, 'sage_femme_id');
    }

    /**
     * Obtenir les examens associés à cette consultation.
     */
    public function examens(): HasMany
    {
        return $this->hasMany(Examen::class);
    }

    /**
     * Obtenir les prescriptions associées à cette consultation.
     */
    public function prescriptionsMedicaments(): HasMany
    {
        return $this->hasMany(Prescription::class);
    }
}
