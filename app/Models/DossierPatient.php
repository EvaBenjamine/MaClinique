<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DossierPatient extends Model
{
    use HasFactory;

    protected $fillable = [
        'patiente_id',
        'sage_femme_id',
        'date_derniere_regle',
        'date_accouchement_prevue',
        'grossesse_multiple',
        'nombre_foetus',
        'grossesse_a_risque',
        'facteurs_risque',
        'nombre_grossesses_anterieures',
        'nombre_accouchements',
        'nombre_avortements',
        'nombre_enfants_vivants',
        'antecedents_medicaux',
        'antecedents_chirurgicaux',
        'antecedents_familiaux',
        'antecedents_gynecologiques',
        'antecedents_obstetricaux',
        'allergies',
        'traitements_en_cours',
        'maladies_chroniques',
        'tabac',
        'alcool',
        'activite_physique',
        'regime_alimentaire',
        'sage_femme_referente_id',
        'medecin_referent_id',
        'statut_dossier',
        'date_derniere_consultation',
        'notes_importantes',
        'recommandations_particulieres',
    ];

    protected $casts = [
        'grossesse_multiple' => 'boolean',
        'nombre_foetus' => 'integer',
        'grossesse_a_risque' => 'boolean',
        'nombre_grossesses_anterieures' => 'integer',
        'nombre_accouchements' => 'integer',
        'nombre_avortements' => 'integer',
        'nombre_enfants_vivants' => 'integer',
        'tabac' => 'boolean',
        'alcool' => 'boolean',
        'date_derniere_regle' => 'date',
        'date_accouchement_prevue' => 'date',
        'date_derniere_consultation' => 'date',
    ];

    /**
     * Obtenir la patiente associée à ce dossier.
     */
    public function patiente(): BelongsTo
    {
        return $this->belongsTo(Patiente::class);
    }

    /**
     * Obtenir la sage-femme référente.
     */
    public function sageFemme(): BelongsTo
    {
        return $this->belongsTo(SageFemme::class);
    }

    /**
     * Obtenir les consultations associées à ce dossier.
     */
    public function consultations(): HasMany
    {
        return $this->hasMany(Consultation::class);
    }

    /**
     * Obtenir les examens associés à ce dossier.
     */
    public function examens(): HasMany
    {
        return $this->hasMany(Examen::class);
    }

    /**
     * Obtenir les rendez-vous associés à ce dossier.
     */
    public function rendezVous(): HasMany
    {
        return $this->hasMany(RendezVous::class);
    }

    /**
     * Obtenir les documents associés à ce dossier.
     */
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Obtenir les notes de suivi associées à ce dossier.
     */
    public function notesSuivi(): HasMany
    {
        return $this->hasMany(NoteSuivi::class);
    }

    /**
     * Calculer l'âge de grossesse en semaines.
     */
    public function ageGrossesseSemaines()
    {
        if (!$this->date_derniere_regle) {
            return null;
        }

        $dateRegle = new \DateTime($this->date_derniere_regle);
        $maintenant = new \DateTime();

        $difference = $dateRegle->diff($maintenant);
        $jours = $difference->days;

        return floor($jours / 7);
    }

    /**
     * Calculer le trimestre de la grossesse.
     */
    public function trimestre()
    {
        $semaines = $this->ageGrossesseSemaines();

        if (!$semaines) {
            return null;
        }

        if ($semaines <= 14) {
            return 'Premier';
        } elseif ($semaines <= 28) {
            return 'Deuxième';
        } else {
            return 'Troisième';
        }
    }

    /**
     * Obtenir la dernière consultation.
     */
    public function derniereConsultation()
    {
        return $this->consultations()->latest('date')->first();
    }

    /**
     * Obtenir le prochain rendez-vous.
     */
    public function prochainRendezVous()
    {
        return $this->rendezVous()
                    ->where('date_heure', '>', now())
                    ->where('statut', '!=', 'annulé')
                    ->orderBy('date_heure')
                    ->first();
    }
}
