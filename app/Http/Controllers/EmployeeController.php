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
    public function index(Request $request)
    {
        $employees = User::select(['*'])->where('position', 'employee')->with(['manager'])->get(); 

  
        return Inertia::render('Employee/Index', [
            'employees' => $employees,
        ]);
    }

    public function create()
    {
        return Inertia::render('Employee/EmployeeCreate');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'cpf' => 'required|cpf|string|size:11|unique:users',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'birth_date' => 'required',
            'cep' => 'required|string|max:9',
            'address' => 'required|string|max:255',
        ], 
        [
            'cpf.cpf' => 'CPF inválido.',
            'name.required' => 'O campo nome é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'name.max' => 'O campo nome não pode ter mais de 255 caracteres.',
            'cpf.required' => 'O campo CPF é obrigatório.',
            'cpf.size' => 'O CPF deve ter 11 caracteres.',
            'cpf.unique' => 'Este CPF já está cadastrado.',
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'O campo e-mail deve ser um e-mail válido.',
            'email.unique' => 'Este e-mail já está cadastrado.',
            'email.max' => 'O campo e-mail não pode ter mais de 255 caracteres.',
            'birth_date.required' => 'O campo data de nascimento é obrigatório.',
            'birth_date.date' => 'O campo data de nascimento deve ser uma data válida.',
            'cep.required' => 'O campo CEP é obrigatório.',
            'cep.string' => 'O campo CEP deve ser uma string.',
            'cep.max' => 'O campo CEP não pode ter mais de 9 caracteres.',
            'address.required' => 'O campo endereço é obrigatório.',
            'address.string' => 'O campo endereço deve ser uma string.',
            'address.max' => 'O campo endereço não pode ter mais de 255 caracteres.',
        ]);

    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'position' => 'employee',
            'cpf' => $request->cpf,
            'birth_date' => $request->birth_date,
            'cep' => $request->cep,
            'address' => $request->address,
            'manager_id' => $request->user()->id,
        ]);

    
        return redirect()->route('employees.index')->with('success', 'Funcionário cadastrado com sucesso!');
    }


    public function show(string $id)
    {
        $employee = User::findOrFail($id);
    
        return inertia('Employee/Show', [
            'employee' => $employee,
        ]);
    }

    public function edit(string $id)
    {
        $employee = User::with(['manager'])->findOrFail($id);
        
        return inertia('Employee/EmployeeUpdate', [
            'employee' => $employee
        ]);
    }
    

    public function update(Request $request, string $id)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|size:11|cpf|unique:users,cpf,' . $id,
            'email' => 'required|email|unique:users,email,' . $id . '|max:255',
            'birth_date' => 'required|date',
            'cep' => 'required|string|max:9',
            'address' => 'required|string|max:255',
        ],
        [
            'cpf.cpf' => 'CPF inválido.',
            'name.required' => 'O campo nome é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'name.max' => 'O campo nome não pode ter mais de 255 caracteres.',
            'cpf.required' => 'O campo CPF é obrigatório.',
            'cpf.size' => 'O CPF deve ter 11 caracteres.',
            'cpf.unique' => 'Este CPF já está cadastrado.',
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'O campo e-mail deve ser um e-mail válido.',
            'email.unique' => 'Este e-mail já está cadastrado.',
            'email.max' => 'O campo e-mail não pode ter mais de 255 caracteres.',
            'birth_date.required' => 'O campo data de nascimento é obrigatório.',
            'birth_date.date' => 'O campo data de nascimento deve ser uma data válida.',
            'cep.required' => 'O campo CEP é obrigatório.',
            'cep.string' => 'O campo CEP deve ser uma string.',
            'cep.max' => 'O campo CEP não pode ter mais de 9 caracteres.',
            'address.required' => 'O campo endereço é obrigatório.',
            'address.string' => 'O campo endereço deve ser uma string.',
            'address.max' => 'O campo endereço não pode ter mais de 255 caracteres.',
        ]);
    
        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        
        $user = User::findOrFail($id); 
    
        
        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'cpf' => $request->cpf,
            'birth_date' => $request->birth_date,
            'cep' => $request->cep,
            'address' => $request->address,
        ];
    
        if ($request->password) {
            $userData['password'] = Hash::make($request->password);
        }
    
        $user->update($userData);    
        
        return redirect()->route('employees.index')->with('success', 'Funcionário atualizado com sucesso!');
    }
    
    public function destroy(string $id)
    {    
        
        $user = User::findOrFail($id);
        $user->delete();  
    
        
        return redirect()->route('employees.index')->with('success', 'Funcionário cadastrado com sucesso!');
    }
}
