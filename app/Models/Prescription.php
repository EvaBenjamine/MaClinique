<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'consultation_id',
        'medicament',
        'dosage',
        'frequence',
        'duree',
        'instructions',
    ];

    /**
     * Obtenir la consultation associée à cette prescription.
     */
    public function consultation(): BelongsTo
    {
        return $this->belongsTo(Consultation::class);
    }
}
