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
        Schema::table('consultations', function (Blueprint $table) {
            // === CHAMPS CPP (17 champs) ===

            // Temporel
            $table->integer('jour_postnatal')->nullable()->after('type_consultation'); // J1, J8, J42, etc.

            // Allaitement
            $table->boolean('montee_lait')->nullable()->after('jour_postnatal');
            $table->boolean('presence_gercures')->nullable()->after('montee_lait'); // Crevasses
            $table->boolean('engorgement_mamaire')->nullable()->after('presence_gercures');

            // Involution utérine
            $table->boolean('involution_uterine')->nullable()->after('engorgement_mamaire'); // true = normale, false = retard

            // Périnée
            $table->text('perinee')->nullable()->after('involution_uterine');

            // Lochies
            $table->enum('lochies', ['normales', 'abondantes', 'malodorantes', 'absentes'])->nullable()->after('perinee');

            // Examens
            $table->text('mollets')->nullable()->after('lochies'); // Recherche phlébite
            $table->text('toucher_vaginal_cpp')->nullable()->after('mollets'); // Différent du TV CPN

            // Contraception
            $table->text('contraception')->nullable()->after('toucher_vaginal_cpp');

            // Nouveau-né (7 champs)
            $table->float('poids_nouveau_ne')->nullable()->after('contraception'); // En kg
            $table->float('taille_nouveau_ne')->nullable()->after('poids_nouveau_ne'); // En cm
            $table->float('perimetre_cranien_nouveau_ne')->nullable()->after('taille_nouveau_ne'); // En cm
            $table->float('perimetre_thoracique_nouveau_ne')->nullable()->after('perimetre_cranien_nouveau_ne'); // En cm
            $table->float('temperature_nouveau_ne')->nullable()->after('perimetre_thoracique_nouveau_ne'); // En °C
            $table->text('cordon')->nullable()->after('temperature_nouveau_ne'); // État du cordon ombilical
            $table->boolean('reflexes')->nullable()->after('cordon'); // Réflexes présents
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consultations', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};
