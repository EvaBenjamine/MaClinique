<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::get('/dossierMedical/VoirDossier', function () {
    return Inertia::render('dossierMedical/VoirDossier');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
