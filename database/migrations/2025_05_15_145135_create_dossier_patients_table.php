<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dossier_patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patiente_id')->constrained()->onDelete('cascade');
            $table->foreignId('sage_femme_id')->nullable()->constrained('sage_femmes')->onDelete('set null');

            // Informations sur la grossesse actuelle
            $table->date('date_derniere_regle')->nullable();
            $table->date('date_accouchement_prevue')->nullable();
            $table->boolean('grossesse_multiple')->default(false);
            $table->integer('nombre_foetus')->default(1);
            $table->boolean('grossesse_a_risque')->default(false);
            $table->text('facteurs_risque')->nullable();

            // Antécédents médicaux
            $table->integer('nombre_grossesses_anterieures')->default(0);
            $table->integer('nombre_accouchements')->default(0);
            $table->integer('nombre_avortements')->default(0);
            $table->integer('nombre_enfants_vivants')->default(0);
            $table->text('antecedents_medicaux')->nullable();
            $table->text('antecedents_chirurgicaux')->nullable();
            $table->text('antecedents_familiaux')->nullable();
            $table->text('antecedents_gynecologiques')->nullable();
            $table->text('antecedents_obstetricaux')->nullable();

            // Santé actuelle
            $table->text('allergies')->nullable();
            $table->text('traitements_en_cours')->nullable();
            $table->text('maladies_chroniques')->nullable();

            // Habitudes de vie
            $table->boolean('tabac')->default(false);
            $table->boolean('alcool')->default(false);
            $table->text('activite_physique')->nullable();
            $table->text('regime_alimentaire')->nullable();

            // Suivi de la grossesse
            //$table->foreignId('sage_femme_referente_id')->nullable()->constrained('users')->onDelete('set null');
            //$table->foreignId('medecin_referent_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('statut_dossier')->default('actif'); // actif, archivé, etc.
            $table->date('date_derniere_consultation')->nullable();

            // Notes et observations
            $table->text('notes_importantes')->nullable();
            $table->text('recommandations_particulieres')->nullable();

            $table->timestamps();
        });

        // Table pour les consultations dans le dossier
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('sage_femme_id')->constrained()->onDelete('cascade');
            $table->date('date');
            $table->string('type_consultation');
            $table->float('poids')->nullable();
            $table->float('tension_arterielle_systolique')->nullable();
            $table->float('tension_arterielle_diastolique')->nullable();
            $table->float('hauteur_uterine')->nullable();
            $table->string('position_foetus')->nullable();
            $table->integer('rythme_cardiaque_foetal')->nullable();
            $table->text('observations')->nullable();
            $table->text('prescriptions')->nullable();
            $table->text('examens_prescrits')->nullable();
            $table->text('recommandations')->nullable();
            $table->timestamps();
        });

        // Table pour les examens médicaux
        Schema::create('examens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('consultation_id')->nullable()->constrained()->onDelete('set null');
            $table->string('type'); // Échographie, analyse de sang, amniocentèse, etc.
            $table->date('date');
            $table->foreignId('prescrit_par')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('realise_par')->nullable()->constrained('users')->onDelete('set null');
            $table->text('resultats')->nullable();
            $table->text('interpretation')->nullable();
            $table->timestamps();
        });

        // Table spécifique pour les échographies
        Schema::create('echographies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('examen_id')->constrained()->onDelete('cascade');
            $table->string('trimestre');
            $table->float('biometrie')->nullable();
            $table->text('mesures_biometriques')->nullable(); // JSON avec toutes les mesures
            $table->string('sexe_foetus')->nullable();
            $table->float('poids_estime')->nullable();
            $table->text('observations_morphologiques')->nullable();
            $table->text('observations_placenta')->nullable();
            $table->text('observations_liquide_amniotique')->nullable();
            $table->text('observations_generales')->nullable();
            $table->timestamps();
        });

        // Table pour les prescriptions médicamenteuses
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultation_id')->constrained()->onDelete('cascade');
            $table->string('medicament');
            $table->string('dosage');
            $table->string('frequence');
            $table->string('duree');
            $table->text('instructions')->nullable();
            $table->timestamps();
        });

        // Table pour les rendez-vous
        Schema::create('rendez_vous', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('sage_femme_id')->nullable()->constrained('sage_femmes')->onDelete('set null');
            $table->timestamp('date_heure');
            $table->string('type_consultation');
            $table->enum('statut', ['prevu', 'confirme', 'annule', 'termine'])->default('prevu');
            $table->text('motif')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Table pour les documents médicaux
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_patient_id')->constrained()->onDelete('cascade');
            $table->string('titre');
            $table->string('type_document'); // ordonnance, résultat d'analyse, compte-rendu, etc.
            $table->date('date_document');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Table pour les notes de suivi
        Schema::create('notes_suivi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_patient_id')->constrained()->onDelete('cascade');
            $table->text('contenu');
            $table->date('date_note');
            $table->foreignId('ajoute_par')->constrained('users')->onDelete('cascade');
            $table->string('type_note')->default('général'); // général, important, urgent, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes_suivi');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('rendez_vous');
        Schema::dropIfExists('prescriptions');
        Schema::dropIfExists('echographies');
        Schema::dropIfExists('examens');
        Schema::dropIfExists('consultations');
        Schema::dropIfExists('dossier_patients');
    }
};
