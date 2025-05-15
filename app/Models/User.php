<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
        'adresse',
        'role',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relation avec le modèle Admin
     */
    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    /**
     * Relation avec le modèle SageFemme
     */
    public function sageFemme()
    {
        return $this->hasOne(SageFemme::class);
    }

    /**
     * Relation avec le modèle Secretaire
     */
    public function secretaire()
    {
        return $this->hasOne(Secretaire::class);
    }

    /**
     * Relation avec le modèle Patiente
     */
    public function patiente()
    {
        return $this->hasOne(Patiente::class);
    }
}
