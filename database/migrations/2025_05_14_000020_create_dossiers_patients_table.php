<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dossiers_patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patiente_id')->constrained('patientes')->onDelete('cascade');
            $table->string('groupe_sanguin')->nullable();
            $table->text('antecedents')->nullable();
            $table->date('date_ouverture')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('dossiers_patients');
    }
};
