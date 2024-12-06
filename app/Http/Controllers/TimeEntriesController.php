<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\TimeEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimeEntriesController extends Controller
{
    public function index(Request $request)
    {

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        
        // Define datas padrão se não fornecidas na requisição
        if (!$startDate) {
            $startDate = Carbon::now()->subMonth()->format('Y-m-d'); // 1 mês atrás
        }
        if (!$endDate) {
            $endDate = Carbon::now()->format('Y-m-d'); // Data atual
        }

        $query = TimeEntry::with(['employee', 'employee.manager']); // Carrega o funcionário e seu gestor

        if ($startDate && $endDate) {
            $query->whereBetween('registered_at', [$startDate, $endDate]);
        }

        $timeEntries = $query->paginate();

        return Inertia::render('TimeEntries/Index', [
            'timeEntries' => $timeEntries,
        ]);
    }
    public function store(Request $request)
    {
        Employee::create($request->params);
        return response()->json(['message' => 'Ponto registrado com sucesso']);
    }
}
