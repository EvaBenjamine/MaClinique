<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Accouchement extends Model
{
    use HasFactory;

    protected $fillable = [
        'dossier_patient_id',
        'sage_femme_id',
        'date_accouchement',
        'heure_accouchement',
        'age_gestationnel',
        'travail',
        'presentation',
        'mode_accouchement',
        'episiotomie',
        'dechirure',
        'delivrance',
        'mode_delivrance',
        'poids_placenta',
        'peau_a_peau',
        'poids_bebe',
        'taille_bebe',
        'perimetre_cranien_bebe',
        'perimetre_thoracique_bebe',
        'sexe',
        'mise_au_sein',
        'vitamine_k',
        'observations',
        'complications',
    ];

    protected $casts = [
        'date_accouchement' => 'date',
        'heure_accouchement' => 'datetime:H:i',
        'age_gestationnel' => 'integer',
        'episiotomie' => 'boolean',
        'dechirure' => 'boolean',
        'poids_placenta' => 'float',
        'peau_a_peau' => 'boolean',
        'poids_bebe' => 'float',
        'taille_bebe' => 'float',
        'perimetre_cranien_bebe' => 'float',
        'perimetre_thoracique_bebe' => 'float',
        'mise_au_sein' => 'boolean',
        'vitamine_k' => 'boolean',
    ];

    /**
     * Relation avec le dossier patient
     */
    public function dossierPatient(): BelongsTo
    {
        return $this->belongsTo(DossierPatient::class);
    }

    /**
     * Relation avec la sage-femme
     */
    public function sageFemme(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class);
    }

    /**
     * Vérifier si l'accouchement présente des complications
     */
    public function hasComplications(): bool
    {
        return !empty($this->complications) ||
               $this->dechirure === true ||
               ($this->poids_bebe && $this->poids_bebe < 2.5) || // Petit poids de naissance
               ($this->age_gestationnel && $this->age_gestationnel < 37); // Prématurité
    }

    /**
     * Obtenir le type d'accouchement
     */
    public function getTypeAccouchement(): string
    {
        if (str_contains(strtolower($this->mode_accouchement ?? ''), 'cesari')) {
            return 'Césarienne';
        }
        return 'Voie basse';
    }

    /**
     * Vérifier si le bébé est prématuré
     */
    public function isPremature(): bool
    {
        return $this->age_gestationnel && $this->age_gestationnel < 37;
    }

    /**
     * Vérifier si le bébé a un petit poids de naissance
     */
    public function hasPetitPoids(): bool
    {
        return $this->poids_bebe && $this->poids_bebe < 2.5;
    }

    /**
     * Obtenir les alertes pour cet accouchement
     */
    public function getAlertes(): array
    {
        $alertes = [];

        if ($this->isPremature()) {
            $alertes[] = "Prématurité ({$this->age_gestationnel} SA)";
        }

        if ($this->hasPetitPoids()) {
            $alertes[] = "Petit poids de naissance ({$this->poids_bebe} kg)";
        }

        if ($this->dechirure) {
            $alertes[] = "Déchirure périnéale";
        }

        if (!empty($this->complications)) {
            $alertes[] = "Complications signalées";
        }

        return $alertes;
    }
}
