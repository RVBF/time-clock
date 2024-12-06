<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class CepController extends Controller
{
    public function getCep($cep)
    {
        $cacheKey = "cep_{$cep}";
        $cachedData = Cache::get($cacheKey);

        if ($cachedData) {
            return response()->json($cachedData);
        }

        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");

        if ($response->successful()) {
            $data = $response->json();
            
            Cache::put($cacheKey, $data, 60);

            return response()->json($data);
        }

        return response()->json(['error' => 'CEP não encontrado.'], 404);
    }
}
