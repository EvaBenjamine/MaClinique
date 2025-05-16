<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;





class Echographie extends Model
{
    use HasFactory;

    protected $fillable = [
        'examen_id',
        'trimestre',
        'biometrie',
        'mesures_biometriques',
        'sexe_foetus',
        'poids_estime',
        'observations_morphologiques',
        'observations_placenta',
        'observations_liquide_amniotique',
        'observations_generales',
    ];

    protected $casts = [
        'biometrie' => 'float',
        'poids_estime' => 'float',
        'mesures_biometriques' => 'json',
    ];

    /**
     * Obtenir l'examen associé à cette échographie.
     */
    public function examen(): BelongsTo
    {
        return $this->belongsTo(Examen::class);
    }
}
