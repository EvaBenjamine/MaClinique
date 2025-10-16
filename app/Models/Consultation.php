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

        // Champs communs (existants dans migration initiale)
        'poids',
        'tension_arterielle_systolique',
        'tension_arterielle_diastolique',
        'hauteur_uterine',
        'position_foetus', // Présentation fœtale
        'rythme_cardiaque_foetal', // BCF
        'observations',
        'prescriptions',
        'examens_prescrits',
        'recommandations',

        // Champs CPN spécifiques (10 nouveaux champs)
        'age_gestationnel_semaines',
        'plaintes',
        'dents_gencives',
        'varices',
        'maf', // Mouvements Actifs Fœtaux
        'vulve',
        'examen_speculum',
        'toucher_vaginal',
        'etat_bassin',
        'prochain_rdv',

        // Champs CPP spécifiques (17 champs)
        'jour_postnatal',
        'montee_lait',
        'presence_gercures',
        'engorgement_mamaire',
        'involution_uterine',
        'perinee',
        'lochies',
        'mollets',
        'toucher_vaginal_cpp',
        'contraception',
        'poids_nouveau_ne',
        'taille_nouveau_ne',
        'perimetre_cranien_nouveau_ne',
        'perimetre_thoracique_nouveau_ne',
        'temperature_nouveau_ne',
        'cordon',
        'reflexes',
    ];

    protected $casts = [
        'date' => 'date',
        'prochain_rdv' => 'date',
        'poids' => 'float',
        'tension_arterielle_systolique' => 'float',
        'tension_arterielle_diastolique' => 'float',
        'hauteur_uterine' => 'float',
        'age_gestationnel_semaines' => 'integer',
        'jour_postnatal' => 'integer',
        'rythme_cardiaque_foetal' => 'integer',
        'montee_lait' => 'boolean',
        'presence_gercures' => 'boolean',
        'engorgement_mamaire' => 'boolean',
        'involution_uterine' => 'boolean',
        'reflexes' => 'boolean',
        'poids_nouveau_ne' => 'float',
        'taille_nouveau_ne' => 'float',
        'perimetre_cranien_nouveau_ne' => 'float',
        'perimetre_thoracique_nouveau_ne' => 'float',
        'temperature_nouveau_ne' => 'float',
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

    /**
     * Vérifier si la consultation est prénatale
     */
    public function isPrenatale(): bool
    {
        return $this->type_consultation === 'prenatale' ||
               $this->type_consultation === 'consultation_prenatale';
    }

    /**
     * Vérifier si la consultation est postnatale
     */
    public function isPostnatale(): bool
    {
        return $this->type_consultation === 'postnatale' ||
               $this->type_consultation === 'consultation_postnatale';
    }

    /**
     * Calculer le trimestre basé sur l'âge gestationnel
     */
    public function getTrimestre(): ?string
    {
        if (!$this->age_gestationnel_semaines) {
            return null;
        }

        if ($this->age_gestationnel_semaines <= 14) {
            return '1er trimestre';
        } elseif ($this->age_gestationnel_semaines <= 28) {
            return '2ème trimestre';
        } else {
            return '3ème trimestre';
        }
    }

    /**
     * Vérifier si la tension artérielle est élevée (HTA)
     */
    public function hasTensionElevee(): bool
    {
        return ($this->tension_arterielle_systolique >= 140 ||
                $this->tension_arterielle_diastolique >= 90);
    }

    /**
     * Vérifier si la consultation nécessite une alerte
     */
    public function needsAlert(): bool
    {
        if ($this->isPrenatale()) {
            // Alertes CPN
            if ($this->hasTensionElevee()) return true;
            if ($this->rythme_cardiaque_foetal && ($this->rythme_cardiaque_foetal < 110 || $this->rythme_cardiaque_foetal > 160)) return true;
            if ($this->maf && str_contains(strtolower($this->maf), 'absent')) return true;
        }

        if ($this->isPostnatale()) {
            // Alertes CPP
            if ($this->lochies === 'abondantes' || $this->lochies === 'malodorantes') return true;
            if ($this->involution_uterine === false) return true; // Retard d'involution
            if ($this->hasTensionElevee()) return true;
        }

        return false;
    }

    /**
     * Obtenir la liste des alertes
     */
    public function getAlertes(): array
    {
        $alertes = [];

        if ($this->isPrenatale()) {
            if ($this->hasTensionElevee()) {
                $alertes[] = "Tension artérielle élevée: {$this->tension_arterielle_systolique}/{$this->tension_arterielle_diastolique} mmHg";
            }
            if ($this->rythme_cardiaque_foetal && ($this->rythme_cardiaque_foetal < 110 || $this->rythme_cardiaque_foetal > 160)) {
                $alertes[] = "Rythme cardiaque fœtal anormal: {$this->rythme_cardiaque_foetal} bpm (normal: 110-160)";
            }
            if ($this->maf && str_contains(strtolower($this->maf), 'absent')) {
                $alertes[] = "Mouvements actifs fœtaux absents";
            }
        }

        if ($this->isPostnatale()) {
            if ($this->lochies === 'abondantes') {
                $alertes[] = "Lochies abondantes - Risque hémorragique";
            }
            if ($this->lochies === 'malodorantes') {
                $alertes[] = "Lochies malodorantes - Suspicion d'infection";
            }
            if ($this->involution_uterine === false) {
                $alertes[] = "Retard d'involution utérine";
            }
            if ($this->hasTensionElevee()) {
                $alertes[] = "Tension artérielle élevée postnatale";
            }
        }

        return $alertes;
    }
}
