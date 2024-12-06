<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Criando 3 usuários administradores
        $admin1 = User::factory()->create([
            'name' => 'Admin 1',
            'email' => 'admin1@ticto.com.br',
            'cpf' => '12345678901', 
            'birth_date' => '1994-10-14',
            'position' => 'manager',
            'cep' => '28615230',
            'address' => 'Rua de teste',
        ]);

        $admin2 = User::factory()->create([
            'name' => 'Admin 2',
            'email' => 'admin2@ticto.com.br',
            'cpf' => '10987654321',
            'birth_date' => '1994-10-14',
            'position' => 'manager',
            'cep' => '28615230',
            'address' => 'Rua de teste',
        ]);

        $admin3 = User::factory()->create([
            'name' => 'Admin 3',
            'email' => 'admin3@ticto.com.br',
            'cpf' => '11223344556',
            'birth_date' => '1994-10-14',
            'position' => 'manager',
            'cep' => '28615230',
            'address' => 'Rua de teste',
        ]);

        // Criando 3 usuários employees
        $employee1 = User::factory()->create([
            'name' => 'Employee 1',
            'email' => 'employee1@ticto.com.br',
            'cpf' => '99887766554',
            'birth_date' => '1995-05-10',
            'position' => 'employee',
            'cep' => '28615230',
            'address' => 'Rua de exemplo',
        ]);

        $employee2 = User::factory()->create([
            'name' => 'Employee 2',
            'email' => 'employee2@ticto.com.br',
            'cpf' => '88776655443',
            'birth_date' => '1995-05-10',
            'position' => 'employee',
            'cep' => '28615230',
            'address' => 'Rua de exemplo',
        ]);

        $employee3 = User::factory()->create([
            'name' => 'Employee 3',
            'email' => 'employee3@ticto.com.br',
            'cpf' => '77665544332',
            'birth_date' => '1995-05-10',
            'position' => 'employee',
            'cep' => '28615230',
            'address' => 'Rua de exemplo',
        ]);

        // Salvando no banco de dados
        $admin1->save();
        $admin2->save();
        $admin3->save();

        $employee1->save();
        $employee2->save();
        $employee3->save();
    }
}
