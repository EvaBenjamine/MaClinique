<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DossierPatient extends Model
{
    protected $fillable = [
        'patiente_id',
        'groupe_sanguin',
        'antecedents',
        'date_ouverture',
    ];

    public function patiente()
    {
        return $this->belongsTo(Patiente::class);
    }
}
