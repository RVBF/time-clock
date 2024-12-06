<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cpf',
        'email',
        'password',
        'role',
        'birth_date',
        'cep',
        'address',
        'admin_id',
    ];

    /**
     * Relacionamento com o administrador.
     * Um funcionário pertence a um administrador.
     */
    public function manager()
    {
        return $this->belongsTo(User::class, 'admin_id', 'id');
    }

    /**
     * Relacionamento com os registros de ponto.
     * Um funcionário pode ter muitos registros de ponto.
     */
    public function timeEntries()
    {
        return $this->hasMany(TimeEntry::class);
    }
}
