<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'role', // 'admin', 'sage_femme', 'secretaire', 'patiente'
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relations directes
    public function patiente()
    {
        return $this->hasOne(Patiente::class);
    }

    public function sageFemme()
    {
        return $this->hasOne(SageFemme::class);
    }

    public function secretaire()
    {
        return $this->hasOne(Secretaire::class);
    }

    // Méthodes de vérification de rôle
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isSageFemme(): bool
    {
        return $this->role === 'sage_femme';
    }

    public function isSecretaire(): bool
    {
        return $this->role === 'secretaire';
    }

    public function isPatiente(): bool
    {
        return $this->role === 'patiente';
    }
}
