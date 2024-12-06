<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CepController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TimeEntriesController;
use App\Http\Middleware\EnsureUserHasAdm;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function (Request $request) {
    return Inertia::render('Dashboard', [
        'userRole' => $request->user()->role,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::resource('employees', EmployeeController::class)->middleware(EnsureUserHasRole::class.':adm');

Route::get('time-entries/filter/{startDate}/{endDate}', [TimeEntriesController::class, 'filter'])->middleware(EnsureUserHasRole::class.':adm')->name('points.filter');
Route::get('time-entries/', [TimeEntriesController::class, 'index'])->middleware(EnsureUserHasRole::class.':adm')->name('points.index');

Route::middleware(['auth', EnsureUserHasRole::class.':employee'])->group(function () {
    Route::get('time-entries/register', [TimeEntriesController::class, 'create'])->name('points.create');
    Route::post('time-entries/register', [TimeEntriesController::class, 'store'])->name('points.store');
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__ . '/auth.php';
