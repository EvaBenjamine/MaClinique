<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patientes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->unique(); // Relation unique avec User
            $table->unsignedSmallInteger('age'); // 0-65535 (âge maximum réaliste)
            $table->string('profession', 100);
            $table->enum('situation_matrimoniale', ['celibataire', 'mariée', 'pacsée', 'divorcée', 'veuve']);
            $table->enum('groupe_sanguin', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->string('numero_telephone', 20);
            $table->string('numero_urgence', 20)->nullable();
            $table->text('adresse');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patientes');
    }
};
