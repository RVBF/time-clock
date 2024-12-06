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

        $admin1->save();

        $admin2->save();


    }
}
