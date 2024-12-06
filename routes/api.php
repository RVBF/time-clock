<?php

use App\Http\Controllers\CepController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('throttle:api')->get('/cep/{cep}', [CepController::class, 'getCep']);
