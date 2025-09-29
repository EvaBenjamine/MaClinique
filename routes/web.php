<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PatienteController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::get('/patientes', [PatienteController::Class, 'index'])->name('patientes.index');
Route::post('/patientes', [PatienteController::Class, 'store'])->name('patientes.store');

Route::get('/dossiers', [PatienteController::Class, 'indexDossiers'])->name('dossiers.index');

Route::get('/dossiers/{id}', [PatienteController::Class, 'show'])->name('dossiers.show');

Route::get('/consultations', [ConsultationController::Class, 'index'])->name('consultations.index');
Route::get('/consultations/create', function(){
    return Inertia::render('consultations/create');
})->name('consultations.create');
Route::post('/consultations', [PatienteController::Class, 'storeConsultation'])->name('consultations.store');
Route::post('/examens', [PatienteController::Class, 'storeExamen'])->name('examens.store');
Route::post('/prescriptions', [PatienteController::Class, 'storePrescription'])->name('prescriptions.store');
Route::post('/rdv', [PatienteController::Class, 'storeRdv'])->name('rendez-vous.store');
Route::post('/documents', [PatienteController::Class, 'storeDocument'])->name('documents.store');
Route::post('/notes', [PatienteController::Class, 'storeNote'])->name('notes-suivi.store');
Route::post('/accouchements', [PatienteController::Class, 'storeAccouchement'])->name('accouchements.store');

Route::get('/rdv', function(){
    return Inertia::render('rdv/index');
})->name('rdv.index');

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
