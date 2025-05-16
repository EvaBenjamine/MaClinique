<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sage_femmes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->unique(); // Relation unique avec User
            $table->string('matricule')->unique(); // Matricule unique
            $table->enum('grade', ['adjoint', 'chef', 'consultant']);
            $table->string('specialite', 100); // Ex: obstétrique, gynecologie
            $table->string('numero_telephone', 20);
            $table->text('adresse');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sage_femmes');
    }
};
