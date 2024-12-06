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
       $user = $request->user();
        if (!$startDate) {
            $startDate = Carbon::now()->subMonth()->startOfDay();
        } else {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
        }
    
        if (!$endDate) {
            $endDate = Carbon::now()->addDays(30)->endOfDay();
        } else {
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();
        }
        
        $query = TimeEntry::select('*')->with(['employee.manager']);
        $query->whereBetween('registered_at', [$startDate, $endDate]);
        $query->whereHas('employee', function ($query) use ($user) {
            $query->where('manager_id', $user->id);
        });
        $timeEntries = $query->get();
        return response($timeEntries);
    }

    public function create()
    {
        return Inertia::render('TimeEntries/RegisterTimeEntries');
    }

    public function store(Request $request)
    {
        $user = $request->user();
        TimeEntry::create([
            'employee_id' => $user->id,
            'registered_at'=> Carbon::now(),
        ]);
        return response()->json(['message' => 'Ponto registrado com sucesso']);
    }
}
