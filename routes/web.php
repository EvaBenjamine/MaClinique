<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/patientes/ajouter', function () {
    return Inertia::render('patientes/ajouter'); // Cette vue React se trouve dans resources/js/pages
});
Route::get('/patientes/liste', function () {
    return Inertia::render('patientes/liste'); // Cette vue React se trouve dans resources/js/pages
});
<<<<<<< HEAD
Route::get('/patientes/dossier', function () {
    return Inertia::render('patientes/dossier'); // Cette vue React se trouve dans resources/js/pages
});
Route::get('/dossierMedical/VoirDossier', function () {
    return Inertia::render('dossierMedical/VoirDossier');
});
Route::get('/dossierMedical/VoirDossier', function () {
    return Inertia::render('dossierMedical/VoirDossier');
});
Route::get('/consultations/postnatales', function () {
    return Inertia::render('/consultations/postnatales');
});
Route::get('/consultations/prenatales', function () {
    return Inertia::render('/consultations/prenatales');
});
=======
Route::get('/dossierMedical/VoirDossier', function () {
    return Inertia::render('dossierMedical/VoirDossier');
});
>>>>>>> d9e71852033695463b9b433b79ff468dd4e4a1ca

// Gestion des utilisateurs
Route::get('/users', [AdminController::class, 'index'])->name('users.index');
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
