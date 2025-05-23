<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patiente extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'age',
        'profession',
        'situation_matrimoniale',
        'groupe_sanguin',
        'numero_telephone',
        'numero_urgence',
        'adresse',
    ];

    // Relation avec User (1 patiente = 1 user)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec le dossier médical (1 patiente = 1 dossier)
    public function dossierMedical()
    {
        return $this->hasOne(DossierMedical::class);
    }
};
