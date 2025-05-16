<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Secretaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'matricule',
        'grade',
        'numero_telephone',
        'adresse',
    ];

    // Relation avec User (1 secrétaire = 1 user)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
};
