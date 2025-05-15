<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Patiente extends Model
{
    protected $fillable = ['user_id', 'date_naissance', 'numero_dossier'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function dossierPatient()
    {
        return $this->hasOne(DossierPatient::class);
    }
}
