<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SageFemme extends Model
{
    protected $fillable = ['user_id', 'specialite'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
