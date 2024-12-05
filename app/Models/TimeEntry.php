<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'type',
        'registered_at',
    ];

    /**
     * Relacionamento com o funcionário.
     * Um registro de ponto pertence a um funcionário.
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
