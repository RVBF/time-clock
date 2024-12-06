<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'cpf',
        'name',
        'birth_date',
        'position',
        'cep',
        'address',
        'manager_id',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

 
    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id', 'id');
    }

    public function timeEntries()
    {
        return $this->hasMany(TimeEntry::class, 'user_id', 'id');
    }

    public function isAdmin() : bool
    {
        return $this->role == 'adm';
    }
}
