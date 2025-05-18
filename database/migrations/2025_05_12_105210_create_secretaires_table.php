<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('secretaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->unique(); // Relation unique avec User
            $table->string('matricule')->unique(); // Matricule unique (facultatif selon besoin)
            $table->enum('grade', ['chef_de_service', 'assistante', 'principale']); // Ex: chef de service, chef
            $table->string('numero_telephone', 20)->nullable();
            $table->text('adresse')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('secretaires');
    }
};
