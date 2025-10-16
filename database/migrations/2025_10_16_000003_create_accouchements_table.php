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
        Schema::create('accouchements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('sage_femme_id')->constrained('sage_femmes')->onDelete('cascade');
            $table->date('date_accouchement');
            $table->time('heure_accouchement');

            // Informations sur la grossesse
            $table->integer('age_gestationnel')->nullable(); // En semaines

            // Travail et accouchement
            $table->enum('travail', ['spontane', 'declenche'])->nullable();
            $table->text('presentation')->nullable(); // Céphalique, siège, transverse, etc.
            $table->text('mode_accouchement')->nullable(); // Voie basse, césarienne, etc.

            // Périnée
            $table->boolean('episiotomie')->default(false);
            $table->boolean('dechirure')->default(false);

            // Délivrance
            $table->text('delivrance')->nullable(); // Complète, incomplète, etc.
            $table->text('mode_delivrance')->nullable(); // Spontanée, dirigée, artificielle
            $table->float('poids_placenta')->nullable(); // En grammes

            // Bébé
            $table->boolean('peau_a_peau')->default(false);
            $table->float('poids_bebe')->nullable(); // En kg
            $table->float('taille_bebe')->nullable(); // En cm
            $table->float('perimetre_cranien_bebe')->nullable(); // En cm
            $table->float('perimetre_thoracique_bebe')->nullable(); // En cm
            $table->enum('sexe', ['masculin', 'feminin'])->nullable();
            $table->boolean('mise_au_sein')->default(false);
            $table->boolean('vitamine_k')->default(false);

            // Notes
            $table->text('observations')->nullable();
            $table->text('complications')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accouchements');
    }
};
