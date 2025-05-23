<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SageFemme extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'matricule',
        'grade',
        'specialite',
        'numero_telephone',
        'adresse',
    ];

    // Relation avec User (1 sage-femme = 1 user)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec les consultations (1 sage-femme =多篇 consultations)
    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }
};
