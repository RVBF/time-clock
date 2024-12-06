<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\TimeEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimeEntriesController extends Controller
{
    public function index(Request $request, $startDate=null, $endDate =null)
    {    
        return Inertia::render('TimeEntries/Index');
    }
    
    public function filter(Request $request, $startDate=null, $endDate =null)
    {    
        // Verifica se as datas foram passadas corretamente na requisição
        if (!$startDate) {
            $startDate = Carbon::now()->subMonth()->startOfDay(); // 1 mês atrás
        } else {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay(); // Verifica o formato da data
        }
    
        if (!$endDate) {
            $endDate = Carbon::now()->addDays(30)->endOfDay(); // Data atual + 30 dias
        } else {
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay(); // Verifica o formato da data
        }
        
        $query = TimeEntry::select('*')->with(['employee.user']);
        $query->whereBetween('registered_at', [$startDate, $endDate]);
    
        $timeEntries = $query->get();
        return response($timeEntries);
    }

    
    

    public function create()
    {
        return Inertia::render('TimeEntries/RegisterTimeEntries');
    }

    public function store(Request $request)
    {
        $user = $request->user()->load('employee');
        TimeEntry::create([
            'type' => 'entrada',
            'employee_id' => $user->employee->id,
            'registered_at'=> Carbon::now(),
        ]);
        return response()->json(['message' => 'Ponto registrado com sucesso']);
    }
}
