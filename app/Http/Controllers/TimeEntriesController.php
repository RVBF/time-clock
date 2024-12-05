<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class TimeEntriesController extends Controller
{
    public function store(Request $request)
    {
        Employee::create($request->params);
        return response()->json(['message' => 'Ponto registrado com sucesso']);
    }
}
