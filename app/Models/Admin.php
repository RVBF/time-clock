<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Relacionamento com os funcionários.
     * Um administrador pode ter muitos funcionários.
     */
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
