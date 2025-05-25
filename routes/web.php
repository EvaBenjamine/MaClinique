<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PatienteController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/patientes', [PatienteController::Class, 'index'])->name('patientes.index');
Route::post('/patientes', [PatienteController::Class, 'store'])->name('patientes.store');

Route::get('/dossiers', function () {
    return Inertia::render('dossierMedical/index');
});

Route::get('/dossiers/{id}', [PatienteController::Class, 'show'])->name('dossiers.show');

Route::get('/consultations', function(){
    return Inertia::render('consultations/index');
})->name('consultations.index');

// Gestion des utilisateurs
Route::get('/utilisateurs', [AdminController::class, 'index'])->name('users.index');
Route::get('/users/{id}', [AdminController::class, 'show'])->name('users.show');
Route::post('/admins', [AdminController::class, 'storeAdmin'])->name('admins.store');
Route::post('/sage-femmes', [AdminController::class, 'storeSageFemme'])->name('sage-femmes.store');
Route::post('/secretaires', [AdminController::class, 'storeSecretaire'])->name('secretaires.store');

// Édition d'utilisateurs (admin uniquement)
Route::get('/users/{id}/edit', [AdminController::class, 'edit'])->name('users.edit');
Route::put('/users/{id}', [AdminController::class, 'update'])->name('users.update');
Route::delete('/users/{id}', [AdminController::class, 'destroy'])->name('users.destroy');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
