<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'dossier_patient_id',
        'titre',
        'type_document',
        'chemin_fichier',
        'date_document',
        'description',
        'ajoute_par',
    ];

    protected $casts = [
        'date_document' => 'date',
    ];

    /**
     * Obtenir le dossier patient associé à ce document.
     */
    public function dossierPatient(): BelongsTo
    {
        return $this->belongsTo(DossierPatient::class);
    }

    /**
     * Obtenir l'utilisateur qui a ajouté ce document.
     */
    public function ajoutePar(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class, 'ajoute_par');
    }
}
