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
            // === CHAMPS CPN SPÉCIFIQUES (10 champs) ===
            // Note: position_foetus et rythme_cardiaque_foetal existent déjà dans la table

            // Âge gestationnel
            $table->integer('age_gestationnel_semaines')->nullable()->after('type_consultation');

            // Plaintes
            $table->text('plaintes')->nullable()->after('age_gestationnel_semaines');

            // Examens cliniques
            $table->text('dents_gencives')->nullable()->after('plaintes');
            $table->text('varices')->nullable()->after('dents_gencives');

            // Examens obstétricaux
            $table->text('maf')->nullable()->after('hauteur_uterine'); // Mouvements Actifs Fœtaux

            // Examens gynécologiques
            $table->text('vulve')->nullable()->after('position_foetus');
            $table->text('examen_speculum')->nullable()->after('vulve');
            $table->text('toucher_vaginal')->nullable()->after('examen_speculum');
            $table->text('etat_bassin')->nullable()->after('toucher_vaginal');
            // Note: On utilise position_foetus existant (pas de champ presentation)

            // Suivi
            $table->date('prochain_rdv')->nullable()->after('recommandations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consultations', function (Blueprint $table) {
            $table->dropColumn([
                'age_gestationnel_semaines',
                'plaintes',
                'dents_gencives',
                'varices',
                'maf',
                'vulve',
                'examen_speculum',
                'toucher_vaginal',
                'etat_bassin',
                // 'presentation' n'a pas été créé, on utilise position_foetus existant
                'prochain_rdv',
            ]);
        });
    }
};
