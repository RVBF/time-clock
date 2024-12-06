<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $employees = Employee::select(['*'])->with(['user','manager'])->get(); 

  
        return Inertia::render('Employee/Index', [
            'employees' => $employees,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/EmployeeCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|size:11|unique:employees',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'birth_date' => 'required',
            'cep' => 'required|string|max:9',
            'address' => 'required|string|max:255',
        ]);

    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'employee',
        ]);

        Employee::create([
            'cpf' => $request->cpf,
            'birth_date' => $request->birth_date,
            'cep' => $request->cep,
            'address' => $request->address,
            'user_id' => $user->id,
            'manager_id' => $request->user()->id,
        ]);
    
        return redirect()->route('employees.index')->with('success', 'Funcionário cadastrado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::findOrFail($id);
    
        return inertia('Employee/Show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $employee = Employee::with(['user'])->findOrFail($id);
        
        return inertia('Employee/EmployeeUpdate', [
            'employee' => $employee
        ]);
    }
    

    public function update(Request $request, string $id)
    {
        $employee = Employee::findOrFail($id);

        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|size:11|unique:employees,cpf,' . $id,
            'email' => 'required|email|unique:users,email,' . $employee->user_id . '|max:255',
            'birth_date' => 'required|date',
            'cep' => 'required|string|max:9',
            'address' => 'required|string|max:255',
        ]);
    
        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        
        $user = User::findOrFail($employee->user_id); 
    
        
        $userData = [
            'name' => $request->name,
            'email' => $request->email,
        ];
    
        if ($request->password) {
            $userData['password'] = Hash::make($request->password);
        }
    
        $user->update($userData);
    
        
        $employee->update([
            'cpf' => $request->cpf,
            'birth_date' => $request->birth_date,
            'cep' => $request->cep,
            'address' => $request->address,
            'manager_id' => $request->user()->id, 
        ]);
    
        
        return redirect()->route('employees.index')->with('success', 'Funcionário atualizado com sucesso!');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employeeResult = Employee::findOrFail($id);
    
        
        $user = User::findOrFail($employeeResult->user_id);
        $user->delete();  
        $employeeResult->delete();  
    
        
        return redirect()->route('employees.index')->with('success', 'Funcionário cadastrado com sucesso!');
    }
}
